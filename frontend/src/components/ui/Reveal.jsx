import { useRef, useEffect } from 'react'

export function Reveal({ children, className = '', delay = 0, clip = false, as: Tag = 'div', ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reveal = () => el.classList.add('is-in')
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) { reveal(); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.transitionDelay = `${delay}ms`
          reveal()
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.12 })
    io.observe(el)
    const fb = setTimeout(reveal, 1800)
    return () => { io.disconnect(); clearTimeout(fb) }
  }, [delay])
  return (
    <Tag ref={ref} className={`${clip ? 'reveal-clip' : 'reveal'} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
