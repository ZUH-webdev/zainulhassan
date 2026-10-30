import type { ReactNode } from "react";
import type { CaseStudy } from "@/content/work";
import { flutron } from "@/content/work/flutron";
import { leadsmind } from "@/content/work/leadsmind";
import { pulse } from "@/content/work/pulse";
import { sentinel } from "@/content/work/sentinel";

const barHeights = ["35%", "50%", "42%", "68%", "60%", "82%", "100%"];
const jobs = ["Maths Teacher", "Primary Teacher", "ESL Teacher", "Science Teacher"];

const LeadsMindViz = () => (
  <div className="viz">
    <div
      className="mono"
      style={{
        position: "absolute",
        left: 20,
        top: 14,
        fontSize: 12,
        color: "#9A9DA6",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span className="live-dot"></span>AI revenue forecast
    </div>
    <div className="bars">
      {barHeights.map((h, k) => (
        <i key={k} style={{ "--k": k, height: h } as React.CSSProperties}></i>
      ))}
    </div>
  </div>
);

const WtaViz = () => (
  <div className="viz">
    <div className="vs">
      <div className="vs-in">
        {[...jobs, ...jobs].map((j, i) => (
          <div key={i} className="job">
            <span>{j}</span>
            <span className="mono" style={{ fontSize: 12, color: "var(--ac)" }}>
              Apply
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const VelocityViz = () => (
  <div className="viz">
    <div className="pr"></div>
    <div className="pr" style={{ animationDelay: "1.3s" }}></div>
    <div className="ph">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="#0A0B0D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
      </svg>
    </div>
    <div className="wv">
      {Array.from({ length: 12 }, (_, k) => (
        <i key={k} style={{ "--k": k } as React.CSSProperties}></i>
      ))}
    </div>
    <div className="cap" style={{ animationDelay: "0s" }}>
      Missed call detected
    </div>
    <div className="cap" style={{ animationDelay: "2s", color: "var(--ac)" }}>
      AI follows up
    </div>
    <div className="cap" style={{ animationDelay: "4s" }}>
      Appointment booked ✓
    </div>
  </div>
);

const heart = [".XX...XX.", "XXXX.XXXX", "XXXXXXXXX", ".XXXXXXX.", "..XXXXX..", "...XXX...", "....X...."];

const FlutronViz = () => (
  <div className="viz">
    <div
      className="mono"
      style={{
        position: "absolute",
        left: 20,
        top: 14,
        fontSize: 12,
        color: "#9A9DA6",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span className="live-dot"></span>Drone formation
    </div>
    <div className="drones">
      {heart.flatMap((row, y) =>
        [...row].map((c, x) => (
          <i key={`${x}-${y}`} className={c === "X" ? "on" : undefined} style={{ "--k": x + y } as React.CSSProperties}></i>
        )),
      )}
    </div>
  </div>
);

const themeHeights = ["100%", "78%", "64%", "52%", "40%", "31%", "24%"];

const PulseViz = () => (
  <div className="viz">
    <div
      className="mono"
      style={{
        position: "absolute",
        left: 20,
        top: 14,
        fontSize: 12,
        color: "#9A9DA6",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span className="live-dot"></span>Feedback themes, ranked
    </div>
    <div className="bars">
      {themeHeights.map((h, k) => (
        <i key={k} style={{ "--k": k, height: h } as React.CSSProperties}></i>
      ))}
    </div>
  </div>
);

const findings = [
  ["RLS disabled on table", "Critical"],
  ["Policy allows any user", "High"],
  ["Route skips auth check", "High"],
  ["Missing ownership check", "Medium"],
];

const SentinelViz = () => (
  <div className="viz">
    <div className="vs">
      <div className="vs-in">
        {[...findings, ...findings].map(([title, severity], i) => (
          <div key={i} className="job">
            <span>{title}</span>
            <span className="mono" style={{ fontSize: 12, color: "var(--ac)" }}>
              {severity}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/** Card for a /work case study: kicker from badge and type, bullets from the first features. */
const workCard = (w: CaseStudy, reveal: Project["reveal"], viz: ReactNode, tags: string[]): Project => ({
  reveal,
  slug: w.slug,
  href: `/work/${w.slug}`,
  kicker: `${w.badge} · ${w.type}`.toUpperCase(),
  title: w.title,
  body: w.pitch,
  tags,
  viz,
  bullets: w.features.slice(0, 4).map((f) => f.title),
});

type Project = {
  reveal: "rvl" | "rvr";
  slug: string;
  /** Case study URL; defaults to /case-studies/<slug>. */
  href?: string;
  kicker: string;
  title: string;
  body: string;
  tags: string[];
  viz: ReactNode;
  bullets: string[];
};

const projects: Project[] = [
  {
    reveal: "rvl",
    slug: leadsmind.slug,
    kicker: `${leadsmind.badge} · ${leadsmind.type}`.toUpperCase(),
    title: "LeadsMind",
    body: leadsmind.pitch,
    tags: ["Next.js", "Supabase", "Paystack", "pgvector"],
    viz: <LeadsMindViz />,
    bullets: [
      "157 API routes audited and hardened, with RLS fixes across the platform",
      "AI suite: forecasting, ad and landing copy, course Q&A with RAG",
      "Real OAuth publishing to LinkedIn, TikTok, YouTube, Facebook and Instagram",
      "Billing migrated from Stripe to Paystack",
    ],
  },
  {
    reveal: "rvr",
    slug: "velocity",
    kicker: "OWN PRODUCT · AI CALL RECOVERY",
    title: "Velocity",
    body: "AI missed-call recovery and appointment booking for local businesses. I co-founded it and built the dashboard, auth and messaging integrations.",
    tags: ["Next.js", "Node.js", "Twilio", "Resend"],
    viz: <VelocityViz />,
    bullets: ["Dashboard and auth for business owners", "Twilio and Resend integrations", "Live at velocity-ai.site"],
  },
  workCard(sentinel, "rvl", <SentinelViz />, ["Next.js", "Supabase", "Edge Functions", "OpenAI"]),
  {
    reveal: "rvr",
    slug: flutron.slug,
    href: `/work/${flutron.slug}`,
    kicker: flutron.kicker,
    title: flutron.client,
    body: flutron.cardBody,
    tags: ["Multilingual", "Booking flow", "Pricing pages"],
    viz: <FlutronViz />,
    bullets: flutron.cardBullets,
  },
  workCard(pulse, "rvl", <PulseViz />, ["Next.js", "Supabase", "pgvector", "OpenAI"]),
  {
    reveal: "rvr",
    slug: "world-teachers-academy",
    kicker: "EDTECH · JOB PORTAL",
    title: "World Teachers Academy",
    body: "A Next.js and Supabase site for a South African teacher certification and placement business, with a job portal that captures each candidate as a lead before they apply.",
    tags: ["Next.js", "Supabase", "Vercel", "Resend"],
    viz: <WtaViz />,
    bullets: [
      "Nightly job ingestion from Adzuna and Reed into Supabase",
      "Lead capture built into the apply flow",
      "Database-backed blog replacing hardcoded template content",
    ],
  },
];

export default function Work() {
  return (
    <section id="work" className="wrap" style={{ paddingTop: 96, paddingBottom: 40 }}>
      <div className="eyebrow rv">02 / Selected work</div>
      <h2 className="h2 rv d1">Products I&apos;ve built and shipped</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 28, marginTop: 48 }}>
        {projects.map((p) => (
          <div key={p.title} className={`work ${p.reveal}`} style={{ display: "flex", flexWrap: "wrap", gap: 36 }}>
            <div className="wcol">
              <div className="mono" style={{ fontSize: 13, color: "#9A9DA6" }}>
                {p.kicker}
              </div>
              <h3 className="disp wtitle">
                <a className="tlink" href={p.href ?? `/case-studies/${p.slug}`}>
                  {p.title}
                </a>
              </h3>
              <p style={{ margin: 0, color: "#9A9DA6" }}>{p.body}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
                {p.tags.map((t) => (
                  <span key={t} className="pill">
                    {t}
                  </span>
                ))}
              </div>
              <a
                className="ghost-btn wcta mono"
                href={p.href ?? `/case-studies/${p.slug}`}
                aria-label={`Read the ${p.title} case study`}
                data-track="cta_click"
                data-track-location="home-work"
              >
                Read case study →
              </a>
            </div>
            <div className="wcol wviz">
              {p.viz}
              {p.bullets.map((b) => (
                <div key={b} className="bl">
                  {b}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
