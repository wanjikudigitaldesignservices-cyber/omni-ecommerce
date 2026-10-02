import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  priceInCents: number;
  originalPriceInCents?: number;
  currency?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function PriceDisplay({ 
  priceInCents, 
  originalPriceInCents, 
  currency = "$", 
  className,
  size = "md"
}: PriceDisplayProps) {
  const formatPrice = (cents: number) => `${currency}${(cents / 100).toFixed(2)}`;
  
  const hasDiscount = originalPriceInCents && originalPriceInCents > priceInCents;
  
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl font-bold"
  };

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span className={cn("text-white font-semibold", sizeClasses[size])}>
        {formatPrice(priceInCents)}
      </span>
      {hasDiscount && (
        <span className="text-slate-500 line-through text-sm">
          {formatPrice(originalPriceInCents)}
        </span>
      )}
    </div>
  );
}
