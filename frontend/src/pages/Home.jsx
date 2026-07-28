import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { useProducts } from '../context/ProductsContext'
import { useContent, pick, pickImage } from '../context/ContentContext'
import { Monogram, MonogramDraw } from '../components/ui/Monogram'
import { Reveal } from '../components/ui/Reveal'
import { Cursor } from '../components/ui/Cursor'
import { Curtain } from '../components/ui/Curtain'
import { Magnetic } from '../components/ui/Magnetic'
import { ContentImage } from '../components/ui/ContentImage'
import { BrandStrip } from '../components/ui/BrandStrip'
import { Icon } from '../components/ui/Icon'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'

function buildT(content, isAr) {
  const t = (key, en, ar) => pick(content, key, isAr, isAr ? ar : en)
  return {
    place: t('home.eyebrow_location', 'Damascus · Syria', 'دمشق · سوريا'),
    cat: t('home.eyebrow_category', 'Menswear', 'أزياء رجالية'),
    l1: t('home.hero_line1', 'Your outfit is your identity..', 'ملابسك هويتك..'),
    l2: t('home.hero_line2', 'Choose right', 'اختر بشكل صحيح'),
    shop: t('home.hero_shop_btn', 'Shop Now', 'تسوّق الآن'),
    house: t('home.hero_house_btn', 'The House', 'قصة الدار'),
    manKick: t('home.manifesto_kick', 'Manifesto', 'البيان'),
    man1: t('home.manifesto_p1', 'We choose the ', 'نختار '),
    manGold: t('home.manifesto_gold', 'piece that speaks', 'القطعة التي تتحدّث'),
    man2: t('home.manifesto_p2', ' before you do. Authentic labels, handpicked, delivered to every governorate in Syria.', ' قبل أن تنطق. ماركات أصلية، منتقاة بعناية، تصل إلى كل محافظة سورية.'),
    selKick: t('home.selection_kick', 'The Selection', 'المختارات'),
    selTitle: t('home.selection_title', 'Featured Pieces', 'قطع مميزة'),
    viewAll: t('home.selection_view_all', 'View the full collection', 'شاهد التشكيلة كاملة'),
    aboutKick: t('home.about_kick', 'The House', 'الدار'),
    aboutTitle: t('home.about_title', 'From the heart of Damascus to all of Syria', 'من قلب دمشق لكل المحافظات السورية'),
    aboutBody: t('home.about_body', "From a small storefront to a destination for the man who knows what he wants — we bring the world's sharpest labels to your door.", 'من دكان صغير إلى وجهة للرجل الذي يعرف ما يريد. نجلب أرقى الماركات إلى عتبة بابك.'),
    readMore: t('home.about_read_more', 'Read our story', 'اقرأ قصتنا'),
    igKick: t('home.instagram_kick', 'On the feed', 'على إنستغرام'),
    igFollow: t('home.instagram_follow', 'Follow @h.i.brands', 'تابعنا @h.i.brands'),
    ctaTitle: t('home.cta_title', 'Reach out and order now', 'تواصل معنا واطلب الآن'),
    ctaSub: t('home.cta_sub', "Message us on WhatsApp — we'll style the order with you.", 'راسلنا على واتساب وسنرتّب طلبك خطوة بخطوة.'),
    ctaBtn: t('home.cta_btn', 'Chat on WhatsApp', 'تحدّث عبر واتساب'),
  }
}

