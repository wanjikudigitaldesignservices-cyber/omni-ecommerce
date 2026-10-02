import { Link } from "react-router-dom"
import { SEO } from "@/components/storefront/SEO"
import { Button } from "@/components/ui/button"
import { Package, User, MapPin, CreditCard, LogOut } from "lucide-react"

export default function Account() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <SEO title="My Account | Omni" />
      
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-2">
          <h2 className="text-2xl font-bold text-white mb-6">My Account</h2>
          <nav className="space-y-1">
            {[
              { label: "Orders", icon: Package, active: true },
              { label: "Profile", icon: User, active: false },
              { label: "Addresses", icon: MapPin, active: false },
              { label: "Payment Methods", icon: CreditCard, active: false },
            ].map(item => (
              <button 
                key={item.label}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  item.active 
                    ? "bg-primary-500/10 text-primary-400" 
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
            <Link to="/">
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors mt-8">
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </Link>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Recent Orders</h3>
            <div className="space-y-4">
              {[
                { id: "ORD-9283", date: "Oct 12, 2026", total: 49700, status: "Delivered", items: 2 },
                { id: "ORD-1029", date: "Sep 05, 2026", total: 349900, status: "Processing", items: 1 },
              ].map(order => (
                <div key={order.id} className="glass border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-semibold text-white">{order.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        order.status === "Delivered" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-primary-500/10 text-primary-400 border border-primary-500/20"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">{order.date} • {order.items} items</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-bold text-white">${(order.total / 100).toFixed(2)}</span>
                    <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:text-white">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
