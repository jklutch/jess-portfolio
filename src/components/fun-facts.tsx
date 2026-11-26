import { Shuffle } from 'lucide-react'
import { useState } from 'react'

import { profile } from '@/content'

/**
 * A sticker on the intro photo showing a random fun fact on each page load.
 * Clicking it (or pressing Enter/Space) shows the next one.
 *
 * Accessibility (WCAG 2.1 AA):
 * - It only changes when the visitor asks it to, so no pause control is needed (2.2.2).
 * - It's a real button; its accessible name starts with the visible phrase (2.5.3 Label in Name).
 * - After a click, the new phrase is announced through a polite live region (4.1.3 Status Messages).
 */
export function FunFacts() {
  const facts = profile.funFacts
  const [index, setIndex] = useState(() => Math.floor(Math.random() * facts.length))
  const [announcement, setAnnouncement] = useState('')

  function next() {
    const i = (index + 1) % facts.length
    setIndex(i)
    setAnnouncement(`Fun fact: ${facts[i]}`)
  }

  return (
    <div className="absolute -right-2 -bottom-5 max-w-[88%]">
      <button
        type="button"
        onClick={next}
        className="group inline-flex -rotate-6 items-center gap-2 rounded-2xl border-2 border-border bg-secondary px-3.5 py-1.5 text-left text-sm leading-snug font-bold text-balance text-secondary-foreground shadow-[3px_3px_0_0_var(--shadow-pop)] transition-transform outline-none hover:rotate-0 focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95"
      >
        <span key={index} className="motion-safe:animate-pop-in">
          {facts[index]}
        </span>
        <span className="sr-only"> (show another fun fact)</span>
        <Shuffle aria-hidden="true" className="size-3.5 shrink-0 opacity-70 transition-transform group-hover:rotate-12" />
      </button>
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>
    </div>
  )
}
