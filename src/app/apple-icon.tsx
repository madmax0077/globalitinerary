import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          background: "linear-gradient(145deg, #1E3A8A 0%, #2563EB 48%, #38BDF8 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 108,
            height: 108,
            borderRadius: 9999,
            background: "rgba(255,255,255,0.15)",
            border: "3px solid rgba(255,255,255,0.32)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 34,
            bottom: 52,
            width: 22,
            height: 22,
            borderRadius: 9999,
            background: "#fff",
            border: "5px solid #2563EB",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 78,
            top: 78,
            width: 24,
            height: 24,
            borderRadius: 9999,
            background: "#fff",
            border: "5px solid #0EA5E9",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 48,
            top: 96,
            width: 58,
            height: 8,
            background: "#fff",
            borderRadius: 8,
            transform: "rotate(-30deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 92,
            top: 58,
            width: 36,
            height: 8,
            background: "#FEF3C7",
            borderRadius: 8,
            transform: "rotate(-40deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 28,
            top: 28,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 9999,
              background: "#F97316",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 9999,
                background: "#fff",
              }}
            />
          </div>
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "12px solid transparent",
              borderRight: "12px solid transparent",
              borderTop: "18px solid #F97316",
              marginTop: -4,
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
