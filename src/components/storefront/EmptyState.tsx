import { cn } from "@/lib/utils";
import { AlertCircle, PackageX } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  icon?: "package" | "alert";
  className?: string;
}

export function EmptyState({ title, description, action, icon = "package", className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4 text-center glass-card rounded-2xl", className)}>
      <div className="bg-slate-800/50 p-4 rounded-full mb-4">
        {icon === "package" ? (
          <PackageX className="h-8 w-8 text-slate-400" />
        ) : (
          <AlertCircle className="h-8 w-8 text-slate-400" />
        )}
      </div>
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-slate-400 max-w-sm mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
