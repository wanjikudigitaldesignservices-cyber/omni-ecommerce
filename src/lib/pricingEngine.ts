export type DiscountType = 'percentage' | 'fixed_amount' | 'buy_x_get_y' | 'free_shipping'

export interface Discount {
  id: string
  type: DiscountType
  value: number // percentage (e.g. 10 for 10%), or minor units (e.g. 500 for $5)
  priority: number
  allow_stacking: boolean
  min_cart_value?: number
  min_quantity?: number
  target_product_ids?: string[] // if empty, applies to all
}

export interface CartItem {
  id: string
  product_id: string
  quantity: number
  unit_price: number // minor units
}

export interface Cart {
  items: CartItem[]
  shipping_cost: number
}

export interface PricingResult {
  subtotal: number
  discount_total: number
  shipping_total: number
  grand_total: number
  applied_discounts: string[]
}

export function computePrice(cart: Cart, discounts: Discount[]): PricingResult {
  let subtotal = 0
  for (const item of cart.items) {
    subtotal += item.quantity * item.unit_price
  }

  // Sort discounts by priority (highest first)
  const sortedDiscounts = [...discounts].sort((a, b) => b.priority - a.priority)
  
  let discount_total = 0
  let shipping_total = cart.shipping_cost
  const applied_discounts: string[] = []
  
  let current_subtotal = subtotal

  for (const discount of sortedDiscounts) {
    // Check conditions
    if (discount.min_cart_value && current_subtotal < discount.min_cart_value) continue
    
    let totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0)
    if (discount.min_quantity && totalQuantity < discount.min_quantity) continue

    // Calculate discount amount
    let amount = 0
    let applicable_subtotal = 0

    // Filter applicable items
    const applicableItems = cart.items.filter(item => 
      !discount.target_product_ids || discount.target_product_ids.length === 0 || discount.target_product_ids.includes(item.product_id)
    )
    
    applicable_subtotal = applicableItems.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0)
    
    // Skip if no items apply
    if (applicable_subtotal === 0 && discount.type !== 'free_shipping') continue

    if (discount.type === 'percentage') {
      amount = Math.floor(applicable_subtotal * (discount.value / 100))
    } else if (discount.type === 'fixed_amount') {
      amount = Math.min(discount.value, applicable_subtotal)
    } else if (discount.type === 'free_shipping') {
      amount = shipping_total
      // Do not set shipping_total = 0 here, because grand_total = subtotal + original_shipping - discount_total
    } else if (discount.type === 'buy_x_get_y') {
      // Simplified: If you buy 2, get 1 free. Value = 1 (free item). Min qty = 2 (buy items).
      // Total needed = buy + get. 
      if (discount.min_quantity) {
         let free_items = Math.floor(totalQuantity / (discount.min_quantity + discount.value)) * discount.value
         // Find cheapest item among applicable to make free
         const sortedItems = [...applicableItems].sort((a, b) => a.unit_price - b.unit_price)
         let remaining_free = free_items
         for (const item of sortedItems) {
           const free_for_this = Math.min(item.quantity, remaining_free)
           amount += free_for_this * item.unit_price
           remaining_free -= free_for_this
           if (remaining_free <= 0) break
         }
      }
    }

    if (amount > 0) {
      discount_total += amount
      applied_discounts.push(discount.id)
      current_subtotal -= amount

      if (!discount.allow_stacking) {
        break // Stop processing further discounts
      }
    }
  }

  // Cap discount at original subtotal + original shipping
  const max_discount = subtotal + cart.shipping_cost
  if (discount_total > max_discount) {
    discount_total = max_discount
  }

  const grand_total = subtotal + cart.shipping_cost - discount_total

  return {
    subtotal,
    discount_total,
    shipping_total: Math.max(0, cart.shipping_cost - (sortedDiscounts.some(d => d.type === 'free_shipping') ? cart.shipping_cost : 0)),
    grand_total: Math.max(0, grand_total),
    applied_discounts
  }
}
