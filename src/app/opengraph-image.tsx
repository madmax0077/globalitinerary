import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";

export const runtime = "edge";
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
              width: 64,
              height: 64,
              borderRadius: 20,
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
                width: 52,
                height: 21,
                border: "4px solid #fff",
                borderRadius: 9999,
                transform: "rotate(-30deg)",
                opacity: 0.92,
              }}
            />
            <div style={{ width: 27, height: 27, borderRadius: 9999, background: "#fff" }} />
            <div
              style={{
                position: "absolute",
                top: 12,
                right: 11,
                width: 10,
                height: 10,
                borderRadius: 9999,
                background: "#F97316",
              }}
            />
          </div>
          <div style={{ fontSize: 40, fontWeight: 800 }}>{siteConfig.name}</div>
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
