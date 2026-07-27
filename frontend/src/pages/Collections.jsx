import { useState } from 'react'
import { useLang } from '../context/LanguageContext'
import { useProducts, CATEGORIES, waLink } from '../context/ProductsContext'
import { useContent, pick, pickImage } from '../context/ContentContext'
import { Reveal } from '../components/ui/Reveal'
import { Cursor } from '../components/ui/Cursor'
import { Curtain } from '../components/ui/Curtain'
import { Placeholder } from '../components/ui/Placeholder'
import { ContentImage } from '../components/ui/ContentImage'
import { BrandStrip } from '../components/ui/BrandStrip'
import { Icon } from '../components/ui/Icon'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'

const DEFAULT_CATEGORY_LABELS = {
  All: 'All', Outerwear: 'Outerwear', Shirts: 'Shirts', Knitwear: 'Knitwear', 'T-Shirts': 'T-Shirts', Trousers: 'Trousers',
}

function buildT(content, isAr) {
  const t = (key, en, ar) => pick(content, key, isAr, isAr ? ar : en)
  return {
    kick: t('collections.kick', 'The Collection · 2026', 'التشكيلة · 2026'),
    title: t('collections.title', 'The Collection', 'التشكيلة'),
    lead: t('collections.lead', "Curated pieces from the world's sharpest labels — for every occasion, for every man.", 'قطع منتقاة من أرقى الماركات العالمية — لكل مناسبة، ولكل رجل.'),
    look: t('collections.look_kick', 'Lookbook', 'لوك بوك'),
    lookTitle: t('collections.look_title', 'Effortless, uncompromising', 'أناقة بلا مجاملة'),
    lookBody: t('collections.look_body', 'From the overcoat that opens winter to the shirt that makes your day.', 'من المعطف الذي يفتتح الشتاء إلى القميص الذي يصنع يومك.'),
    lookImageLabel: t('collections.lookbook_image_label', 'lookbook image — large', 'صورة لوك بوك — كبيرة'),
    lookDetailLabel: t('collections.lookbook_detail_label', 'detail', 'تفصيلة'),
    countOne: t('collections.count_one', '{n} piece', '{n} قطعة'),
    countOther: t('collections.count_other', '{n} pieces', '{n} قطعة'),
    empty: t('collections.empty', 'No pieces in this category yet.', 'لا توجد قطع في هذه الفئة بعد.'),
    orderBtn: t('collections.order_whatsapp_btn', 'Order via WhatsApp', 'اطلب عبر واتساب'),
  }
}

