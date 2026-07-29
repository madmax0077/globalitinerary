import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({
  rating,
  reviews,
  className,
  size = 14,
}: {
  rating: number;
  reviews?: number;
  className?: string;
  size?: number;
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            style={{ width: size, height: size }}
            className={cn(
              i < Math.round(rating)
                ? "fill-gold text-gold"
                : "fill-transparent text-muted-foreground/40"
            )}
          />
        ))}
      </div>
      <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
      {reviews !== undefined && (
        <span className="text-sm text-muted-foreground">
          ({reviews.toLocaleString()})
        </span>
      )}
    </div>
  );
}
