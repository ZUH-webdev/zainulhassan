const steps = [
  {
    title: "Discovery call",
    body: "A short call about what you are building, who it is for and what already exists. Afterwards I send a written scope and estimate.",
    // chat bubble
    icon: (
      <>
        <path pathLength={1} d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        <path pathLength={1} d="M8 9h8" />
        <path pathLength={1} d="M8 12.5h5" />
      </>
    ),
  },
  {
    title: "Plan and architecture",
    body: "We agree the data model, Row Level Security rules and milestone list in writing before I start on features.",
    // blueprint grid
    icon: (
      <>
        <rect pathLength={1} x="3" y="3" width="18" height="18" rx="2" />
        <path pathLength={1} d="M3 9h18" />
        <path pathLength={1} d="M3 15h18" />
        <path pathLength={1} d="M9 3v18" />
        <path pathLength={1} d="M15 9v12" />
      </>
    ),
  },
  {
    title: "Build in milestones",
    body: "Each milestone ends with working software you can test and a written progress report on what shipped and what is next.",
    // code brackets </>
    icon: (
      <>
        <path pathLength={1} d="M8 7l-5 5 5 5" />
        <path pathLength={1} d="M16 7l5 5-5 5" />
        <path pathLength={1} d="M14 4l-4 16" />
      </>
    ),
  },
  {
    title: "Launch and handover",
    body: "I deploy to production, hand over the code, accounts and documentation, and stay available for fixes and the next features.",
    // rocket
    icon: (
      <>
        <path pathLength={1} d="M12 2.5c3 2 4.8 5.5 4.8 9.5v4.5H7.2V12c0-4 1.8-7.5 4.8-9.5z" />
        <circle pathLength={1} cx="12" cy="10" r="1.8" />
        <path pathLength={1} d="M7.2 13.5L4.5 16.5v3l2.7-1.5" />
        <path pathLength={1} d="M16.8 13.5l2.7 3v3l-2.7-1.5" />
        <path pathLength={1} d="M10 19.5l2 2.5 2-2.5" />
      </>
    ),
  },
];

export default function Process({
  id = "process",
  eyebrow = "03 / Process",
  title = "Clear steps, no surprises",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section id={id} className="wrap" style={{ paddingTop: 96, paddingBottom: 40 }}>
      <div className="eyebrow rv">{eyebrow}</div>
      <h2 className="h2 rv d1">{title}</h2>
      <div className="ptrack">
        <div className="pline" aria-hidden="true">
          <i className="pfill"></i>
          <i className="prun">
            <b></b>
          </i>
        </div>
        <div className="psteps">
          {steps.map((s, i) => (
            <div key={s.title} className="pstep">
              <div className="pdot"></div>
              <div className="pcard">
                <div className="pnum" aria-hidden="true"></div>
                <div className="prow">
                  <svg className="pic" viewBox="0 0 24 24" aria-hidden="true">
                    {s.icon}
                  </svg>
                  <div className="plab mono">
                    STEP {i + 1}
                    <span aria-hidden="true">STEP {i + 1}</span>
                  </div>
                </div>
                <h3 className="ptit disp">{s.title}</h3>
                <p className="pdesc">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
