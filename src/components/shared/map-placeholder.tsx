import { Navigation } from "lucide-react";
import type { Coordinates } from "@/lib/types";
import { MapView } from "@/components/shared/map-view";

export function MapPlaceholder({
  coordinates,
  label,
}: {
  coordinates: Coordinates;
  label: string;
}) {
  const href = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;
  return (
    <div className="flex flex-col gap-3">
      <MapView
        markers={[{ lat: coordinates.lat, lng: coordinates.lng, label }]}
        zoom={10}
        className="aspect-[16/10]"
      />
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-soft transition hover:border-primary/50 hover:shadow-lift"
      >
        <Navigation className="size-4" /> Open in Google Maps
      </a>
    </div>
  );
}