function ProductCard({ p, isAr, orderBtn, whatsapp }) {
  return (
    <div className="group">
      <div className="relative overflow-hidden" style={{ border: '1px solid var(--line)' }}>
        <Placeholder label={`${p.brand} · ${isAr ? p.name_ar : p.name_en}`} ratio={p.image_ratio} className="zoom-img" />
        <span className="absolute top-3" style={{ insetInlineStart: '12px', fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', background: 'rgba(5,5,5,0.5)', padding: '4px 9px', backdropFilter: 'blur(4px)' }}>{p.category}</span>
        <div className="absolute inset-x-0 bottom-0 p-3" style={{ transform: 'translateY(100%)', transition: 'transform .5s', background: 'linear-gradient(transparent, rgba(5,5,5,0.85))' }}
          ref={el => {
            if (!el) return
            const parent = el.parentElement
            const show = () => el.style.transform = 'translateY(0)'
            const hide = () => el.style.transform = 'translateY(100%)'
            parent.addEventListener('mouseenter', show)
            parent.addEventListener('mouseleave', hide)
          }}>
          <a href={waLink(p, whatsapp)} target="_blank" rel="noopener" className="btn-wa w-full" data-cursor style={{ padding: '12px' }}>
            {Icon.wa('w-4 h-4')}{orderBtn}
          </a>
        </div>
      </div>
      <div className="flex items-baseline justify-between mt-4" style={{ flexDirection: isAr ? 'row-reverse' : 'row' }}>
        <div style={{ textAlign: isAr ? 'right' : 'left' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>{p.brand}</p>
          <h3 className="mt-1" style={{ fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-display)', fontSize: '19px', color: '#fff' }}>{isAr ? p.name_ar : p.name_en}</h3>
        </div>
        <span className="font-display shrink-0" style={{ color: 'var(--gold)', fontSize: '19px' }}>${p.price}</span>
      </div>
    </div>
  )
}

export default function Collections() {
  const { isAr } = useLang()
  const { products, loading } = useProducts()
  const { content } = useContent()
  const [cat, setCat] = useState('All')

  const cats = ['All', ...CATEGORIES]
  const filtered = cat === 'All' ? products : products.filter((p) => p.category === cat)

  const catLabel = (c) => pick(content, `collections.category.${c}`, isAr, DEFAULT_CATEGORY_LABELS[c] || c)

  const T = buildT(content, isAr)
  const whatsapp = pick(content, 'settings.whatsapp_number', isAr, '963000000000')
  const count = (n) => (n === 1 ? T.countOne : T.countOther).replace('{n}', n)
  const disp = isAr ? { fontFamily: 'var(--font-ar-display)' } : { fontFamily: 'var(--font-display)' }

  return (
    <>
      <Curtain />
      <Cursor />
      <Nav />

      {/* Header */}
      <section className="wrap" style={{ paddingTop: 'clamp(130px,20vh,200px)', paddingBottom: 'clamp(40px,6vh,72px)' }}>
        <div style={{ textAlign: isAr ? 'right' : 'left' }}>
          <Reveal><span className="label">{T.kick}</span></Reveal>
          <Reveal delay={100}><h1 className="mt-4 display-lg" style={{ ...disp, color: '#fff' }}>{T.title}</h1></Reveal>
          <Reveal delay={200}><p className="mt-6" style={{ color: 'var(--text-dim)', fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-sans)', fontSize: isAr ? '17px' : '16px', lineHeight: 1.7, maxWidth: '560px', marginInlineStart: isAr ? 'auto' : 0 }}>{T.lead}</p></Reveal>
        </div>
      </section>

      {/* Lookbook */}
      <section className="wrap" style={{ paddingBottom: 'clamp(60px,10vh,110px)' }}>
        <Reveal clip>
          <div className="grid md:grid-cols-12 gap-5 items-end" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
            <div className="md:col-span-7">
              <ContentImage src={pickImage(content, 'collections.lookbook_image')} label={T.lookImageLabel} ratio="16/10" className="group zoom-img" />
            </div>
            <div className="md:col-span-5" style={{ textAlign: isAr ? 'right' : 'left' }}>
              <span className="label">{T.look}</span>
              <h2 className="mt-4" style={{ ...disp, fontStyle: isAr ? 'normal' : 'italic', fontSize: 'clamp(1.8rem,3.4vw,2.8rem)', color: '#fff', lineHeight: 1.15 }}>{T.lookTitle}</h2>
              <p className="mt-4" style={{ color: 'var(--text-dim)', fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-sans)', fontSize: '15px', lineHeight: 1.7, maxWidth: '360px', marginInlineStart: isAr ? 'auto' : 0 }}>{T.lookBody}</p>
              <div className="mt-6"><ContentImage src={pickImage(content, 'collections.lookbook_detail_image')} label={T.lookDetailLabel} ratio="3/2" /></div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Filter bar */}
      <section className="wrap">
        <div className="flex flex-wrap items-center justify-between gap-5 pb-7" style={{ borderBottom: '1px solid var(--line)', flexDirection: isAr ? 'row-reverse' : 'row' }}>
          <div className="flex flex-wrap gap-2" style={{ flexDirection: isAr ? 'row-reverse' : 'row' }}>
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} data-cursor
                style={{ cursor: 'none', border: `1px solid ${cat === c ? 'var(--gold)' : 'var(--line-strong)'}`, color: cat === c ? '#0a0a0a' : 'rgba(255,255,255,0.75)', background: cat === c ? 'var(--gold)' : 'transparent', borderRadius: '999px', padding: '9px 20px', fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-sans)', fontSize: '12px', letterSpacing: isAr ? '0' : '0.12em', textTransform: isAr ? 'none' : 'uppercase', transition: 'all .35s' }}>
                {catLabel(c)}
              </button>
            ))}
          </div>
          <span style={{ color: 'var(--text-dim)', fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-sans)', fontSize: '12px', letterSpacing: isAr ? '0' : '0.14em', textTransform: isAr ? 'none' : 'uppercase' }}>{count(filtered.length)}</span>
        </div>
      </section>

      {/* Grid */}
      <section className="wrap" style={{ paddingTop: 'clamp(40px,6vh,64px)', paddingBottom: 'clamp(90px,14vh,150px)', minHeight: '40vh' }}>
        {loading ? (
          <p style={{ color: 'var(--text-dim)', textAlign: 'center', padding: '60px 0' }}>Loading…</p>
        ) : filtered.length === 0 ? (
          <p style={{ color: 'var(--text-dim)', textAlign: 'center', padding: '60px 0', fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-display)', fontStyle: isAr ? 'normal' : 'italic', fontSize: '20px' }}>{T.empty}</p>
        ) : (
          <div key={cat} className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 80}><ProductCard p={p} isAr={isAr} orderBtn={T.orderBtn} whatsapp={whatsapp} /></Reveal>
            ))}
          </div>
        )}
      </section>

      <BrandStrip tone="stone" />
      <Footer />
    </>
  )
}
