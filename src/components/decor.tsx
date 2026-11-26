/** Purely decorative doodles, hidden from assistive technology. */

export function Sparkle({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`pointer-events-none ${className ?? ''}`}>
      <path
        d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0Z"
        fill="currentColor"
        stroke="var(--shadow-pop)"
        strokeWidth="1"
      />
    </svg>
  )
}

export function Squiggle({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 20" preserveAspectRatio="none" className={`pointer-events-none ${className ?? ''}`}>
      <path
        d="M3 12 Q 20 3, 38 11 T 74 11 T 110 11 T 146 11 T 197 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  )
}
