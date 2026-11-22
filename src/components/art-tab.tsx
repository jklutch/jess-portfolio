import { ArtPiece } from '@/components/art-piece'
import { artworks } from '@/content'

const tilts = ['sm:-rotate-1', 'sm:rotate-1', 'sm:rotate-0', 'sm:rotate-1', 'sm:-rotate-1', 'sm:rotate-0']

export function ArtTab() {
  return (
    <section aria-labelledby="art-heading" className="space-y-6">
      <div className="max-w-2xl space-y-2">
        <h2 id="art-heading" className="text-3xl font-bold sm:text-4xl">
          Art & play
        </h2>
        <p className="text-lg text-muted-foreground">
          When I’m not untangling forms, I’m painting, printing, and collaging. Making things by hand keeps my design
          brain curious.
        </p>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {artworks.map((art, i) => (
          <li key={art.title} className="motion-safe:animate-pop-in" style={{ animationDelay: `${i * 60}ms` }}>
            <figure
              className={`overflow-hidden rounded-3xl border-2 bg-card shadow-[6px_6px_0_0_var(--shadow-pop)] transition-transform motion-safe:hover:rotate-0 motion-safe:hover:scale-[1.02] ${tilts[i % tilts.length]}`}
            >
              <ArtPiece art={art} />
              <figcaption className="border-t-2 px-5 py-4">
                <p className="font-display text-lg font-bold">{art.title}</p>
                <p className="text-sm text-muted-foreground">
                  {art.medium}, {art.year}
                </p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
