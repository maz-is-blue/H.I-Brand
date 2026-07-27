import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Monogram, Wordmark } from '../components/ui/Monogram'
import { Placeholder } from '../components/ui/Placeholder'
import { useProducts, CATEGORIES } from '../context/ProductsContext'
import { api } from '../services/api'
import ContentEditor from './admin/ContentEditor'

const RATIOS = ['3/4', '4/5', '1/1', '16/10']
const card = { background: 'var(--stone)', border: '1px solid var(--line)' }
const fieldInput = { width: '100%', background: '#0a0a0a', border: '1px solid var(--line-strong)', color: '#fff', padding: '11px 13px', fontFamily: 'var(--font-sans)', fontSize: '14px', outline: 'none', borderRadius: '4px' }
const fieldLabel = { display: 'block', fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '8px' }

function Login({ onAuth }) {
  const [username, setUsername] = useState('')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setErr('')
    try {
      const res = await api.adminLogin(username, pw)
      localStorage.setItem('hib_admin_token', res.token)
      onAuth()
    } catch {
      setErr('Incorrect username or password.')
    } finally { setLoading(false) }
  }
  return (
    <div className="min-h-screen grid place-items-center px-6">
      <form onSubmit={submit} style={{ ...card, padding: '48px 40px', width: '100%', maxWidth: '400px', borderRadius: '6px' }}>
        <div className="flex justify-center"><Monogram className="w-12 text-white" /></div>
        <h1 className="font-display text-center mt-6" style={{ fontSize: '26px', color: '#fff' }}>Admin Access</h1>
        <p className="text-center mt-2" style={{ color: 'var(--text-dim)', fontSize: '13px' }}>H.I. Brands product console</p>
        <div className="mt-8">
          <label style={fieldLabel}>Username</label>
          <input type="text" value={username} autoFocus autoCapitalize="off" autoCorrect="off" onChange={(e) => { setUsername(e.target.value); setErr('') }} style={{ ...fieldInput, borderColor: err ? '#e06a5a' : 'var(--line-strong)' }} placeholder="username" />
        </div>
        <div className="mt-5">
          <label style={fieldLabel}>Password</label>
          <input type="password" value={pw} onChange={(e) => { setPw(e.target.value); setErr('') }} style={{ ...fieldInput, borderColor: err ? '#e06a5a' : 'var(--line-strong)' }} placeholder="••••••••" />
          {err && <p style={{ color: '#e06a5a', fontSize: '12px', marginTop: '8px' }}>{err}</p>}
        </div>
        <button type="submit" className="btn-gold w-full mt-7" style={{ cursor: 'pointer' }} disabled={loading}>
          {loading ? '…' : 'Enter'}
        </button>
        <Link to="/" className="block text-center mt-4 text-white/50 hover:text-gold transition-colors" style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>← Back to site</Link>
      </form>
    </div>
  )
}

function Stat({ label, value, sub }) {
  return (
    <div style={{ ...card, padding: '26px 24px', borderRadius: '6px' }}>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>{label}</div>
      <div className="font-display mt-3" style={{ fontSize: '38px', color: '#fff', lineHeight: 1 }}>{value}</div>
      {sub && <div className="mt-2" style={{ fontSize: '12px', color: 'var(--gold)' }}>{sub}</div>}
    </div>
  )
}

