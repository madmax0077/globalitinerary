"use client";

import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export type MapMarker = {
  lat: number;
  lng: number;
  label: string;
  href?: string;
  flag?: string;
};

const pinIcon = L.divIcon({
  className: "",
  html: `<span style="display:block;width:20px;height:20px;border-radius:9999px;background:#2563EB;border:2.5px solid #fff;box-shadow:0 0 0 5px rgba(37,99,235,0.25),0 4px 10px rgba(0,0,0,0.25);"></span>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -12],
});

function FitBounds({ markers }: { markers: MapMarker[] }) {
  const map = useMap();
  React.useEffect(() => {
    if (markers.length > 1) {
      const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng] as [number, number]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 6 });
    }
  }, [map, markers]);
  return null;
}

export default function LeafletMap({
  markers,
  zoom = 9,
  scrollZoom = false,
}: {
  markers: MapMarker[];
  zoom?: number;
  scrollZoom?: boolean;
}) {
  const center: [number, number] =
    markers.length === 1
      ? [markers[0].lat, markers[0].lng]
      : [20, 10];

  return (
    <MapContainer
      center={center}
      zoom={markers.length === 1 ? zoom : 2}
      scrollWheelZoom={scrollZoom}
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds markers={markers} />
      {markers.map((m, i) => (
        <Marker key={`${m.label}-${i}`} position={[m.lat, m.lng]} icon={pinIcon}>
          <Popup>
            <div style={{ minWidth: 120 }}>
              <strong>
                {m.flag ? `${m.flag} ` : ""}
                {m.label}
              </strong>
              {m.href && (
                <div style={{ marginTop: 4 }}>
                  <a href={m.href} style={{ color: "#2563EB", fontWeight: 600 }}>
                    View guide →
                  </a>
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
