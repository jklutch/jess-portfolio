import { ArrowRight } from 'lucide-react'

import { badgeVariant, bandClass, projectHref, projectIcons } from '@/components/project-meta'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { groups, projects, type Project } from '@/content'
import { cn } from '@/lib/utils'

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const Icon = projectIcons[p.icon]
  return (
    <li className="motion-safe:animate-pop-in" style={{ animationDelay: `${index * 50}ms` }}>
      {/* The title link stretches over the whole card, so the card is one big target
          but screen readers hear a single, clearly named link. */}
      <Card className="group relative h-full overflow-hidden pt-0 transition-[transform,box-shadow] focus-within:ring-[3px] focus-within:ring-ring focus-within:ring-offset-4 focus-within:ring-offset-background motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[8px_10px_0_0_var(--shadow-pop)]">
        {p.thumb ? (
          <div className={cn('relative border-b-2', bandClass[p.color])}>
            <img
              src={p.thumb.src}
              alt={p.thumb.alt}
              width={p.thumb.width}
              height={p.thumb.height}
              loading="lazy"
              decoding="async"
              className="aspect-[16/9] w-full object-cover object-top"
            />
            <span className={cn('absolute top-3 left-3 rounded-full border-2 p-2', bandClass[p.color])}>
              <Icon aria-hidden="true" className="size-5" />
            </span>
          </div>
        ) : (
          <div className={cn('flex aspect-[16/9] items-center justify-center border-b-2', bandClass[p.color])}>
            <Icon aria-hidden="true" className="size-16 stroke-[1.5] motion-safe:group-hover:animate-wiggle" />
          </div>
        )}
        <CardHeader>
          <p className="text-sm font-semibold">
            {p.kicker} · {p.timeframe}
          </p>
          <CardTitle>
            <a
              href={projectHref(p.slug)}
              data-project-link={p.slug}
              className="outline-none after:absolute after:inset-0 after:rounded-3xl after:content-[''] hover:underline hover:decoration-2"
            >
              {p.title}
            </a>
          </CardTitle>
          <CardDescription>{p.org}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{p.summary}</p>
        </CardContent>
        <CardFooter className="justify-between gap-4">
          <ul className="flex flex-wrap gap-2" role="list" aria-label="Skills used">
            {p.tags.slice(0, 3).map((t) => (
              <li key={t}>
                <Badge variant={badgeVariant[p.color]}>{t}</Badge>
              </li>
            ))}
          </ul>
          <span aria-hidden="true" className="inline-flex items-center gap-1 text-sm font-bold text-primary">
            Read more <ArrowRight className="size-4 transition-transform motion-safe:group-hover:translate-x-1" />
          </span>
        </CardFooter>
      </Card>
    </li>
  )
}

function ProjectGroup({ group }: { group: Project['group'] }) {
  const { heading, description } = groups[group]
  const list = projects.filter((p) => p.group === group)
  const id = `${group}-heading`
  return (
    <section aria-labelledby={id} className="space-y-6">
      <div className="max-w-2xl space-y-2">
        <h2 id={id} className="text-3xl font-bold sm:text-4xl">
          {heading}
        </h2>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="list">
        {list.map((p, i) => (
          <ProjectCard key={p.slug} p={p} index={i} />
        ))}
      </ul>
    </section>
  )
}

export function WorkTab() {
  return (
    <div className="space-y-16">
      <ProjectGroup group="public" />
      <ProjectGroup group="school" />
    </div>
  )
}
