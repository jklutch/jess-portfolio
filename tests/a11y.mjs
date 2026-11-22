/**
 * Automated WCAG 2.1 AA checks.
 * Builds are served with `vite preview`, then every tab is scanned with axe-core
 * in light + dark themes at desktop and phone widths. Also checks reflow at 320px
 * (WCAG 1.4.10), keyboard tab navigation, and the contact form's error state.
 *
 * Usage: npm run test:a11y
 */
import { spawn } from 'node:child_process'
import { chromium } from 'playwright'
import { AxeBuilder } from '@axe-core/playwright'
import { readFileSync } from 'node:fs'

// Pull the project slugs out of the content file so every project page gets scanned.
const SLUGS = [...readFileSync(new URL('../src/content.ts', import.meta.url), 'utf8').matchAll(/slug: '([^']+)'/g)].map((m) => m[1])

const PORT = 4179
const BASE = `http://localhost:${PORT}/`
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']

const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'pipe' })
await new Promise((resolve, reject) => {
  server.stdout.on('data', (d) => String(d).includes(String(PORT)) && resolve())
  server.on('exit', reject)
  setTimeout(() => reject(new Error('preview server did not start')), 15000)
})

let failures = 0
const fail = (msg) => {
  failures++
  console.error('  ✗ ' + msg)
}

async function scan(page, label) {
  const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze()
  if (violations.length === 0) console.log(`  ✓ ${label}: no axe violations`)
  for (const v of violations) {
    fail(`${label}: [${v.impact}] ${v.id} — ${v.help}`)
    for (const n of v.nodes.slice(0, 3)) console.error('      ' + n.target.join(' ') + ' :: ' + n.failureSummary?.split('\n')[1])
  }
}

