import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
      <div className="text-9xl font-bold text-slate-800/50 tracking-tighter mb-4">404</div>
      <h1 className="text-3xl font-bold text-white mb-2">Page Not Found</h1>
      <p className="text-slate-400 max-w-md mx-auto mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button asChild className="bg-primary-500 hover:bg-primary-400">
        <Link to="/">Return to Home</Link>
      </Button>
    </div>
  );
}
