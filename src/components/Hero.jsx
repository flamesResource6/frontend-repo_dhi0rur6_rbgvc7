import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

function Hero() {
  const scrollToShop = () => {
    const el = document.getElementById('shop')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/8nsoLg1te84JZcE9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/90" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 sm:py-28 flex flex-col items-start">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="backdrop-blur-sm bg-black/20 rounded-2xl p-6">
          <span className="inline-block text-xs tracking-widest uppercase text-blue-200/80 mb-3">South Africa • E‑Commerce</span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Bold streetwear for SA
            <span className="block bg-gradient-to-r from-sky-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">Make your look unforgettable</span>
          </h1>
          <p className="mt-4 max-w-2xl text-blue-100/90 text-base sm:text-lg">
            Fresh drops, local vibes, secure payments. Built for mobile and desktop.
          </p>
          <div className="pointer-events-auto mt-6 flex flex-wrap gap-3">
            <button onClick={scrollToShop} className="px-5 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-blue-50 transition">Shop new arrivals</button>
            <a href="#features" className="px-5 py-3 rounded-xl bg-slate-900/60 text-white border border-white/15 hover:bg-slate-900/80 transition">Why choose us</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
