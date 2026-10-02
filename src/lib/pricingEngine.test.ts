import { describe, it, expect } from 'vitest'
import { computePrice, Cart, Discount } from './pricingEngine'

describe('Pricing Engine', () => {
  it('calculates subtotal correctly without discounts', () => {
    const cart: Cart = {
      items: [
        { id: '1', product_id: 'p1', quantity: 2, unit_price: 1000 },
        { id: '2', product_id: 'p2', quantity: 1, unit_price: 500 }
      ],
      shipping_cost: 1000
    }
    const result = computePrice(cart, [])
    expect(result.subtotal).toBe(2500)
    expect(result.discount_total).toBe(0)
    expect(result.shipping_total).toBe(1000)
    expect(result.grand_total).toBe(3500)
  })

  it('applies a percentage discount to the whole cart', () => {
    const cart: Cart = {
      items: [{ id: '1', product_id: 'p1', quantity: 1, unit_price: 1000 }],
      shipping_cost: 0
    }
    const discount: Discount = {
      id: 'd1', type: 'percentage', value: 10, priority: 1, allow_stacking: true
    }
    const result = computePrice(cart, [discount])
    expect(result.discount_total).toBe(100)
    expect(result.grand_total).toBe(900)
  })

  it('applies a fixed amount discount to specific products', () => {
    const cart: Cart = {
      items: [
        { id: '1', product_id: 'target_prod', quantity: 1, unit_price: 1000 },
        { id: '2', product_id: 'other_prod', quantity: 1, unit_price: 500 }
      ],
      shipping_cost: 0
    }
    const discount: Discount = {
      id: 'd1', type: 'fixed_amount', value: 200, priority: 1, allow_stacking: true, target_product_ids: ['target_prod']
    }
    const result = computePrice(cart, [discount])
    expect(result.discount_total).toBe(200)
    expect(result.grand_total).toBe(1300)
  })

  it('stops stacking when allow_stacking is false', () => {
    const cart: Cart = {
      items: [{ id: '1', product_id: 'p1', quantity: 1, unit_price: 1000 }],
      shipping_cost: 0
    }
    const d1: Discount = { id: 'd1', type: 'percentage', value: 10, priority: 2, allow_stacking: false }
    const d2: Discount = { id: 'd2', type: 'fixed_amount', value: 500, priority: 1, allow_stacking: true }
    
    const result = computePrice(cart, [d1, d2]) // d1 has higher priority
    expect(result.applied_discounts).toEqual(['d1'])
    expect(result.discount_total).toBe(100)
  })

  it('applies free shipping', () => {
    const cart: Cart = {
      items: [{ id: '1', product_id: 'p1', quantity: 1, unit_price: 1000 }],
      shipping_cost: 500
    }
    const discount: Discount = { id: 'd1', type: 'free_shipping', value: 0, priority: 1, allow_stacking: true }
    const result = computePrice(cart, [discount])
    expect(result.shipping_total).toBe(0)
    expect(result.discount_total).toBe(500)
    expect(result.grand_total).toBe(1000)
  })

  it('handles Buy X Get Y correctly', () => {
    const cart: Cart = {
      items: [{ id: '1', product_id: 'p1', quantity: 3, unit_price: 1000 }], // Buy 2 get 1
      shipping_cost: 0
    }
    const discount: Discount = { 
      id: 'd1', type: 'buy_x_get_y', min_quantity: 2, value: 1, priority: 1, allow_stacking: true 
    }
    const result = computePrice(cart, [discount])
    // Total cost = 3000. 1 item free = 1000 discount.
    expect(result.discount_total).toBe(1000)
    expect(result.grand_total).toBe(2000)
  })
})
