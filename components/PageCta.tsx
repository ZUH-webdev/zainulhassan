import CopyEmail from "@/components/CopyEmail";
import HireButton from "@/components/hire/HireButton";
import { external, mailto, SITE } from "@/lib/site";

const starPath = "M24 2 C25 15 33 23 46 24 C33 25 25 33 24 46 C23 33 15 25 2 24 C15 23 23 15 24 2 Z";

/**
 * Closing CTA panel for inner pages (same visual language as the homepage CTA).
 * With `hire`, the primary button opens the hire modal (a real link to /hire without JS)
 * and the footnote links to /hire instead of /contact.
 */
export default function PageCta({
  title = "Have a product to build? Let's talk.",
  text = "Tell me what you're building. I reply within one working day with next steps and an honest estimate.",
  location,
  hire = false,
}: {
  title?: string;
  text?: string;
  location: string;
  hire?: boolean;
}) {
  return (
    <section className="wrap" style={{ paddingTop: 96, paddingBottom: 96 }} aria-labelledby="cta-title">
      <div
        className="rvp ctap pcta ctapad"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "var(--ac)",
          color: "#0A0B0D",
          borderRadius: 32,
          textAlign: "center",
        }}
      >
        <svg className="star-spin" style={{ right: -40, top: -40 }} width="180" height="180" viewBox="0 0 48 48" aria-hidden="true">
          <path d={starPath} fill="#0A0B0D" opacity=".14" />
        </svg>
        <svg className="star-spin rv2" style={{ left: -30, bottom: -30 }} width="120" height="120" viewBox="0 0 48 48" aria-hidden="true">
          <path d={starPath} fill="#0A0B0D" opacity=".14" />
        </svg>
        <h2
          id="cta-title"
          className="disp pctah"
          style={{
            position: "relative",
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: "-.035em",
            margin: "0 auto",
            maxWidth: 820,
          }}
        >
          {title}
        </h2>
        <p style={{ position: "relative", fontSize: 19, margin: "22px auto 0", maxWidth: 560, color: "#2B3000" }}>
          {text}
        </p>
        <div
          className="ctabtns"
          style={{ position: "relative", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, marginTop: 34 }}
        >
          {hire && (
            <HireButton
              source={`${location}-cta`}
              className="shine"
              href="/hire"
              data-track="cta_click"
              data-track-location={`${location}-cta`}
              style={{ background: "#0A0B0D", color: "#ECEAE4", fontWeight: 600, padding: "16px 28px", borderRadius: 999 }}
            >
              Hire me
            </HireButton>
          )}
          <a
            className={hire ? "ghost-btn" : "shine"}
            href={SITE.upwork}
            {...external}
            data-track="upwork_click"
            data-track-location={location}
            aria-label="Hire me on Upwork (opens in a new tab)"
            style={
              hire
                ? { border: "1.5px solid #0A0B0D", fontWeight: 600, padding: "16px 28px", borderRadius: 999 }
                : { background: "#0A0B0D", color: "#ECEAE4", fontWeight: 600, padding: "16px 28px", borderRadius: 999 }
            }
          >
            Hire me on Upwork
          </a>
          {!hire && (
            <a
              className="ghost-btn"
              href={mailto}
              data-track="email_click"
              data-track-location={location}
              style={{ border: "1.5px solid #0A0B0D", fontWeight: 600, padding: "16px 28px", borderRadius: 999 }}
            >
              Email me
            </a>
          )}
          <CopyEmail />
        </div>
        <p style={{ position: "relative", margin: "26px 0 0", fontSize: 15, color: "#2B3000" }}>
          {hire ? (
            <>
              Prefer to write a full brief? Use the <a className="ctal" href="/hire">hire page</a>.
            </>
          ) : (
            <>
              Prefer details first? See the <a className="ctal" href="/contact">contact page</a>.
            </>
          )}
        </p>
      </div>
    </section>
  );
}
