import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  size?: number;
  readonly?: boolean;
  onChange?: (val: number) => void;
  className?: string;
}

export function Rating({ value, max = 5, size = 16, readonly = true, onChange, className }: RatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: max }).map((_, i) => {
        const isFilled = i < Math.round(value);
        return (
          <button
            key={i}
            type="button"
            disabled={readonly}
            onClick={() => onChange?.(i + 1)}
            className={cn(
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm transition-colors",
              readonly && "cursor-default"
            )}
          >
            <Star
              size={size}
              className={cn(
                isFilled ? "fill-primary-500 text-primary-500" : "fill-slate-800 text-slate-800",
                !readonly && "hover:fill-primary-400 hover:text-primary-400"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
