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
          background: "#0A0B0D",
          color: "#ECEAE4",
          fontSize: 120,
          fontWeight: 800,
          letterSpacing: "-0.04em",
        }}
      >
        z<span style={{ color: "#D4FF3F" }}>.</span>
      </div>
    ),
    size,
  );
}
