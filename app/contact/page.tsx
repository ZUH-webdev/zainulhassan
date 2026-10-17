import CopyEmail from "@/components/CopyEmail";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import Related from "@/components/Related";
import { services } from "@/content/services";
import { breadcrumbNode, graph, ids, webPageNode } from "@/lib/schema";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { SITE, TRUST, external, mailto } from "@/lib/site";

const path = "/contact";
const title = "Contact: Hire Me for Your SaaS or AI Build";
const description =
  "Hire Zain Ul Hassan for your SaaS or AI product. Email me or hire me on Upwork; I reply within one working day with next steps and an honest estimate.";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path },
];

export const metadata = buildMetadata({ title, description, path });

export default function ContactPage() {
  return (
    <main>
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
      <PageHeader
        crumbs={crumbs}
        eyebrow="Contact"
        title="Hire Zain Ul Hassan for Your SaaS or AI Product"
        lead="The fastest way to start is an email describing what you're building, or an offer on Upwork. I reply within one working day with next steps and an honest estimate."
      >
        <div className="btnrow" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14, marginTop: 36 }}>
          <a
            className="shine"
            href={mailto}
            data-track="email_click"
            data-track-location="contact"
            style={{
              background: "var(--ac)",
              color: "#0A0B0D",
              fontWeight: 600,
              padding: "16px 28px",
              borderRadius: 999,
              overflowWrap: "anywhere",
            }}
          >
            Email me: {SITE.email}
          </a>
          <span className="cdark">
            <CopyEmail />
          </span>
          <a
            className="ghost-btn"
            href={SITE.upwork}
            {...external}
            data-track="upwork_click"
            data-track-location="contact"
            aria-label="Hire me on Upwork (opens in a new tab)"
            style={{ border: "1px solid #2E323B", padding: "16px 28px", borderRadius: 999, fontWeight: 500 }}
          >
            Hire me on Upwork
          </a>
        </div>
        <div
          className="mono"
          style={{ display: "flex", flexWrap: "wrap", gap: "12px 28px", marginTop: 32, fontSize: 13, color: "#9A9DA6" }}
        >
          {TRUST.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </PageHeader>

      <article className="wrap" style={{ paddingTop: 40 }}>
        <div className="prose">
          <section aria-labelledby="include">
            <h2 id="include" className="ah2">
              What to include in your message
            </h2>
            <p>A short message is enough to start. These details help me reply with a useful estimate:</p>
            <ul>
              <li>What you are building and who it is for.</li>
              <li>Where the project is today: idea, designs, an existing codebase or a live product.</li>
              <li>The features the first version must have.</li>
              <li>Your timeline and budget range, if you have one.</li>
            </ul>
          </section>

          <section aria-labelledby="call">
            <h2 id="call" className="ah2">
              Book a discovery call
            </h2>
            <p>
              We talk goals, users and constraints, and you leave with a clear scope and an honest timeline.
              [PLACEHOLDER: scheduling link, e.g. Calendly or Cal.com]
            </p>
          </section>

          <section aria-labelledby="next">
            <h2 id="next" className="ah2">
              What happens next
            </h2>
            <ol>
              <li>I reply within one working day with questions or a first estimate.</li>
              <li>We agree the scope, milestones and timeline in writing.</li>
              <li>I build in milestones, each ending with working software and a progress report.</li>
              <li>We launch, and I support you after you go live.</li>
            </ol>
          </section>

          <section aria-labelledby="where">
            <h2 id="where" className="ah2">
              Where I work
            </h2>
            <p>
              I&apos;m based in Bahawalpur, Pakistan, and work remotely with clients in Africa, the US and the MENA region.
            </p>
          </section>
        </div>
      </article>

      <Related
        id="services"
        eyebrow="Services"
        title="What I can help with"
        items={services.map((s) => ({
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
