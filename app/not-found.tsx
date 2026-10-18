import type { Metadata } from "next";
import Link from "next/link";
import Related from "@/components/Related";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/** Rendered with a real 404 status for unknown routes. */
export default function NotFound() {
  return (
    <main>
      <header style={{ position: "relative" }}>
        <div className="grid" aria-hidden="true"></div>
        <div className="wrap" style={{ position: "relative", paddingTop: 96, paddingBottom: 24 }}>
          <div className="eyebrow">404</div>
          <h1 className="ph1">This page does not exist</h1>
          <p className="lead">
            The link may be old or mistyped. Try one of these: <Link className="tl" href="/services">services</Link>,{" "}
            <Link className="tl" href="/case-studies">case studies</Link>, the <Link className="tl" href="/blog">blog</Link> or
            the <Link className="tl" href="/contact">contact page</Link>.
          </p>
        </div>
      </header>
      <Related
        id="nf-services"
        eyebrow="Services"
        title="Start with a service"
        items={services.slice(0, 3).map((s) => ({
          href: `/services/${s.slug}`,
          kicker: s.eyebrow,
          title: s.h1.replace(/:.*/, ""),
          text: s.summary,
          cta: "See the service",
        }))}
      />
      <div style={{ height: 96 }} />
    </main>
  );
}
