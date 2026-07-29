import { MapView, type MapMarker } from "@/components/shared/map-view";

export function WorldMap({
  markers,
  scrollZoom = false,
}: {
  markers: MapMarker[];
  scrollZoom?: boolean;
}) {
  return (
    <MapView
      markers={markers}
      scrollZoom={scrollZoom}
      className="aspect-[2/1] w-full shadow-soft"
    />
  );
}
