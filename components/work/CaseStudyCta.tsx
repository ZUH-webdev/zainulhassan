import HireButton from "@/components/hire/HireButton";

const starPath = "M24 2 C25 15 33 23 46 24 C33 25 25 33 24 46 C23 33 15 25 2 24 C15 23 23 15 24 2 Z";

/** Accent CTA band that closes a case study, with the hire button. */
export default function CaseStudyCta({ title, lead, source }: { title: string; lead: string; source: string }) {
  return (
    <div
      className="rvp ctap pcta"
      style={{ position: "relative", overflow: "hidden", background: "var(--ac)", color: "#0A0B0D", borderRadius: 32, textAlign: "center" }}
    >
      <svg className="star-spin" style={{ right: -40, top: -40 }} width="180" height="180" viewBox="0 0 48 48" aria-hidden="true">
        <path d={starPath} fill="#0A0B0D" opacity=".14" />
      </svg>
      <svg className="star-spin rv2" style={{ left: -30, bottom: -30 }} width="120" height="120" viewBox="0 0 48 48" aria-hidden="true">
        <path d={starPath} fill="#0A0B0D" opacity=".14" />
      </svg>
      <h2
        id="cs-cta-h"
        className="disp pctah"
        style={{ position: "relative", fontWeight: 800, lineHeight: 1.02, letterSpacing: "-.035em", margin: "0 auto", maxWidth: 820 }}
      >
        {title}
      </h2>
      <p style={{ position: "relative", fontSize: 19, margin: "22px auto 0", maxWidth: 560, color: "#2B3000" }}>{lead}</p>
      <div className="ctabtns" style={{ position: "relative", display: "flex", justifyContent: "center", marginTop: 34 }}>
        <HireButton
          source={`${source}-cta`}
          className="shine"
          href="/contact"
          data-track="cta_click"
          data-track-location={`${source}-cta`}
          style={{ background: "#0A0B0D", color: "#ECEAE4", fontWeight: 600, padding: "16px 28px", borderRadius: 999 }}
        >
          Hire me
        </HireButton>
      </div>
    </div>
  );
}
