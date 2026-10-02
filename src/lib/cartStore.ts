import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartStoreItem {
  id: string // unique cart item id (product_id + variant_id)
  product_id: string
  name: string
  image: string
  unit_price: number // minor units
  quantity: number
  maxStock: number
  variant_name?: string
}

interface CartState {
  items: CartStoreItem[]
  promoCode: string | null
  shippingMethod: 'standard' | 'express'
  
  addItem: (item: CartStoreItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  applyPromoCode: (code: string | null) => void
  setShippingMethod: (method: 'standard' | 'express') => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      promoCode: null,
      shippingMethod: 'standard',

      addItem: (newItem) => set((state) => {
        const existingItem = state.items.find(item => item.id === newItem.id)
        if (existingItem) {
          return {
            items: state.items.map(item => 
              item.id === newItem.id 
                ? { ...item, quantity: Math.min(item.quantity + newItem.quantity, item.maxStock) }
                : item
            )
          }
        }
        return { items: [...state.items, newItem] }
      }),

      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),

      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map(item => 
          item.id === id 
            ? { ...item, quantity: Math.max(1, Math.min(quantity, item.maxStock)) }
            : item
        )
      })),

      applyPromoCode: (code) => set({ promoCode: code }),
      
      setShippingMethod: (method) => set({ shippingMethod: method }),
      
      clearCart: () => set({ items: [], promoCode: null, shippingMethod: 'standard' })
    }),
    {
      name: 'nexus-cart-storage',
    }
  )
)
