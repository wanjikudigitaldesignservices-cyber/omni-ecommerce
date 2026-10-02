import { Outlet, Link } from "react-router-dom"
import { Search, User, Menu } from "lucide-react"
import { CartDrawer } from "@/components/storefront/CartDrawer"

export default function StorefrontLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white selection:bg-primary-500/30 selection:text-white">
      {/* Announcement Bar */}
      <div className="bg-primary-500 text-white text-xs font-medium py-2 px-4 text-center">
        Free jobsite delivery on orders over $150. <Link to="/products" className="underline underline-offset-2 hover:text-white/80">Shop Now</Link>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="md:hidden p-2 text-slate-300 hover:text-white transition-colors">
              <Menu className="h-5 w-5" />
            </button>
            <Link to="/" className="flex items-center gap-3 group">
              <img src="/brand/logo-icon.svg" alt="Omni Logo" className="h-8 w-8" />
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary-400 transition-colors">OMNI HARDWARE</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6 ml-6">
              <Link to="/products" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Shop</Link>
              <Link to="/products" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Power Tools</Link>
              <Link to="/products" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Paint & Supplies</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-300 hover:text-primary-400 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <Link to="/login" className="p-2 text-slate-300 hover:text-primary-400 transition-colors hidden md:block">
              <User className="h-5 w-5" />
            </Link>
            <CartDrawer />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 pt-16 pb-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/brand/logo-mono-dark.svg" alt="Omni Logo" className="h-8 brightness-0 invert opacity-50" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Professional-grade tools, hardware & building supplies since 2020.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Shop</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/products" className="hover:text-primary-400 transition-colors">All Products</Link></li>
              <li><Link to="/products" className="hover:text-primary-400 transition-colors">Power Tools</Link></li>
              <li><Link to="/products" className="hover:text-primary-400 transition-colors">Hand Tools</Link></li>
              <li><Link to="/products" className="hover:text-primary-400 transition-colors">Paint & Supplies</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="#" className="hover:text-primary-400 transition-colors">FAQ</Link></li>
              <li><Link to="#" className="hover:text-primary-400 transition-colors">Shipping & Returns</Link></li>
              <li><Link to="#" className="hover:text-primary-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="#" className="hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-primary-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 Omni Hardware. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Designed with Precision</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
