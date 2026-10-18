import type { CSSProperties } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/hire/ContactForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbNode, graph, ids, webPageNode } from "@/lib/schema";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { SITE, external, mailto } from "@/lib/site";

const path = "/hire";
const title = "Hire Me: Start Your SaaS or AI Project";
const description =
  "Start your SaaS or AI project with Zain Ul Hassan. Share a short brief and I reply within one working day with next steps and an honest estimate.";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Hire me", path },
];

const starPath = "M24 2 C25 15 33 23 46 24 C33 25 25 33 24 46 C23 33 15 25 2 24 C15 23 23 15 24 2 Z";
const HEADLINE = ["Tell", "me", "what", "you're", "building."];
const PROOF = [
  "Top Rated on Upwork, 100% Job Success",
  "4+ years building AI SaaS",
  "Clients in Africa, the US and the MENA region",
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
        )}
      />
      <div style={{ position: "relative" }}>
        <div className="grid" aria-hidden="true"></div>
        <div className="wrap" style={{ position: "relative", paddingTop: 56, paddingBottom: 56 }}>
          <div className="hp-crumbs">
            <Breadcrumbs items={crumbs} />
          </div>

          <section className="hp" aria-labelledby="hire-title">
            <aside className="hm-info">
              <div className="hm-grid" aria-hidden="true"></div>
              <svg className="hm-star" width="200" height="200" viewBox="0 0 48 48" aria-hidden="true">
                <path d={starPath} fill="#ECEAE4" />
              </svg>
              <p className="hm-eyebrow mono hp-in" style={d(0)}>
                Start a project
              </p>
              <h1 id="hire-title" className="disp hm-title" aria-label="Tell me what you're building.">
                {HEADLINE.map((w, i) => (
                  <span key={w} className="hp-w" aria-hidden="true">
                    <span style={d(i)}>{w}</span>
                  </span>
                ))}
              </h1>
              <p className="hm-desc hp-in" style={d(5)}>
                I reply within one working day with next steps and an honest estimate.
              </p>
              <ul className="hm-proof">
                {PROOF.map((p, i) => (
                  <li key={p} className="hp-proof" style={d(6 + i)}>
                    <span className="hm-tick" aria-hidden="true">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} />
                      </svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="hm-meta hp-in" style={d(10)}>
                <span className="hm-avail mono">
                  <span className="live-dot" aria-hidden="true"></span>
                  Open for new projects
                </span>
                <div className="hm-links">
                  <a href={mailto} className="hm-link" data-track="email_click" data-track-location="hire-page">
                    {SITE.email}
                  </a>
                  <a
                    href={SITE.upwork}
                    {...external}
                    className="hm-link"
                    data-track="upwork_click"
                    data-track-location="hire-page"
                    aria-label="Hire me on Upwork (opens in a new tab)"
                  >
                    Hire me on Upwork ↗
                  </a>
                </div>
              </div>
            </aside>

            <div className="hm-body">
              <ContactForm variant="page" source="hire-page" />
            </div>
          </section>
        </div>
      </div>

      <div style={{ height: 40 }} />
    </main>
  );
}
