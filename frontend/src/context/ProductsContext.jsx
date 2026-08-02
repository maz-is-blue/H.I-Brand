import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { api } from '../services/api'

const ProductsContext = createContext(null)

// Category tree: top-level categories the storefront filters by, with
// optional subcategory / sub-subcategory levels used in the admin editor
// and shown as a detail on the product card.
export const CATEGORY_TREE = [
  {
    key: 'T-Shirts', en: 'T-Shirts', ar: 'تيشيرتات',
    subs: [
      { key: 'Oversize', en: 'Oversize', ar: 'اوفر سايز' },
      { key: 'Slim-Fit', en: 'Slim Fit', ar: 'سليم فيت' },
    ],
  },
  { key: 'Knitwear', en: 'Knitwear', ar: 'تريكو' },
  {
    key: 'Trousers', en: 'Trousers', ar: 'بناطيل',
    subs: [
      {
        key: 'Jeans', en: 'Jeans', ar: 'جينز',
        subs: [
          { key: 'Cargo', en: 'Cargo', ar: 'كارغو' },
          { key: 'Baggy', en: 'Baggy', ar: 'باغي' },
          { key: 'Super-Baggy', en: 'Super Baggy', ar: 'سوبر باغي' },
          { key: 'Boyfriend', en: 'Boyfriend', ar: 'بويفريند' },
        ],
      },
      {
        key: 'Fabric', en: 'Fabric', ar: 'قماش',
        subs: [
          { key: 'Baggy', en: 'Baggy', ar: 'باغي' },
          { key: 'Italian', en: 'Italian', ar: 'ايطالي' },
        ],
      },
    ],
  },
  { key: 'Pajamas', en: 'Pajamas', ar: 'بجامات' },
  { key: 'Pajama-Pants', en: 'Pajama Pants', ar: 'بنطال بجامة مفرد' },
  { key: 'Shirt', en: 'Shirt', ar: 'قميص' },
]

export const CATEGORIES = CATEGORY_TREE.map((c) => c.key)

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

export function categoryLabel(key, isAr) {
  const node = CATEGORY_TREE.find((c) => c.key === key)
  return node ? (isAr ? node.ar : node.en) : key
}

const SEED_PRODUCTS = [
  { id: 1,  brand: 'Hugo Boss',         name_en: 'Wool Overcoat',      name_ar: 'معطف صوف',       price: 120, category: 'Knitwear',  image_ratio: '3/4', featured: true  },
  { id: 2,  brand: 'Tommy Hilfiger',    name_en: 'Oxford Shirt',        name_ar: 'قميص أوكسفورد', price: 45,  category: 'Shirt',     image_ratio: '4/5', featured: true  },
  { id: 3,  brand: 'Polo Ralph Lauren', name_en: 'Merino Knit Polo',    name_ar: 'بولو محبوك',    price: 55,  category: 'Knitwear',  image_ratio: '1/1', featured: true  },
  { id: 4,  brand: 'Zara',              name_en: 'Structured Blazer',   name_ar: 'بليزر مفصّل',  price: 80,  category: 'Knitwear',  image_ratio: '3/4', featured: true  },
  { id: 5,  brand: 'Lacoste',           name_en: 'Piqué Tee',          name_ar: 'تي شيرت بيكيه', price: 40,  category: 'T-Shirts',  subcategory: 'Slim-Fit', image_ratio: '4/5', featured: false },
  { id: 6,  brand: 'Calvin Klein',      name_en: 'Denim Jacket',        name_ar: 'جاكيت جينز',    price: 70,  category: 'Knitwear',  image_ratio: '1/1', featured: false },
  { id: 7,  brand: 'Tommy Hilfiger',    name_en: 'Tailored Chinos',     name_ar: 'بنطال تشينو',   price: 50,  category: 'Trousers',  subcategory: 'Fabric', sub_subcategory: 'Italian', image_ratio: '4/5', featured: false },
  { id: 8,  brand: 'Zara',              name_en: 'Oversized Hoodie',    name_ar: 'هودي واسع',     price: 38,  category: 'Knitwear',  image_ratio: '3/4', featured: false },
  { id: 9,  brand: 'Armani Exchange',   name_en: 'Logo Crew Tee',       name_ar: 'تي شيرت بشعار', price: 42,  category: 'T-Shirts',  subcategory: 'Oversize', image_ratio: '1/1', featured: false },
  { id: 10, brand: 'Massimo Dutti',     name_en: 'Linen Shirt',         name_ar: 'قميص كتان',     price: 58,  category: 'Shirt',     image_ratio: '3/4', featured: true  },
  { id: 11, brand: 'Hugo Boss',         name_en: 'Slim Trousers',       name_ar: 'بنطال سليم',    price: 65,  category: 'Trousers',  subcategory: 'Jeans', sub_subcategory: 'Baggy', image_ratio: '4/5', featured: false },
  { id: 12, brand: 'Guess',             name_en: 'Cable Knit Sweater',  name_ar: 'سترة محبوكة',   price: 60,  category: 'Knitwear',  image_ratio: '1/1', featured: false },
]

export function waLink(p, whatsappNumber = '963000000000') {
  const msg = encodeURIComponent(`Hi H.I. Brands! I'd like to order the ${p.brand} — ${p.name_en} ($${p.price}).`)
  return `https://wa.me/${whatsappNumber}?text=${msg}`
}

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.getProducts()
      setProducts(data)
    } catch {
      setProducts(SEED_PRODUCTS)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  return (
    <ProductsContext.Provider value={{ products, loading, fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts must be inside ProductsProvider')
  return ctx
}
