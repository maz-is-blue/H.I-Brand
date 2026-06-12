import { Link } from 'react-router-dom'
import { Monogram } from './ui/Monogram'
import { Icon } from './ui/Icon'
import { useLang } from '../context/LanguageContext'
import { NAV_LINKS } from './Nav'

export function Footer() {
  const { isAr } = useLang()
  const t = isAr
    ? { tag: 'ملابسك هويتك.. اختر بشكل صحيح', loc: 'دمشق · سوريا', rights: '© 2026 H.I. Brands. جميع الحقوق محفوظة.', nav: NAV_LINKS.map((l) => l.ar) }
    : { tag: 'Your outfit is your identity.. Choose right', loc: 'Damascus · Syria', rights: '© 2026 H.I. Brands. All rights reserved.', nav: NAV_LINKS.map((l) => l.en) }

  return (
    <footer style={{ borderTop: '1px solid var(--line)', background: 'var(--ink)' }}>
      <div className="wrap" style={{ paddingTop: '72px', paddingBottom: '40px' }}>
        <div className="grid md:grid-cols-3 gap-12 items-start" style={{ textAlign: isAr ? 'right' : 'left' }}>
          <div>
            <Monogram className="w-11 text-white" />
            <p className="mt-5" style={{ maxWidth: '260px', color: 'var(--text-dim)', fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-display)', fontStyle: isAr ? 'normal' : 'italic', fontSize: isAr ? '14px' : '17px' }}>{t.tag}</p>
          </div>
          <div className="flex md:justify-center">
            <div className="flex flex-col gap-3" style={{ fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-sans)', fontSize: '13px', letterSpacing: isAr ? '0' : '0.14em', textTransform: isAr ? 'none' : 'uppercase' }}>
              {NAV_LINKS.map((l, i) => (
                <Link key={l.k} to={l.to} className="text-white/55 hover:text-gold transition-colors">{t.nav[i]}</Link>
              ))}
            </div>
          </div>
          <div className={`flex flex-col gap-5 ${isAr ? 'md:items-end' : 'md:items-end'}`}>
            <div className="flex items-center gap-5">
              <a href="https://instagram.com/h.i.brands" target="_blank" rel="noopener" aria-label="Instagram" data-cursor className="text-white/55 hover:text-gold transition-colors">{Icon.ig()}</a>
              <a href="https://threads.net/@h.i.brands" target="_blank" rel="noopener" aria-label="Threads" data-cursor className="text-white/55 hover:text-gold transition-colors">{Icon.threads()}</a>
              <a href="https://wa.me/963000000000" target="_blank" rel="noopener" aria-label="WhatsApp" data-cursor className="text-white/55 hover:text-gold transition-colors">{Icon.wa('w-5 h-5')}</a>
            </div>
            <p className="label" style={{ color: 'var(--gold)' }}>{t.loc}</p>
          </div>
        </div>
        <hr className="hairline" style={{ margin: '48px 0 24px' }} />
        <div className="flex flex-wrap items-center justify-between gap-3" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-sans)' }}>
          <span>{t.rights}</span>
          <Link to="/admin" data-cursor className="hover:text-gold transition-colors" style={{ letterSpacing: '0.14em', textTransform: isAr ? 'none' : 'uppercase' }}>
            {isAr ? 'لوحة التحكم' : 'Admin'}
          </Link>
        </div>
      </div>
    </footer>
  )
}
