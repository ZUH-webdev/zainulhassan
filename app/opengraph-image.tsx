import { ImageResponse } from "next/og";

export const alt = "Zain Ul Hassan, Senior Full Stack Developer (AI SaaS)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
              alignItems: "center",
              gap: 14,
              border: "1px solid #23262D",
              background: "#0E1013",
              borderRadius: 999,
              padding: "10px 22px",
              fontSize: 22,
              color: "#9A9DA6",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#D4FF3F" }} />
            Open for new projects
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.035em" }}>
            I build AI SaaS products that
          </div>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.1, color: "#D4FF3F", letterSpacing: "-0.035em" }}>
            ship.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#9A9DA6" }}>
          <div style={{ display: "flex" }}>Zain Ul Hassan · Senior Full Stack Developer</div>
          <div style={{ display: "flex", color: "#D4FF3F" }}>zainulhassan.site</div>
        </div>
      </div>
    ),
    size,
  );
}
