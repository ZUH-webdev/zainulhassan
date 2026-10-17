const row1 = ["Next.js", "React", "TypeScript", "Node.js", "Supabase", "PostgreSQL", "Row Level Security", "Edge Functions"];
const row2 = ["OpenAI API", "Claude API", "Stripe", "Paystack", "Tailwind CSS", "shadcn/ui", "Twilio", "Vercel"];

const Chips = ({ items }: { items: string[] }) =>
  [...items, ...items].map((c, i) => (
    <span key={i} className="chip2">
      {c}
    </span>
  ));

export default function Stack() {
  return (
    <section style={{ paddingTop: 96, paddingBottom: 40 }}>
      <div className="wrap" style={{ marginBottom: 36 }}>
        <div className="eyebrow rv">04 / Stack</div>
        <h2 className="h2 rv d1">Tools I ship with every day</h2>
      </div>
      <div className="mq" style={{ marginBottom: 16 }}>
        <div className="mq-in">
          <Chips items={row1} />
        </div>
      </div>
      <div className="mq">
        <div className="mq-in rev">
          <Chips items={row2} />
        </div>
      </div>
    </section>
  );
}
