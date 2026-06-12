import { useRef, useEffect } from 'react'

export function useMagnetic(strength = 0.3) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - (r.left + r.width / 2)
      const y = e.clientY - (r.top + r.height / 2)
      el.style.transform = `translate(${x * strength}px,${y * strength}px)`
    }
    const onLeave = () => { el.style.transform = '' }
    el.addEventListener('mousemove', onMove); el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [strength])
  return ref
}

export function Magnetic({ children, as: Tag = 'a', className = '', strength = 0.3, ...rest }) {
  const ref = useMagnetic(strength)
  return <Tag ref={ref} className={className} {...rest}>{children}</Tag>
}
