import { Brush, BriefcaseBusiness, GraduationCap, Mail, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { ArtTab } from '@/components/art-tab'
import { ContactTab } from '@/components/contact-tab'
import { ProjectPage } from '@/components/project-page'
import { ThemeToggle } from '@/components/theme-toggle'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WorkTab } from '@/components/work-tab'
import { profile, projects } from '@/content'

const TABS = ['work', 'art', 'contact'] as const
type Tab = (typeof TABS)[number]
const LABELS: Record<Tab, string> = { work: 'Work', art: 'Art', contact: 'Contact' }

type Route = { tab: Tab; project?: (typeof projects)[number] }

/** Routes: #work, #art, #contact, and #work/<project-slug> for project pages. */
function routeFromHash(): Route {
  const [first, slug] = window.location.hash.slice(1).split('/')
  const tab = (TABS as readonly string[]).includes(first) ? (first as Tab) : 'work'
  const project = tab === 'work' && slug ? projects.find((p) => p.slug === slug) : undefined
  return { tab, project }
}

const badgeCycle = ['sunny', 'mint', 'bubblegum'] as const

export default function App() {
  const [route, setRoute] = useState<Route>(routeFromHash)
  const { tab, project } = route
  const lastProject = useRef<string | undefined>(undefined)

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
          <main id="main" tabIndex={-1} className="flex-1 py-6 outline-none">
            <ProjectPage project={project} />
          </main>
        ) : (
          <>
        <section
          aria-labelledby="intro-heading"
          className="grid items-center gap-10 py-8 sm:py-14 md:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]"
        >
          <div className="relative max-w-3xl space-y-5">
            <p className="inline-flex items-center gap-2 rounded-full border-2 bg-card px-4 py-1 text-sm font-semibold">
              <Sparkles aria-hidden="true" className="size-4 text-primary hover:animate-wiggle" />
              {profile.role}
            </p>
            <h1 id="intro-heading" className="text-5xl leading-[1.05] font-extrabold sm:text-7xl">
              Hi, I’m {profile.shortName}!
            </h1>
            <p className="max-w-3xl font-display text-2xl leading-snug font-bold sm:text-3xl">
              <span className="box-decoration-clone bg-[linear-gradient(transparent_55%,var(--highlight)_55%)] px-1">
                {profile.tagline}
              </span>
            </p>
            <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">{profile.intro}</p>
            <p className="inline-flex items-center gap-2 font-semibold">
              <GraduationCap aria-hidden="true" className="size-5 text-primary" />
              {profile.education}
            </p>
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
          <div className="relative mx-auto w-full max-w-64 md:max-w-none">
            {/* Decorative confetti behind the photo */}
            <div aria-hidden="true" className="absolute -top-5 -right-4 size-24 rounded-full bg-secondary" />
            <div aria-hidden="true" className="absolute -bottom-4 -left-5 size-16 rotate-12 rounded-2xl bg-accent" />
            <div aria-hidden="true" className="absolute top-1/3 -left-7 size-8 rounded-full bg-pink" />
            <img
              src={profile.photo.src}
              alt={profile.photo.alt}
              width={profile.photo.width}
              height={profile.photo.height}
              fetchPriority="high"
              className="relative aspect-[3/4] w-full rotate-2 rounded-[2rem] border-2 border-border object-cover shadow-[8px_8px_0_0_var(--shadow-pop)] transition-transform motion-safe:hover:rotate-0"
            />
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
            <TabsContent value="work" data-tab="work">
              <WorkTab />
            </TabsContent>
            <TabsContent value="art" data-tab="art">
              <ArtTab />
            </TabsContent>
            <TabsContent value="contact" data-tab="contact">
              <ContactTab />
            </TabsContent>
          </Tabs>
        </main>
          </>
        )}

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
