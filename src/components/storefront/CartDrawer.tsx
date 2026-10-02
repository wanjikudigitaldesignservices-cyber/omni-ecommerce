import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from '@/components/ui/sheet'
import { useCartStore } from '@/lib/cartStore'
import { computePrice } from '@/lib/pricingEngine'

export function CartDrawer() {
  const navigate = useNavigate()
  const { items, updateQuantity, removeItem, promoCode, applyPromoCode, shippingMethod, setShippingMethod } = useCartStore()
  const [isOpen, setIsOpen] = useState(false)
  const [promoInput, setPromoInput] = useState(promoCode || '')
  
  // Recalculate price whenever cart changes
  const [priceResult, setPriceResult] = useState<{subtotal: number, discount_total: number, shipping_total: number, grand_total: number} | null>(null)

  useEffect(() => {
    // Convert store items to Cart format for pricing engine
    const cart = {
      items: items.map(item => ({
        id: item.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price
      })),
      shipping_cost: shippingMethod === 'express' ? 1500 : 500
    }

    // Mock active discounts - in real life this comes from DB
    const activeDiscounts = [
      { id: 'sale10', type: 'percentage' as const, value: 10, priority: 1, allow_stacking: true, code: 'SALE10' },
      { id: 'freeship', type: 'free_shipping' as const, value: 0, priority: 2, allow_stacking: true, code: 'FREESHIP' }
    ]

    // Filter by entered promo code if any
    const validDiscounts = promoCode 
      ? activeDiscounts.filter(d => d.code === promoCode) 
      : [] // no automatic discounts in this mockup unless explicitly coded

    const result = computePrice(cart, validDiscounts)
    setPriceResult(result)
  }, [items, promoCode, shippingMethod])

  const handleApplyPromo = () => {
    applyPromoCode(promoInput.toUpperCase())
  }

  const handleCheckout = () => {
    setIsOpen(false)
    navigate('/checkout')
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="p-2 text-slate-300 hover:text-white transition-colors relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-primary-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-slate-950 border-l-slate-800 flex flex-col p-0 text-slate-200">
        <SheetHeader className="p-6 border-b border-slate-800">
          <SheetTitle className="text-white flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" /> Your Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4">
            <ShoppingCart className="h-16 w-16 text-slate-800" />
            <p className="text-slate-400">Your cart is currently empty.</p>
            <Button onClick={() => setIsOpen(false)} variant="outline" className="border-slate-700 text-slate-300 hover:text-white">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="h-20 w-20 rounded-md overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="font-medium text-sm text-white line-clamp-2">{item.name}</h4>
                          {item.variant_name && <p className="text-xs text-slate-400 mt-1">{item.variant_name}</p>}
                        </div>
                        <span className="font-bold text-sm whitespace-nowrap text-white">${(item.unit_price / 100).toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-slate-700 rounded-md bg-slate-900 overflow-hidden h-8">
                          <button 
                            className="px-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-medium text-white">{item.quantity}</span>
                          <button 
                            className="px-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.maxStock}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-6 border-t border-slate-800 bg-slate-900/50 space-y-4">
              {/* Shipping Estimator */}
              <div className="space-y-2 pb-4 border-b border-slate-800">
                <p className="text-xs font-medium text-slate-400 uppercase">Shipping Method</p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShippingMethod('standard')}
                    className={`flex-1 h-8 text-xs ${shippingMethod === 'standard' ? 'border-primary-500 bg-primary-500/10 text-primary-400' : 'border-slate-700'}`}
                  >
                    Standard ($5.00)
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShippingMethod('express')}
                    className={`flex-1 h-8 text-xs ${shippingMethod === 'express' ? 'border-primary-500 bg-primary-500/10 text-primary-400' : 'border-slate-700'}`}
                  >
                    Express ($15.00)
                  </Button>
                </div>
              </div>

              {/* Promo Code */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <Input 
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (e.g. SALE10)" 
                    className="pl-9 h-9 bg-slate-950 border-slate-700 text-sm"
                  />
                </div>
                <Button onClick={handleApplyPromo} size="sm" variant="secondary" className="h-9 shrink-0">
                  Apply
                </Button>
              </div>

              {/* Totals */}
              {priceResult && (
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Subtotal</span>
                    <span>${(priceResult.subtotal / 100).toFixed(2)}</span>
                  </div>
                  {priceResult.discount_total > 0 && (
                    <div className="flex justify-between text-sm text-emerald-400 font-medium">
                      <span>Discount {promoCode && `(${promoCode})`}</span>
                      <span>-${(priceResult.discount_total / 100).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Shipping</span>
                    <span>${(priceResult.shipping_total / 100).toFixed(2)}</span>
                  </div>
                  <Separator className="my-2 bg-slate-800" />
                  <div className="flex justify-between text-lg font-bold text-white">
                    <span>Total</span>
                    <span>${(priceResult.grand_total / 100).toFixed(2)}</span>
                  </div>
                </div>
              )}

              <Button onClick={handleCheckout} className="w-full bg-primary-500 hover:bg-primary-400 text-white shadow-[0_0_15px_rgba(14,165,233,0.4)]">
                Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
