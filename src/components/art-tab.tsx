import { ExternalLink } from 'lucide-react'

import { artworks, profile } from '@/content'

const tilts = ['sm:-rotate-1', 'sm:rotate-1', 'sm:rotate-0']
const ravelry = profile.links.find((l) => l.href.includes('ravelry'))

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

export function ArtTab() {
  return (
    <section aria-labelledby="art-heading" className="space-y-10">
      <div className="max-w-2xl space-y-3">
        <h2 id="art-heading" className="text-3xl font-bold sm:text-4xl">
          Knitting & making
        </h2>
        <p className="text-lg text-muted-foreground">
          When I’m not untangling services, I’m untangling yarn. Knitting is where I slow down, follow a pattern, and
          then break the rules a little.
        </p>
      </div>

      {artworks.length > 0 ? (
        <>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {artworks.map((art, i) => (
            <li key={art.title} className="motion-safe:animate-pop-in" style={{ animationDelay: `${i * 60}ms` }}>
              <figure
                className={`overflow-hidden rounded-3xl border-2 bg-card shadow-[6px_6px_0_0_var(--shadow-pop)] transition-transform motion-safe:hover:scale-[1.02] motion-safe:hover:rotate-0 ${tilts[i % tilts.length]}`}
              >
                <img
                  src={art.image.src}
                  alt={art.image.alt}
                  width={art.image.width}
                  height={art.image.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
                <figcaption className="border-t-2 px-5 py-4">
                  <p className="font-display text-lg font-bold">
                    {art.href ? (
                      <a href={art.href} className="underline decoration-2 hover:decoration-4">
                        {art.title}
                      </a>
                    ) : (
                      art.title
                    )}
                  </p>
                  {art.note && <p className="text-sm text-muted-foreground">{art.note}</p>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        {ravelry && (
          <p>
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
          </p>
        )}
        </>
      ) : (
        <div className="flex flex-col items-start gap-6 rounded-3xl border-2 bg-card p-6 shadow-[6px_6px_0_0_var(--shadow-pop)] sm:flex-row sm:items-center">
          <KnitSwatch />
          <div className="space-y-3">
            <p className="font-display text-xl font-bold">The gallery is on the needles.</p>
            <p className="text-muted-foreground">Photos of finished projects are coming soon.</p>
            {ravelry && (
              <a
                href={ravelry.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg font-semibold text-primary underline decoration-2 outline-none hover:decoration-4 focus-visible:ring-[3px] focus-visible:ring-ring"
              >
                <ExternalLink aria-hidden="true" className="size-5" />
                See my projects on Ravelry
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
