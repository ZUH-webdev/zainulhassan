import { site } from "@/lib/site";

export default function About() {
  return (
    <section
      id="about"
      className="wrap"
      style={{ paddingTop: 96, paddingBottom: 40, display: "flex", flexWrap: "wrap", gap: 64, alignItems: "center" }}
    >
      <div className="rvl" style={{ flex: "1 1 320px", minWidth: 0, maxWidth: 440, position: "relative" }}>
        <div className="ab1 badge">
          <span style={{ color: "var(--ac)" }}>★</span> Top Rated
        </div>
        <div className="ab2 badge">
          <span className="live-dot"></span> 100% Job Success
        </div>
        <div className="photo">ZH</div>
        <div className="mono" style={{ fontSize: 12, color: "#9A9DA6", marginTop: 12 }}>
          {site.photoNote}
        </div>
      </div>
      <div style={{ flex: "1 1 440px", minWidth: 0 }}>
        <div className="eyebrow rv">06 / About</div>
        <h2 className="h2 rv d1" style={{ marginBottom: 24 }}>
          Hi, I&apos;m Zain.<span className="uline draw"></span>
        </h2>
        <p className="rv d1" style={{ margin: "0 0 18px", color: "#9A9DA6" }}>
          I&apos;m a senior full stack developer based in Bahawalpur, Pakistan, working with founders and teams across Africa,
          the US and the MENA region.
        </p>
        <p className="rv d2" style={{ margin: "0 0 18px", color: "#9A9DA6" }}>
          I started on Upwork as a Rising Talent and became Top Rated by keeping a 100% Job Success Score, which comes down
          to one habit: say what I will deliver, then deliver it.
        </p>
        <p className="rv d3" style={{ margin: 0, color: "#9A9DA6" }}>
          Alongside client work I build my own products and share the process on LinkedIn and YouTube. I&apos;m also
          finishing a BS in Software Engineering.
        </p>
      </div>
    </section>
  );
}
