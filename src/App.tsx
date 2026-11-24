import { ArrowDown, BadgeCheck, BriefcaseBusiness, ChevronDown, GraduationCap, Mail, Shirt } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { KnitsTab } from '@/components/knits-tab'
import { ContactTab } from '@/components/contact-tab'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ProjectPage } from '@/components/project-page'
import { ThemeToggle } from '@/components/theme-toggle'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WorkTab } from '@/components/work-tab'
import { profile, projects } from '@/content'

/** A small four-point sparkle, purely decorative. */
function Sparkle({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`pointer-events-none ${className ?? ''}`}>
      <path
        d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0Z"
        fill="currentColor"
        stroke="var(--shadow-pop)"
        strokeWidth="1"
      />
    </svg>
  )
}

const TABS = ['work', 'knits', 'contact'] as const
type Tab = (typeof TABS)[number]
const LABELS: Record<Tab, string> = { work: 'Work', knits: 'Knits', contact: 'Contact' }

type Route = { tab: Tab; project?: (typeof projects)[number] }

/** Routes: #work, #knits, #contact, and #work/<project-slug> for project pages. (#art still works.) */
function routeFromHash(): Route {
  const [rawFirst, slug] = window.location.hash.slice(1).split('/')
  const first = rawFirst === 'art' ? 'knits' : rawFirst // old links
  const tab = (TABS as readonly string[]).includes(first) ? (first as Tab) : 'work'
  const project = tab === 'work' && slug ? projects.find((p) => p.slug === slug) : undefined
  return { tab, project }
}

