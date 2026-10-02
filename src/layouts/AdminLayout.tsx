import { Outlet, Link } from "react-router-dom"
import { Package, Inbox, Settings, LayoutDashboard } from "lucide-react"

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-lg font-bold">Nexus Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link to="/admin" className="flex items-center px-2 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100">
            <LayoutDashboard className="mr-3 h-5 w-5 text-gray-500" />
            Dashboard
          </Link>
          <Link to="/admin/orders" className="flex items-center px-2 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100">
            <Inbox className="mr-3 h-5 w-5 text-gray-500" />
            Orders
          </Link>
          <Link to="/admin/products" className="flex items-center px-2 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100">
            <Package className="mr-3 h-5 w-5 text-gray-500" />
            Products
          </Link>
          <Link to="/admin/inventory" className="flex items-center px-2 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100">
            <Package className="mr-3 h-5 w-5 text-gray-500" />
            Inventory
          </Link>
          <Link to="/admin/discounts" className="flex items-center px-2 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100">
            <Settings className="mr-3 h-5 w-5 text-gray-500" />
            Discounts
          </Link>
          <Link to="/admin/settings" className="flex items-center px-2 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100">
            <Settings className="mr-3 h-5 w-5 text-gray-500" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Administration</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Super Admin</span>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
