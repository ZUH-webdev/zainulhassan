const steps = [
  {
    d: "",
    pd: "0s",
    title: "Discovery call",
    body: "We talk goals, users and constraints. You leave with a clear scope and honest timeline.",
  },
  {
    d: " d1",
    pd: ".5s",
    title: "Plan and architecture",
    body: "Data model, security rules and milestones agreed before a line of code is written.",
  },
  {
    d: " d2",
    pd: "1s",
    title: "Build in milestones",
    body: "Working software at every milestone, with written progress reports so you always know where things stand.",
  },
  {
    d: " d3",
    pd: "1.5s",
    title: "Launch and support",
    body: "Deployment, handover and ongoing improvements after you go live.",
  },
];

export default function Process() {
  return (
    <section id="process" className="wrap" style={{ paddingTop: 96, paddingBottom: 40 }}>
      <div className="eyebrow rv">03 / Process</div>
      <h2 className="h2 rv d1">Clear steps, no surprises</h2>
      <div style={{ position: "relative", marginTop: 56 }}>
        <div className="pline">
          <i className="draw"></i>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "28px 24px", paddingTop: 0 }}>
          {steps.map((s, i) => (
            <div key={s.title} className={`step rv${s.d}`} style={{ flex: "1 1 240px", minWidth: 0 }}>
              <div className="dot" style={{ "--pd": s.pd } as React.CSSProperties}></div>
              <div className="mono" style={{ fontSize: 13, color: "#9A9DA6", marginTop: 26 }}>
                STEP {i + 1}
              </div>
              <h3 className="disp" style={{ fontWeight: 700, fontSize: 24, letterSpacing: "-.02em", margin: "10px 0 8px" }}>
                {s.title}
              </h3>
              <p style={{ margin: 0, color: "#9A9DA6", fontSize: 16 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
