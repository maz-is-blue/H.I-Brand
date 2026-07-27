import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { api } from '../services/api'

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [content, setContent] = useState({})
  const [loading, setLoading] = useState(true)

  const fetchContent = useCallback(async () => {
    setLoading(true)
    try {
      setContent(await api.getContent())
    } catch {
      setContent({})
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchContent() }, [fetchContent])

  return (
    <ContentContext.Provider value={{ content, loading, fetchContent }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be inside ContentProvider')
  return ctx
}

/** Reads one key from the content map, in the current language, falling back
 * to `fallback` if the key isn't loaded yet (first paint) or missing. */
export function pick(content, key, isAr, fallback = '') {
  const item = content[key]
  if (!item) return fallback
  return (isAr ? item.value_ar : item.value_en) ?? fallback
}

/** Same as `pick`, but for an image key — returns the servable URL or null. */
export function pickImage(content, key) {
  return content[key]?.image_path ?? null
}
