import Link from "next/link";
import MobileNav from "@/components/MobileNav";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#process", label: "Process" },
  { href: "/#about", label: "About" },
  { href: "/blog", label: "Blog" },
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
          {links.map((l) => (
            <a key={l.href} className="lnk" href={l.href}>
              {l.label}
            </a>
          ))}
          <Link
            className="shine"
            href="/#contact"
            data-track="cta_click"
            data-track-location="nav"
            style={{ background: "var(--ac)", color: "#0A0B0D", fontWeight: 600, padding: "11px 20px", borderRadius: 999 }}
          >
            Hire me
          </Link>
        </div>
        {/* <1024px: compact pill + hamburger */}
        <div className="navm">
          <Link className="shine navpill" href="/#contact" data-track="cta_click" data-track-location="nav-mobile">
            Hire me
          </Link>
          <MobileNav />
        </div>
      </div>
      <div className="prog"></div>
    </nav>
  );
}
