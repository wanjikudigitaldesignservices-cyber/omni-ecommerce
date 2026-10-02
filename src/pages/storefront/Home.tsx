import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Zap, Shield, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/storefront/ProductCard"
import { SectionHeader } from "@/components/storefront/SectionHeader"
import { SEO } from "@/components/storefront/SEO"

const featuredProducts = [
  { id: "1", name: "Omni Sonic Pro", slug: "omni-sonic-pro", price: 39800, imageUrl: "/images/headphone.jpg", category: "Audio", isNew: true, stock: 45 },
  { id: "2", name: "Omni Book X", slug: "omni-book-x", price: 349900, imageUrl: "/images/laptop.jpg", category: "Laptops", stock: 12 },
  { id: "3", name: "Ergo Desk Mat", slug: "ergo-desk-mat", price: 9900, originalPrice: 12900, imageUrl: "/images/hero.jpg", category: "Accessories", stock: 120 },
  { id: "4", name: "Mechanical Board V2", slug: "mech-board-v2", price: 19900, imageUrl: "/images/laptop.jpg", category: "Workspace", stock: 5 },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      <SEO 
        title="Omni | Premium Minimalist Tech"
        description="Discover premium tech equipment and accessories designed for minimalists."
      />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/hero.jpg" alt="Minimalist workspace" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-slate-950/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 max-w-4xl mx-auto leading-tight">
              Focus on what matters. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-sky-600">
                Leave the rest to Omni.
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Premium tech and workspace gear designed to elevate your workflow and eliminate distractions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary-500 hover:bg-primary-400 text-white rounded-full px-8 text-lg h-14">
                <Link to="/products">Explore Collection</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 text-lg h-14 border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-white">
                <Link to="/design-system">View Design System</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 border-t border-slate-800 bg-slate-900/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-500 mb-6">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Zero Compromise</h3>
              <p className="text-slate-400">Engineered for peak performance with the highest quality materials.</p>
            </div>
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-500 mb-6">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white">3-Year Warranty</h3>
              <p className="text-slate-400">All products are backed by our comprehensive global protection plan.</p>
            </div>
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-500 mb-6">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Global Shipping</h3>
              <p className="text-slate-400">Free expedited shipping on all orders above $200 worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="New Arrivals" 
            description="The latest additions to our minimalist ecosystem." 
            actionUrl="/products"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Category Highlights */}
      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Link to="/products?category=audio" className="group relative h-96 rounded-3xl overflow-hidden glass-card">
              <img src="/images/headphone.jpg" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-10">
                <h3 className="text-3xl font-bold text-white mb-2">Immersive Audio</h3>
                <p className="text-slate-300 flex items-center group-hover:text-primary-400 transition-colors">
                  Shop Audio <ArrowRight className="ml-2 h-4 w-4" />
                </p>
              </div>
            </Link>
            <Link to="/products?category=workspace" className="group relative h-96 rounded-3xl overflow-hidden glass-card">
              <img src="/images/laptop.jpg" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-10">
                <h3 className="text-3xl font-bold text-white mb-2">Elevated Workspace</h3>
                <p className="text-slate-300 flex items-center group-hover:text-primary-400 transition-colors">
                  Shop Workspace <ArrowRight className="ml-2 h-4 w-4" />
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
