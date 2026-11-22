import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { badgeVariant, bandClass, projectHref, projectIcons } from '@/components/project-meta'
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

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-sm font-bold">{label}</dt>
      <dd className="text-muted-foreground">{children}</dd>
    </div>
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
    <article aria-labelledby="project-title" className="mx-auto max-w-3xl space-y-10 pb-8">
      <a
        href="#work"
        className="inline-flex min-h-11 items-center gap-2 rounded-full font-semibold text-primary underline-offset-4 outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-ring"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to all work
      </a>

      <header className="space-y-5">
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
          className="text-4xl leading-tight font-extrabold [overflow-wrap:anywhere] hyphens-auto outline-none sm:text-5xl"
        >
          {p.title}
        </h1>
        <p className="text-xl text-muted-foreground">{p.summary}</p>
        <ul className="flex flex-wrap gap-2" role="list" aria-label="Skills used">
          {p.tags.map((t) => (
            <li key={t}>
              <Badge variant={badgeVariant[p.color]}>{t}</Badge>
            </li>
          ))}
        </ul>
      </header>

      {p.hero && <Figure image={p.hero} />}

      <dl className="grid gap-4 rounded-3xl border-2 bg-card p-6 shadow-[6px_6px_0_0_var(--shadow-pop)] sm:grid-cols-2">
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
          <ul className="grid gap-4 sm:grid-cols-3" role="list">
            {p.stats.map((s) => (
              <li key={s.label} className="rounded-2xl bg-muted px-5 py-4">
                <p className="font-display text-3xl font-extrabold text-primary">{s.value}</p>
                <p className="text-sm font-medium">{s.label}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {p.sections.map((s) => (
        <section key={s.heading} className="space-y-4">
          <h2 className="text-2xl font-bold sm:text-3xl">{s.heading}</h2>
          {s.body?.map((para) => (
            <p key={para.slice(0, 40)} className="text-lg">
              {para}
            </p>
          ))}
          {s.list && (
            <ul className="list-disc space-y-2 pl-6 text-lg marker:text-primary">
              {s.list.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
          )}
          {s.quote && (
            <figure className="rounded-3xl border-2 bg-secondary px-6 py-5 text-secondary-foreground">
              <blockquote className="font-display text-xl font-bold">“{s.quote.text}”</blockquote>
              <figcaption className="mt-2 text-sm font-semibold">— {s.quote.cite}</figcaption>
            </figure>
          )}
          {s.images && (
            <div className={cn('grid gap-6', s.images.length > 1 && s.images.every((im) => im.height > im.width) && 'grid-cols-2')}>
              {s.images.map((im) => (
                <Figure key={im.src} image={im} />
              ))}
            </div>
          )}
        </section>
      ))}

      {p.links.length > 0 && (
        <section aria-labelledby="links-heading" className="space-y-4 rounded-3xl border-2 bg-accent p-6 text-accent-foreground">
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
