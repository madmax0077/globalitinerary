import { ImageResponse } from "next/og";

/** Google SERP favicon — crisp 48×48 PNG (pin mark, no nested SVG for Satori). */
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
          background: "linear-gradient(135deg, #1D4ED8 0%, #2563EB 55%, #38BDF8 100%)",
          borderRadius: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 9999,
              background: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 9999,
                background: "#1D4ED8",
                border: "3px solid #F97316",
              }}
            />
          </div>
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "12px solid #FFFFFF",
              marginTop: -3,
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
