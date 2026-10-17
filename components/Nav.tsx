const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
];

export default function Nav() {
  return (
    <nav className="nav">
      <div
        className="wrap"
        style={{
          paddingTop: 16,
          paddingBottom: 16,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <a href="#top" className="disp" style={{ fontWeight: 800, fontSize: 24, letterSpacing: "-.02em" }}>
          zain<span className="logo-dot">.</span>
        </a>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 28, fontSize: 15, color: "#9A9DA6" }}>
          {links.map((l) => (
            <a key={l.href} className="lnk" href={l.href}>
              {l.label}
            </a>
          ))}
          <a
            className="shine"
            href="#contact"
            style={{ background: "var(--ac)", color: "#0A0B0D", fontWeight: 600, padding: "11px 20px", borderRadius: 999 }}
          >
            Hire me
          </a>
        </div>
      </div>
      <div className="prog"></div>
    </nav>
  );
}
