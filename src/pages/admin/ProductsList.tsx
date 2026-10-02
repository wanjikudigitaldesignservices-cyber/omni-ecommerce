import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { supabase } from "@/lib/supabase"
import { DataTable } from "@/components/admin/DataTable"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Upload, Download } from "lucide-react"
import { Link } from "react-router-dom"
import Papa from 'papaparse'

type Product = {
  id: string
  name: string
  slug: string
  status: "draft" | "published" | "scheduled"
  created_at: string
}

export default function ProductsList() {
  const [rowSelection, setRowSelection] = useState({})

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .is('deleted_at', null)
        .order("created_at", { ascending: false })
      
      if (error) throw error
      return data as Product[]
    },
  })

  const handleExport = () => {
    if (!products) return
    const csv = Papa.unparse(products)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'products_export.csv'
    a.click()
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        console.log("Imported CSV Data:", results.data)
        alert(`Parsed ${results.data.length} rows. CSV validation preview in console.`)
      }
    })
  }

  const columns: ColumnDef<Product>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
      )
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at"))
        return <div>{date.toLocaleDateString()}</div>
      }
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.id)}>
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Products</h2>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <label className="cursor-pointer">
              <Upload className="mr-2 h-4 w-4" /> Import
              <input type="file" accept=".csv" className="hidden" onChange={handleImport} />
            </label>
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button asChild>
            <Link to="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Link>
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div>Loading products...</div>
      ) : (
        <DataTable columns={columns} data={products || []} />
      )}
    </div>
  )
}
