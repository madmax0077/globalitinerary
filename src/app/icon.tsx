import { ImageResponse } from "next/og";

/** Favicon: itinerary route + destination pin on blue tile */
export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "linear-gradient(145deg, #1E3A8A 0%, #2563EB 50%, #38BDF8 100%)",
          borderRadius: 12,
        }}
      >
        {/* Globe disc */}
        <div
          style={{
            position: "absolute",
            width: 30,
            height: 30,
            borderRadius: 9999,
            background: "rgba(255,255,255,0.16)",
            border: "1.5px solid rgba(255,255,255,0.35)",
          }}
        />
        {/* Route stops */}
        <div
          style={{
            position: "absolute",
            left: 8,
            bottom: 14,
            width: 7,
            height: 7,
            borderRadius: 9999,
            background: "#fff",
            border: "2px solid #2563EB",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 20,
            top: 22,
            width: 7,
            height: 7,
            borderRadius: 9999,
            background: "#fff",
            border: "2px solid #0EA5E9",
          }}
        />
        {/* Connecting route bar (approx) */}
        <div
          style={{
            position: "absolute",
            left: 12,
            top: 26,
            width: 18,
            height: 3,
            background: "#fff",
            borderRadius: 4,
            transform: "rotate(-28deg)",
            opacity: 0.95,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 24,
            top: 16,
            width: 12,
            height: 3,
            background: "#FEF3C7",
            borderRadius: 4,
            transform: "rotate(-38deg)",
            opacity: 0.95,
          }}
        />
        {/* Destination pin */}
        <div
          style={{
            position: "absolute",
            right: 7,
            top: 7,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 9999,
              background: "#F97316",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: 9999,
                background: "#fff",
              }}
            />
          </div>
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderTop: "6px solid #F97316",
              marginTop: -1,
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
