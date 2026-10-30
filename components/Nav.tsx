import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import { services } from "@/content/services";

const links = [
  { href: "/case-studies", label: "Case studies" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <nav className="nav" aria-label="Main">
      <div className="wrap navbar">
        <Link href="/#top" className="disp navlogo" aria-label="Zain Ul Hassan, home">
          zain<span className="logo-dot">.</span>
        </Link>
        {/* >=1024px: inline links (unchanged desktop nav) */}
        <div className="navlinks">
          <div className="navdd">
            <Link className="lnk" href="/services">
              Services
              <svg className="navdd-c" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <div className="navdd-menu">
              {services.map((s) => (
                <a key={s.slug} href={`/services/${s.slug}`}>
                  {s.name}
                </a>
              ))}
              <Link className="navdd-all" href="/services">
                All services →
              </Link>
              <span className="navdd-h mono" aria-hidden="true">
                Related work
              </span>
              <Link href="/case-studies/leadsmind">LeadsMind CRM and LMS case study</Link>
            </div>
          </div>
          {links.map((l) => (
            <a key={l.href} className="lnk" href={l.href}>
              {l.label}
            </a>
          ))}
          <Link
            className="shine"
            href="/hire"
            data-track="cta_click"
            data-track-location="nav"
            style={{ background: "var(--ac)", color: "#0A0B0D", fontWeight: 600, padding: "11px 20px", borderRadius: 999 }}
          >
            Hire me
          </Link>
        </div>
        {/* <1024px: compact pill + hamburger */}
        <div className="navm">
          <Link className="shine navpill" href="/hire" data-track="cta_click" data-track-location="nav-mobile">
            Hire me
          </Link>
          <MobileNav />
        </div>
      </div>
      <div className="prog"></div>
    </nav>
  );
}
