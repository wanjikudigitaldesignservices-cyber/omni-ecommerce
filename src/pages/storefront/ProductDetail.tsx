import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ShoppingCart, Star, Shield, ArrowLeft, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard, StorefrontProduct } from "@/components/storefront/ProductCard"
import { Badge } from "@/components/ui/badge"
import { Rating } from "@/components/ui/rating"
import { Gallery } from "@/components/storefront/Gallery"
import { VariantSelector } from "@/components/storefront/VariantSelector"
import { QuantityStepper } from "@/components/storefront/QuantityStepper"
import { PriceDisplay } from "@/components/storefront/PriceDisplay"
import { computePrice } from "@/lib/pricingEngine"
import { useCartStore } from "@/lib/cartStore"
import { SEO } from "@/components/storefront/SEO"
import { toast } from "sonner"

// Mock product details
const mockProduct = {
  id: "1",
  name: "Sony WH-1000XM5 Noise Cancelling Headphones",
  slug: "sony-wh-1000xm5",
  description: "Industry-leading noise cancellation with two processors controlling eight microphones. Magnificent sound, engineered to perfection with the new Integrated Processor V1. Crystal clear hands-free calling with 4 beamforming microphones, precise voice pickup, and advanced audio signal processing.",
  price: 39800, // $398.00
  images: ["/hero.jpg", "/hero.jpg", "/hero.jpg"],
  category: "Audio",
  stock: 45,
  reviews: { count: 128, average: 4.8 },
  variants: [
    { id: "v1", name: "Black", price: 39800, stock: 20 },
    { id: "v2", name: "Silver", price: 39800, stock: 25 },
  ],
  features: [
    "Industry-leading noise cancellation",
    "30-hour battery life with quick charging",
    "Ultra-comfortable, lightweight design",
    "Multipoint connection"
  ]
}

const mockRelated: StorefrontProduct[] = [
  { id: "3", name: "Logitech MX Master 3S", slug: "logitech-mx-master-3s", price: 9900, originalPrice: 12900, imageUrl: "/hero.jpg", category: "Accessories", stock: 120 },
  { id: "5", name: "Apple AirPods Pro (2nd Gen)", slug: "airpods-pro-2", price: 24900, imageUrl: "/hero.jpg", category: "Audio", stock: 0 },
]

export default function ProductDetail() {
  const { slug } = useParams()
  const addItem = useCartStore(state => state.addItem)
  const [selectedVariant, setSelectedVariant] = useState(mockProduct.variants[0].id)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [calculatedPrice, setCalculatedPrice] = useState<{ grand_total: number, discount_total: number } | null>(null)

  // Use the pricing engine to simulate active store-wide discounts
  useEffect(() => {
    // E.g. A storewide 10% off sale
    const mockDiscounts = [
      { id: 'sale1', type: 'percentage' as const, value: 10, priority: 1, allow_stacking: false }
    ]
    const cart = {
      items: [{ id: 'mock', product_id: mockProduct.id, quantity: 1, unit_price: mockProduct.price }],
      shipping_cost: 0
    }
    const result = computePrice(cart, mockDiscounts)
    setCalculatedPrice(result)
  }, [])

  const currentVariant = mockProduct.variants.find(v => v.id === selectedVariant)
  const isOutOfStock = (currentVariant?.stock || 0) <= 0
  const displayPrice = calculatedPrice ? calculatedPrice.grand_total : mockProduct.price
  const hasDiscount = calculatedPrice && calculatedPrice.discount_total > 0

  const handleAddToCart = () => {
    if (isOutOfStock || !currentVariant) return
    addItem({
      id: `${mockProduct.id}_${currentVariant.id}`,
      product_id: mockProduct.id,
      name: mockProduct.name,
      image: mockProduct.images[0],
      unit_price: currentVariant.price,
      quantity: quantity,
      maxStock: currentVariant.stock,
      variant_name: currentVariant.name
    })
    toast.success("Added to cart", { description: `${quantity}x ${mockProduct.name} added.` })
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      <SEO 
        title={mockProduct.name}
        description={mockProduct.description}
        image={mockProduct.images[0]}
      />
      <Link to="/products" className="inline-flex items-center text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Catalog
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <Gallery 
            images={mockProduct.images} 
            altText={mockProduct.name} 
          />
        </div>

        {/* Details */}
        <div className="space-y-8">
          <div>
            <p className="text-primary-500 font-medium mb-2 uppercase tracking-wider">{mockProduct.category}</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              {mockProduct.name}
            </h1>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <Rating value={mockProduct.reviews.average} />
              <span>({mockProduct.reviews.count} reviews)</span>
            </div>
          </div>

          <div className="text-4xl font-bold text-white flex items-end gap-3">
            <PriceDisplay priceInCents={displayPrice} originalPriceInCents={hasDiscount ? mockProduct.price : undefined} size="lg" />
          </div>

          <p className="text-slate-300 leading-relaxed text-lg">
            {mockProduct.description}
          </p>

          <div className="space-y-4">
            <VariantSelector
              selectedId={selectedVariant}
              onSelect={setSelectedVariant}
              variants={mockProduct.variants.map(v => ({ id: v.id, name: v.name, inStock: v.stock > 0 }))}
            />
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">Quantity</h3>
              {isOutOfStock ? (
                <Badge variant="destructive">Out of Stock</Badge>
              ) : (
                <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20">In Stock ({currentVariant?.stock})</Badge>
              )}
            </div>
            <div className="flex gap-4">
              <QuantityStepper 
                value={quantity} 
                onChange={setQuantity} 
                min={1} 
                max={currentVariant?.stock || 1} 
              />
              <Button 
                onClick={handleAddToCart}
                size="lg" 
                className="flex-1 bg-primary-500 hover:bg-primary-400 shadow-[0_0_20px_rgba(14,165,233,0.3)] text-white"
                disabled={isOutOfStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
            <Shield className="h-5 w-5 text-indigo-400" />
            <span>Secure checkout with 30-day money-back guarantee.</span>
          </div>
        </div>
      </div>

      {/* Features & Specs */}
      <div className="border-t border-slate-800 pt-16">
        <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
        <ul className="grid md:grid-cols-2 gap-4">
          {mockProduct.features.map((feat, i) => (
            <li key={i} className="flex items-center gap-3 text-slate-300 bg-slate-900/30 p-4 rounded-lg border border-slate-800/50">
              <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              {feat}
            </li>
          ))}
        </ul>
      </div>

      {/* Related Products */}
      <div className="border-t border-slate-800 pt-16">
        <h2 className="text-2xl font-bold text-white mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {mockRelated.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
