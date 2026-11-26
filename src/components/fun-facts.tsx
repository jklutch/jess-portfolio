import { Pause, Play } from 'lucide-react'
import { useEffect, useState } from 'react'

import { profile } from '@/content'

const INTERVAL_MS = 15_000

function prefersReducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

/**
 * A sticker on the intro photo that cycles through short fun facts.
 *
 * Accessibility (WCAG 2.1 AA):
 * - 2.2.2 Pause, Stop, Hide: a visible pause/play button controls the rotation, it also
 *   pauses on hover/focus, and it starts paused when the visitor prefers reduced motion.
 * - Screen readers get every fact once as a list instead of hearing the sticker change.
 */
export function FunFacts() {
  const facts = profile.funFacts
  const [index, setIndex] = useState(() => Math.max(0, facts.length - 1)) // start on “Also knits!”
  const [playing, setPlaying] = useState(() => !prefersReducedMotion())
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (!playing || hovering || facts.length < 2) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % facts.length), INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [playing, hovering, facts.length])

  return (
    <div
      className="absolute -right-2 -bottom-5 flex max-w-[88%] items-end gap-1.5"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
    >
      <ul className="sr-only" aria-label="Fun facts about Jess">
        {facts.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? 'Pause rotating fun facts' : 'Play rotating fun facts'}
        className="grid size-8 shrink-0 place-items-center rounded-full border-2 border-border bg-card text-foreground shadow-[2px_2px_0_0_var(--shadow-pop)] outline-none hover:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {playing ? <Pause aria-hidden="true" className="size-3.5 fill-current" /> : <Play aria-hidden="true" className="size-3.5 fill-current" />}
      </button>

      <p
        aria-hidden="true"
        className="-rotate-6 rounded-2xl border-2 border-border bg-secondary px-3.5 py-1.5 text-center text-sm leading-snug font-bold text-balance text-secondary-foreground shadow-[3px_3px_0_0_var(--shadow-pop)]"
      >
        <span key={index} className="inline-block motion-safe:animate-pop-in">
          {facts[index]}
        </span>
      </p>
    </div>
  )
}
