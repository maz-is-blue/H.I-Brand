import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { ProductsProvider } from './context/ProductsContext'
import Home from './pages/Home'
import Collections from './pages/Collections'
import About from './pages/About'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ProductsProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </ProductsProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}
