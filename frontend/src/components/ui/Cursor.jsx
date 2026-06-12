import { useEffect } from 'react'

export function Cursor() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const ring = document.createElement('div'); ring.className = 'cursor-ring'
    const dot = document.createElement('div'); dot.className = 'cursor-dot'
    const label = document.createElement('div'); label.className = 'cursor-label'
    document.body.append(ring, dot, label)
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, raf
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`
      label.style.left = mx + 'px'; label.style.top = (my - 46) + 'px'
    }
    const onOver = (e) => {
      const t = e.target.closest('a,button,[data-cursor],input,textarea,select')
      if (t) { ring.classList.add('is-hover'); const l = t.getAttribute('data-cursor-label'); if (l) { label.textContent = l; label.classList.add('is-on') } }
    }
    const onOut = (e) => {
      const t = e.target.closest('a,button,[data-cursor],input,textarea,select')
      if (t) { ring.classList.remove('is-hover'); label.classList.remove('is-on') }
    }
    const hide = () => { ring.classList.add('is-hidden'); dot.classList.add('is-hidden') }
    const show = () => { ring.classList.remove('is-hidden'); dot.classList.remove('is-hidden') }
    const loop = () => { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; raf = requestAnimationFrame(loop) }
    loop()
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)
    return () => {
      cancelAnimationFrame(raf); ring.remove(); dot.remove(); label.remove()
      document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut); document.removeEventListener('mouseleave', hide); document.removeEventListener('mouseenter', show)
    }
  }, [])
  return null
}
