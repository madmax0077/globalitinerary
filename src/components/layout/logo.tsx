"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

/** Shared brand mark: location pin + globe core (matches favicon / apple icon). */
function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M32 8c-9.8 0-17.8 7.8-17.8 17.4 0 11.7 13 25.4 16.6 28.9a1.7 1.7 0 0 0 2.4 0c3.6-3.5 16.6-17.2 16.6-28.9C49.8 15.8 41.8 8 32 8Z"
      />
      <circle cx="32" cy="24.8" r="8.4" fill="#1D4ED8" />
      <ellipse
        cx="32"
        cy="24.8"
        rx="8.4"
        ry="3.3"
        stroke="#7DD3FC"
        strokeWidth="1.7"
        fill="none"
      />
      <path
        d="M32 16.4v16.8"
        stroke="#7DD3FC"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="32" cy="24.8" r="2.5" fill="#F97316" />
    </svg>
  );
}

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
      className={cn(
        "group flex items-center gap-2.5",
        onDark && "logo-on-dark",
        className,
      )}
      aria-label={`${siteConfig.name} home`}
    >
      <span className="logo-badge relative grid size-9 place-items-center overflow-hidden rounded-xl bg-[linear-gradient(135deg,#1D4ED8_0%,var(--primary)_50%,var(--sky)_100%)] text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
        <span className="logo-aura" aria-hidden="true" />
        <BrandMark className="logo-mark relative z-[1] size-[1.35rem]" />
      </span>

      <span
        className={cn(
          "font-display text-xl font-extrabold leading-none tracking-tight",
          onDark ? "text-white" : "text-foreground",
        )}
        aria-hidden="true"
      >
        <span className={cn(onDark && "drop-shadow-[0_1px_12px_rgb(0_0_0_/_0.35)]")}>
          Global
        </span>
        <span
          className={cn(
            "ml-0.5",
            onDark ? "text-sky-300" : "text-primary",
          )}
        >
          Itinerary
        </span>
      </span>
      <span className="sr-only">{siteConfig.name}</span>
    </Link>
  );
}
