import { socialLinks } from "@/components/social";
import { caseStudies } from "@/content/case-studies";
import { services } from "@/content/services";
import { external } from "@/lib/site";

const columns = [
  { title: "Services", links: services.map((s) => ({ href: `/services/${s.slug}`, label: s.name })) },
  { title: "Case studies", links: caseStudies.map((c) => ({ href: `/case-studies/${c.slug}`, label: c.name })) },
  {
    title: "Explore",
    links: [
      { href: "/services", label: "All services" },
      { href: "/case-studies", label: "All case studies" },
      { href: "/blog", label: "Blog" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #1B1E24" }}>
      <div className="wrap fcols">
        {columns.map((col) => (
          <div key={col.title} className="fcol">
            <p className="fh mono">{col.title}</p>
            <ul>
              {col.links.map((l) => (
                <li key={l.href}>
                  <a className="lnk" href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="wrap fbot">
        <div>© 2026 Zain Ul Hassan</div>
        <div className="fsoc">
          {socialLinks.map(({ label, href, aria, external: ext, track, Icon }) => (
            <a
              key={label}
              className="lnk flnk"
              href={href}
              aria-label={aria}
              data-track={track}
              data-track-location="footer"
              {...(ext ? external : {})}
            >
              <Icon />
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
