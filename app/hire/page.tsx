import Image from "next/image";
import type { CSSProperties } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import BriefProgress from "@/components/hire/BriefProgress";
import ContactForm from "@/components/hire/ContactForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbNode, faqNode, graph, ids, webPageNode } from "@/lib/schema";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { PHOTO, SITE, external, mailto } from "@/lib/site";
import "@/components/hire/hire-page.css";

const path = "/hire";
const title = "Hire Me: Start Your SaaS or AI Project";
const description =
  "Start your SaaS or AI project with Zain Ul Hassan. Share a short brief and I reply within one working day with next steps and an honest estimate.";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Hire me", path },
];

const HEADLINE = ["Tell", "me", "what", "you're", "building."];

const STATS = [
  { value: "Top Rated", label: "on Upwork" },
  { value: "100%", label: "Job Success" },
  { value: "4+ yrs", label: "building SaaS" },
];

const CHANNELS = [
  { label: "Email", value: SITE.email, href: mailto, ext: false, track: "email_click" },
  { label: "Upwork", value: "Send an offer", href: SITE.upwork, ext: true, track: "upwork_click" },
  { label: "LinkedIn", value: "Message me", href: SITE.linkedin, ext: true, track: "linkedin_click" },
];

const FAQS = [
  {
    q: "How quickly will you reply?",
    a: "Within one working day. You get questions specific to your product or a first estimate, not a generic pitch.",
  },
  {
    q: "What should I include in my brief?",
    a: "A few lines are enough: what you are building and who it is for, where it stands today (an idea, designs, an existing codebase or a live product), your timeline, and a budget range if you have one.",
  },
  {
    q: "How do you price projects?",
    a: "Milestone-based contracts. After your brief I send a written scope with milestones, a timeline and an estimate. Each milestone ends with working software and a written progress report.",
  },
  {
    q: "Can we talk on a call first?",
    a: "Yes. Mention it in your brief and suggest two or three times that suit you. I send a calendar invite, and after the call you get a written scope and estimate.",
  },
  {
    q: "Do you work through Upwork or directly?",
    a: "Either. I am Top Rated on Upwork with a 100% Job Success Score, so you can send an offer there, or use this form and we agree terms directly.",
  },
];

const d = (i: number) => ({ "--i": i }) as CSSProperties;

export const metadata = buildMetadata({ title, description, path });

export default function HirePage() {
  return (
    <main className="hpage">
      <JsonLd
        data={graph(
          {
            ...webPageNode(path, title, description, "ContactPage"),
            about: { "@id": ids.person },
            breadcrumb: { "@id": `${absoluteUrl(path)}#breadcrumb` },
          },
          breadcrumbNode(crumbs),
          faqNode(path, FAQS),
        )}
      />

      <header className="hx">
        <div className="grid" aria-hidden="true"></div>
        <div className="wrap hx-in">
          <div className="hx-crumbs hp-in" style={d(0)}>
            <Breadcrumbs items={crumbs} />
          </div>

          <div className="hx-center">
            <span className="hx-pill mono hp-in" style={d(1)}>
              <span className="live-dot" aria-hidden="true"></span>
              Open for new projects
              <span className="hx-sep" aria-hidden="true"></span>
              <span className="hx-pill2">Reply in 1 working day</span>
            </span>

            <h1 className="disp hx-title" aria-label="Tell me what you're building.">
              {HEADLINE.map((w, i) => (
                <span key={w} className="hp-w" aria-hidden="true">
                  <span style={d(i)}>{w}</span>
                </span>
              ))}
            </h1>

            <p className="hx-lead hp-in" style={d(6)}>
              I build SaaS and AI products from database to deploy. Send a short brief and you get next steps and an
              honest estimate.
            </p>

            <div className="hx-profile hp-in" style={d(7)}>
              <div className="hx-who">
                <span className="hx-ph">
                  <Image src={PHOTO.src} alt="Zain Ul Hassan" width={112} height={112} sizes="56px" priority />
                </span>
                <span className="hx-whot">
                  <span className="hx-name">Zain Ul Hassan</span>
                  <span className="hx-role">Senior full stack &amp; AI developer</span>
                </span>
              </div>
              <dl className="hx-stats">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="disp">{s.value}</dt>
                    <dd className="mono">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </header>

      <div className="wrap">
        <section id="brief" className="hp hp-rise" aria-labelledby="brief-title">
          <div className="hp-form">
            <p className="eyebrow">Project brief</p>
            <h2 id="brief-title" className="disp hp-ftitle">
              A few lines is enough to start.
            </h2>
            <BriefProgress />
            <ContactForm variant="page" source="hire-page" />
          </div>
        </section>

        <section className="hc" aria-labelledby="hc-title">
          <h2 id="hc-title" className="hc-title mono">
            Prefer another way?
          </h2>
          <ul className="hc-list">
            {CHANNELS.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.ext ? external : {})}
                  className="hc-card"
                  data-track={c.track}
                  data-track-location="hire-page"
                  aria-label={c.ext ? `${c.label}: ${c.value} (opens in a new tab)` : undefined}
                >
                  <span className="hc-label mono">{c.label}</span>
                  <span className="hc-value">{c.value}</span>
                  <span className="hc-arrow" aria-hidden="true">
                    {c.ext ? "↗" : "→"}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="hp-faq">
        <Faq items={FAQS} title="Before you send a brief" />
      </div>
      <div style={{ height: 96 }} />
    </main>
  );
}