export default function App() {
  const [route, setRoute] = useState<Route>(routeFromHash)
  const { tab, project } = route
  const lastProject = useRef<string | undefined>(undefined)
  const [moreOpen, setMoreOpen] = useState(false)

  // Keep the view in the URL so every tab and project is linkable and
  // the browser back button works as people expect.
  useEffect(() => {
    const onHash = () => setRoute(routeFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    document.title = project
      ? `${project.title} · ${profile.name}`
      : `${LABELS[tab]} · ${profile.name}, ${profile.role}`
  }, [tab, project])

  // When returning from a project page, put focus back on that project's card link.
  useEffect(() => {
    if (project) {
      lastProject.current = project.slug
    } else if (lastProject.current) {
      const slug = lastProject.current
      lastProject.current = undefined
      requestAnimationFrame(() => {
        const link = document.querySelector<HTMLElement>(`[data-project-link="${slug}"]`)
        link?.focus({ preventScroll: true })
        link?.closest('li')?.scrollIntoView({ block: 'center' })
      })
    }
  }, [project])

  function changeTab(value: string) {
    const next = value as Tab
    setRoute({ tab: next })
    if (window.location.hash.slice(1) !== next) history.pushState(null, '', `#${next}`)
  }

  /** Used by the intro's calls to action: open a tab, scroll to it, and move focus there. */
  function goTo(next: Tab) {
    changeTab(next)
    requestAnimationFrame(() => {
      const main = document.getElementById('main')
      main?.scrollIntoView({ block: 'start' })
      main?.focus({ preventScroll: true })
    })
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
          <a
            href="#work"
            aria-label={`${profile.name}, home`}
            className="rounded-2xl font-display text-2xl font-extrabold tracking-tight outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <span className="mr-1 inline-block rounded-2xl bg-coral px-2.5 py-0.5 text-foreground ring-2 ring-foreground dark:text-background">
              J
            </span>
            ess<span className="text-primary">.</span>
          </a>
          <ThemeToggle />
        </header>

        {project ? (
          <main id="main" tabIndex={-1} className="flex-1 pt-6 pb-24 outline-none">
            <ProjectPage project={project} />
          </main>
        ) : (
          <>
        <section
          aria-labelledby="intro-heading"
          className="grid items-center gap-12 py-12 sm:py-20 md:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:min-h-[75vh] lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-20"
        >
          <div className="max-w-3xl space-y-8">
            <h1
              id="intro-heading"
              className="relative w-fit text-5xl leading-[1.02] font-extrabold tracking-tight sm:text-7xl lg:text-8xl"
            >
              Hi, I’m{' '}
              <span className="relative inline-block">
                {profile.shortName}
                {/* Hand-drawn squiggle under the name */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 20"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-3 w-full text-coral sm:-bottom-2 sm:h-4 lg:-bottom-3 lg:h-5"
                >
                  <path
                    d="M3 12 Q 20 3, 38 11 T 74 11 T 110 11 T 146 11 T 197 9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              !{' '}
              <span aria-hidden="true" className="inline-block origin-[70%_80%] motion-safe:animate-wave">
                👋
              </span>
              <Sparkle className="absolute -top-4 -right-12 hidden size-9 text-secondary sm:block lg:size-11" />
              <Sparkle className="absolute -right-5 bottom-2 hidden size-5 text-accent sm:block" />
            </h1>
            <p className="max-w-2xl font-display text-2xl leading-snug font-bold sm:text-3xl lg:text-4xl lg:leading-tight">
              {profile.tagline.map((part, i) =>
                'highlight' in part && part.highlight ? (
                  <span
                    key={i}
                    className="box-decoration-clone bg-[linear-gradient(transparent_55%,var(--highlight)_55%)] px-0.5"
                  >
                    {part.text}
                  </span>
                ) : (
                  <span key={i}>{part.text}</span>
                ),
              )}
            </p>

            {/* Calls to action */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="min-h-14 px-8 text-lg">
                <a
                  href="#work"
                  onClick={(e) => {
                    e.preventDefault()
                    goTo('work')
                  }}
                >
                  See my work
                  <ArrowDown aria-hidden="true" className="size-5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="min-h-14 px-8 text-lg">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    goTo('contact')
                  }}
                >
                  <Mail aria-hidden="true" className="size-5" />
                  Let’s talk
                </a>
              </Button>
            </div>

            <p className="flex items-start gap-2 pt-2 text-sm">
              <BriefcaseBusiness aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                <span className="sr-only">Currently: </span>
                <strong>{profile.employment.title}</strong>, {profile.employment.org}
                <span className="text-muted-foreground"> · {profile.employment.detail}</span>
              </span>
            </p>

            {/* Progressive disclosure: a real button with aria-expanded controls the panel,
                so keyboard and screen reader users get the same show/hide as everyone else. */}
            <div>
              <button
                type="button"
                aria-expanded={moreOpen}
                aria-controls="intro-more"
                onClick={() => setMoreOpen((o) => !o)}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-input bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors outline-none hover:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Education, certification & skills
                <ChevronDown
                  aria-hidden="true"
                  className={`size-4 text-primary transition-transform ${moreOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <div id="intro-more" hidden={!moreOpen} className="mt-4 space-y-4 motion-safe:animate-pop-in">
                <ul className="space-y-2.5 text-sm" role="list" aria-label="Education and certification">
                  <li className="flex items-start gap-2">
                    <GraduationCap aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{profile.education}</span>
                  </li>
                  {profile.certifications.map((c) => (
                    <li key={c.short} className="flex items-start gap-2">
                      <BadgeCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>
                        <a
                          href={c.href}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded font-semibold underline decoration-2 underline-offset-2 outline-none hover:decoration-4 focus-visible:ring-[3px] focus-visible:ring-ring"
                        >
                          {c.short}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                        <span className="text-muted-foreground"> · {c.name}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <ul className="flex flex-wrap gap-2" role="list" aria-label="Skills">
                  {profile.skills.map((s, i) => (
                    <li key={s}>
                      <Badge variant={(['sunny', 'mint', 'bubblegum'] as const)[i % 3]}>{s}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-60 md:max-w-none">
            {/* Decorative confetti behind the photo */}
            <div aria-hidden="true" className="absolute -top-4 -right-3 size-20 rounded-full bg-secondary" />
            <div aria-hidden="true" className="absolute -bottom-3 -left-4 size-12 rotate-12 rounded-2xl bg-accent" />
            <div aria-hidden="true" className="absolute top-1/3 -left-6 size-7 rounded-full bg-pink" />
            <Sparkle className="absolute -top-8 left-2 size-5 text-primary" />
            <img
              src={profile.photo.src}
              alt={profile.photo.alt}
              width={profile.photo.width}
              height={profile.photo.height}
              fetchPriority="high"
              className="relative aspect-[3/4] w-full rotate-2 rounded-[2rem] border-2 border-border object-cover shadow-[6px_6px_0_0_var(--shadow-pop)] transition-transform motion-safe:hover:rotate-0"
            />
            <a
              href="#knits"
              className="absolute -right-2 -bottom-4 inline-flex -rotate-6 items-center gap-1.5 rounded-full border-2 border-border bg-secondary px-3.5 py-1.5 text-sm font-bold text-secondary-foreground shadow-[3px_3px_0_0_var(--shadow-pop)] outline-none transition-transform hover:rotate-0 focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Also knits! <span aria-hidden="true">🧶</span>
            </a>
          </div>
        </section>

        <main id="main" tabIndex={-1} className="flex-1 pt-4 pb-24 outline-none">
          <Tabs value={tab} onValueChange={changeTab}>
            <TabsList aria-label="Portfolio sections">
              <TabsTrigger value="work">
                <BriefcaseBusiness aria-hidden="true" />
                Work
              </TabsTrigger>
              <TabsTrigger value="knits">
                <Shirt aria-hidden="true" />
                Knits
              </TabsTrigger>
              <TabsTrigger value="contact">
                <Mail aria-hidden="true" />
                Contact
              </TabsTrigger>
            </TabsList>
            <TabsContent value="work" data-tab="work">
              <WorkTab />
            </TabsContent>
            <TabsContent value="knits" data-tab="knits">
              <KnitsTab />
            </TabsContent>
            <TabsContent value="contact" data-tab="contact">
              <ContactTab />
            </TabsContent>
          </Tabs>
        </main>
          </>
        )}

        <footer className="border-t-2 border-dashed py-10 text-sm text-muted-foreground">
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
