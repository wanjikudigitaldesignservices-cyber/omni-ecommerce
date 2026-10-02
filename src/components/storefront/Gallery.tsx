import { useState } from "react";
import { cn } from "@/lib/utils";

interface GalleryProps {
  images: string[];
  altText: string;
  className?: string;
}

export function Gallery({ images, altText, className }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div className="aspect-square bg-slate-900 rounded-2xl flex items-center justify-center text-slate-500">No Image</div>;
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 relative group">
        <img
          src={images[activeIndex]}
          alt={altText}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* The orbital glow motif behind the image in a real implementation */}
        <div className="absolute inset-0 bg-primary-500/5 mix-blend-screen pointer-events-none" />
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 snap-start border-2 transition-all",
                activeIndex === idx ? "border-primary-500" : "border-slate-800 opacity-70 hover:opacity-100"
              )}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
