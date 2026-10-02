import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import StorefrontLayout from './layouts/StorefrontLayout'
import AdminLayout from './layouts/AdminLayout'
import Home from './pages/storefront/Home'
import Catalog from './pages/storefront/Catalog'
import ProductDetail from './pages/storefront/ProductDetail'
import Checkout from './pages/storefront/Checkout'
import Login from './pages/storefront/Login'
import Account from './pages/storefront/Account'
import DashboardHome from './pages/admin/DashboardHome'
import ProductsList from './pages/admin/ProductsList'
import ProductForm from './pages/admin/ProductForm'
import InventoryList from './pages/admin/InventoryList'
import OrdersList from './pages/admin/OrdersList'
import DiscountsList from './pages/admin/DiscountsList'
import Settings from './pages/admin/Settings'
import NotFound from './pages/storefront/NotFound'
import { Analytics } from './components/storefront/Analytics'

import { TooltipProvider } from "@/components/ui/tooltip"

const queryClient = new QueryClient()

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <Analytics />
            <Routes>
              <Route path="/" element={<StorefrontLayout />}>
                <Route index element={<Home />} />
                <Route path="products" element={<Catalog />} />
                <Route path="products/:slug" element={<ProductDetail />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="login" element={<Login />} />
                <Route path="account" element={<Account />} />
              </Route>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="orders" element={<OrdersList />} />
                <Route path="products" element={<ProductsList />} />
                <Route path="products/new" element={<ProductForm />} />
                <Route path="inventory" element={<InventoryList />} />
                <Route path="discounts" element={<DiscountsList />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App
