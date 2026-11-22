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
      for (const tab of ['work', 'art', 'contact']) {
        await page.goto(`${BASE}#${tab}`)
        await page.waitForSelector(`[role=tabpanel][data-state=active] #${tab}-heading`)
        // open the disclosure widgets so their content is scanned too
        await page.$$eval('details', (ds) => ds.forEach((d) => (d.open = true)))
        await scan(page, `#${tab}`)
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
    for (const tab of ['work', 'art', 'contact']) {
      await page.goto(`${BASE}#${tab}`)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      overflow > 0 ? fail(`#${tab} scrolls horizontally by ${overflow}px`) : console.log(`  ✓ #${tab} no horizontal scroll`)
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
    await page.waitForFunction(() => location.hash === '#art', null, { timeout: 3000 }).catch(() => {})
    const sel = await page.getByRole('tab', { selected: true }).textContent()
    sel?.trim() === 'Art' ? console.log('  ✓ arrow keys move between tabs') : fail(`arrow key selected "${sel}"`)
    const hash = new URL(page.url()).hash
    hash === '#art' ? console.log('  ✓ selected tab is reflected in the URL') : fail(`hash is ${hash}`)
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
