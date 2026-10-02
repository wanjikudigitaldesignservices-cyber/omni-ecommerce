import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Wrench, Shield, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/storefront/ProductCard"
import { SectionHeader } from "@/components/storefront/SectionHeader"
import { SEO } from "@/components/storefront/SEO"

const featuredProducts = [
  { id: "1", name: "20V MAX Cordless Drill/Driver Kit", slug: "cordless-drill-20v", price: 12900, imageUrl: "/images/power-drill.jpg", category: "Power Tools", isNew: true, stock: 45 },
  { id: "2", name: "Professional Hammer & Wrench Set (16pc)", slug: "hammer-wrench-set-16pc", price: 8900, imageUrl: "/images/hand-tools.jpg", category: "Hand Tools", stock: 120 },
  { id: "3", name: "Premium Interior Paint - Matte Finish (1 Gal)", slug: "premium-interior-paint", price: 4500, originalPrice: 5900, imageUrl: "/images/paint-supplies.jpg", category: "Paint & Supplies", stock: 200 },
  { id: "4", name: "Heavy Duty Circular Saw 7-1/4\"", slug: "circular-saw-7", price: 15900, imageUrl: "/images/circular-saw.jpg", category: "Power Tools", stock: 18 },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      <SEO 
        title="Omni Hardware | Tools, Paint & Building Supplies"
        description="Your one-stop shop for premium power tools, hand tools, paint, plumbing, and building materials."
      />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/hero.jpg" alt="Workshop workbench with tools" className="w-full h-full object-cover opacity-50" />
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
              Build it right. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-sky-600">
                Build it with Omni.
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Professional-grade tools, hardware, and building supplies for contractors and DIY enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary-500 hover:bg-primary-400 text-white rounded-full px-8 text-lg h-14">
                <Link to="/products">Shop All Tools</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 text-lg h-14 border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-white">
                <Link to="/products">New Arrivals</Link>
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
                <Wrench className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Pro-Grade Quality</h3>
              <p className="text-slate-400">Every tool is tested to meet professional contractor standards.</p>
            </div>
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-500 mb-6">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Lifetime Warranty</h3>
              <p className="text-slate-400">Hand tools backed by our lifetime replacement guarantee.</p>
            </div>
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-500 mb-6">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Free Jobsite Delivery</h3>
              <p className="text-slate-400">Free delivery on orders over $150 — straight to your jobsite.</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Best Sellers" 
            description="The tools and supplies our customers rely on most." 
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
            <Link to="/products" className="group relative h-96 rounded-3xl overflow-hidden glass-card">
              <img src="/images/power-drill.jpg" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Power Tools" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-10">
                <h3 className="text-3xl font-bold text-white mb-2">Power Tools</h3>
                <p className="text-slate-300 flex items-center group-hover:text-primary-400 transition-colors">
                  Shop Power Tools <ArrowRight className="ml-2 h-4 w-4" />
                </p>
              </div>
            </Link>
            <Link to="/products" className="group relative h-96 rounded-3xl overflow-hidden glass-card">
              <img src="/images/paint-supplies.jpg" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Paint & Supplies" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-10">
                <h3 className="text-3xl font-bold text-white mb-2">Paint & Supplies</h3>
                <p className="text-slate-300 flex items-center group-hover:text-primary-400 transition-colors">
                  Shop Paint <ArrowRight className="ml-2 h-4 w-4" />
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
