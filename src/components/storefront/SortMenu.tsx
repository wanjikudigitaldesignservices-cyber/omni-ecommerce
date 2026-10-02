import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SortMenu() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-slate-400">Sort by:</span>
      <Select defaultValue="featured">
        <SelectTrigger className="w-[180px] bg-slate-900 border-slate-800 text-white">
          <SelectValue placeholder="Sort order" />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 border-slate-800 text-white">
          <SelectItem value="featured">Featured</SelectItem>
          <SelectItem value="newest">Newest Arrivals</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
