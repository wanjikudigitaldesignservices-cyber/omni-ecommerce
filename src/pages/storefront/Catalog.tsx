import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard, StorefrontProduct } from "@/components/storefront/ProductCard"
import { SEO } from "@/components/storefront/SEO"

const mockCatalog: StorefrontProduct[] = [
  { id: "1", name: "20V MAX Cordless Drill/Driver Kit", slug: "cordless-drill-20v", price: 12900, imageUrl: "/images/power-drill.jpg", category: "Power Tools", isNew: true, stock: 45 },
  { id: "2", name: "Professional Hammer & Wrench Set (16pc)", slug: "hammer-wrench-set-16pc", price: 8900, imageUrl: "/images/hand-tools.jpg", category: "Hand Tools", stock: 120 },
  { id: "3", name: "Premium Interior Paint - Matte Finish (1 Gal)", slug: "premium-interior-paint", price: 4500, originalPrice: 5900, imageUrl: "/images/paint-supplies.jpg", category: "Paint & Supplies", stock: 200 },
  { id: "4", name: "Heavy Duty Circular Saw 7-1/4\"", slug: "circular-saw-7", price: 15900, imageUrl: "/images/circular-saw.jpg", category: "Power Tools", stock: 18 },
  { id: "5", name: "100-Piece Screwdriver & Bit Set", slug: "screwdriver-bit-set-100", price: 3400, originalPrice: 4500, imageUrl: "/images/screwdriver-set.jpg", category: "Hand Tools", stock: 85 },
  { id: "6", name: "1/2\" PEX Pipe Cutter & Fittings Kit", slug: "pex-pipe-cutter-kit", price: 2900, imageUrl: "/images/plumbing-kit.jpg", category: "Plumbing", stock: 0 },
  { id: "7", name: "Exterior Weather Shield Paint (5 Gal)", slug: "exterior-weather-shield-5gal", price: 18900, imageUrl: "/images/paint-supplies.jpg", category: "Paint & Supplies", isNew: true, stock: 32 },
  { id: "8", name: "18-Gauge Brad Nailer (Pneumatic)", slug: "brad-nailer-18gauge", price: 9900, imageUrl: "/images/power-drill.jpg", category: "Power Tools", stock: 22 },
]

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const filteredProducts = useMemo(() => {
    let result = [...mockCatalog]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
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
        title={categoryFilter !== 'all' ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} | Omni Hardware` : "Shop All | Omni Hardware"}
        description="Browse our full catalog of tools, paint, plumbing, and building supplies."
      />
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Shop Hardware</h1>
          <p className="text-slate-400">Professional-grade tools and building supplies.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search tools, paint, plumbing..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-slate-900/50 border-slate-700 text-white"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[160px] bg-slate-900/50 border-slate-700 text-white">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="power tools">Power Tools</SelectItem>
              <SelectItem value="hand tools">Hand Tools</SelectItem>
              <SelectItem value="paint & supplies">Paint & Supplies</SelectItem>
              <SelectItem value="plumbing">Plumbing</SelectItem>
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
