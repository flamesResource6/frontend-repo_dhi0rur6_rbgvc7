import { useMemo, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Checkout({ cart, onClear }) {
  const [status, setStatus] = useState(null)

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price?.amount || 0), 0)
  }, [cart])

  const pay = async () => {
    setStatus('Creating payment…')
    try {
      const res = await fetch(`${API_BASE}/api/payments/intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total, currency: 'ZAR', provider: 'fakepay' })
      })
      const data = await res.json()
      setStatus(`Payment ready (mock): ${data.client_secret}`)

      // Simulate order creation
      await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(c => ({ product_id: c.id, quantity: 1 })),
          total: { amount: total, currency: 'ZAR' },
          customer_name: 'Guest',
          customer_email: 'guest@example.com',
          shipping_address: 'South Africa',
          payment_method: 'card'
        })
      })
      onClear()
    } catch (e) {
      setStatus(`Failed: ${e.message}`)
    }
  }

  if (cart.length === 0) return null

  return (
    <section className="bg-slate-900/60 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div className="text-white">
          <div className="text-sm text-blue-200/80">Items: {cart.length}</div>
          <div className="text-xl font-bold">Total: R {total.toFixed(2)}</div>
          {status && <div className="text-blue-200/80 text-sm mt-1">{status}</div>}
        </div>
        <button onClick={pay} className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition">Pay securely</button>
      </div>
    </section>
  )
}

export default Checkout
