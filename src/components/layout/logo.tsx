"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

/** Brand mark: globe + route + side-view plane + destination pin */
function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <circle cx="33" cy="36" r="16.5" fill="currentColor" fillOpacity="0.18" />
      <circle cx="33" cy="36" r="16.5" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.4" />
      <ellipse
        cx="33"
        cy="36"
        rx="16.5"
        ry="6.3"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        className="logo-route"
        d="M15.5 45.5 C21.5 32, 29 51, 35 34 S45 22.5, 48.5 24.5"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="15.5" cy="45" r="2.7" fill="currentColor" />
      <circle cx="15.5" cy="45" r="1.15" fill="#1D4ED8" />
      <circle cx="35" cy="34" r="2.8" fill="currentColor" />
      <circle cx="35" cy="34" r="1.2" fill="#0EA5E9" />
      <g transform="translate(5.5 5.5)">
        <path fill="currentColor" d="M1.8 5.8 L5.6 5.55 L4.85 0.15 L2.35 0.7 Z" />
        <path fill="#FEF3C7" d="M1.4 6.7 L5.3 6.45 L5.55 8.15 L1.85 8.3 Z" />
        <path
          fill="currentColor"
          d="M2.4 7.05 C2.4 5.85 3.35 5.1 4.7 5.1 L20.4 4.55 C23.6 4.4 25.5 5.05 26.7 6.15 C27.25 6.65 27.1 7.4 26.3 7.55 L20.8 8.35 L5 8.55 C3.4 8.55 2.4 7.85 2.4 7.05Z"
        />
        <path fill="#38BDF8" d="M21.2 5 C22.9 4.9 24.4 5.25 25.2 6.05 C24.55 6.5 23.2 6.7 21.8 6.55 L21.1 5.55 Z" />
        <rect x="8.2" y="5.7" width="11.2" height="0.95" rx="0.45" fill="#7DD3FC" />
        <path fill="#FEF3C7" d="M9.6 7.55 L16.8 7.25 L19.4 12.9 L15.6 13.05 Z" />
        <rect x="12.6" y="8.85" width="5.2" height="1.55" rx="0.75" fill="#F1F5F9" />
        <ellipse cx="26.2" cy="6.7" rx="1.15" ry="0.95" fill="#F97316" />
      </g>
      <path
        className="logo-pin"
        fill="#F97316"
        d="M50.2 15.5c-3.2 0-5.8 2.55-5.8 5.7 0 3.95 4.4 8.75 5.45 9.85a0.5 0.5 0 0 0 .7 0c1.05-1.1 5.45-5.9 5.45-9.85 0-3.15-2.6-5.7-5.8-5.7Z"
      />
      <circle cx="50.2" cy="21" r="1.85" fill="#fff" />
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
