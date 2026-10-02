import { useState } from "react"
import { DataTable } from "@/components/admin/DataTable"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, FileText, Truck } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Order = {
  id: string
  customer_email: string
  status: "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded"
  grand_total: number
  created_at: string
}

export default function OrdersList() {
  const [orders] = useState<Order[]>([
    { id: "ord_1", customer_email: "alice@example.com", status: "pending", grand_total: 12500, created_at: new Date().toISOString() },
    { id: "ord_2", customer_email: "bob@example.com", status: "paid", grand_total: 5000, created_at: new Date(Date.now() - 86400000).toISOString() },
    { id: "ord_3", customer_email: "charlie@example.com", status: "shipped", grand_total: 39800, created_at: new Date(Date.now() - 172800000).toISOString() },
  ])

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "Order ID",
      cell: ({ row }) => <div className="font-mono text-xs">{row.getValue("id")}</div>
    },
    {
      accessorKey: "customer_email",
      header: "Customer",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge variant={
            status === 'paid' ? 'default' : 
            status === 'shipped' || status === 'delivered' ? 'outline' : 
            status === 'cancelled' || status === 'refunded' ? 'destructive' : 'secondary'
          }>
            {status}
          </Badge>
        )
      }
    },
    {
      accessorKey: "grand_total",
      header: "Total",
      cell: ({ row }) => {
        const val = row.getValue("grand_total") as number
        return <div>${(val / 100).toFixed(2)}</div>
      }
    },
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ row }) => <div>{new Date(row.getValue("created_at")).toLocaleString()}</div>
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem><FileText className="mr-2 h-4 w-4"/> Invoice PDF</DropdownMenuItem>
              <DropdownMenuItem><Truck className="mr-2 h-4 w-4"/> Packing Slip</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Mark as Processing</DropdownMenuItem>
              <DropdownMenuItem>Mark as Shipped</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Issue Refund</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
      </div>
      <DataTable columns={columns} data={orders} />
    </div>
  )
}
