import type { Artwork } from '@/content'

/** Tiny generative SVG "paintings" used as lightweight placeholders. */
export function ArtPiece({ art }: { art: Artwork }) {
  const [bg, a, b, c] = art.palette
  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label={art.description}
      className="block aspect-square w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="200" height="200" fill={bg} />
      {art.pattern === 'blobs' && (
        <>
          <circle cx="70" cy="80" r="55" fill={a} />
          <circle cx="135" cy="120" r="50" fill={b} opacity="0.9" />
          <circle cx="95" cy="150" r="28" fill={c} />
          <circle cx="150" cy="55" r="16" fill={c} />
        </>
      )}
      {art.pattern === 'stripes' &&
        Array.from({ length: 9 }, (_, i) => (
          <rect key={i} x={i * 50 - 200} y="-50" width="24" height="320" fill={i % 2 ? a : c} transform="rotate(35 100 100)" />
        ))}
      {art.pattern === 'dots' &&
        Array.from({ length: 42 }, (_, i) => {
          const x = (i * 47) % 190 + 5
          const y = (i * 83) % 190 + 5
          const r = 4 + ((i * 7) % 9)
          return <circle key={i} cx={x} cy={y} r={r} fill={[a, b, c][i % 3]} />
        })}
      {art.pattern === 'sun' && (
        <>
          <circle cx="100" cy="95" r="48" fill={a} />
          <path d="M0 150 Q50 100 100 140 T200 130 V200 H0Z" fill={b} />
          <path d="M0 175 Q60 140 120 170 T200 165 V200 H0Z" fill={c} />
        </>
      )}
      {art.pattern === 'waves' &&
        Array.from({ length: 6 }, (_, i) => (
          <path
            key={i}
            d={`M0 ${30 + i * 32} Q50 ${10 + i * 32} 100 ${30 + i * 32} T200 ${30 + i * 32} V200 H0Z`}
            fill={[a, b, c][i % 3]}
            opacity={0.55 + i * 0.07}
          />
        ))}
      {art.pattern === 'grid' &&
        Array.from({ length: 16 }, (_, i) => (
          <rect
            key={i}
            x={(i % 4) * 50 + 4}
            y={Math.floor(i / 4) * 50 + 4}
            width="42"
            height="42"
            rx={i % 3 === 0 ? 21 : 8}
            fill={art.palette[(i * 3 + Math.floor(i / 4)) % 4]}
          />
        ))}
    </svg>
  )
}
