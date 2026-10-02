import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ProductForm() {
  const navigate = useNavigate()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulated save
    navigate("/admin/products")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin/products"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight text-white">Add Product</h1>
      </div>

      <form onSubmit={onSubmit} className="space-y-8 max-w-2xl">
        <div className="glass-card p-6 space-y-4">
          <div>
            <label className="text-white mb-2 block">Name</label>
            <Input placeholder="Product name" className="bg-slate-900 border-slate-700 text-white" />
          </div>
          <div>
            <label className="text-white mb-2 block">Price (in cents)</label>
            <Input type="number" placeholder="29900" className="bg-slate-900 border-slate-700 text-white" />
          </div>
        </div>
        <Button type="submit" className="bg-primary-500 hover:bg-primary-400 text-white"><Save className="mr-2 h-4 w-4"/> Save Product</Button>
      </form>
    </div>
  )
}
