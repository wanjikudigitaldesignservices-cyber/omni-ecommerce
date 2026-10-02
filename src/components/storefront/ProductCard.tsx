import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface StorefrontProduct {
  id: string
  name: string
  slug: string
  price: number // minor units
  originalPrice?: number
  imageUrl: string
  category: string
  isNew?: boolean
  stock: number
}

interface ProductCardProps {
  product: StorefrontProduct
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full"
    >
      <Link to={`/products/${product.slug}`} className="block h-64 bg-slate-800 relative overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        {product.isNew && (
          <div className="absolute top-4 left-4 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded">NEW</div>
        )}
        {product.originalPrice && (
          <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">SALE</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
      </Link>
      
      <div className="p-5 flex flex-col flex-1 space-y-4">
        <div className="flex-1">
          <p className="text-xs text-primary-500 font-medium mb-1 uppercase tracking-wider">{product.category}</p>
          <Link to={`/products/${product.slug}`}>
            <h4 className="text-lg font-bold text-white mb-1 group-hover:text-primary-400 transition-colors line-clamp-2">
              {product.name}
            </h4>
          </Link>
        </div>
        
        <div className="flex justify-between items-end mt-auto">
          <div>
            <span className="text-xl font-bold text-white">${(product.price / 100).toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-slate-500 line-through ml-2">${(product.originalPrice / 100).toFixed(2)}</span>
            )}
          </div>
          <Button 
            size="sm"
            className="bg-white/10 hover:bg-primary-500 text-white border border-white/10 hover:border-primary-500 transition-all"
            disabled={product.stock <= 0}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
