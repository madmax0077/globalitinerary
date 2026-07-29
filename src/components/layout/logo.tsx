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
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.85" />
          <path
            d="M4 10.5C7 12 10 9.5 13 11C16 12.5 19 11 20 10"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="0.2 2.4"
          />
          <path
            d="M12 6.5c2.2 2.8 2.2 8.2 0 11c-2.2-2.8-2.2-8.2 0-11Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
            opacity="0.8"
          />
          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
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
