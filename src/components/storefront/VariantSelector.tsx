import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Variant {
  id: string;
  name: string;
  inStock: boolean;
}

interface VariantSelectorProps {
  variants: Variant[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  className?: string;
}

export function VariantSelector({ variants, selectedId, onSelect, className }: VariantSelectorProps) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className={cn("space-y-3", className)}>
      <h4 className="text-sm font-medium text-slate-300">Options</h4>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isSelected = selectedId === variant.id;
          return (
            <Button
              key={variant.id}
              type="button"
              variant="outline"
              size="sm"
              disabled={!variant.inStock}
              onClick={() => onSelect(variant.id)}
              className={cn(
                "rounded-full transition-all border-slate-700 bg-slate-900/50 hover:bg-slate-800",
                isSelected && "border-primary-500 bg-primary-500/10 text-primary-500 hover:bg-primary-500/20",
                !variant.inStock && "opacity-50 line-through decoration-slate-500"
              )}
            >
              {variant.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
