import { useState } from 'react'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Checkout from './components/Checkout'

function App() {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart(prev => [...prev, product])
  }

  const clearCart = () => setCart([])

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-white font-extrabold tracking-tight text-xl">BOLD SA</a>
          <nav className="hidden sm:flex items-center gap-6 text-blue-100/90">
            <a href="#shop" className="hover:text-white">Shop</a>
            <a href="#features" className="hover:text-white">Features</a>
            <a href="/test" className="hover:text-white">Status</a>
          </nav>
          <div className="text-white text-sm">Cart: {cart.length}</div>
        </div>
      </header>

      <Hero />
      <div id="features" className="max-w-7xl mx-auto px-6 py-12 grid sm:grid-cols-3 gap-6">
        <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
          <h3 className="text-white font-semibold">Local-first</h3>
          <p className="text-blue-200/80 text-sm mt-1">Priced in ZAR, ships nationwide.</p>
        </div>
        <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
          <h3 className="text-white font-semibold">Secure checkout</h3>
          <p className="text-blue-200/80 text-sm mt-1">Card and EFT friendly.</p>
        </div>
        <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
          <h3 className="text-white font-semibold">Mobile ready</h3>
          <p className="text-blue-200/80 text-sm mt-1">Responsive design that shines.</p>
        </div>
      </div>

      <ProductGrid onAdd={addToCart} />
      <Checkout cart={cart} onClear={clearCart} />

      <footer className="border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8 text-blue-200/80 text-sm flex flex-col sm:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} BOLD SA • All rights reserved</span>
          <span>Secure payments powered by mock provider</span>
        </div>
      </footer>
    </div>
  )
}

export default App
