import { linkProps, site } from "@/lib/site";

const links = [
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "YouTube", href: site.social.youtube },
  { label: "Upwork", href: site.social.upwork },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #1B1E24" }}>
      <div
        className="wrap"
        style={{
          paddingTop: 28,
          paddingBottom: 28,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 16,
          fontSize: 14,
          color: "#9A9DA6",
        }}
      >
        <div>© 2026 Zain Ul Hassan</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
          {links.map((l) => (
            <a key={l.label} className="lnk" {...linkProps(l.href)}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
