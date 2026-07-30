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
          background: "linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)",
        }}
      >
        {/* orbit */}
        <div
          style={{
            position: "absolute",
            width: 150,
            height: 60,
            border: "10px solid #fff",
            borderRadius: 9999,
            transform: "rotate(-30deg)",
            opacity: 0.92,
          }}
        />
        {/* globe */}
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: 9999,
            background: "#fff",
          }}
        />
        {/* waypoint */}
        <div
          style={{
            position: "absolute",
            top: 34,
            right: 30,
            width: 26,
            height: 26,
            borderRadius: 9999,
            background: "#F97316",
          }}
        />
      </div>
    ),
    size
  );
}
