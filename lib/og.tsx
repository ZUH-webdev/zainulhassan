import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** Shared 1200x630 Open Graph card: dark background, lime accent, page title. */
export function ogImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  const size = title.length > 70 ? 56 : title.length > 45 ? 66 : 78;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0A0B0D",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "#ECEAE4",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 800, letterSpacing: "-0.02em" }}>
            zain<span style={{ color: "#D4FF3F" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#D4FF3F",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: size, fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.035em", maxWidth: 1040 }}>
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "#9A9DA6" }}>
          <div style={{ display: "flex" }}>Zain Ul Hassan · Senior Full Stack Developer</div>
          <div style={{ display: "flex", height: 8, width: 160, borderRadius: 4, background: "#D4FF3F" }} />
        </div>
      </div>
    ),
    ogSize,
  );
}