const browser = await chromium.launch()
try {
  for (const colorScheme of ['light', 'dark']) {
    for (const viewport of [
      { width: 1280, height: 900 },
      { width: 375, height: 800 },
    ]) {
      const ctx = await browser.newContext({ colorScheme, viewport, reducedMotion: 'reduce' })
      const page = await ctx.newPage()
      console.log(`\n${colorScheme} @ ${viewport.width}px`)
      for (const tab of ['work', 'knits', 'contact']) {
        await page.goto(`${BASE}#${tab}`)
        await page.waitForSelector(`[data-tab=${tab}][data-state=active] h2`)
        // open the disclosure widgets so their content is scanned too
        await page.$$eval('details', (ds) => ds.forEach((d) => (d.open = true)))
        await scan(page, `#${tab}`)
      }
      // Intro with the progressive-disclosure panel open
      await page.goto(`${BASE}#work`)
      await page.getByRole('button', { name: 'Education, certification & skills' }).click()
      await scan(page, 'intro with details expanded')
      // Every project detail page
      for (const slug of SLUGS) {
        await page.goto(`${BASE}#work/${slug}`)
        await page.waitForSelector('#project-title')
        await page.evaluate(async () => {
          // load lazy images so contrast checks see the final page
          for (const img of document.images) img.loading = 'eager'
          await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => (i.onload = i.onerror = r)))))
        })
        await scan(page, `#work/${slug}`)
      }
      // Form error state
      await page.goto(`${BASE}#contact`)
      await page.getByRole('button', { name: 'Send message' }).click()
      await scan(page, 'contact form with errors')
      await ctx.close()
    }
  }

  console.log('\nReflow at 320px (1.4.10)')
  {
    const ctx = await browser.newContext({ viewport: { width: 320, height: 640 } })
    const page = await ctx.newPage()
    // Run twice: as-is, and with text ~5% wider to stand in for wider fallback fonts on other machines.
    for (const wide of [false, true]) {
    for (const tab of ['work', 'knits', 'contact', ...SLUGS.map((s) => `work/${s}`)]) {
      await page.goto(`${BASE}#${tab}`)
      if (wide) await page.addStyleTag({ content: '*{letter-spacing:0.03em !important}' })
      await page.waitForTimeout(50)
      const overflow = await page.evaluate(() =>
        Math.max(
          document.documentElement.scrollWidth - window.innerWidth,
          ...[...document.querySelectorAll('main *, header *')]
            .filter((el) => !el.closest('.sr-only') && !el.parentElement?.closest('svg'))
            .map((el) => Math.ceil(el.getBoundingClientRect().right - (window.innerWidth - 16))),
        ),
      )
      overflow > 0 ? fail(`#${tab}${wide ? ' (wide text)' : ''} scrolls horizontally by ${overflow}px`) : console.log(`  ✓ #${tab}${wide ? ' (wide text)' : ''} no horizontal scroll`)
    }
    }
    await ctx.close()
  }

  console.log('\nKeyboard')
  {
    const ctx = await browser.newContext()
    const page = await ctx.newPage()
    await page.goto(BASE)
    await page.keyboard.press('Tab')
    const skip = await page.evaluate(() => document.activeElement?.textContent)
    skip?.includes('Skip to main content') ? console.log('  ✓ skip link is first focusable') : fail('skip link is not first')
    await page.getByRole('tab', { name: 'Work' }).focus()
    await page.keyboard.press('ArrowRight')
    await page.waitForFunction(() => location.hash === '#knits', null, { timeout: 3000 }).catch(() => {})
    const sel = await page.getByRole('tab', { selected: true }).textContent()
    sel?.trim() === 'Knits' ? console.log('  ✓ arrow keys move between tabs') : fail(`arrow key selected "${sel}"`)
    const hash = new URL(page.url()).hash
    hash === '#knits' ? console.log('  ✓ selected tab is reflected in the URL') : fail(`hash is ${hash}`)
    // Progressive disclosure in the intro
    await page.goto(`${BASE}#work`)
    const toggle = page.getByRole('button', { name: 'Education, certification & skills' })
    const before = await toggle.getAttribute('aria-expanded')
    const hiddenBefore = await page.locator('#intro-more').isHidden()
    await toggle.focus()
    await page.keyboard.press('Enter')
    const after = await toggle.getAttribute('aria-expanded')
    const visibleAfter = await page.locator('#intro-more').isVisible()
    await page.keyboard.press('Space')
    const collapsed = await toggle.getAttribute('aria-expanded')
    before === 'false' && hiddenBefore && after === 'true' && visibleAfter && collapsed === 'false'
      ? console.log('  ✓ details toggle works with Enter and Space and reports aria-expanded')
      : fail(`details toggle: before=${before} hidden=${hiddenBefore} after=${after} visible=${visibleAfter} collapsed=${collapsed}`)

    // Project pages: opening one focuses its heading; going back focuses the card link again
    await page.goto(`${BASE}#work`)
    await page.locator(`[data-project-link="${SLUGS[0]}"]`).click()
    await page.waitForSelector('#project-title')
    const h1Focused = await page.evaluate(() => document.activeElement?.id)
    h1Focused === 'project-title' ? console.log('  ✓ opening a project moves focus to its heading') : fail(`focus on ${h1Focused}`)
    const title = await page.title()
    title.startsWith((await page.textContent('#project-title')).trim()) ? console.log('  ✓ page title names the project') : fail(`title is ${title}`)
    await page.goBack()
    await page.waitForTimeout(200)
    const back = await page.evaluate(() => document.activeElement?.getAttribute('data-project-link'))
    back === SLUGS[0] ? console.log('  ✓ going back returns focus to the project card') : fail(`focus after back on ${back}`)

    await page.goto(`${BASE}#contact`)
    await page.getByRole('button', { name: 'Send message' }).click()
    await page.waitForTimeout(100)
    const focused = await page.evaluate(() => document.activeElement?.getAttribute('name'))
    focused === 'name' ? console.log('  ✓ focus moves to first invalid field') : fail(`focus on ${focused}`)
    await ctx.close()
  }
} finally {
  await browser.close()
  server.kill()
}

console.log(failures ? `\n${failures} problem(s) found` : '\nAll accessibility checks passed 🎉')
process.exit(failures ? 1 : 0)
