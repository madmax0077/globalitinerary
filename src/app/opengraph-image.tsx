import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #2563eb 0%, #38bdf8 55%, #10b981 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 22,
              background: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 46,
                height: 46,
                borderRadius: 9999,
                border: "2px solid rgba(255,255,255,0.45)",
                background: "rgba(255,255,255,0.12)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 14,
                bottom: 22,
                width: 12,
                height: 12,
                borderRadius: 9999,
                background: "#fff",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 32,
                top: 34,
                width: 12,
                height: 12,
                borderRadius: 9999,
                background: "#fff",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 18,
                top: 40,
                width: 28,
                height: 4,
                background: "#fff",
                borderRadius: 4,
                transform: "rotate(-32deg)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 14,
                top: 12,
                width: 16,
                height: 16,
                borderRadius: 9999,
                background: "#F97316",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 10,
                fontWeight: 800,
              }}
            >
              •
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 22, fontWeight: 700, opacity: 0.9, letterSpacing: 1 }}>GLOBAL</div>
            <div style={{ fontSize: 40, fontWeight: 800, lineHeight: 1 }}>Itinerary</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, maxWidth: 900 }}>
            Plan Every Journey, Beautifully
          </div>
          <div style={{ fontSize: 32, opacity: 0.9, maxWidth: 860 }}>
            Free travel guides, itineraries and trip tools for every country, city and landmark.
          </div>
        </div>

        <div style={{ fontSize: 26, opacity: 0.85 }}>{siteConfig.domain}</div>
      </div>
    ),
    size
  );
}
