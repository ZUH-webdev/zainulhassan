import Link from "next/link";
import CopyEmail from "@/components/CopyEmail";
import { socialLinks } from "@/components/social";
import { caseStudies } from "@/content/case-studies";
import { services } from "@/content/services";
import { external, mailto, SITE } from "@/lib/site";

const explore = [
  { href: "/services", label: "All services" },
  { href: "/case-studies", label: "All case studies" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function LinkList({ items }: { items: { href: string; label: string }[] }) {
  return (
    <ul className="ft-links">
      {items.map((l) => (
        <li key={l.href}>
          <Link href={l.href}>
            <span className="ft-t">{l.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer className="ft" role="contentinfo">
      <div className="ft-line" aria-hidden="true">
        <i></i>
      </div>

      <div className="wrap ft-grid">
        {/* Brand */}
        <div className="ft-brand rv">
          <Link href="/#top" className="ft-logo" aria-label="Zain Ul Hassan, home">
            zain<span className="logo-dot">.</span>
          </Link>
          <p className="ft-pos">Senior full stack developer building AI-powered SaaS for founders and agencies.</p>
          <span className="ft-avail mono">
            <span className="live-dot" aria-hidden="true"></span>
            Open for new projects
          </span>
          <div className="ft-mailrow">
            <a className="ft-mail" href={mailto} data-track="email_click" data-track-location="footer">
              {SITE.email}
            </a>
            <span className="ft-copy">
              <CopyEmail />
            </span>
          </div>
          <div className="ft-soc">
            {socialLinks.map(({ label, href, aria, external: ext, track, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={aria}
                data-track={track}
                data-track-location="footer"
                {...(ext ? external : {})}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <nav className="ft-svc rv d1" aria-label="Services">
          <p className="ft-h" id="ft-services">
            Services
          </p>
          <LinkList items={services.map((s) => ({ href: `/services/${s.slug}`, label: s.name }))} />
        </nav>

        {/* Case studies + Explore */}
        <div className="ft-work rv d2">
          <nav aria-label="Case studies">
            <p className="ft-h" id="ft-cases">
              Case studies
            </p>
            <LinkList items={caseStudies.map((c) => ({ href: `/case-studies/${c.slug}`, label: c.name }))} />
          </nav>
          <nav aria-label="Explore">
            <p className="ft-h" id="ft-explore">
              Explore
            </p>
            <LinkList items={explore} />
          </nav>
        </div>

        {/* Hire */}
        <section className="ft-hire rv d3" aria-labelledby="ft-talk">
          <p className="ft-h" id="ft-talk">
            Let&apos;s talk
          </p>
          <p className="ft-note">Replies within one working day.</p>
          <Link href="/contact" className="shine ft-cta" data-track="cta_click" data-track-location="footer">
            Start a project
          </Link>
        </section>
      </div>

      <div className="wrap">
        <div className="ft-bar">
          <p className="ft-copyr">© 2026 Zain Ul Hassan. All rights reserved.</p>
          <a className="ft-top" href="#top">
            Back to top <span className="ft-arrow" aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
