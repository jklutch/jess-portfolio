import { ExternalLink } from 'lucide-react'

import { artworks, profile } from '@/content'
import { cn } from '@/lib/utils'

const ravelry = profile.links.find((l) => l.href.includes('ravelry'))

// Small variations so the collage feels hand-placed. Tilts only apply from `sm` up,
// so nothing pokes past the edge of a small phone screen.
const tilts = ['sm:-rotate-2', 'sm:rotate-[1.5deg]', 'sm:-rotate-1', 'sm:rotate-2', 'sm:-rotate-[1.5deg]']
const tapes = ['bg-secondary/80', 'bg-pink/90', 'bg-accent/80']
const tapeTilts = ['-rotate-3', 'rotate-2', '-rotate-6', 'rotate-4']
// Stagger every other snapshot downward so the grid reads as a collage, not a table.
const offsets = ['', 'sm:mt-12 lg:mt-16', 'lg:mt-4', 'sm:mt-0 lg:-mt-6', 'sm:mt-12 lg:mt-6']

/** A little knit-stitch pattern used as decoration. */
function KnitSwatch() {
  return (
    <svg aria-hidden="true" viewBox="0 0 160 96" className="h-24 w-40 shrink-0">
      {Array.from({ length: 4 }, (_, row) =>
        Array.from({ length: 8 }, (_, col) => {
          const x = col * 20
          const y = row * 24
          const fill = ['var(--secondary)', 'var(--accent)', 'var(--pink)', 'var(--primary)'][(row + col) % 4]
          return (
            <g key={`${row}-${col}`} fill={fill} stroke="var(--shadow-pop)" strokeWidth="1.5">
              <path d={`M${x + 2} ${y + 2} Q${x + 6} ${y + 20} ${x + 10} ${y + 22} Q${x + 8} ${y + 8} ${x + 2} ${y + 2}Z`} />
              <path d={`M${x + 18} ${y + 2} Q${x + 14} ${y + 20} ${x + 10} ${y + 22} Q${x + 12} ${y + 8} ${x + 18} ${y + 2}Z`} />
            </g>
          )
        }),
      )}
    </svg>
  )
}

function RavelryLink() {
  if (!ravelry) return null
  return (
    <a
      href={ravelry.href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-11 items-center gap-2 rounded-lg font-semibold text-primary underline decoration-2 outline-none hover:decoration-4 focus-visible:ring-[3px] focus-visible:ring-ring"
    >
      <ExternalLink aria-hidden="true" className="size-5" />
      See more of my projects on Ravelry
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}

export function KnitsTab() {
  return (
    <section aria-labelledby="knits-heading" className="space-y-10">
      <div className="max-w-2xl space-y-3">
        <h2 id="knits-heading" className="text-3xl font-bold sm:text-4xl">
          Knitting & making
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          When I’m not untangling services, I’m untangling yarn. Knitting is where I slow down, follow a pattern, and
          then break the rules a little.
        </p>
      </div>

      {artworks.length > 0 ? (
        <>
          {/* Collage: a masonry-style column layout of taped-down snapshots.
              Each photo's alt text names and describes the piece. */}
          <ul role="list" aria-label="Knitting projects" className="grid items-start gap-x-10 gap-y-12 pt-4 sm:grid-cols-2 lg:grid-cols-3">
            {artworks.map((art, i) => (
              <li
                key={art.title}
                className={cn('relative motion-safe:animate-pop-in', offsets[i % offsets.length])}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div
                  className={cn(
                    'relative rounded-2xl border-2 bg-card p-2.5 shadow-[6px_6px_0_0_var(--shadow-pop)] transition-transform motion-safe:hover:scale-[1.02] motion-safe:hover:rotate-0',
                    tilts[i % tilts.length],
                  )}
                >
                  <img
                    src={art.image.src}
                    alt={art.image.alt}
                    width={art.image.width}
                    height={art.image.height}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full rounded-xl"
                  />
                  {/* Washi tape */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute -top-3.5 left-1/2 h-7 w-24 -translate-x-1/2 rounded-sm border border-black/10 shadow-sm',
                      tapes[i % tapes.length],
                      tapeTilts[i % tapeTilts.length],
                    )}
                  />
                </div>
                {i % 2 === 0 && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute -bottom-3 size-6 rounded-full border-2 border-border',
                      i % 4 === 0 ? 'left-3 bg-pink' : 'right-3 bg-accent',
                    )}
                  />
                )}
              </li>
            ))}
          </ul>
          <p>
            <RavelryLink />
          </p>
        </>
      ) : (
        <div className="flex flex-col items-start gap-6 rounded-3xl border-2 bg-card p-6 shadow-[6px_6px_0_0_var(--shadow-pop)] sm:flex-row sm:items-center">
          <KnitSwatch />
          <div className="space-y-3">
            <p className="font-display text-xl font-bold">The gallery is on the needles.</p>
            <p className="text-muted-foreground">Photos of finished projects are coming soon.</p>
            <RavelryLink />
          </div>
        </div>
      )}
    </section>
  )
}
