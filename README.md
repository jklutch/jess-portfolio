# Jess — Public Sector UX Portfolio

A small, playful, accessible portfolio site with **Work**, **Art**, and **Contact** tabs.

- **Stack:** React + Vite + Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com/) components (Tabs, Card, Button, Badge, Input, Textarea, Label)
- **Lightweight:** no web fonts, no images (art is drawn with tiny inline SVGs), ~100 KB gzipped JS + ~6 KB CSS
- **Theme:** “Confetti” — grape, sunshine, mint, and bubblegum on warm cream, with a dark mode that follows your system setting (and a toggle)

## Edit your content

Everything you'll want to change lives in **`src/content.ts`**: your intro, skills, projects, artwork, and contact links.
The sample projects and `hello@example.com` address are placeholders — swap in your own.

To use real artwork images, replace `<ArtPiece />` in `src/components/art-tab.tsx` with an `<img>` that has descriptive `alt` text.

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # production build in dist/
npm run test:a11y  # build + automated WCAG 2.1 AA checks
```

## Accessibility (WCAG 2.1 AA)

What's built in:

- Semantic landmarks (`header`, `main`, `footer`), one `h1`, logical heading order, `lang="en"`
- “Skip to main content” link as the first focusable element
- shadcn/Radix Tabs with full keyboard support (arrow keys, Home/End) and correct ARIA roles; the selected tab is kept in the URL (`#work`, `#art`, `#contact`) so sections are linkable and Back works
- All text meets 4.5:1 contrast and UI boundaries/focus rings meet 3:1 in **both** light and dark themes
- Visible focus indicators on every interactive element
- Contact form: visible labels, hint text, `autocomplete`, inline error messages linked with `aria-describedby`, `aria-invalid`, focus moves to the first error, and a polite live region for success
- Respects `prefers-reduced-motion`; no auto-playing or looping animation
- Reflows to 320px wide with no horizontal scrolling; touch targets are at least 44px
- Decorative icons and shapes are hidden from assistive tech; art pieces have text alternatives

`npm run test:a11y` runs [axe-core](https://github.com/dequelabs/axe-core) against every tab (and the form's error state) in light + dark mode at desktop and phone widths, plus reflow and keyboard checks. It also runs in CI on every push.

Automated tools catch roughly a third of accessibility issues, so keep doing manual checks too: keyboard-only, a screen reader (VoiceOver/NVDA), and 200% zoom — especially after you add your own content.

## Deploy

Pushing to `main` runs the accessibility checks and deploys to **GitHub Pages** via `.github/workflows/deploy.yml`.
One-time setup: in the repo go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
