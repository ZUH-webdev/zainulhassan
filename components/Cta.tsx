import { emailHref, linkProps, site, upworkHref } from "@/lib/site";

const words = [
  { label: "Let's build", outline: true },
  { label: "Let's ship", outline: false },
  { label: "Let's scale", outline: true },
];

const starPath = "M24 2 C25 15 33 23 46 24 C33 25 25 33 24 46 C23 33 15 25 2 24 C15 23 23 15 24 2 Z";

export default function Cta() {
  return (
    <section id="contact" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="mq slow" style={{ marginBottom: 48 }}>
        <div className="mq-in">
          {[...words, ...words].map((w, i) => (
            <span key={i} className={w.outline ? "big outline" : "big"}>
              {w.label}
              <em>/</em>
            </span>
          ))}
        </div>
      </div>
      <div className="wrap">
        <div
          className="rvp"
          style={{
            position: "relative",
            overflow: "hidden",
            background: "var(--ac)",
            color: "#0A0B0D",
            borderRadius: 32,
            padding: "80px 40px",
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
            className="disp"
            style={{
              position: "relative",
              fontWeight: 800,
              fontSize: "clamp(36px,5.4vw,72px)",
              lineHeight: 1,
              letterSpacing: "-.035em",
              margin: "0 auto",
              maxWidth: 820,
            }}
          >
            Have a product to build? Let&apos;s talk.
          </h2>
          <p style={{ position: "relative", fontSize: 19, margin: "24px auto 0", maxWidth: 560, color: "#2B3000" }}>
            Tell me what you&apos;re building. I reply within one working day with next steps and an honest estimate.
          </p>
          <div
            style={{
              position: "relative",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 14,
              marginTop: 36,
            }}
          >
            <a
              className="shine"
              {...linkProps(emailHref)}
              style={{ background: "#0A0B0D", color: "#ECEAE4", fontWeight: 600, padding: "16px 28px", borderRadius: 999 }}
            >
              Email me: {site.email}
            </a>
            <a
              className="ghost-btn"
              {...linkProps(upworkHref)}
              style={{ border: "1.5px solid #0A0B0D", fontWeight: 600, padding: "16px 28px", borderRadius: 999 }}
            >
              Hire on Upwork: {site.upworkUrl}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
