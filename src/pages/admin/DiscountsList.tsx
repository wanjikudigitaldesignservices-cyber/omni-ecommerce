import { useState } from "react"
import { DataTable } from "@/components/admin/DataTable"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { Plus } from "lucide-react"

type Discount = {
  id: string
  name: string
  code: string | null
  type: string
  value: number
  is_active: boolean
}

export default function DiscountsList() {
  const [discounts] = useState<Discount[]>([
    { id: "d1", name: "Summer Sale", code: "SUMMER20", type: "percentage", value: 20, is_active: true },
    { id: "d2", name: "Free Shipping Over $100", code: null, type: "free_shipping", value: 0, is_active: true },
    { id: "d3", name: "$10 Off First Order", code: "WELCOME10", type: "fixed_amount", value: 1000, is_active: false },
  ])

  const columns: ColumnDef<Discount>[] = [
    { accessorKey: "name", header: "Name" },
    { 
      accessorKey: "code", 
      header: "Code",
      cell: ({ row }) => {
        const code = row.getValue("code") as string
        return code ? <Badge variant="secondary">{code}</Badge> : <span className="text-muted-foreground">Automatic</span>
      }
    },
    { 
      accessorKey: "type", 
      header: "Type",
      cell: ({ row }) => <span className="capitalize">{(row.getValue("type") as string).replace('_', ' ')}</span>
    },
    { 
      accessorKey: "value", 
      header: "Value",
      cell: ({ row }) => {
        const type = row.getValue("type") as string
        const val = row.getValue("value") as number
        if (type === 'percentage') return `${val}%`
        if (type === 'free_shipping') return `Free`
        return `$${(val / 100).toFixed(2)}`
      }
    },
    { 
      accessorKey: "is_active", 
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.getValue("is_active") ? "default" : "secondary"}>
          {row.getValue("is_active") ? "Active" : "Draft"}
        </Badge>
      )
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Discounts & Promotions</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Discount
        </Button>
      </div>
      <DataTable columns={columns} data={discounts} />
    </div>
  )
}
