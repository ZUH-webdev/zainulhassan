import { TRUST, external, mailto, SITE } from "@/lib/site";

/** Primary CTAs used above the fold on inner pages: Upwork + email, with trust line. */
export default function CtaButtons({ location }: { location: string }) {
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 36 }}>
        <a
          className="shine"
          href={SITE.upwork}
          {...external}
          data-track="upwork_click"
          data-track-location={location}
          aria-label="Hire me on Upwork (opens in a new tab)"
          style={{ background: "var(--ac)", color: "#0A0B0D", fontWeight: 600, padding: "16px 28px", borderRadius: 999 }}
        >
          Hire me on Upwork
        </a>
        <a
          className="ghost-btn"
          href={mailto}
          data-track="email_click"
          data-track-location={location}
          style={{ border: "1px solid #2E323B", padding: "16px 28px", borderRadius: 999, fontWeight: 500 }}
        >
          Email me
        </a>
      </div>
      <div
        className="mono"
        style={{ display: "flex", flexWrap: "wrap", gap: "12px 28px", marginTop: 32, fontSize: 13, color: "#9A9DA6" }}
      >
        {TRUST.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </>
  );
}