function FeaturedCard({ p, i, isAr }) {
  return (
    <Reveal delay={(i % 4) * 90} className={i % 2 === 1 ? 'md:mt-24' : ''}>
      <Link to="/collections" className="group block" data-cursor data-cursor-label={isAr ? 'عرض' : 'View'}>
        <div className="frame overflow-hidden" style={{ border: '1px solid var(--line)' }}>
          <ContentImage src={p.image_url} label={`${p.brand} · ${isAr ? p.name_ar : p.name_en}`} ratio={p.image_ratio} className="zoom-img" />
        </div>
        <div className="flex items-baseline justify-between mt-5" style={{ flexDirection: isAr ? 'row-reverse' : 'row' }}>
          <div style={{ textAlign: isAr ? 'right' : 'left' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>{p.brand}</p>
            <h3 className="mt-1" style={{ fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-display)', fontSize: '20px', color: '#fff' }}>{isAr ? p.name_ar : p.name_en}</h3>
          </div>
          <span className="font-display" style={{ color: 'var(--gold)', fontSize: '20px' }}>${p.price}</span>
        </div>
      </Link>
    </Reveal>
  )
}

export default function Home() {
  const { isAr } = useLang()
  const { products } = useProducts()
  const { content } = useContent()
  const featured = products.filter((p) => p.featured).slice(0, 4)
  const heroRef = useRef(null)

  useEffect(() => {
    const el = heroRef.current; if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let cur = 0, raf
    const loop = () => {
      const target = window.scrollY
      cur += (target - cur) * 0.085
      if (Math.abs(target - cur) < 0.05) cur = target
      el.style.transform = `translate(-50%, calc(-50% + ${(cur * 0.18).toFixed(2)}px)) scale(${(1 + cur * 0.00012).toFixed(4)})`
      el.style.opacity = Math.max(0, 1 - cur / 680).toFixed(3)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const T = buildT(content, isAr)
  const whatsapp = pick(content, 'settings.whatsapp_number', isAr, '963000000000')
  const igUrl = pick(content, 'settings.instagram_url', isAr, 'https://instagram.com/h.i.brands')
  const igHandle = pick(content, 'settings.instagram_handle', isAr, '@h.i.brands')

  const disp = isAr ? { fontFamily: 'var(--font-ar-display)' } : { fontFamily: 'var(--font-display)' }
  const dispI = isAr ? { fontFamily: 'var(--font-ar-display)' } : { fontFamily: 'var(--font-display)', fontStyle: 'italic' }

  return (
    <>
      <Curtain intro={true} />
      <Cursor />
      <Nav />

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden" style={{ paddingTop: '76px' }}>
        <div ref={heroRef} aria-hidden="true" className="hero-ghost pointer-events-none absolute left-1/2 top-1/2" style={{ transform: 'translate(-50%,-50%)', width: 'min(110vw,980px)', color: 'rgba(255,255,255,0.04)', zIndex: 0 }}>
          <Monogram className="w-full" title="" />
        </div>
        <div className="wrap relative" style={{ zIndex: 2 }}>
          <Reveal>
            <div className="flex items-center justify-between" style={{ marginBottom: 'clamp(28px,6vh,72px)' }}>
              <span className="label">{T.place}</span>
              <span className="label" style={{ color: 'rgba(255,255,255,0.4)' }}>{T.cat}</span>
            </div>
          </Reveal>
          <div className="flex flex-col items-center text-center">
            <MonogramDraw className="w-36 sm:w-44 text-white" delay={300} />
            <Reveal delay={500} className="mt-9">
              <h1 style={{ lineHeight: isAr ? 1.35 : 1.16, textWrap: 'balance' }}>
                <span className="block" style={{ ...disp, fontSize: isAr ? 'clamp(2rem,6vw,4.6rem)' : 'clamp(1.9rem,5vw,4.2rem)', color: 'rgba(255,255,255,0.95)' }}>{T.l1}</span>
                <span className={isAr ? 'block' : 'block gold-grad'} style={{ ...dispI, fontWeight: isAr ? 400 : 500, fontSize: 'clamp(2.6rem,8.5vw,7.2rem)', lineHeight: 1.25, paddingBottom: '0.1em', color: 'var(--gold)', marginTop: isAr ? '2px' : '10px', letterSpacing: isAr ? '0' : '0.01em' }}>{T.l2}</span>
              </h1>
            </Reveal>
            <Reveal delay={780} className="mt-10">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Magnetic as={Link} to="/collections" className="btn-gold" strength={0.4} data-cursor>{T.shop}</Magnetic>
                <Magnetic as={Link} to="/about" className="btn-ghost" strength={0.4} data-cursor>{T.house}</Magnetic>
              </div>
            </Reveal>
          </div>
        </div>
        <a href="#manifesto" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ bottom: '30px', color: 'var(--text-dim)', zIndex: 2 }} data-cursor>
          <span style={{ display: 'block', width: '1px', height: '44px', background: 'linear-gradient(var(--gold),transparent)' }}></span>
        </a>
      </section>

      {/* MANIFESTO */}
      <section id="manifesto" className="wrap" style={{ paddingTop: 'clamp(90px,16vh,170px)', paddingBottom: 'clamp(90px,16vh,170px)' }}>
        <div className="grid md:grid-cols-12 gap-8 items-start" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
          <Reveal className="md:col-span-3"><span className="label">— {T.manKick}</span></Reveal>
          <Reveal delay={120} className="md:col-span-9">
            <p style={{ ...disp, fontSize: 'clamp(1.6rem,3.4vw,3rem)', lineHeight: 1.32, color: 'rgba(255,255,255,0.9)', textWrap: 'pretty' }}>
              {T.man1}<span style={{ color: 'var(--gold)', fontStyle: isAr ? 'normal' : 'italic' }}>{T.manGold}</span>{T.man2}
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURED */}
      <section className="wrap" style={{ paddingBottom: 'clamp(80px,12vh,140px)' }}>
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4" style={{ marginBottom: 'clamp(40px,6vh,72px)', flexDirection: isAr ? 'row-reverse' : 'row' }}>
            <div style={{ textAlign: isAr ? 'right' : 'left' }}>
              <span className="label">{T.selKick}</span>
              <h2 className="mt-3" style={{ ...disp, fontSize: 'clamp(2rem,5vw,3.6rem)', color: '#fff' }}>{T.selTitle}</h2>
            </div>
            <Link to="/collections" className="group inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors" data-cursor style={{ fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-sans)', fontSize: '12px', letterSpacing: isAr ? '0' : '0.16em', textTransform: isAr ? 'none' : 'uppercase' }}>
              {T.viewAll}<span style={{ transform: isAr ? 'scaleX(-1)' : 'none', display: 'inline-flex' }}>{Icon.arrow()}</span>
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-7">
          {featured.map((p, i) => <FeaturedCard key={p.id} p={p} i={i} isAr={isAr} />)}
        </div>
      </section>

      <BrandStrip tone="stone" />

      {/* ABOUT TEASER */}
      <section className="wrap" style={{ paddingTop: 'clamp(90px,16vh,170px)', paddingBottom: 'clamp(90px,16vh,170px)' }}>
        <div className="grid md:grid-cols-2 gap-14 items-center" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
          <Reveal className="relative flex justify-center" clip>
            <div className="absolute inset-0 grid place-items-center pointer-events-none" style={{ color: 'rgba(255,255,255,0.04)' }}>
              <Monogram className="w-full max-w-none" title="" style={{ width: '115%' }} />
            </div>
            <div className="relative grid place-items-center" style={{ width: 'min(78%,320px)', aspectRatio: '1/1', border: '1px solid var(--line)', outline: '1px solid rgba(201,168,76,0.25)', outlineOffset: '-10px' }}>
              <div style={{ width: '62%', color: 'rgba(255,255,255,0.92)' }}>
                <Monogram title="" word={true} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={140} style={{ textAlign: isAr ? 'right' : 'left' }}>
            <span className="label">{T.aboutKick}</span>
            <h2 className="mt-5" style={{ ...disp, fontSize: 'clamp(1.9rem,4vw,3.2rem)', lineHeight: 1.12, color: '#fff' }}>{T.aboutTitle}</h2>
            <hr className="hairline" style={{ width: '64px', background: 'var(--gold)', margin: isAr ? '28px 0 28px auto' : '28px 0', height: '1px' }} />
            <p style={{ color: 'var(--text-dim)', fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-sans)', fontSize: isAr ? '17px' : '15px', lineHeight: 1.8, maxWidth: '440px', marginInlineStart: isAr ? 'auto' : 0, textWrap: 'pretty' }}>{T.aboutBody}</p>
            <Link to="/about" className="group inline-flex items-center gap-2 mt-8 text-white hover:text-gold transition-colors" data-cursor style={{ fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-sans)', fontSize: '12px', letterSpacing: isAr ? '0' : '0.16em', textTransform: isAr ? 'none' : 'uppercase' }}>
              {T.readMore}<span style={{ transform: isAr ? 'scaleX(-1)' : 'none', display: 'inline-flex' }}>{Icon.arrow()}</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="wrap" style={{ paddingBottom: 'clamp(90px,14vh,150px)' }}>
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-3" style={{ marginBottom: '32px', flexDirection: isAr ? 'row-reverse' : 'row' }}>
            <div style={{ textAlign: isAr ? 'right' : 'left' }}>
              <span className="label">{T.igKick}</span>
              <h2 className="mt-2 font-display" style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', color: '#fff' }}>{igHandle}</h2>
            </div>
            <a href={igUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-white/65 hover:text-gold transition-colors" data-cursor style={{ fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-sans)', fontSize: '12px', letterSpacing: isAr ? '0' : '0.14em', textTransform: isAr ? 'none' : 'uppercase' }}>{Icon.ig('w-4 h-4')}{T.igFollow}</a>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="flex gap-4 overflow-x-auto no-bar pb-2" dir="ltr">
            {[1,2,3,4,5,6].map((i) => (
              <a key={i} href={igUrl} target="_blank" rel="noopener" className="group relative shrink-0" style={{ width: 'clamp(160px,42vw,240px)' }} data-cursor data-cursor-label={igHandle}>
                <ContentImage src={pickImage(content, `home.instagram_tile_${i}`)} alt={igHandle} label={igHandle} ratio="1/1" className="zoom-img" />
                <div className="absolute inset-0 grid place-items-center transition-colors" style={{ background: 'rgba(5,5,5,0)' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(5,5,5,0.4)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(5,5,5,0)'}>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white">{Icon.ig('w-6 h-6')}</span>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="relative" style={{ background: 'var(--stone)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,var(--gold),transparent)' }}></div>
        <div className="wrap flex flex-col items-center text-center" style={{ paddingTop: 'clamp(80px,14vh,140px)', paddingBottom: 'clamp(80px,14vh,140px)' }}>
          <Reveal>
            <hr className="hairline" style={{ width: '48px', background: 'var(--gold)', margin: '0 auto 36px' }} />
            <h2 style={{ ...disp, fontSize: isAr ? 'clamp(2.4rem,7vw,5rem)' : 'clamp(2rem,6vw,4.6rem)', color: '#fff', lineHeight: 1.05 }}>{T.ctaTitle}</h2>
            <p className="mt-5" style={{ color: 'var(--text-dim)', fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-sans)', fontSize: '15px', maxWidth: '440px', margin: '20px auto 0' }}>{T.ctaSub}</p>
          </Reveal>
          <Reveal delay={140} className="mt-10">
            <Magnetic as="a" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener" className="btn-wa" strength={0.4} data-cursor>{Icon.wa('w-5 h-5')}{T.ctaBtn}</Magnetic>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  )
}
