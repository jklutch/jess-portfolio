import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  FlaskConical,
  HeartHandshake,
  Lightbulb,
  MessageCircleHeart,
  PencilRuler,
  Puzzle,
  Quote,
  Rocket,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useRef } from 'react'

import { badgeVariant, bandClass, projectHref, projectIcons } from '@/components/project-meta'
import { Sparkle, Squiggle } from '@/components/decor'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { groups, projects, type Image, type Project } from '@/content'
import { cn } from '@/lib/utils'

function Figure({ image, className }: { image: Image; className?: string }) {
  return (
    <figure className={cn('space-y-2', className)}>
      <a
        href={image.src}
        target="_blank"
        rel="noreferrer"
        className="block overflow-hidden rounded-2xl border-2 bg-card outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          className="h-auto w-full"
        />
        <span className="sr-only"> (open full-size image in a new tab)</span>
      </a>
      {image.caption && <figcaption className="text-sm text-muted-foreground">{image.caption}</figcaption>}
    </figure>
  )
}

/** Pick a decorative icon for a section heading by what it's about. */
const sectionIcons: [RegExp, LucideIcon][] = [
  [/problem|why it matters|about ssis/i, Target],
  [/research|observation|interview|survey|found|studied|methods|screen reader/i, Search],
  [/prototype|wireframe|design process|sketch|mid-fi|hi-fi|design system|persona|flow/i, PencilRuler],
  [/built with|partner|people|collaborat|together/i, HeartHandshake],
  [/feedback|testing|usability/i, MessageCircleHeart],
  [/launch|shipped|rolling|approach|start where/i, Rocket],
  [/result|showed|first year|numbers/i, TrendingUp],
  [/recognition|award/i, Trophy],
  [/implication|recommendation|next|bigger picture|improve|future|way of working|reflection/i, Lightbulb],
  [/goal|html|css|built/i, Puzzle],
  [/overview|clean/i, Sparkles],
]
const iconFor = (heading: string) => sectionIcons.find(([re]) => re.test(heading))?.[1] ?? FlaskConical

const tints = {
  sunny: 'var(--secondary)',
  mint: 'var(--accent)',
  bubblegum: 'var(--pink)',
  grape: 'var(--primary)',
} as const

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-sm font-bold">{label}</dt>
      <dd className="text-muted-foreground">{children}</dd>
    </div>
  )
}

function SectionIcon({ heading, color, index }: { heading: string; color: Project['color']; index: number }) {
  const Icon = iconFor(heading)
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid size-10 shrink-0 place-items-center rounded-xl border-2 border-border shadow-[2px_2px_0_0_var(--shadow-pop)] sm:size-11',
        bandClass[color],
        index % 2 ? 'rotate-3' : '-rotate-3',
      )}
    >
      <Icon className="size-5" />
    </span>
  )
}

