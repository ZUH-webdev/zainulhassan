const items = [
  { label: "Next.js", outline: true },
  { label: "Supabase", outline: false },
  { label: "TypeScript", outline: true },
  { label: "OpenAI", outline: false },
  { label: "Claude", outline: true },
  { label: "Stripe", outline: false },
  { label: "Paystack", outline: true },
  { label: "Tailwind", outline: false },
];

export default function TechMarquee() {
  return (
    <div style={{ borderTop: "1px solid #1B1E24", borderBottom: "1px solid #1B1E24", background: "#0E1013", padding: "26px 0" }}>
      <div className="mq">
        <div className="mq-in">
          {[...items, ...items].map((t, i) => (
            <span key={i} className={t.outline ? "big outline" : "big"}>
              {t.label}
              <em>/</em>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
