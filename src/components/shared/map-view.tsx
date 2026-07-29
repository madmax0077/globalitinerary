"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import type { MapMarker } from "@/components/shared/leaflet-map";

// Leaflet touches `window` at import time, so load it client-side only.
const LeafletMap = dynamic(() => import("@/components/shared/leaflet-map"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-muted" />,
});

export type { MapMarker };

export function MapView({
  markers,
  zoom,
  scrollZoom,
  className,
}: {
  markers: MapMarker[];
  zoom?: number;
  scrollZoom?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-3xl border border-border", className)}>
      <LeafletMap markers={markers} zoom={zoom} scrollZoom={scrollZoom} />
    </div>
  );
}
