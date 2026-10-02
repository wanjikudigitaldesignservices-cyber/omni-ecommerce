import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ title = "Something went wrong", message, onRetry, className }: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border border-red-900/30 bg-red-950/10", className)}>
      <div className="bg-red-900/20 p-4 rounded-full mb-4">
        <AlertTriangle className="h-8 w-8 text-red-500" />
      </div>
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-slate-400 max-w-sm mb-6">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="border-red-900 text-red-400 hover:bg-red-900/20">
          Try Again
        </Button>
      )}
    </div>
  );
}
