import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { Monogram } from '../components/ui/Monogram'
import { Reveal } from '../components/ui/Reveal'
import { Cursor } from '../components/ui/Cursor'
import { Curtain } from '../components/ui/Curtain'
import { Magnetic } from '../components/ui/Magnetic'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'

export default function About() {
  const { isAr } = useLang()
  const disp = isAr ? { fontFamily: 'var(--font-ar-display)' } : { fontFamily: 'var(--font-display)' }

  const T = isAr ? {
    kick: 'الدار', title: 'من قلب دمشق', title2: 'لكل المحافظات السورية',
    introEn: 'From the heart of Damascus to all of Syria',
    p1: 'بدأت H.I. Brands من قناعة بسيطة: أن الرجل السوري يستحق أن يرتدي الأفضل، دون أن يضطر للسفر بحثاً عنه. من واجهة صغيرة في دمشق، صرنا وجهة لمن يعرف أن الأناقة لغة تُقال قبل الكلام.',
    p2: 'نحن لا نبيع ملابس فحسب — نختار. كل قطعة تمرّ بأيدينا قبل أن تصل إليك، ونوصلها إلى باب منزلك في كل محافظة. ماركات أصلية، خدمة شخصية، وفخر محلي لا يتزعزع.',
    quote: 'ملابسك هويتك.. اختر بشكل صحيح.',
    valKick: 'ما نؤمن به',
    values: [
      { n: '01', t: 'أصالة مضمونة', d: 'ماركات عالمية أصلية فقط — لا تقليد، لا أنصاف حلول.' },
      { n: '02', t: 'نصل لكل سوريا', d: 'توصيل إلى كل المحافظات، بخدمة بوتيك من الباب إلى الباب.' },
      { n: '03', t: 'تنسيق شخصي', d: 'نساعدك في اختيار الإطلالة المناسبة لك ولمناسبتك.' },
      { n: '04', t: 'فخر دمشقي', d: 'من قلب أقدم عاصمة مأهولة في العالم، إلى خزانتك.' },
    ],
    statKick: 'بالأرقام',
    stats: [{ v: '14', l: 'محافظة نخدمها' }, { v: '+20', l: 'ماركة عالمية' }, { v: '2026', l: 'منذ' }],
    ctaTitle: 'اكتشف التشكيلة', ctaBtn: 'تصفّح التشكيلة', ctaContact: 'تواصل معنا',
  } : {
    kick: 'The House', title: 'From the heart of Damascus', title2: 'to all of Syria',
    introEn: 'ملابسك هويتك.. اختر بشكل صحيح',
    p1: 'H.I. Brands began with a simple conviction: that the Syrian man deserves to wear the best — without having to travel to find it. From a small storefront in Damascus, we became a destination for those who understand that style is a language spoken before a word.',
    p2: "We don't simply sell clothing — we curate. Every piece passes through our hands before it reaches yours, delivered to your door in every governorate. Authentic labels, personal service, and an unshakeable local pride.",
    quote: 'Your outfit is your identity.. Choose right.',
    valKick: 'What we believe',
    values: [
      { n: '01', t: 'Guaranteed authenticity', d: 'Original international labels only — no imitations, no half measures.' },
      { n: '02', t: 'All of Syria', d: 'Delivery to every governorate, with door-to-door boutique service.' },
      { n: '03', t: 'Personal styling', d: 'We help you choose the look that suits you and the occasion.' },
      { n: '04', t: 'Damascene pride', d: "From the heart of the world's oldest inhabited capital, to your wardrobe." },
    ],
    statKick: 'By the numbers',
    stats: [{ v: '14', l: 'governorates served' }, { v: '20+', l: 'global labels' }, { v: '2026', l: 'established' }],
    ctaTitle: 'Discover the collection', ctaBtn: 'Browse the collection', ctaContact: 'Get in touch',
  }

  return (
    <>
      <Curtain />
      <Cursor />
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: 'clamp(150px,24vh,260px)', paddingBottom: 'clamp(40px,8vh,90px)' }}>
        <div aria-hidden="true" className="pointer-events-none absolute" style={{ top: '8%', insetInlineEnd: '-8%', width: 'min(70vw,640px)', color: 'rgba(255,255,255,0.035)' }}>
          <Monogram className="w-full" title="" />
        </div>
        <div className="wrap relative" style={{ textAlign: isAr ? 'right' : 'left' }}>
          <Reveal><span className="label">{T.kick}</span></Reveal>
          <Reveal delay={100}>
            <h1 className="mt-5" style={{ ...disp, fontSize: 'clamp(2.4rem,7vw,6rem)', lineHeight: 1.04, color: '#fff' }}>
              {T.title}<br /><span style={{ color: 'var(--gold)', fontStyle: isAr ? 'normal' : 'italic' }}>{T.title2}</span>
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-7" style={{ color: 'var(--text-dim)', fontFamily: isAr ? 'var(--font-sans)' : 'var(--font-ar-display)', fontStyle: isAr ? 'normal' : 'italic', fontSize: isAr ? '14px' : '22px' }}>{T.introEn}</p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="wrap" style={{ paddingTop: 'clamp(50px,9vh,100px)', paddingBottom: 'clamp(60px,10vh,120px)' }}>
        <div className="grid md:grid-cols-12 gap-10 md:gap-8 items-center" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
          <Reveal clip className="md:col-span-5">
            <div className="relative grid place-items-center" style={{ aspectRatio: '4/5', border: '1px solid var(--line)', background: 'var(--stone)' }}>
              <Monogram className="w-full text-white/90" style={{ width: '66%' }} title="" />
              <span className="absolute bottom-4 label" style={{ insetInlineStart: '16px' }}>EST · Damascus</span>
            </div>
          </Reveal>
          <div className="md:col-span-7 flex flex-col gap-6" style={{ textAlign: isAr ? 'right' : 'left' }}>
            <Reveal delay={120}><p style={{ color: 'rgba(255,255,255,0.78)', fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-sans)', fontSize: isAr ? '18px' : '17px', lineHeight: 1.85, textWrap: 'pretty' }}>{T.p1}</p></Reveal>
            <Reveal delay={200}><p style={{ color: 'var(--text-dim)', fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-sans)', fontSize: isAr ? '16px' : '15px', lineHeight: 1.85, textWrap: 'pretty' }}>{T.p2}</p></Reveal>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section style={{ background: 'var(--stone)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap text-center" style={{ paddingTop: 'clamp(80px,15vh,150px)', paddingBottom: 'clamp(80px,15vh,150px)' }}>
          <Reveal>
            <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-display)', fontSize: '60px', lineHeight: 0.5, display: 'inline-block' }}>&ldquo;</span>
            <p className="mt-4" style={{ ...disp, fontStyle: isAr ? 'normal' : 'italic', fontSize: 'clamp(1.8rem,5vw,3.8rem)', lineHeight: 1.2, color: '#fff', maxWidth: '16ch', margin: '16px auto 0' }}>{T.quote}</p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="wrap" style={{ paddingTop: 'clamp(80px,14vh,150px)', paddingBottom: 'clamp(80px,14vh,150px)' }}>
        <Reveal style={{ textAlign: isAr ? 'right' : 'left' }}><span className="label">{T.valKick}</span></Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px mt-10" style={{ background: 'var(--line)', border: '1px solid var(--line)' }}>
          {T.values.map((v, i) => (
            <Reveal key={i} delay={(i % 4) * 90}>
              <div style={{ background: 'var(--ink)', padding: '36px 28px', height: '100%', textAlign: isAr ? 'right' : 'left' }}>
                <span className="font-display" style={{ color: 'var(--gold)', fontSize: '15px', letterSpacing: '0.1em' }}>{v.n}</span>
                <h3 className="mt-5" style={{ fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-display)', fontSize: '21px', color: '#fff' }}>{v.t}</h3>
                <p className="mt-3" style={{ color: 'var(--text-dim)', fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-sans)', fontSize: '14px', lineHeight: 1.7 }}>{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="wrap" style={{ paddingBottom: 'clamp(80px,14vh,150px)' }}>
        <Reveal style={{ textAlign: 'center', marginBottom: '40px' }}><span className="label">{T.statKick}</span></Reveal>
        <div className="grid grid-cols-3 gap-6" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
          {T.stats.map((s, i) => (
            <Reveal key={i} delay={i * 100} className="text-center" style={{ padding: 'clamp(34px,6vh,60px) 8px', borderInlineStart: i > 0 ? '1px solid var(--line)' : 'none' }}>
              <div className="font-display" style={{ fontSize: 'clamp(2.4rem,6vw,4.4rem)', color: '#fff', lineHeight: 1 }}>{s.v}</div>
              <div className="mt-3" style={{ color: 'var(--text-dim)', fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-sans)', fontSize: '12px', letterSpacing: isAr ? '0' : '0.14em', textTransform: isAr ? 'none' : 'uppercase' }}>{s.l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative" style={{ background: 'var(--stone)', borderTop: '1px solid var(--line)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,var(--gold),transparent)' }}></div>
        <div className="wrap text-center flex flex-col items-center" style={{ paddingTop: 'clamp(80px,14vh,140px)', paddingBottom: 'clamp(80px,14vh,140px)' }}>
          <Reveal><h2 style={{ ...disp, fontSize: 'clamp(2rem,5vw,3.6rem)', color: '#fff' }}>{T.ctaTitle}</h2></Reveal>
          <Reveal delay={120} className="mt-9">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Magnetic as={Link} to="/collections" className="btn-gold" strength={0.4} data-cursor>{T.ctaBtn}</Magnetic>
              <Magnetic as={Link} to="/contact" className="btn-ghost" strength={0.4} data-cursor>{T.ctaContact}</Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  )
}
