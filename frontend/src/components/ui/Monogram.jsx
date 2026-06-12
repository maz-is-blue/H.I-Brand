import { useState, useEffect } from 'react'

const MONO_SERIF = "'Times New Roman', Times, Georgia, serif"

export function Monogram({ className = '', title = 'H.I. Brands', word = false }) {
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={title} style={{ display: 'block' }}>
      <g fill="currentColor" fontFamily={MONO_SERIF}>
        <text className="m-h" x="100" y="163" textAnchor="middle" fontSize="196">H</text>
        <text className="m-i" x="100" y="132" textAnchor="middle" fontSize="100">I</text>
        {word && (
          <text className="m-word" x="100" y="196" textAnchor="middle" fontSize="17" letterSpacing="8" fontFamily="var(--font-sans)">BRANDS</text>
        )}
      </g>
    </svg>
  )
}

export function MonogramDraw({ className = '', delay = 200 }) {
  const [drawn, setDrawn] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), delay)
    return () => clearTimeout(t)
  }, [delay])
  return (
    <div className={`mono-anim ${drawn ? 'is-drawn' : ''}`}>
      <Monogram className={className} />
    </div>
  )
}

export function Wordmark({ className = '' }) {
  return (
    <span className={className} style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, letterSpacing: '0.34em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
      H.I.&thinsp;<span style={{ color: 'var(--gold)' }}>Brands</span>
    </span>
  )
}
