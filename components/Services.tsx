import Link from "next/link";
import { serviceBySlug, services as allServices } from "@/content/services";

const cards = [
  {
    d: "",
    title: "SaaS MVPs that launch",
    href: "/services/saas-mvp-development",
    body: "Auth, multi-tenant data, billing and a dashboard people actually want to use. A production-ready first version, not a demo.",
    icon: (
      <>
        <path pathLength={1} d="M24 6 L42 15 L24 24 L6 15 Z" />
        <path pathLength={1} d="M6 24 L24 33 L42 24" />
        <path pathLength={1} d="M6 33 L24 42 L42 33" />
      </>
    ),
  },
  {
    d: " d1",
    title: "AI features that work",
    href: "/services/ai-developer",
    body: "OpenAI and Claude integrations, RAG over your own content with pgvector, content generation and recommendation tools wired into your product.",
    icon: <path pathLength={1} d="M24 5 C25 17 31 23 43 24 C31 25 25 31 24 43 C23 31 17 25 5 24 C17 23 23 17 24 5 Z" />,
  },
  {
    d: " d2",
    title: "Payments and billing",
    href: "/services/payments-integration",
    body: "Stripe and Paystack subscriptions, webhooks and plan gating, including billing migrations on live products.",
    icon: (
      <>
        <rect pathLength={1} x="5" y="11" width="38" height="26" rx="4" />
        <path pathLength={1} d="M5 20 H43" />
        <path pathLength={1} d="M12 30 H22" />
      </>
    ),
  },
  {
    d: "",
    title: "Security audits",
    href: "/services/supabase-developer",
    body: "Row Level Security reviews, API route audits and remediation, so your customers' data stays theirs.",
    icon: (
      <>
        <path pathLength={1} d="M24 5 L40 11 V23 C40 33 33 40 24 43 C15 40 8 33 8 23 V11 Z" />
        <path pathLength={1} d="M17 24 L22 29 L31 18" />
      </>
    ),
  },
  {
    d: " d1",
    title: "Polished front ends",
    href: "/services/nextjs-developer",
    body: "Figma to code with React, Tailwind and shadcn/ui. Fast, accessible and consistent from the landing page to the dashboard.",
    icon: (
      <>
        <rect pathLength={1} x="5" y="8" width="38" height="32" rx="4" />
        <path pathLength={1} d="M5 17 H43" />
        <path pathLength={1} d="M13 26 H27" />
        <path pathLength={1} d="M13 32 H21" />
      </>
    ),
  },
  {
    d: " d2",
    title: "Technical co-founder",
    href: "/services/full-stack-developer",
    body: "Architecture decisions, roadmap planning and hands-on building for founders who need a senior technical partner. I made the same calls as co-founder of Velocity.",
    icon: (
      <>
        <circle pathLength={1} cx="18" cy="24" r="13" />
        <circle pathLength={1} cx="30" cy="24" r="13" />
      </>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="wrap" style={{ paddingTop: 112, paddingBottom: 40 }}>
      <div className="eyebrow rv">01 / Services</div>
      <h2 className="h2 rv d1">What I can build for you</h2>
      <div className="sgrid">
        {cards.map((s, i) => {
          const target = serviceBySlug(s.href.replace("/services/", ""));
          const id = `svc-${i + 1}`;
          const body = (
            <>
              <div className="big-n" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </div>
              <svg className="ic" viewBox="0 0 48 48" aria-hidden="true">
                {s.icon}
              </svg>
              <h3 id={`${id}-t`} className="disp" style={{ fontWeight: 700, fontSize: 26, letterSpacing: "-.02em", margin: "0 0 10px" }}>
                {s.title}
              </h3>
              <p id={`${id}-d`} style={{ margin: 0, color: "#9A9DA6", fontSize: 16 }}>
                {s.body}
              </p>
              {target && (
                <span id={`${id}-c`} className="scta">
                  <span className="scta-l">
                    Explore service<span className="sr-only"> : {target.name}</span>
                  </span>
                  <span className="scta-i" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </span>
              )}
              <div className="sweep"></div>
            </>
          );
          return target ? (
            <Link
              key={s.title}
              href={s.href}
              className={`card scard rv${s.d}`}
              aria-labelledby={`${id}-t ${id}-c`}
              aria-describedby={`${id}-d`}
            >
              {body}
            </Link>
          ) : (
            <div key={s.title} className={`card scard rv${s.d}`}>
              {body}
            </div>
          );
        })}
      </div>
      {/* Services without a card above still get a crawlable link from the homepage. */}
      <p className="mono rv" style={{ margin: "28px 0 0", fontSize: 13, color: "#9A9DA6" }}>
        Also:{" "}
        {allServices
          .filter((s) => !cards.some((c) => c.href === `/services/${s.slug}`))
          .map((s) => (
            <span key={s.slug}>
              <a className="tl" href={`/services/${s.slug}`}>
                {s.name}
              </a>
              {" · "}
            </span>
          ))}
        <Link className="tl" href="/services">
          See all {allServices.length} services →
        </Link>
      </p>
    </section>
  );
}
