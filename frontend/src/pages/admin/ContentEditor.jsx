import { useState, useEffect, useMemo } from 'react'
import { useContent } from '../../context/ContentContext'
import { api } from '../../services/api'

const GROUPS = [
  { key: 'home', label: 'Home' },
  { key: 'about', label: 'About' },
  { key: 'contact', label: 'Contact' },
  { key: 'collections', label: 'Collections' },
  { key: 'nav', label: 'Navigation' },
  { key: 'footer', label: 'Footer' },
  { key: 'settings', label: 'Settings' },
]

const card = { background: 'var(--stone)', border: '1px solid var(--line)' }
const fieldInput = { width: '100%', background: '#0a0a0a', border: '1px solid var(--line-strong)', color: '#fff', padding: '10px 12px', fontFamily: 'var(--font-sans)', fontSize: '13px', outline: 'none', borderRadius: '4px' }
const fieldLabel = { display: 'block', fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '6px' }

function ImageField({ item, uploading, onUpload }) {
  return (
    <div className="flex items-center gap-4">
      <div style={{ width: '90px' }}>
        {item.image_path
          ? <img src={item.image_path} alt="" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--line-strong)' }} />
          : <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: '4px', border: '1px dashed var(--line-strong)', display: 'grid', placeItems: 'center', color: 'var(--text-dim)', fontSize: '10px' }}>None</div>}
      </div>
      <label className="btn-ghost" style={{ padding: '9px 16px', cursor: uploading ? 'default' : 'pointer', fontSize: '11px' }}>
        {uploading ? 'Uploading…' : 'Upload image'}
        <input type="file" accept="image/png,image/jpeg,image/webp" style={{ display: 'none' }} disabled={uploading}
          onChange={(e) => { const f = e.target.files?.[0]; if (f) onUpload(f); e.target.value = '' }} />
      </label>
    </div>
  )
}

export default function ContentEditor() {
  const { content, loading, fetchContent } = useContent()
  const [edits, setEdits] = useState({})
  const [open, setOpen] = useState(() => Object.fromEntries(GROUPS.map((g) => [g.key, g.key === 'home'])))
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const [uploading, setUploading] = useState(null)

  useEffect(() => {
    if (!loading) {
      setEdits(Object.fromEntries(
        Object.entries(content).map(([k, v]) => [k, { value_en: v.value_en, value_ar: v.value_ar }])
      ))
    }
    // Only re-sync when a fresh fetch completes, not on every keystroke.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  const flash = (m) => { setToast(m); setTimeout(() => setToast(''), 2600) }

  const setField = (key, field, val) => setEdits((e) => ({ ...e, [key]: { ...e[key], [field]: val } }))

  const dirtyKeys = useMemo(() => Object.keys(edits).filter((k) => {
    const orig = content[k]
    const cur = edits[k]
    if (!orig || !cur) return false
    return (orig.value_en ?? '') !== (cur.value_en ?? '') || (orig.value_ar ?? '') !== (cur.value_ar ?? '')
  }), [edits, content])

  const saveAll = async () => {
    if (!dirtyKeys.length) return
    setSaving(true)
    try {
      await api.updateContent(dirtyKeys.map((key) => ({ key, value_en: edits[key].value_en, value_ar: edits[key].value_ar })))
      await fetchContent()
      flash(`Saved ${dirtyKeys.length} change${dirtyKeys.length > 1 ? 's' : ''}`)
    } catch (err) {
      flash('Error: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const uploadImage = async (key, file) => {
    setUploading(key)
    try {
      await api.uploadContentImage(key, file)
      await fetchContent()
      flash('Image updated')
    } catch (err) {
      flash('Error: ' + err.message)
    } finally {
      setUploading(null)
    }
  }

  if (loading) return <p style={{ color: 'var(--text-dim)', padding: '40px 0' }}>Loading…</p>

  const grouped = GROUPS.map((g) => ({
    ...g,
    items: Object.entries(content).filter(([k]) => k.startsWith(g.key + '.')).sort(([a], [b]) => a.localeCompare(b)),
  })).filter((g) => g.items.length)

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mt-2">
        <p style={{ color: 'var(--text-dim)', fontSize: '14px', maxWidth: '520px' }}>Edit every headline, paragraph, and image across the site. Changes go live immediately when saved.</p>
        <button onClick={saveAll} className="btn-gold" style={{ padding: '11px 22px', cursor: dirtyKeys.length ? 'pointer' : 'default', opacity: dirtyKeys.length ? 1 : 0.5 }} disabled={!dirtyKeys.length || saving}>
          {saving ? 'Saving…' : dirtyKeys.length ? `Save ${dirtyKeys.length} change${dirtyKeys.length > 1 ? 's' : ''}` : 'Save changes'}
        </button>
      </div>

      <div className="mt-7 flex flex-col gap-4">
        {grouped.map((g) => (
          <div key={g.key} style={{ ...card, borderRadius: '8px', overflow: 'hidden' }}>
            <button onClick={() => setOpen((o) => ({ ...o, [g.key]: !o[g.key] }))} className="w-full flex items-center justify-between" style={{ padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer' }}>
              <span className="font-display" style={{ fontSize: '19px', color: '#fff' }}>{g.label}</span>
              <span style={{ color: 'var(--text-dim)', fontSize: '12px' }}>{open[g.key] ? '−' : '+'} {g.items.length} item{g.items.length > 1 ? 's' : ''}</span>
            </button>
            {open[g.key] && (
              <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {g.items.map(([key, item]) => (
                  <div key={key} style={{ borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
                    <label style={fieldLabel}>{item.label}</label>
                    {item.type === 'image' ? (
                      <ImageField item={item} uploading={uploading === key} onUpload={(file) => uploadImage(key, file)} />
                    ) : item.type === 'setting' ? (
                      <input value={edits[key]?.value_en ?? ''} onChange={(e) => setField(key, 'value_en', e.target.value)} style={fieldInput} />
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-3">
                        <input value={edits[key]?.value_en ?? ''} onChange={(e) => setField(key, 'value_en', e.target.value)} style={fieldInput} placeholder="English" />
                        <input value={edits[key]?.value_ar ?? ''} onChange={(e) => setField(key, 'value_ar', e.target.value)} dir="rtl" style={{ ...fieldInput, fontFamily: 'var(--font-ar)' }} placeholder="عربي" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {toast && (
        <div className="fixed" style={{ zIndex: 300, bottom: '28px', left: '50%', transform: 'translateX(-50%)', background: 'var(--gold)', color: '#0a0a0a', padding: '12px 26px', borderRadius: '999px', fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}>{toast}</div>
      )}
    </div>
  )
}
