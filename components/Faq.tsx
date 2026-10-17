import type { Faq as FaqItem } from "@/content/services";

/** Visible FAQ using native <details>; FAQPage JSON-LD is added in the page @graph. */
export default function Faq({ items, title = "Frequently asked questions" }: { items: FaqItem[]; title?: string }) {
  return (
    <section className="wrap sec" aria-labelledby="faq-title">
      <div className="eyebrow rv">FAQ</div>
      <h2 id="faq-title" className="h2 rv d1">
        {title}
      </h2>
      <div className="faq">
        {items.map((f) => (
          <details key={f.q}>
            <summary>
              <h3>{f.q}</h3>
            </summary>
            <p className="ans">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
