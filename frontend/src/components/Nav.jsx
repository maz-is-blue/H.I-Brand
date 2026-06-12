import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Monogram, Wordmark } from './ui/Monogram'
import { useLang } from '../context/LanguageContext'

const NAV_LINKS = [
  { k: 'home', to: '/', en: 'Home', ar: 'الرئيسية' },
  { k: 'collections', to: '/collections', en: 'Collections', ar: 'التشكيلات' },
  { k: 'about', to: '/about', en: 'About', ar: 'من نحن' },
  { k: 'contact', to: '/contact', en: 'Contact', ar: 'تواصل' },
]

export function Nav() {
  const { isAr, toggle } = useLang()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 28)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (to) => (to === '/' ? pathname === '/' : pathname.startsWith(to))

  return (
    <header
      className="fixed top-0 inset-x-0 z-50"
      style={{
        transition: 'background .5s, backdrop-filter .5s, border-color .5s',
        background: solid ? 'rgba(5,5,5,0.78)' : 'transparent',
        backdropFilter: solid ? 'blur(14px)' : 'none',
        borderBottom: `1px solid ${solid ? 'var(--line)' : 'transparent'}`,
      }}
    >
      <nav className="wrap" style={{ height: '76px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" className="flex items-center gap-3 shrink-0" data-cursor>
          <Monogram className="w-7 text-white" />
          <Wordmark className="text-white sm:inline hidden" style={{ fontSize: '15px' }} />
        </Link>

        <div
          className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2"
          style={{ gap: '2.6rem', fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-sans)', fontSize: isAr ? '15px' : '12px', letterSpacing: isAr ? '0' : '0.16em', textTransform: isAr ? 'none' : 'uppercase' }}
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.k}
              to={l.to}
              className={`navlink transition-colors ${isActive(l.to) ? 'active text-white' : 'text-white/65 hover:text-white'}`}
            >
              {isAr ? l.ar : l.en}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            data-cursor
            className="text-white/85 hover:text-gold transition-colors"
            style={{ border: '1px solid var(--line-strong)', borderRadius: '999px', padding: '7px 16px', fontSize: '11px', letterSpacing: '0.1em', background: 'transparent', cursor: 'none', fontFamily: 'var(--font-sans)' }}
          >
            {isAr ? 'EN' : 'العربية'}
          </button>
          <button
            className="md:hidden text-white p-1"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            style={{ background: 'none', border: 'none', cursor: 'none' }}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.4">
              {open
                ? <g><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></g>
                : <g><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></g>
              }
            </svg>
          </button>
        </div>
      </nav>

      <div
        className="md:hidden overflow-hidden"
        style={{ maxHeight: open ? '300px' : '0', transition: 'max-height .5s', background: 'rgba(5,5,5,0.96)', backdropFilter: 'blur(14px)', borderBottom: open ? '1px solid var(--line)' : 'none' }}
      >
        <div
          className="flex flex-col px-7 py-6 gap-5"
          style={{ fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-sans)', alignItems: isAr ? 'flex-end' : 'flex-start', letterSpacing: isAr ? '0' : '0.16em', textTransform: isAr ? 'none' : 'uppercase', fontSize: isAr ? '17px' : '13px' }}
        >
          {NAV_LINKS.map((l) => (
            <Link key={l.k} to={l.to} onClick={() => setOpen(false)} className={isActive(l.to) ? 'text-gold' : 'text-white/80'}>
              {isAr ? l.ar : l.en}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}

export { NAV_LINKS }