function ProductModal({ editing, onClose, onSave }) {
  const blank = { brand: '', name_en: '', name_ar: '', price: '', category: CATEGORIES[0], image_ratio: '3/4', featured: false }
  const [d, setD] = useState(editing ? { ...editing, price: String(editing.price) } : blank)
  const [errs, setErrs] = useState({})
  const set = (k, v) => setD((p) => ({ ...p, [k]: v }))
  const save = () => {
    const e = {}
    if (!d.brand.trim()) e.brand = 1
    if (!d.name_en.trim()) e.name_en = 1
    if (d.price === '' || isNaN(Number(d.price)) || Number(d.price) < 0) e.price = 1
    setErrs(e)
    if (Object.keys(e).length) return
    onSave({ ...d, price: Number(d.price), name_ar: d.name_ar.trim() || d.name_en })
  }
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className="fixed inset-0" style={{ zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ ...card, width: '100%', maxWidth: '560px', borderRadius: '8px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="flex items-center justify-between" style={{ padding: '22px 28px', borderBottom: '1px solid var(--line)' }}>
          <h2 className="font-display" style={{ fontSize: '22px', color: '#fff' }}>{editing ? 'Edit piece' : 'New piece'}</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white" style={{ background: 'none', border: 'none', fontSize: '22px', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: '28px' }}>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label style={fieldLabel}>Brand *</label>
              <input value={d.brand} onChange={(e) => set('brand', e.target.value)} style={{ ...fieldInput, borderColor: errs.brand ? '#e06a5a' : 'var(--line-strong)' }} placeholder="e.g. Tommy Hilfiger" />
            </div>
            <div>
              <label style={fieldLabel}>Name (English) *</label>
              <input value={d.name_en} onChange={(e) => set('name_en', e.target.value)} style={{ ...fieldInput, borderColor: errs.name_en ? '#e06a5a' : 'var(--line-strong)' }} placeholder="e.g. Oxford Shirt" />
            </div>
            <div>
              <label style={fieldLabel}>Name (Arabic)</label>
              <input value={d.name_ar} onChange={(e) => set('name_ar', e.target.value)} dir="rtl" style={{ ...fieldInput, fontFamily: 'var(--font-ar)', textAlign: 'right' }} placeholder="قميص أوكسفورد" />
            </div>
            <div>
              <label style={fieldLabel}>Price (USD) *</label>
              <input value={d.price} onChange={(e) => set('price', e.target.value)} type="number" min="0" style={{ ...fieldInput, borderColor: errs.price ? '#e06a5a' : 'var(--line-strong)' }} placeholder="45" />
            </div>
            <div>
              <label style={fieldLabel}>Category</label>
              <select value={d.category} onChange={(e) => set('category', e.target.value)} style={fieldInput}>
                {CATEGORIES.map((c) => <option key={c} value={c} style={{ background: '#0a0a0a' }}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={fieldLabel}>Image ratio</label>
              <select value={d.image_ratio} onChange={(e) => set('image_ratio', e.target.value)} style={fieldInput}>
                {RATIOS.map((r) => <option key={r} value={r} style={{ background: '#0a0a0a' }}>{r}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2 flex items-center gap-3 mt-1">
              <input id="feat" type="checkbox" checked={d.featured} onChange={(e) => set('featured', e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#C9A84C' }} />
              <label htmlFor="feat" style={{ color: '#fff', fontSize: '14px' }}>Show on homepage (featured)</label>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-8">
            <button onClick={save} className="btn-gold" style={{ cursor: 'pointer' }}>{editing ? 'Save changes' : 'Add piece'}</button>
            <button onClick={onClose} className="btn-ghost" style={{ cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Dashboard({ onLogout }) {
  const [tab, setTab] = useState('products')

  const logout = async () => {
    try { await api.adminLogout() } catch {}
    localStorage.removeItem('hib_admin_token')
    onLogout()
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0" style={{ zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px clamp(20px,4vw,40px)', background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--line)' }}>
        <div className="flex items-center gap-3">
          <Monogram className="w-7 text-white" />
          <div>
            <Wordmark style={{ fontSize: '14px' }} className="text-white" />
            <div style={{ fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold)', marginTop: '2px' }}>Console</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="text-white/60 hover:text-white transition-colors" style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>View site ↗</Link>
          <button onClick={logout} className="btn-ghost" style={{ padding: '9px 18px', cursor: 'pointer' }}>Log out</button>
        </div>
      </header>

      <main style={{ padding: 'clamp(28px,5vw,52px) clamp(20px,4vw,40px)', maxWidth: '1180px', margin: '0 auto' }}>
        <div className="flex gap-2">
          {[['products', 'Products'], ['content', 'Content']].map(([k, label]) => (
            <button key={k} onClick={() => setTab(k)}
              style={{ cursor: 'pointer', border: `1px solid ${tab === k ? 'var(--gold)' : 'var(--line-strong)'}`, color: tab === k ? '#0a0a0a' : 'rgba(255,255,255,0.75)', background: tab === k ? 'var(--gold)' : 'transparent', borderRadius: '999px', padding: '8px 20px', fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              {label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === 'products' ? <ProductsPanel /> : <ContentEditor />}
        </div>
      </main>
    </div>
  )
}

function ProductsPanel() {
  const { products, fetchProducts } = useProducts()
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState('')
  const [confirmDel, setConfirmDel] = useState(null)

  const flash = (m) => { setToast(m); setTimeout(() => setToast(''), 2600) }

  const handleSave = async (data) => {
    try {
      if (modal?.editing) {
        await api.updateProduct(modal.editing.id, data)
        flash('Piece updated')
      } else {
        await api.createProduct(data)
        flash('Piece added')
      }
      await fetchProducts()
      setModal(null)
    } catch (err) {
      flash('Error: ' + err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.deleteProduct(id)
      await fetchProducts()
      setConfirmDel(null)
      flash('Piece removed')
    } catch (err) {
      flash('Error: ' + err.message)
    }
  }

  const toggleFeat = async (p) => {
    try {
      await api.updateProduct(p.id, { ...p, featured: !p.featured })
      await fetchProducts()
    } catch {}
  }

  const featured = products.filter((p) => p.featured).length
  const brands = new Set(products.map((p) => p.brand)).size
  const avg = products.length ? Math.round(products.reduce((s, p) => s + Number(p.price), 0) / products.length) : 0

  return (
    <>
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display" style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: '#fff' }}>Products</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '14px', marginTop: '6px' }}>Manage the catalogue shown across the storefront.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setModal({ editing: null })} className="btn-gold" style={{ padding: '11px 22px', cursor: 'pointer' }}>+ Add piece</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-9">
        <Stat label="Total pieces" value={products.length} />
        <Stat label="Featured" value={featured} sub="on homepage" />
        <Stat label="Brands" value={brands} />
        <Stat label="Avg price" value={`$${avg}`} />
      </div>

        <div className="mt-9" style={{ ...card, borderRadius: '8px', overflow: 'hidden' }}>
          <div className="overflow-x-auto">
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '720px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--line)' }}>
                  {['', 'Brand', 'Name', 'Category', 'Price', 'Featured', ''].map((h, i) => (
                    <th key={i} style={{ textAlign: i === 4 || i === 5 ? 'center' : 'left', padding: '16px 18px', fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--line)' }}>
                    <td style={{ padding: '12px 18px' }}><div style={{ width: '44px' }}><Placeholder label="" ratio="1/1" /></div></td>
                    <td style={{ padding: '12px 18px', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>{p.brand}</td>
                    <td style={{ padding: '12px 18px', fontFamily: 'var(--font-display)', fontSize: '17px', color: '#fff' }}>{p.name_en}</td>
                    <td style={{ padding: '12px 18px', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>{p.category}</td>
                    <td style={{ padding: '12px 18px', textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: '17px', color: 'var(--gold)' }}>${p.price}</td>
                    <td style={{ padding: '12px 18px', textAlign: 'center' }}>
                      <button onClick={() => toggleFeat(p)} title="Toggle featured" style={{ background: 'none', border: 'none', color: p.featured ? 'var(--gold)' : 'rgba(255,255,255,0.25)', fontSize: '18px', cursor: 'pointer' }}>{p.featured ? '★' : '☆'}</button>
                    </td>
                    <td style={{ padding: '12px 18px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <button onClick={() => setModal({ editing: p })} className="hover:text-gold transition-colors" style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', marginInlineEnd: '14px' }}>Edit</button>
                      <button onClick={() => setConfirmDel(p)} className="hover:text-red transition-colors" style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {products.length === 0 && <p style={{ textAlign: 'center', padding: '50px', color: 'var(--text-dim)', fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>No pieces yet. Add your first.</p>}
        </div>

      {modal && <ProductModal editing={modal.editing} onClose={() => setModal(null)} onSave={handleSave} />}

      {confirmDel && (
        <div className="fixed inset-0" style={{ zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }} onClick={() => setConfirmDel(null)}>
          <div onClick={(e) => e.stopPropagation()} style={{ ...card, padding: '32px', maxWidth: '380px', borderRadius: '8px', textAlign: 'center' }}>
            <p className="font-display" style={{ fontSize: '20px', color: '#fff' }}>Remove this piece?</p>
            <p style={{ color: 'var(--text-dim)', fontSize: '14px', marginTop: '8px' }}>{confirmDel.brand} — {confirmDel.name_en}</p>
            <div className="flex gap-3 justify-center mt-7">
              <button onClick={() => handleDelete(confirmDel.id)} style={{ background: '#e06a5a', cursor: 'pointer', color: '#fff', border: '1px solid #e06a5a', padding: '10px 24px', fontFamily: 'var(--font-sans)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Delete</button>
              <button onClick={() => setConfirmDel(null)} className="btn-ghost" style={{ cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed" style={{ zIndex: 300, bottom: '28px', left: '50%', transform: 'translateX(-50%)', background: 'var(--gold)', color: '#0a0a0a', padding: '12px 26px', borderRadius: '999px', fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}>{toast}</div>
      )}
    </>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => !!localStorage.getItem('hib_admin_token'))
  return authed
    ? <Dashboard onLogout={() => setAuthed(false)} />
    : <Login onAuth={() => setAuthed(true)} />
}
