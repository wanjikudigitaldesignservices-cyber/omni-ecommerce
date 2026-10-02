import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (val: number) => void;
  className?: string;
}

export function QuantityStepper({ value, min = 1, max = 99, onChange, className }: QuantityStepperProps) {
  return (
    <div className={cn("flex items-center border border-slate-800 rounded-lg overflow-hidden bg-slate-900/50", className)}>
      <button
        type="button"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>
      <div className="w-12 text-center text-sm font-medium text-white" aria-live="polite">
        {value}
      </div>
      <button
        type="button"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
