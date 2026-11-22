import { Brush, BriefcaseBusiness, Mail, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

import { ArtTab } from '@/components/art-tab'
import { ContactTab } from '@/components/contact-tab'
import { ThemeToggle } from '@/components/theme-toggle'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WorkTab } from '@/components/work-tab'
import { profile } from '@/content'

const TABS = ['work', 'art', 'contact'] as const
type Tab = (typeof TABS)[number]
const LABELS: Record<Tab, string> = { work: 'Work', art: 'Art', contact: 'Contact' }

function tabFromHash(): Tab {
  const h = window.location.hash.slice(1)
  return (TABS as readonly string[]).includes(h) ? (h as Tab) : 'work'
}

const badgeCycle = ['sunny', 'mint', 'bubblegum'] as const

export default function App() {
  const [tab, setTab] = useState<Tab>(tabFromHash)

  // Keep the selected tab in the URL so each section is linkable and
  // the browser back button works as people expect.
  useEffect(() => {
    const onHash = () => setTab(tabFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    document.title = `${LABELS[tab]} · ${profile.name}, ${profile.role}`
  }, [tab])

  function changeTab(value: string) {
    const next = value as Tab
    setTab(next)
    if (window.location.hash.slice(1) !== next) history.pushState(null, '', `#${next}`)
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-secondary px-5 py-3 font-semibold text-secondary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:outline-none focus:ring-[3px] focus:ring-foreground"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex min-h-dvh max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 py-6">
          <p className="font-display text-2xl font-extrabold tracking-tight">
            <span className="mr-1 inline-block rounded-2xl bg-coral px-2.5 py-0.5 text-foreground ring-2 ring-foreground dark:text-background">
              J
            </span>
            ess<span className="text-primary">.</span>
          </p>
          <ThemeToggle />
        </header>

        <section aria-labelledby="intro-heading" className="relative py-8 sm:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-4 right-0 hidden size-40 rounded-full bg-secondary opacity-80 blur-0 md:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-28 right-28 hidden size-20 rotate-12 rounded-3xl bg-accent md:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-10 right-44 hidden size-10 rounded-full bg-pink md:block"
          />
          <div className="relative max-w-3xl space-y-5">
            <p className="inline-flex items-center gap-2 rounded-full border-2 bg-card px-4 py-1 text-sm font-semibold">
              <Sparkles aria-hidden="true" className="size-4 text-primary hover:animate-wiggle" />
              {profile.role}
            </p>
            <h1 id="intro-heading" className="text-5xl leading-[1.05] font-extrabold sm:text-7xl">
              Hi, I’m {profile.name}!
            </h1>
            <p className="max-w-3xl font-display text-2xl leading-snug font-bold sm:text-3xl">
              <span className="box-decoration-clone bg-[linear-gradient(transparent_55%,var(--highlight)_55%)] px-1">
                {profile.tagline}
              </span>
            </p>
            <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">{profile.intro}</p>
            <ul className="flex flex-wrap gap-2" role="list" aria-label="Areas of focus">
              {profile.skills.map((s, i) => (
                <li key={s}>
                  <Badge variant={badgeCycle[i % badgeCycle.length]} className="px-3.5 py-1 text-sm">
                    {s}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <main id="main" tabIndex={-1} className="flex-1 pb-16 outline-none">
          <Tabs value={tab} onValueChange={changeTab}>
            <TabsList aria-label="Portfolio sections">
              <TabsTrigger value="work">
                <BriefcaseBusiness aria-hidden="true" />
                Work
              </TabsTrigger>
              <TabsTrigger value="art">
                <Brush aria-hidden="true" />
                Art
              </TabsTrigger>
              <TabsTrigger value="contact">
                <Mail aria-hidden="true" />
                Contact
              </TabsTrigger>
            </TabsList>
            <TabsContent value="work">
              <WorkTab />
            </TabsContent>
            <TabsContent value="art">
              <ArtTab />
            </TabsContent>
            <TabsContent value="contact">
              <ContactTab />
            </TabsContent>
          </Tabs>
        </main>

        <footer className="border-t-2 border-dashed py-8 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {profile.name}. Designed with care, built with{' '}
            <a className="font-semibold text-foreground underline hover:decoration-2" href="https://ui.shadcn.com/">
              shadcn/ui
            </a>
            , and tested for WCAG 2.1 AA.
          </p>
        </footer>
      </div>
    </>
  )
}
