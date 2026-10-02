import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  actionUrl?: string;
  actionLabel?: string;
  className?: string;
}

export function SectionHeader({ title, description, actionUrl, actionLabel = "View All", className }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8", className)}>
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{title}</h2>
        {description && <p className="text-slate-400 max-w-2xl">{description}</p>}
      </div>
      
      {actionUrl && (
        <Link 
          to={actionUrl} 
          className="group flex items-center text-sm font-medium text-primary-500 hover:text-primary-400 transition-colors"
        >
          {actionLabel}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
