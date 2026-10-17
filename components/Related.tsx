export type RelatedItem = { href: string; kicker: string; title: string; text: string; cta?: string };

/** Reusable "related" card grid used across service pages, case studies and posts. */
export default function Related({
  eyebrow,
  title,
  items,
  id,
}: {
  eyebrow: string;
  title: string;
  items: RelatedItem[];
  id: string;
}) {
  return (
    <section className="wrap sec" aria-labelledby={id}>
      <div className="eyebrow rv">{eyebrow}</div>
      <h2 id={id} className="h2 rv d1">
        {title}
      </h2>
      <div className="cards">
        {items.map((it) => (
          <a key={it.href} href={it.href} className="card lcard rv">
            <div className="mono" style={{ fontSize: 12.5, color: "#9A9DA6", letterSpacing: ".04em" }}>
              {it.kicker}
            </div>
            <h3 className="disp" style={{ fontWeight: 700, fontSize: 24, letterSpacing: "-.02em", margin: "12px 0 10px" }}>
              {it.title}
            </h3>
            <p style={{ margin: 0, color: "#9A9DA6", fontSize: 16 }}>{it.text}</p>
            <span className="more mono">{it.cta ?? "Read more"} →</span>
            <span className="sweep"></span>
          </a>
        ))}
      </div>
    </section>
  );
}
