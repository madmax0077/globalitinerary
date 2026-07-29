import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BookmarkButton } from "@/components/shared/bookmark-button";
import { cn } from "@/lib/utils";

export interface DestinationCardProps {
  href: string;
  image: string;
  title: string;
  subtitle?: string;
  badge?: string;
  location?: string;
  rating?: number;
  reviews?: number;
  bookmarkId?: string;
  className?: string;
  aspect?: "portrait" | "landscape" | "square";
  priority?: boolean;
  sizes?: string;
}

const aspects = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

export function DestinationCard({
  href,
  image,
  title,
  subtitle,
  badge,
  location,
  bookmarkId,
  className,
  aspect = "portrait",
  priority,
  sizes = "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw",
}: DestinationCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      <div className={cn("relative w-full overflow-hidden", aspects[aspect])}>
        <Image
          src={image}
          alt={title}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-2">
          {badge && (
            <Badge variant="glass" className="text-white">
              {badge}
            </Badge>
          )}
          {bookmarkId && <BookmarkButton id={bookmarkId} className="ml-auto" />}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          {location && (
            <div className="mb-1.5 flex items-center gap-1 text-xs font-medium text-white/80">
              <MapPin className="size-3.5" />
              {location}
            </div>
          )}
          <h3 className="font-display text-xl font-bold leading-tight drop-shadow-sm">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-1 line-clamp-2 text-sm text-white/80">{subtitle}</p>
          )}
          <div className="mt-3 flex items-center justify-end">
            <span className="grid size-9 place-items-center rounded-full bg-white/15 backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-black">
              <ArrowUpRight className="size-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
