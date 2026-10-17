import { site } from "@/lib/site";

// Per-card reveal delay, bob phase and the --k offset of the first star
const cards = [
  { d: "", bob: "", k0: 0 },
  { d: " d1", bob: " b-2", k0: 2 },
  { d: " d2", bob: " b-3", k0: 4 },
];

export default function Testimonials() {
  return (
    <section className="wrap" style={{ paddingTop: 96, paddingBottom: 40 }}>
      <div className="eyebrow rv">05 / Kind words</div>
      <h2 className="h2 rv d1">What clients say</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 48 }}>
        {site.testimonials.map((t, i) => {
          const c = cards[i];
          return (
            <div key={i} className={`rvp${c.d}`} style={{ flex: "1 1 340px", minWidth: 0, display: "flex" }}>
              <div className={`tcard bob${c.bob}`} style={{ flex: 1 }}>
                <div className="qmark">&quot;</div>
                <div>
                  {Array.from({ length: 5 }, (_, s) => (
                    <span key={s} className="star" style={{ "--k": c.k0 + s } as React.CSSProperties}>
                      ★
                    </span>
                  ))}
                </div>
                <p style={{ margin: 0, fontSize: 19, lineHeight: 1.5 }}>{t.quote}</p>
                <div style={{ color: "#9A9DA6", fontSize: 15, marginTop: "auto" }}>
                  {t.author}
                  <br />
                  {t.source}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
