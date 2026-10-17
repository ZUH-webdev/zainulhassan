import { Fragment } from "react";

const words = ["I", "build", "AI", "SaaS", "products", "that"];
const slotWords = ["ship.", "scale.", "convert.", "earn.", "ship."];
const dot = { width: 11, height: 11, borderRadius: "50%", background: "#3A3F49" };
const ac = { color: "var(--ac)" };

export default function Hero() {
  return (
    <header id="top" style={{ position: "relative" }}>
      <div className="grid"></div>
      <div
        className="wrap"
        style={{
          position: "relative",
          paddingTop: 88,
          paddingBottom: 84,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 56,
        }}
      >
        <div style={{ flex: "1 1 520px", minWidth: 0 }}>
          <div
            className="badge-live mono"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              border: "1px solid #23262D",
              background: "#0E1013",
              borderRadius: 999,
              padding: "8px 18px 8px 14px",
              fontSize: 13,
              color: "#9A9DA6",
            }}
          >
            <span className="live-dot"></span>
            Open for new projects
          </div>
          <h1 className="h1">
            {words.map((w, i) => (
              <Fragment key={w}>
                {i > 0 && " "}
                <span className="w" style={{ "--i": i } as React.CSSProperties}>
                  <span>{w}</span>
                </span>
              </Fragment>
            ))}{" "}
            <span className="slot">
              <span className="slot-in">
                {slotWords.map((w, i) => (
                  <span key={i}>{w}</span>
                ))}
              </span>
            </span>
          </h1>
          <p className="fx1" style={{ fontSize: 20, color: "#9A9DA6", maxWidth: 560, margin: "28px 0 0" }}>
            Senior full stack developer for founders and agencies. From database architecture to payments to production
            deploys, I take your idea from spec to paying customers.
          </p>
          <div className="fx2" style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 40 }}>
            <a
              className="shine"
              href="#contact"
              style={{ background: "var(--ac)", color: "#0A0B0D", fontWeight: 600, padding: "16px 28px", borderRadius: 999 }}
            >
              Start a project
            </a>
            <a
              className="ghost-btn"
              href="#work"
              style={{ border: "1px solid #2E323B", padding: "16px 28px", borderRadius: 999, fontWeight: 500 }}
            >
              See selected work
            </a>
          </div>
          <div
            className="fx3 mono"
            style={{ display: "flex", flexWrap: "wrap", gap: "12px 28px", marginTop: 44, fontSize: 13, color: "#9A9DA6" }}
          >
            <span>Top Rated on Upwork</span>
            <span>100% Job Success</span>
            <span>4+ years</span>
          </div>
        </div>

        <div className="cardwrap" style={{ flex: "1 1 420px", minWidth: 0, position: "relative", padding: "34px 18px" }}>
          <div className="ring">
            <i></i>
          </div>
          <div className="ring r2">
            <i></i>
          </div>
          <div className="badge b1">
            <span style={ac}>★</span> Top Rated on Upwork
          </div>
          <div className="badge b2">
            <span className="live-dot"></span> Deployed to production
          </div>
          <div
            className="code-card"
            style={{
              background: "#121418",
              border: "1px solid #23262D",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 40px 90px rgba(0,0,0,.55)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 18px", borderBottom: "1px solid #23262D" }}>
              <span style={dot}></span>
              <span style={dot}></span>
              <span style={dot}></span>
              <span className="mono" style={{ marginLeft: 12, fontSize: 12, color: "#9A9DA6" }}>
                policies/tenant_isolation.sql
              </span>
            </div>
            <div
              className="mono"
              style={{ padding: "22px 22px 18px", fontSize: 12.5, lineHeight: 1.85, overflowX: "auto", minHeight: 132 }}
            >
              <span className="ty" style={{ "--ch": 41, "--d": ".9s", color: "#6B707B" } as React.CSSProperties}>
                -- every tenant sees only their own rows
              </span>
              <span className="ty" style={{ "--ch": 32, "--d": "2s" } as React.CSSProperties}>
                <span style={ac}>create policy</span>
                {' "tenant_isolation"'}
              </span>
              <span className="ty" style={{ "--ch": 20, "--d": "2.9s" } as React.CSSProperties}>
                {"  "}
                <span style={ac}>on</span>
                {" leads "}
                <span style={ac}>for all</span>
              </span>
              <span style={{ display: "flex", alignItems: "center" }}>
                <span className="ty" style={{ "--ch": 51, "--d": "3.5s" } as React.CSSProperties}>
                  {"  "}
                  <span style={ac}>using</span>
                  {" (org_id = (auth.jwt() ->> 'org_id')::uuid);"}
                </span>
              </span>
              <span className="cur"></span>
            </div>
            <div
              className="toast"
              style={{
                margin: "0 18px 18px",
                border: "1px solid #2E323B",
                background: "#0E1013",
                borderRadius: 12,
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 14,
              }}
            >
              <span style={ac}>✓</span> RLS enabled · 157 API routes audited
            </div>
          </div>
        </div>
      </div>
      <div className="fx4" style={{ paddingBottom: 32 }}>
        <div className="mouse"></div>
      </div>
    </header>
  );
}
