import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard, StorefrontProduct } from "@/components/storefront/ProductCard"

import { SEO } from "@/components/storefront/SEO"

// Mock catalog data
const mockCatalog: StorefrontProduct[] = [
  { id: "1", name: "Sony WH-1000XM5 Noise Cancelling Headphones", slug: "sony-wh-1000xm5", price: 39800, imageUrl: "/hero.jpg", category: "Audio", isNew: true, stock: 45 },
  { id: "2", name: "MacBook Pro 16-inch (M3 Max)", slug: "macbook-pro-16", price: 349900, imageUrl: "/hero.jpg", category: "Laptops", stock: 12 },
  { id: "3", name: "Logitech MX Master 3S", slug: "logitech-mx-master-3s", price: 9900, originalPrice: 12900, imageUrl: "/hero.jpg", category: "Accessories", stock: 120 },
  { id: "4", name: "Keychron Q1 Pro Mechanical Keyboard", slug: "keychron-q1-pro", price: 19900, imageUrl: "/hero.jpg", category: "Accessories", stock: 5 },
  { id: "5", name: "Apple AirPods Pro (2nd Gen)", slug: "airpods-pro-2", price: 24900, originalPrice: 24900, imageUrl: "/hero.jpg", category: "Audio", stock: 0 },
  { id: "6", name: "Dell XPS 15", slug: "dell-xps-15", price: 189900, imageUrl: "/hero.jpg", category: "Laptops", stock: 8 },
]

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...mockCatalog]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      // Basic typo tolerance could be implemented using string distance libs, here we use simple includes
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    }

    if (categoryFilter !== "all") {
      result = result.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase())
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
    }

    return result
  }, [searchQuery, categoryFilter, sortBy])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="container mx-auto px-4 py-12">
      <SEO 
        title={categoryFilter !== 'all' ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} | Nexus` : "Shop All | Nexus"}
        description="Browse our curated collection of premium technology products."
      />
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">The Catalog</h1>
          <p className="text-slate-400">Discover premium tech equipment.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-slate-900/50 border-slate-700 text-white"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px] bg-slate-900/50 border-slate-700 text-white">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
              <SelectItem value="laptops">Laptops</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px] bg-slate-900/50 border-slate-700 text-white">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest Arrivals</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-32 glass rounded-2xl">
          <p className="text-xl text-slate-400 mb-4">No products found matching your criteria.</p>
          <Button variant="outline" onClick={() => { setSearchQuery(""); setCategoryFilter("all") }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {paginatedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-12">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-slate-400">
            Page {currentPage} of {totalPages}
          </span>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
