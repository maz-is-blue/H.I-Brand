import { useState, useEffect } from 'react'
import { Monogram } from './Monogram'

export function Curtain({ intro = false }) {
  const [up, setUp] = useState(false)
  const [drawn, setDrawn] = useState(false)
  useEffect(() => {
    let seen = false
    try { seen = intro && sessionStorage.getItem('hib_intro') } catch (e) {}
    const hold = intro && !seen ? 2000 : 500
    const d = setTimeout(() => setDrawn(true), 120)
    const t = setTimeout(() => {
      setUp(true)
      try { if (intro) sessionStorage.setItem('hib_intro', '1') } catch (e) {}
    }, hold)
    return () => { clearTimeout(t); clearTimeout(d) }
  }, [])
  return (
    <div className={`curtain ${up ? 'is-up' : ''}`}>
      <div className={`mono-anim ${drawn ? 'is-drawn' : ''}`} style={{ width: '96px', color: '#fff' }}>
        <Monogram word={true} />
      </div>
    </div>
  )
}
