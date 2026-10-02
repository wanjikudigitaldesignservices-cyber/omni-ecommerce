import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function FilterPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-white mb-4">Category</h3>
        <div className="space-y-3">
          {['Power Tools', 'Hand Tools', 'Paint & Supplies', 'Plumbing', 'Fasteners', 'Safety Gear'].map(cat => (
            <div key={cat} className="flex items-center space-x-3">
              <Checkbox id={`cat-${cat}`} className="border-slate-700 data-[state=checked]:bg-primary-500" />
              <Label htmlFor={`cat-${cat}`} className="text-slate-300 font-normal cursor-pointer">{cat}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="h-px bg-slate-800 w-full" />
      
      <div>
        <h3 className="text-sm font-medium text-white mb-4">Price Range</h3>
        <div className="space-y-3">
          {['Under $50', '$50 - $200', 'Over $200'].map(cat => (
            <div key={cat} className="flex items-center space-x-3">
              <Checkbox id={`price-${cat}`} className="border-slate-700 data-[state=checked]:bg-primary-500" />
              <Label htmlFor={`price-${cat}`} className="text-slate-300 font-normal cursor-pointer">{cat}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
