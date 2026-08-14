"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

/** Brand mark: globe + route + twin-engine jet + destination pin */
function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <circle cx="35" cy="39" r="15" fill="currentColor" fillOpacity="0.18" />
      <circle cx="35" cy="39" r="15" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.4" />
      <ellipse
        cx="35"
        cy="39"
        rx="15"
        ry="5.8"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        className="logo-route"
        d="M18 48.5 C24 35, 32 54, 38 36.5 S48 25, 51.5 27"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="18.2" cy="48" r="2.6" fill="currentColor" />
      <circle cx="18.2" cy="48" r="1.1" fill="#1D4ED8" />
      <circle cx="38" cy="36.5" r="2.7" fill="currentColor" />
      <circle cx="38" cy="36.5" r="1.15" fill="#0EA5E9" />
      <g transform="translate(2.5 1.8) scale(0.92) rotate(-16)">
        <path fill="#94A3B8" d="M11 8.2 L22 4.8 L23.6 5.9 L15.4 10.6 Z" />
        <path
          fill="#0F274F"
          d="M3.2 9 C3 8 3.8 7.2 5 7.15 L24 5 C26.4 4.75 28 5.35 28.6 6.35 C28.95 6.95 28.55 7.55 27.7 7.75 L23.2 8.7 L6 10.85 C4.4 11.15 3.4 10.2 3.2 9Z"
        />
        <path
          fill="#FFFFFF"
          d="M3.4 7.35 C3.2 5.7 4.4 4.4 6.2 4.2 L23 2.2 C26 1.85 28 2.7 28.8 4.2 C29.2 4.95 28.8 5.7 27.8 5.9 L23.4 6.65 L6.4 8.55 C4.6 8.85 3.55 8.2 3.4 7.35Z"
        />
        <path fill="#0F172A" d="M24 2.85 C25.5 2.65 26.8 3.05 27.35 3.9 C26.55 4.4 25.1 4.5 23.85 4.2 Z" />
        <g fill="#0F172A">
          <circle cx="10.6" cy="5.55" r="0.45" />
          <circle cx="12.5" cy="5.3" r="0.45" />
          <circle cx="14.4" cy="5.05" r="0.45" />
          <circle cx="16.3" cy="4.8" r="0.45" />
          <circle cx="18.2" cy="4.55" r="0.45" />
          <circle cx="20.1" cy="4.3" r="0.45" />
        </g>
        <path fill="#F8FAFC" d="M10.2 8.6 L23.5 6.2 L26.8 15 L18.6 15.8 Z" />
        <path fill="#FFFFFF" d="M25.8 14.2 L28.6 10.8 L29.5 11.4 L27.2 15.4 Z" />
        <ellipse cx="17.2" cy="12.4" rx="3.35" ry="2.55" fill="#F1F5F9" />
        <ellipse cx="17.2" cy="12.4" rx="2.35" ry="1.7" fill="#0F172A" />
        <ellipse cx="12.6" cy="10.35" rx="2.55" ry="1.9" fill="#E2E8F0" />
        <ellipse cx="12.6" cy="10.35" rx="1.7" ry="1.2" fill="#1E293B" />
        <path fill="#FFFFFF" d="M3.6 5.5 L7.4 4.95 L6.35-0.2 L3.7 0.55 Z" />
      </g>
      <path
        className="logo-pin"
        fill="#F97316"
        d="M51.5 17.2c-3.2 0-5.8 2.55-5.8 5.7 0 3.95 4.4 8.75 5.45 9.85a0.5 0.5 0 0 0 .7 0c1.05-1.1 5.45-5.9 5.45-9.85 0-3.15-2.6-5.7-5.8-5.7Z"
      />
      <circle cx="51.5" cy="22.7" r="1.85" fill="#fff" />
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
