const BRANDS = ['TOMMY HILFIGER', 'ZARA', 'POLO RALPH LAUREN', 'LACOSTE', 'CALVIN KLEIN', 'HUGO BOSS', 'ARMANI EXCHANGE', 'GUESS', 'MASSIMO DUTTI']

export function BrandStrip({ tone = 'dark' }) {
  const row = [...BRANDS, ...BRANDS]
  return (
    <section style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '30px 0', overflow: 'hidden', background: tone === 'stone' ? 'var(--stone)' : 'transparent' }}>
      <div className="flex w-max marquee-track">
        {row.map((b, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="font-display" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(1.1rem,2vw,1.7rem)', letterSpacing: '0.1em', padding: '0 clamp(28px,4vw,52px)' }}>{b}</span>
            <span style={{ color: 'var(--gold)' }}>·</span>
          </div>
        ))}
      </div>
    </section>
  )
}