export function ProjectPage({ project: p }: { project: Project }) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const Icon = projectIcons[p.icon]
  const siblings = projects.filter((x) => x.group === p.group)
  const i = siblings.indexOf(p)
  const prev = siblings[i - 1]
  const next = siblings[i + 1]

  // Move focus to the page heading so keyboard and screen reader users
  // land at the start of the new content, just like a page load.
  useEffect(() => {
    window.scrollTo(0, 0)
    headingRef.current?.focus()
  }, [p.slug])

  return (
    <article aria-labelledby="project-title" className="mx-auto max-w-3xl space-y-14 pb-8 sm:space-y-16">
      <a
        href="#work"
        className="inline-flex min-h-11 items-center gap-2 rounded-full font-semibold text-primary underline-offset-4 outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-ring"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to all work
      </a>

      <header
        className="relative space-y-6 overflow-hidden rounded-3xl border-2 border-dashed border-input px-5 py-8 sm:px-10 sm:py-10"
        style={{
          backgroundImage: `linear-gradient(135deg, color-mix(in oklab, ${tints[p.color]} 18%, transparent), transparent 70%)`,
        }}
      >
        {/* Decorative confetti, clipped to the header so it never causes sideways scrolling */}
        <span aria-hidden="true" className="absolute -top-6 -right-6 size-24 rounded-full bg-secondary/70" />
        <span aria-hidden="true" className="absolute right-16 bottom-6 hidden size-5 rotate-12 rounded-md bg-accent sm:block" />
        <span aria-hidden="true" className="absolute right-8 bottom-14 hidden size-3 rounded-full bg-pink sm:block" />
        <Sparkle className="absolute top-5 right-24 hidden size-7 text-primary sm:block" />
        <p className="flex flex-wrap items-center gap-2 text-sm font-semibold">
          <span className={cn('inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1', bandClass[p.color])}>
            <Icon aria-hidden="true" className="size-4" />
            {p.kicker}
          </span>
          <span>{groups[p.group].heading}</span>
        </p>
        <h1
          id="project-title"
          ref={headingRef}
          tabIndex={-1}
          className="relative text-4xl leading-tight font-extrabold [overflow-wrap:anywhere] hyphens-auto outline-none sm:text-5xl"
        >
          {p.title}
        </h1>
        <Squiggle className="-mt-3 h-3 w-28 text-coral sm:h-4 sm:w-36" />
        <p className="text-xl leading-relaxed text-muted-foreground">{p.summary}</p>
        <ul className="flex flex-wrap gap-2" role="list" aria-label="Skills used">
          {p.tags.map((t) => (
            <li key={t}>
              <Badge variant={badgeVariant[p.color]}>{t}</Badge>
            </li>
          ))}
        </ul>
      </header>

      {p.hero && <Figure image={p.hero} />}

      <dl className="grid gap-5 rounded-3xl border-2 bg-card p-7 shadow-[6px_6px_0_0_var(--shadow-pop)] sm:grid-cols-2">
        <Meta label="Organization">{p.org}</Meta>
        <Meta label="Timeline">{p.timeframe}</Meta>
        {p.role && <Meta label="My role">{p.role}</Meta>}
        {p.team && <Meta label="Team">{p.team}</Meta>}
        {p.status && <Meta label="Status">{p.status}</Meta>}
        {p.tools && <Meta label="Tools">{p.tools.join(', ')}</Meta>}
      </dl>

      {p.stats && (
        <section aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="sr-only">
            By the numbers
          </h2>
          <ul className="grid gap-5 sm:grid-cols-3" role="list">
            {p.stats.map((s) => (
              <li
                key={s.label}
                className="rounded-2xl border-2 border-dashed border-input bg-muted px-5 py-5 sm:odd:-rotate-1 sm:even:rotate-1"
              >
                <p className="font-display text-3xl font-extrabold text-primary">{s.value}</p>
                <p className="text-sm font-medium">{s.label}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {p.sections.map((s, i) => (
        <section key={s.heading} className="space-y-5">
          <h2 className="flex items-center gap-3 text-2xl font-bold sm:text-3xl">
            <SectionIcon heading={s.heading} color={p.color} index={i} />
            <span className="min-w-0 [overflow-wrap:anywhere] hyphens-auto">{s.heading}</span>
          </h2>
          {s.body?.map((para) => (
            <p key={para.slice(0, 40)} className="text-lg leading-relaxed">
              {para}
            </p>
          ))}
          {s.list && (
            <ul className="list-disc space-y-3 pl-6 text-lg leading-relaxed marker:text-primary">
              {s.list.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
          )}
          {[...(s.quote ? [s.quote] : []), ...(s.quotes ?? [])].map((q) => (
            <figure
              key={q.text}
              className="relative rounded-3xl border-2 bg-secondary px-6 pt-7 pb-5 text-secondary-foreground shadow-[4px_4px_0_0_var(--shadow-pop)]"
            >
              <span
                aria-hidden="true"
                className="absolute -top-4 left-5 grid size-9 place-items-center rounded-full border-2 border-border bg-card text-foreground"
              >
                <Quote className="size-4 fill-current" />
              </span>
              <blockquote className="font-display text-xl font-bold">“{q.text}”</blockquote>
              <figcaption className="mt-2 text-sm font-semibold">— {q.cite}</figcaption>
            </figure>
          ))}
          {s.images && (
            <div className={cn('grid gap-6', s.images.length > 1 && s.images.every((im) => im.height > im.width) && 'grid-cols-2')}>
              {s.images.map((im) => (
                <Figure key={im.src} image={im} className={cn(s.images!.length === 1 && im.width <= 720 && 'mx-auto w-full max-w-md')} />
              ))}
            </div>
          )}
        </section>
      ))}

      {p.links.length > 0 && (
        <section
          aria-labelledby="links-heading"
          className="relative space-y-4 overflow-hidden rounded-3xl border-2 bg-accent p-6 text-accent-foreground shadow-[6px_6px_0_0_var(--shadow-pop)]"
        >
          <Sparkle className="absolute top-5 right-6 size-8 text-secondary" />
          <Sparkle className="absolute right-16 bottom-6 size-4 text-pink" />
          <h2 id="links-heading" className="text-2xl font-bold">
            Learn more
          </h2>
          <ul className="space-y-2" role="list">
            {p.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg font-semibold underline decoration-2 outline-none hover:decoration-4 focus-visible:ring-[3px] focus-visible:ring-accent-foreground"
                >
                  <ExternalLink aria-hidden="true" className="size-5 shrink-0" />
                  {l.label}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav aria-label="More projects" className="flex flex-col gap-3 border-t-2 border-dashed pt-8 sm:flex-row sm:justify-between">
        {prev ? (
          <a href={projectHref(prev.slug)} className={cn(buttonVariants({ variant: 'outline' }), 'h-auto justify-start py-3 whitespace-normal')}>
            <ArrowLeft aria-hidden="true" />
            <span>
              <span className="block text-xs font-medium text-muted-foreground">Previous</span>
              {prev.title}
            </span>
          </a>
        ) : (
          <span />
        )}
        {next && (
          <a href={projectHref(next.slug)} className={cn(buttonVariants({ variant: 'outline' }), 'h-auto justify-end py-3 text-right whitespace-normal')}>
            <span>
              <span className="block text-xs font-medium text-muted-foreground">Next</span>
              {next.title}
            </span>
            <ArrowRight aria-hidden="true" />
          </a>
        )}
      </nav>
    </article>
  )
}
