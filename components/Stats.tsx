const stats = [
  { cls: "c4", label: "years building AI-powered SaaS" },
  { cls: "c10", label: "projects delivered end to end" },
  { cls: "c100", label: "Upwork Job Success Score" },
  { cls: "c3", label: "regions served: Africa, US, MENA" },
];

export default function Stats() {
  return (
    <div className="wrap" style={{ paddingTop: 72, paddingBottom: 24, display: "flex", flexWrap: "wrap", gap: "32px 28px" }}>
      {stats.map((s) => (
        <div key={s.cls} className="stat" style={{ flex: "1 1 200px" }}>
          <div className="draw"></div>
          <div
            className={`disp cnt ${s.cls}`}
            style={{ fontWeight: 800, fontSize: 64, letterSpacing: "-.03em", lineHeight: 1 }}
          ></div>
          <div style={{ color: "#9A9DA6", fontSize: 15, marginTop: 10 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}
