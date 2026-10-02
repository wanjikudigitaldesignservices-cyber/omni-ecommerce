import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { supabase } from "@/lib/supabase"
import { DataTable } from "@/components/admin/DataTable"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, ArrowRightLeft } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type StockLevel = {
  id: string
  variant_id: string
  location_id: string
  on_hand: number
  reserved: number
  variant: {
    sku: string
    name: string
    product: {
      name: string
    }
  }
}

export default function InventoryList() {
  const [adjustOpen, setAdjustOpen] = useState(false)
  const [selectedStock, setSelectedStock] = useState<StockLevel | null>(null)

  const { data: stockLevels, isLoading } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      // Note: In real app, we need to join across tables, 
      // since Supabase JS allows nested select if FKs are set.
      const { data, error } = await supabase
        .from("stock_levels")
        .select(`
          id, on_hand, reserved, variant_id, location_id,
          variant:product_variants (
            sku, name,
            product:products (name)
          )
        `)
      
      if (error) throw error
      // Mangle data structure for simple table render
      return data.map((item: any) => ({
        ...item,
        variant_sku: item.variant?.sku,
        product_name: item.variant?.product?.name,
        variant_name: item.variant?.name,
        available: item.on_hand - item.reserved
      }))
    },
  })

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "product_name",
      header: "Product",
    },
    {
      accessorKey: "variant_sku",
      header: "SKU",
    },
    {
      accessorKey: "available",
      header: "Available",
    },
    {
      accessorKey: "on_hand",
      header: "On Hand",
    },
    {
      accessorKey: "reserved",
      header: "Reserved",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const stock = row.original

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
              <DropdownMenuItem onClick={() => {
                setSelectedStock(stock)
                setAdjustOpen(true)
              }}>
                <ArrowRightLeft className="mr-2 h-4 w-4" /> Adjust Stock
              </DropdownMenuItem>
              <DropdownMenuItem>View Movement History</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Inventory</h2>
        <Button variant="outline">Valuation Report</Button>
      </div>
      
      {isLoading ? (
        <div>Loading inventory...</div>
      ) : (
        <DataTable columns={columns} data={stockLevels || []} />
      )}

      <Dialog open={adjustOpen} onOpenChange={setAdjustOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Stock</DialogTitle>
            <DialogDescription>
              Record a manual stock adjustment for {selectedStock?.product_name} ({selectedStock?.variant_sku})
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                placeholder="+/- 10"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason" className="text-right">
                Reason
              </Label>
              <div className="col-span-3">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="received">Received</SelectItem>
                    <SelectItem value="damaged">Damaged</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                    <SelectItem value="returned">Returned</SelectItem>
                    <SelectItem value="correction">Correction</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="note" className="text-right">
                Note
              </Label>
              <Input
                id="note"
                placeholder="Optional explanation..."
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setAdjustOpen(false)}>Save Adjustment</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
