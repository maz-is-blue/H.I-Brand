import { useState } from 'react'
import { useLang } from '../context/LanguageContext'
import { Reveal } from '../components/ui/Reveal'
import { Cursor } from '../components/ui/Cursor'
import { Curtain } from '../components/ui/Curtain'
import { Placeholder } from '../components/ui/Placeholder'
import { Icon } from '../components/ui/Icon'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'

function Field({ label, children, err }) {
  const { isAr } = useLang()
  return (
    <label className="block" style={{ textAlign: isAr ? 'right' : 'left' }}>
      <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: err ? '#e06a5a' : 'var(--text-dim)', marginBottom: '10px' }}>{label}</span>
      {children}
    </label>
  )
}

export default function Contact() {
  const { isAr } = useLang()
  const disp = isAr ? { fontFamily: 'var(--font-ar-display)' } : { fontFamily: 'var(--font-display)' }
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const T = isAr ? {
    kick: 'تواصل', title: 'لنتحدّث', lead: 'سؤال عن قطعة، طلب خاص، أو مجرد سلام — نحن على بُعد رسالة.',
    chKick: 'قنوات التواصل',
    waT: 'واتساب', waD: 'أسرع طريقة للطلب والاستفسار', waBtn: 'افتح واتساب',
    igT: 'إنستغرام', igD: 'تابع أحدث القطع', thT: 'ثريدز', thD: '@h.i.brands',
    locT: 'الموقع', locD: 'دمشق · سوريا', hoursT: 'ساعات العمل', hoursD: 'السبت – الخميس · 11ص – 9م',
    formKick: 'أرسل رسالة', fName: 'الاسم', fPhone: 'الهاتف (اختياري)', fMsg: 'رسالتك',
    send: 'أرسل عبر واتساب', sentMsg: 'تم فتح واتساب — أكمل الإرسال هناك.',
    eName: 'الرجاء إدخال الاسم', eMsg: 'الرجاء كتابة رسالتك', map: 'دمشق، سوريا',
  } : {
    kick: 'Contact', title: "Let's talk", lead: "A question about a piece, a special request, or just hello — we're one message away.",
    chKick: 'Channels',
    waT: 'WhatsApp', waD: 'The fastest way to order & ask', waBtn: 'Open WhatsApp',
    igT: 'Instagram', igD: 'Follow the latest pieces', thT: 'Threads', thD: '@h.i.brands',
    locT: 'Location', locD: 'Damascus · Syria', hoursT: 'Hours', hoursD: 'Sat – Thu · 11am – 9pm',
    formKick: 'Send a message', fName: 'Name', fPhone: 'Phone (optional)', fMsg: 'Your message',
    send: 'Send via WhatsApp', sentMsg: 'WhatsApp opened — finish sending there.',
    eName: 'Please enter your name', eMsg: 'Please write your message', map: 'Damascus, Syria',
  }

  const inputStyle = {
    width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--line-strong)',
    color: '#fff', padding: '12px 2px', fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-sans)', fontSize: '16px',
    outline: 'none', cursor: 'none', textAlign: isAr ? 'right' : 'left', transition: 'border-color .3s',
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = true
    if (!form.message.trim()) errs.message = true
    setErrors(errs)
    if (Object.keys(errs).length) return
    const msg = encodeURIComponent(`Hi H.I. Brands!\n\nName: ${form.name}${form.phone ? `\nPhone: ${form.phone}` : ''}\n\n${form.message}`)
    window.open(`https://wa.me/963000000000?text=${msg}`, '_blank', 'noopener')
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  const Channel = ({ icon, t, d, href, btn }) => (
    <div className="flex gap-5" style={{ padding: '26px 0', borderBottom: '1px solid var(--line)', flexDirection: isAr ? 'row-reverse' : 'row', textAlign: isAr ? 'right' : 'left' }}>
      <div className="shrink-0" style={{ color: 'var(--gold)', marginTop: '2px' }}>{icon}</div>
      <div className="flex-1">
        <h3 style={{ fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-display)', fontSize: '19px', color: '#fff' }}>{t}</h3>
        <p className="mt-1" style={{ color: 'var(--text-dim)', fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-sans)', fontSize: '14px' }}>{d}</p>
        {btn && href && (
          <a href={href} target="_blank" rel="noopener" className="inline-flex items-center gap-2 mt-3 text-white hover:text-gold transition-colors" data-cursor style={{ fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-sans)', fontSize: '12px', letterSpacing: isAr ? '0' : '0.14em', textTransform: isAr ? 'none' : 'uppercase' }}>
            {btn}<span style={{ transform: isAr ? 'scaleX(-1)' : 'none', display: 'inline-flex' }}>{Icon.arrow('w-3 h-3')}</span>
          </a>
        )}
      </div>
    </div>
  )

  return (
    <>
      <Curtain />
      <Cursor />
      <Nav />

      <section className="wrap" style={{ paddingTop: 'clamp(140px,22vh,230px)', paddingBottom: 'clamp(40px,6vh,70px)', textAlign: isAr ? 'right' : 'left' }}>
        <Reveal><span className="label">{T.kick}</span></Reveal>
        <Reveal delay={100}><h1 className="mt-4" style={{ ...disp, fontSize: 'clamp(2.6rem,9vw,7rem)', color: '#fff', lineHeight: 1 }}>{T.title}</h1></Reveal>
        <Reveal delay={200}><p className="mt-6" style={{ color: 'var(--text-dim)', fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-sans)', fontSize: isAr ? '17px' : '16px', lineHeight: 1.7, maxWidth: '520px', marginInlineStart: isAr ? 'auto' : 0 }}>{T.lead}</p></Reveal>
      </section>

      <section className="wrap" style={{ paddingBottom: 'clamp(80px,14vh,140px)' }}>
        <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-start" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
          <Reveal>
            <span className="label" style={{ display: 'block', textAlign: isAr ? 'right' : 'left' }}>{T.chKick}</span>
            <div className="mt-4">
              <Channel icon={Icon.wa('w-6 h-6')} t={T.waT} d={T.waD} href="https://wa.me/963000000000" btn={T.waBtn} />
              <Channel icon={Icon.ig('w-6 h-6')} t={T.igT} d={T.igD} href="https://instagram.com/h.i.brands" btn="@h.i.brands" />
              <Channel icon={Icon.threads('w-6 h-6')} t={T.thT} d={T.thD} href="https://threads.net/@h.i.brands" btn="@h.i.brands" />
            </div>
            <div className="grid grid-cols-2 gap-6 mt-8" style={{ textAlign: isAr ? 'right' : 'left' }}>
              <div>
                <span className="label">{T.locT}</span>
                <p className="mt-2" style={{ color: '#fff', fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-display)', fontSize: '17px' }}>{T.locD}</p>
              </div>
              <div>
                <span className="label">{T.hoursT}</span>
                <p className="mt-2" style={{ color: '#fff', fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-sans)', fontSize: '14px' }}>{T.hoursD}</p>
              </div>
            </div>
            <div className="mt-8 relative">
              <Placeholder label={T.map} ratio="16/7" />
              <div className="absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '10px', height: '10px', borderRadius: '999px', background: 'var(--gold)', boxShadow: '0 0 0 6px rgba(201,168,76,0.2)' }}></div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <span className="label" style={{ display: 'block', textAlign: isAr ? 'right' : 'left' }}>{T.formKick}</span>
            <form className="mt-7 flex flex-col gap-8" onSubmit={onSubmit} noValidate>
              <Field label={T.fName} err={errors.name}>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = 'var(--gold)'} onBlur={(e) => e.target.style.borderColor = 'var(--line-strong)'} />
                {errors.name && <span style={{ color: '#e06a5a', fontSize: '12px', fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-sans)', display: 'block', marginTop: '6px' }}>{T.eName}</span>}
              </Field>
              <Field label={T.fPhone}>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = 'var(--gold)'} onBlur={(e) => e.target.style.borderColor = 'var(--line-strong)'} />
              </Field>
              <Field label={T.fMsg} err={errors.message}>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows="4" style={{ ...inputStyle, resize: 'none' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--gold)'} onBlur={(e) => e.target.style.borderColor = 'var(--line-strong)'} />
                {errors.message && <span style={{ color: '#e06a5a', fontSize: '12px', fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-sans)', display: 'block', marginTop: '6px' }}>{T.eMsg}</span>}
              </Field>
              <div style={{ textAlign: isAr ? 'right' : 'left' }}>
                <button type="submit" className="btn-wa" data-cursor>{Icon.wa('w-4 h-4')}{T.send}</button>
                {sent && <p style={{ color: 'var(--gold)', marginTop: '16px', fontFamily: isAr ? 'var(--font-ar)' : 'var(--font-sans)', fontSize: '13px' }}>{T.sentMsg}</p>}
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  )
}
