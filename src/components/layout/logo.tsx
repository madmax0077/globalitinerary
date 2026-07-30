import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

export function Logo({
  className,
  onDark,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-2.5", className)}
      aria-label={`${siteConfig.name} home`}
    >
      <span className="relative grid size-9 place-items-center overflow-hidden rounded-xl bg-[linear-gradient(135deg,var(--primary),var(--sky))] shadow-glow">
        <svg viewBox="0 0 24 24" fill="none" className="size-5 text-white">
          <circle cx="12" cy="12" r="4.3" fill="currentColor" />
          <ellipse
            cx="12"
            cy="12"
            rx="7.6"
            ry="3"
            transform="rotate(-30 12 12)"
            stroke="currentColor"
            strokeWidth="1.3"
            opacity="0.9"
          />
          <circle cx="18.5" cy="8.4" r="1.5" fill="#F97316" />
        </svg>
      </span>
      <span
        className={cn(
          "font-display text-xl font-extrabold leading-none tracking-tight",
          onDark ? "text-white" : "text-foreground"
        )}
      >
        Global<span className="text-primary">Itinerary</span>
      </span>
    </Link>
  );
}
