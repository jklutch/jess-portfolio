import { FileText, MapPinned, MessageCircle, ShieldCheck } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { projects, type Project } from '@/content'
import { cn } from '@/lib/utils'

const icons = { form: FileText, map: MapPinned, phone: MessageCircle, shield: ShieldCheck }

const bands: Record<Project['color'], string> = {
  sunny: 'bg-secondary text-secondary-foreground',
  mint: 'bg-accent text-accent-foreground',
  bubblegum: 'bg-pink text-pink-foreground',
  grape: 'bg-primary text-primary-foreground',
}

const badgeFor: Record<Project['color'], 'sunny' | 'mint' | 'bubblegum' | 'default'> = {
  sunny: 'sunny',
  mint: 'mint',
  bubblegum: 'bubblegum',
  grape: 'default',
}

export function WorkTab() {
  return (
    <section aria-labelledby="work-heading" className="space-y-6">
      <div className="max-w-2xl space-y-2">
        <h2 id="work-heading" className="text-3xl font-bold sm:text-4xl">
          Selected work
        </h2>
        <p className="text-lg text-muted-foreground">
          A few projects where research, plain language, and accessibility helped people get what they needed from
          government.
        </p>
      </div>

      <ul className="grid gap-6 md:grid-cols-2" role="list">
        {projects.map((p, i) => {
          const Icon = icons[p.icon]
          return (
            <li key={p.title} className="motion-safe:animate-pop-in" style={{ animationDelay: `${i * 60}ms` }}>
              <Card className="h-full overflow-hidden pt-0">
                <div className={cn('flex items-center justify-between border-b-2 px-6 py-4', bands[p.color])}>
                  <Icon aria-hidden="true" className="size-7" />
                  <p className="text-sm font-semibold">{p.year}</p>
                </div>
                <CardHeader>
                  <CardTitle>{p.title}</CardTitle>
                  <CardDescription>
                    {p.org} · {p.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{p.summary}</p>
                  <p className="flex items-baseline gap-2 rounded-2xl bg-muted px-4 py-3">
                    <span className="font-display text-3xl font-extrabold text-primary">{p.outcome.value}</span>
                    <span className="text-sm font-medium">{p.outcome.label}</span>
                  </p>
                  <details className="group rounded-2xl border-2 border-input px-4 py-2 [&[open]]:pb-4">
                    <summary className="cursor-pointer rounded-lg py-1 font-semibold outline-none focus-visible:ring-[3px] focus-visible:ring-ring">
                      How I did it
                    </summary>
                    <ul className="mt-2 list-disc space-y-1.5 pl-5">
                      {p.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </details>
                </CardContent>
                <CardFooter>
                  <ul className="flex flex-wrap gap-2" role="list" aria-label="Skills used">
                    {p.tags.map((t) => (
                      <li key={t}>
                        <Badge variant={badgeFor[p.color]}>{t}</Badge>
                      </li>
                    ))}
                  </ul>
                </CardFooter>
              </Card>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
