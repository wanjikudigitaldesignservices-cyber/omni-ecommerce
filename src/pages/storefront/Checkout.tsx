import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronRight, ShieldCheck, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCartStore } from '@/lib/cartStore'

type CheckoutStep = 'address' | 'shipping' | 'payment' | 'success'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, clearCart } = useCartStore()
  const [step, setStep] = useState<CheckoutStep>('address')

  // If cart is empty, redirect back
  if (items.length === 0 && step !== 'success') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Your cart is empty</h2>
        <Button onClick={() => navigate('/products')} variant="outline">Browse Products</Button>
      </div>
    )
  }

  const handleNext = (nextStep: CheckoutStep) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setStep(nextStep)
  }

  const handlePay = async () => {
    // 1. In real app, call Supabase RPC to create order and lock stock:
    /*
    const { data: orderId, error } = await supabase.rpc('create_order', {
      p_customer_email: "john.doe@example.com",
      p_subtotal: 10000,
      p_discount_total: 0,
      p_shipping_total: 500,
      p_grand_total: 10500,
      p_shipping_method: "standard",
      p_shipping_address: { city: "SF" },
      p_items: items.map(i => ({ product_id: i.product_id, variant_id: i.id, quantity: i.quantity, unit_price: i.unit_price }))
    })
    */
    
    // Simulate API call delay
    const mockOrderId = "NEX-8924"
    console.log("Order created:", mockOrderId)

    // 2. Instantiate IntaSend Inline JS SDK
    // Since we don't have a real IntaSend account, this is the exact code required:
    /*
    const intasend = new window.IntaSend({
      publicAPIKey: "ISPubKey_test_...",
      live: false 
    })
    
    intasend.setup({
      amount: 105.00,
      currency: "USD",
      api_ref: orderId, // Pass order ID for the webhook to use
    }).on("COMPLETE", (results: any) => {
      console.log("Payment successful", results)
      clearCart()
      handleNext('success')
    }).on("FAILED", (results: any) => {
      console.error("Payment failed", results)
    })
    */

    // Mock successful payment redirect
    setTimeout(() => {
      clearCart()
      handleNext('success')
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Progress Tracker */}
      {step !== 'success' && (
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center text-sm font-medium">
            <span className={`flex items-center justify-center h-8 w-8 rounded-full border-2 ${step === 'address' ? 'border-primary-500 text-primary-500 bg-primary-500/10' : 'border-slate-700 text-slate-500'}`}>1</span>
            <span className={`ml-2 ${step === 'address' ? 'text-white' : 'text-slate-500'}`}>Address</span>
            <ChevronRight className="mx-4 h-4 w-4 text-slate-700" />
            <span className={`flex items-center justify-center h-8 w-8 rounded-full border-2 ${step === 'shipping' ? 'border-primary-500 text-primary-500 bg-primary-500/10' : 'border-slate-700 text-slate-500'}`}>2</span>
            <span className={`ml-2 ${step === 'shipping' ? 'text-white' : 'text-slate-500'}`}>Shipping</span>
            <ChevronRight className="mx-4 h-4 w-4 text-slate-700" />
            <span className={`flex items-center justify-center h-8 w-8 rounded-full border-2 ${step === 'payment' ? 'border-primary-500 text-primary-500 bg-primary-500/10' : 'border-slate-700 text-slate-500'}`}>3</span>
            <span className={`ml-2 ${step === 'payment' ? 'text-white' : 'text-slate-500'}`}>Payment</span>
          </div>
        </div>
      )}

      <div className="glass-card rounded-2xl p-6 md:p-10 border-slate-800 shadow-2xl relative overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 'address' && (
            <motion.div 
              key="address"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Shipping Address</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">First Name</Label>
                  <Input defaultValue="John" className="bg-slate-900/50 border-slate-700 text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Last Name</Label>
                  <Input defaultValue="Doe" className="bg-slate-900/50 border-slate-700 text-white" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-slate-300">Email Address</Label>
                  <Input defaultValue="john.doe@example.com" type="email" className="bg-slate-900/50 border-slate-700 text-white" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-slate-300">Street Address</Label>
                  <Input defaultValue="123 Nexus Way, Suite 400" className="bg-slate-900/50 border-slate-700 text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">City</Label>
                  <Input defaultValue="San Francisco" className="bg-slate-900/50 border-slate-700 text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">ZIP Code</Label>
                  <Input defaultValue="94105" className="bg-slate-900/50 border-slate-700 text-white" />
                </div>
              </div>
              <div className="pt-6 flex justify-end">
                <Button size="lg" onClick={() => handleNext('shipping')} className="bg-primary-500 hover:bg-primary-400 text-white">
                  Continue to Shipping
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'shipping' && (
            <motion.div 
              key="shipping"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Shipping Method</h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 border border-primary-500 bg-primary-500/10 rounded-xl cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full border-4 border-primary-500 bg-background" />
                    <div>
                      <p className="font-semibold text-white">Standard Delivery</p>
                      <p className="text-sm text-slate-400">3-5 business days</p>
                    </div>
                  </div>
                  <span className="font-bold text-white">$5.00</span>
                </label>
                
                <label className="flex items-center justify-between p-4 border border-slate-700 bg-slate-900/50 hover:border-slate-600 rounded-xl cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full border-2 border-slate-600" />
                    <div>
                      <p className="font-semibold text-white">Express Delivery</p>
                      <p className="text-sm text-slate-400">1-2 business days</p>
                    </div>
                  </div>
                  <span className="font-bold text-white">$15.00</span>
                </label>
              </div>
              <div className="pt-6 flex justify-between">
                <Button variant="ghost" onClick={() => handleNext('address')} className="text-slate-400">Back</Button>
                <Button size="lg" onClick={() => handleNext('payment')} className="bg-primary-500 hover:bg-primary-400 text-white">
                  Continue to Payment
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'payment' && (
            <motion.div 
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 text-center py-10"
            >
              <CreditCard className="h-16 w-16 text-primary-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Ready to Pay</h2>
              <p className="text-slate-400 max-w-md mx-auto mb-8">
                Clicking the button below will lock your inventory and launch the secure IntaSend checkout widget.
              </p>
              
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-8">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>256-bit SSL encryption. We never store your card details.</span>
              </div>

              <div className="flex justify-between items-center max-w-xs mx-auto mb-8">
                <Button variant="ghost" onClick={() => handleNext('shipping')} className="text-slate-400">Back</Button>
                <Button size="lg" onClick={handlePay} className="bg-primary-500 hover:bg-primary-400 text-white font-bold tracking-wide shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all active:scale-95">
                  PAY NOW
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 space-y-6"
            >
              <div className="mx-auto w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center border-2 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <Check className="h-10 w-10" />
              </div>
              <h1 className="text-4xl font-bold text-white tracking-tight">Order Complete!</h1>
              <p className="text-slate-400 max-w-md mx-auto">
                Thank you for your purchase. Your order <strong className="text-white">#NEX-8924</strong> has been confirmed. A receipt has been sent to your email.
              </p>
              <div className="pt-8">
                <Button asChild variant="outline" className="border-slate-700 text-slate-300 hover:text-white">
                  <Link to="/products">Return to Store</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
