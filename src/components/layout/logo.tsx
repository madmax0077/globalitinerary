"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

/** Brand mark: globe + winding itinerary route + destination pin */
function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <circle cx="32" cy="34" r="17" fill="currentColor" fillOpacity="0.18" />
      <circle cx="32" cy="34" r="17" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.4" />
      <ellipse
        cx="32"
        cy="34"
        rx="17"
        ry="6.5"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        className="logo-route"
        d="M15 42.5 C21 29, 28 48, 34 31.5 S45.5 19, 49 22.5"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="15.2" cy="42.2" r="2.8" fill="currentColor" />
      <circle cx="15.2" cy="42.2" r="1.2" fill="#1D4ED8" />
      <circle cx="33.8" cy="31.4" r="2.9" fill="currentColor" />
      <circle cx="33.8" cy="31.4" r="1.25" fill="#0EA5E9" />
      <path
        className="logo-pin"
        fill="#F97316"
        d="M49.2 13.5c-3.2 0-5.8 2.55-5.8 5.7 0 3.95 4.4 8.75 5.45 9.85a0.5 0.5 0 0 0 .7 0c1.05-1.1 5.45-5.9 5.45-9.85 0-3.15-2.6-5.7-5.8-5.7Z"
      />
      <circle cx="49.2" cy="19" r="1.85" fill="#fff" />
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
      <span className="logo-badge relative grid size-9 place-items-center overflow-hidden rounded-xl bg-[linear-gradient(145deg,#1E3A8A_0%,#2563EB_48%,#38BDF8_100%)] text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
        <span className="logo-aura" aria-hidden="true" />
        <BrandMark className="logo-mark relative z-[1] size-[1.45rem]" />
      </span>

      <span
        className={cn(
          "flex flex-col leading-none",
          onDark ? "text-white" : "text-foreground",
        )}
        aria-hidden="true"
      >
        <span
          className={cn(
            "font-display text-[0.95rem] font-bold tracking-[0.02em]",
            onDark && "drop-shadow-[0_1px_10px_rgb(0_0_0_/_0.3)]",
          )}
        >
          Global
        </span>
        <span className="relative mt-0.5 inline-flex items-center">
          <span
            className={cn(
              "font-display text-[1.05rem] font-extrabold tracking-tight",
              onDark ? "text-sky-200" : "text-primary",
            )}
          >
            Itinerary
          </span>
          {/* Mini route underline under "Itinerary" */}
          <svg
            className={cn(
              "pointer-events-none absolute -bottom-1 left-0 h-2 w-full overflow-visible",
              onDark ? "text-orange-400" : "text-orange-500",
            )}
            viewBox="0 0 88 8"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 5.5 C18 1.5, 30 7, 44 4 S70 1, 86 5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx="2" cy="5.5" r="1.35" fill="currentColor" />
            <circle cx="44" cy="4" r="1.35" fill="currentColor" />
            <circle cx="86" cy="5" r="1.5" fill="currentColor" />
          </svg>
        </span>
      </span>
      <span className="sr-only">{siteConfig.name}</span>
    </Link>
  );
}
