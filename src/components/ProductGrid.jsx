import { useEffect, useState } from 'react'
import { ShoppingCart, Star } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-2xl bg-white/5 border border-white/10 p-4 hover:border-blue-300/30 transition backdrop-blur-sm">
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
        {product.images?.[0] ? (
          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition" />
        ) : (
          <div className="text-blue-200/70 text-sm">No image</div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-white font-semibold truncate">{product.name}</h3>
        <div className="mt-1 flex items-center gap-2 text-blue-200/80 text-sm">
          <Star size={14} className="text-yellow-300" />
          <span>4.8</span>
          <span className="opacity-50">•</span>
          <span>{product.category}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-white text-lg font-bold">R {Number(product.price?.amount || 0).toFixed(2)}</div>
          <button onClick={() => onAdd(product)} className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium">
            <ShoppingCart size={16} /> Add
          </button>
        </div>
      </div>
    </div>
  )
}

function ProductGrid({ onAdd }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products`)
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return <div className="text-blue-200">Loading products…</div>
  }

  return (
    <section id="shop" className="relative py-16 px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">New Arrivals</h2>
        <p className="text-blue-200/80 text-sm">Curated for South African style</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map(p => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </div>
    </section>
  )
}

export default ProductGrid
