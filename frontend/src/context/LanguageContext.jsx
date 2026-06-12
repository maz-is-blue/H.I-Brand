import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('hib_lang') || 'en' } catch { return 'en' }
  })
  const isAr = lang === 'ar'

  useEffect(() => {
    try { localStorage.setItem('hib_lang', lang) } catch {}
    document.documentElement.lang = lang
    document.documentElement.dir = isAr ? 'rtl' : 'ltr'
    document.body.style.fontFamily = isAr ? 'var(--font-ar)' : 'var(--font-sans)'
  }, [lang, isAr])

  const toggle = useCallback(() => setLang((l) => (l === 'en' ? 'ar' : 'en')), [])

  return (
    <LanguageContext.Provider value={{ lang, isAr, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be inside LanguageProvider')
  return ctx
}
