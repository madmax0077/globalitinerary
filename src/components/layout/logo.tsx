"use client";

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
      className={cn(
        "group flex items-center gap-2.5",
        onDark && "logo-on-dark",
        className,
      )}
      aria-label={`${siteConfig.name} home`}
    >
      <span className="logo-badge relative grid size-9 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--primary),var(--sky))] transition-transform duration-300 group-hover:scale-110">
        <span className="logo-aura" aria-hidden="true" />
        <span className="logo-spark logo-spark-1" aria-hidden="true" />
        <span className="logo-spark logo-spark-2" aria-hidden="true" />
        <span className="logo-spark logo-spark-3" aria-hidden="true" />
        <span className="logo-spark logo-spark-4" aria-hidden="true" />

        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="logo-mark relative z-[1] size-5 text-white"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4.2" fill="currentColor" opacity="0.95" />
          <ellipse
            cx="12"
            cy="12"
            rx="7.5"
            ry="3"
            transform="rotate(-28 12 12)"
            stroke="currentColor"
            strokeWidth="1.25"
            opacity="0.9"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="3"
            ry="7.5"
            transform="rotate(-12 12 12)"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.4"
          />
          <path
            className="logo-route"
            d="M6.5 14.5c2.2-1.8 4.2.6 6.2-.4 1.8-.9 2.8-2.8 4.8-2.2"
          />
          <circle className="logo-pin" cx="17.8" cy="11.2" r="1.35" fill="#F97316" />
        </svg>
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
