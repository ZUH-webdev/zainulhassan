const stats = [
  { cls: "c4", label: "years building AI-powered SaaS" },
  { cls: "c10", label: "projects delivered end to end" },
  { cls: "c100", label: "Upwork Job Success Score" },
  { cls: "c3", label: "regions served: Africa, US, MENA" },
];

export default function Stats() {
  return (
    <div className="wrap stats">
      {stats.map((s) => (
        <div key={s.cls} className="stat">
          <div className="draw"></div>
          <div className={`disp cnt statn ${s.cls}`}></div>
          <div style={{ color: "#9A9DA6", fontSize: 15, marginTop: 10 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}
