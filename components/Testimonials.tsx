import { testimonials } from "@/content/testimonials";
import { SHOW_TESTIMONIALS, SITE, external } from "@/lib/site";

// Per-card reveal delay, bob phase and the --k offset of the first star
const cards = [
  { d: "", bob: "", k0: 0 },
  { d: " d1", bob: " b-2", k0: 2 },
  { d: " d2", bob: " b-3", k0: 4 },
  { d: " d3", bob: "", k0: 6 },
];

/** Verifiable facts shown while there are no published testimonials. */
const record = [
  {
    kicker: "UPWORK",
    title: "Top Rated on Upwork",
    text: "I earned Top Rated status on Upwork through freelance contracts with clients in Africa, the US and the MENA region.",
  },
  {
    kicker: "UPWORK",
    title: "100% Job Success Score",
    text: "My Job Success Score on Upwork is 100%. I protect it by agreeing scope in writing before I build.",
  },
  {
    kicker: "LEADSMIND",
    title: "5-star client review",
    text: "The LeadsMind contract, delivered in milestones with PDF progress reports, closed with a 5-star review.",
    stars: true,
  },
  {
    kicker: "EXPERIENCE",
    title: "4+ years building AI SaaS",
    text: "I have spent more than four years building SaaS products with Next.js, Supabase and the OpenAI and Claude APIs.",
  },
];

const Stars = ({ k0, label }: { k0: number; label?: string }) => (
  <div role={label ? "img" : undefined} aria-label={label}>
    {Array.from({ length: 5 }, (_, s) => (
      <span key={s} className="star" style={{ "--k": k0 + s } as React.CSSProperties} aria-hidden={label ? true : undefined}>
        ★
      </span>
    ))}
  </div>
);

function Reviews() {
  return (
    <section className="wrap" style={{ paddingTop: 96, paddingBottom: 40 }}>
      <div className="eyebrow rv">05 / Kind words</div>
      <h2 className="h2 rv d1">What clients say</h2>
      <div className="tgrid" role="region" aria-label="Client reviews" tabIndex={0}>
        {testimonials.map((t, i) => {
          const c = cards[i % cards.length];
          return (
            <div key={t.name + i} className={`titem rvp${c.d}`}>
              <figure className={`tcard bob${c.bob}`} style={{ flex: 1, margin: 0 }}>
                <div className="qmark" aria-hidden="true">
                  &quot;
                </div>
                <Stars k0={c.k0} />
                <blockquote style={{ margin: 0 }}>
                  <p style={{ margin: 0, fontSize: 19, lineHeight: 1.5 }}>{t.quote}</p>
                </blockquote>
                <figcaption style={{ color: "#9A9DA6", fontSize: 15, marginTop: "auto" }}>
                  {t.name}, {t.role}
                  <br />
                  {t.company}
                  {t.project && (
                    <>
                      {" · "}
                      <a className="alnk" href={t.project.href} {.../^https?:/.test(t.project.href) ? external : {}}>
                        {t.project.label}
                      </a>
                    </>
                  )}
                </figcaption>
              </figure>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function TrackRecord() {
  return (
    <section className="wrap" style={{ paddingTop: 96, paddingBottom: 40 }}>
      <div className="eyebrow rv">05 / Track record</div>
      <h2 className="h2 rv d1">A track record you can check</h2>
      <div className="tgrid t4" role="region" aria-label="Track record" tabIndex={0}>
        {record.map((r, i) => {
          const c = cards[i];
          return (
            <div key={r.title} className={`titem rvp${c.d}`}>
              <div className={`tcard bob${c.bob}`} style={{ flex: 1 }}>
                <div className="qmark" aria-hidden="true">
                  ✓
                </div>
                {r.stars ? (
                  <Stars k0={c.k0} label="5 out of 5 stars" />
                ) : (
                  <div className="mono" style={{ fontSize: 13, color: "#9A9DA6" }}>
                    {r.kicker}
                  </div>
                )}
                <div>
                  <h3 className="disp" style={{ margin: "0 0 10px", fontSize: 24, fontWeight: 700, letterSpacing: "-.02em" }}>
                    {r.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: 17, lineHeight: 1.5, color: "#9A9DA6" }}>{r.text}</p>
                </div>
                <a
                  className="alnk"
                  href={SITE.upwork}
                  {...external}
                  data-track="upwork_click"
                  data-track-location="track-record"
                  aria-label={`See my reviews on Upwork: ${r.title} (opens in a new tab)`}
                  style={{ fontSize: 15, marginTop: "auto", color: "var(--ac)", display: "inline-flex", alignItems: "center", alignSelf: "flex-start", minHeight: 44 }}
                >
                  See my reviews on Upwork
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function Testimonials() {
  return SHOW_TESTIMONIALS && testimonials.length > 0 ? <Reviews /> : <TrackRecord />;
}
