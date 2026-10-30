import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import HireButton from "@/components/hire/HireButton";
import PageHeader from "@/components/PageHeader";
import CaseStudyCta from "@/components/work/CaseStudyCta";
import { Section } from "@/components/work/ClientCaseStudy";
import Gallery from "@/components/work/Gallery";
import type { CaseStudy } from "@/content/work/types";
import type { Crumb } from "@/lib/schema";
import { external } from "@/lib/site";

/** Screenshots are added by hand; until a file exists in /public it is left off the page instead of rendering broken. */
const onDisk = (src: string) => !!src && existsSync(join(process.cwd(), "public", src));

const delay = (i: number) => `d${(i % 3) + 1}`;

/** Supabase-centred system diagram. Drawn narrow so its labels stay readable at phone width. */
function ArchitectureDiagram() {
  const supabase = ["Postgres + RLS", "Auth", "Edge Functions", "pgvector"];
  const integrations = ["Meta Graph API", "WhatsApp Business API", "Social network APIs", "Paystack", "OpenAI API"];
  return (
    <svg className="lm-arch rv" viewBox="0 0 420 424" role="img" aria-labelledby="arch-t arch-d">
      <title id="arch-t">LeadsMind architecture</title>
      <desc id="arch-d">
        The Next.js app calls its API routes and webhook handlers. Those connect to Supabase, which provides Postgres with row level
        security, Auth, Edge Functions and pgvector, and to external integrations: the Meta Graph API, the WhatsApp Business API,
        social network APIs, Paystack and the OpenAI API.
      </desc>
      <defs>
        <marker id="arch-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="lm-arch-ac" />
        </marker>
      </defs>

      <rect x="10" y="10" width="400" height="64" rx="14" className="lm-arch-box" />
      <text x="210" y="38" className="lm-arch-h">Next.js app</text>
      <text x="210" y="59" className="lm-arch-s">App Router · TypeScript · Tailwind CSS · Craft.js</text>

      <line x1="210" y1="76" x2="210" y2="100" className="lm-arch-ln" markerEnd="url(#arch-arrow)" />

      <rect x="10" y="104" width="400" height="64" rx="14" className="lm-arch-box" />
      <text x="210" y="132" className="lm-arch-h">API routes and webhooks</text>
      <text x="210" y="153" className="lm-arch-s">Server logic, webhook receivers, scheduled publishing</text>

      <line x1="107" y1="170" x2="107" y2="194" className="lm-arch-ln" markerEnd="url(#arch-arrow)" />
      <line x1="313" y1="170" x2="313" y2="194" className="lm-arch-ln" markerEnd="url(#arch-arrow)" />

      <rect x="10" y="198" width="195" height="216" rx="14" className="lm-arch-box lm-arch-key" />
      <text x="107" y="226" className="lm-arch-h">Supabase</text>
      {supabase.map((t, i) => (
        <g key={t}>
          <rect x="22" y={242 + i * 36} width="171" height="28" rx="8" className="lm-arch-item" />
          <text x="107" y={261 + i * 36} className="lm-arch-i">
            {t}
          </text>
        </g>
      ))}

      <rect x="215" y="198" width="195" height="216" rx="14" className="lm-arch-box" />
      <text x="313" y="226" className="lm-arch-h">Integrations</text>
      {integrations.map((t, i) => (
        <g key={t}>
          <rect x="227" y={242 + i * 34} width="171" height="26" rx="8" className="lm-arch-item" />
          <text x="313" y={260 + i * 34} className="lm-arch-i">
            {t}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Richest case study layout: module grid with detail blocks, AI, security, architecture, gallery. Empty fields hide themselves. */
export default function FlagshipCaseStudy({ study: s, crumbs }: { study: CaseStudy; crumbs: Crumb[] }) {
  const source = `case-study-${s.slug}`;
  const meta = [
    { label: "Type", value: s.type },
    { label: "Role", value: s.role },
    { label: "Engagement", value: s.engagement },
    { label: "Timeline", value: s.timeline },
  ].filter((m) => m.value);
  const modules = (s.modules ?? []).filter((m) => m.summary);
  const gallery = (s.gallery ?? []).filter((g) => onDisk(g.src));
  const shotFor = (src: string) => gallery.find((g) => g.src === src);
  const security = s.security ?? [];
  const results = s.results ?? [];

  return (
    <>
      <PageHeader crumbs={crumbs} eyebrow={s.badge} title={s.title} lead={s.pitch}>
        {meta.length > 0 && (
          <dl className="cs-meta mono">
            {meta.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {s.stack.length > 0 && (
          <ul className="cs-chips" aria-label="Stack" style={{ marginTop: 28 }}>
            {s.stack.map((t) => (
              <li key={t} className="pill">
                {t}
              </li>
            ))}
          </ul>
        )}
        <div className="btnrow" style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 36 }}>
          {s.demoUrl && (
            <a
              className="shine"
              href={s.demoUrl}
              {...external}
              data-track="case_study_site_click"
              data-track-location={source}
              aria-label={`Open the ${s.title.replace(/:.*/, "")} demo (opens in a new tab)`}
              style={{ background: "var(--ac)", color: "#0A0B0D", fontWeight: 600, padding: "16px 28px", borderRadius: 999 }}
            >
              View demo ↗
            </a>
          )}
          <HireButton
            source={source}
            className={s.demoUrl ? "ghost-btn" : "shine"}
            href="/contact"
            data-track="cta_click"
            data-track-location={source}
            style={
              s.demoUrl
                ? { border: "1px solid #2E323B", padding: "16px 28px", borderRadius: 999, fontWeight: 500 }
                : { background: "var(--ac)", color: "#0A0B0D", fontWeight: 600, padding: "16px 28px", borderRadius: 999 }
            }
          >
            Hire me for something similar
          </HireButton>
        </div>
      </PageHeader>

      <article className="wrap">
        <Section id="problem" title="The problem" show={!!s.problem}>
          <p className="cs-p rv">{s.problem}</p>
        </Section>

        <Section id="platform" title="Platform at a glance" show={modules.length > 0}>
          <p className="cs-p rv">{modules.length} modules, one workspace. Pick a module to jump to how it works.</p>
          <ul className="lm-mods">
            {modules.map((m, i) => (
              <li key={m.id} className={`rv ${delay(i)}`}>
                <a className="card lm-mod" href={`#mod-${m.id}`}>
                  <span className="mono lm-mod-n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="disp">{m.title}</h3>
                  <p>{m.summary}</p>
                  {m.bullets.length > 0 && (
                    <ul>
                      {m.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                  <span className="sweep" aria-hidden="true"></span>
                </a>
              </li>
            ))}
          </ul>

          {s.roadmap.length > 0 && (
            <div className="lm-dev rv">
              <span className="mono lm-dev-l">In development</span>
              <ul className="cs-chips" aria-label="In development, not yet delivered">
                {s.roadmap.map((r) => (
                  <li key={r} className="pill">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="lm-details">
            {modules.map((m) => {
              const shot = shotFor(m.image);
              return (
                <section key={m.id} id={`mod-${m.id}`} className={`lm-detail${shot ? " has-shot" : ""}`} aria-labelledby={`mod-${m.id}-h`}>
                  <div className="rv">
                    <div className="eyebrow">Module</div>
                    <h3 id={`mod-${m.id}-h`} className="disp">
                      {m.title}
                    </h3>
                    <p>{m.detail || m.summary}</p>
                  </div>
                  {shot && (
                    <div className="lm-detail-img bframe rv d1">
                      <Image src={shot.src} alt={shot.alt} fill sizes="(max-width: 899px) calc(100vw - 40px), 600px" />
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </Section>

        <Section id="ai" title="AI across the platform" show={s.features.length > 0}>
          <ul className="lm-ai">
            {s.features.map((f, i) => (
              <li key={f.title} className={`rv ${delay(i)}`}>
                <span className="lm-ai-t">{f.title}</span>
                {f.description && <span className="lm-ai-d">{f.description}</span>}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="security" title="Security and quality" show={security.length > 0}>
          <ul className="lm-sec">
            {security.map((t, i) => (
              <li key={t} className={`rv ${delay(i)}`}>
                <svg className="lm-sec-ic" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3z" />
                  <path d="m8.5 12 2.5 2.5 4.5-5" />
                </svg>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="hard-problems" title="Hard problems solved" show={s.challenges.length > 0}>
          <ul className="slist">
            {s.challenges.map((c) => (
              <li key={c.challenge} className="sitem rv">
                <span className="sname">{c.challenge}</span>
                <span className="swhy">{c.solution}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="how-i-worked" title="How I worked" show={!!s.howIWorked}>
          <p className="cs-p rv">{s.howIWorked}</p>
        </Section>

        <Section id="architecture" title="Architecture" show={!!s.architecture}>
          <div className="lm-arch-wrap">
            <ArchitectureDiagram />
            <p className="cs-p rv">{s.architecture}</p>
          </div>
        </Section>

        <Section id="feedback" title="Client feedback" show={!!s.review || !!s.clientQuote}>
          {s.review && (
            <p className="lm-review rv">
              <span className="lm-stars" aria-hidden="true">
                ★★★★★
              </span>
              <span>{s.review}</span>
            </p>
          )}
          {s.clientQuote && (
            <blockquote className="lm-quote rv">
              <p>{s.clientQuote}</p>
            </blockquote>
          )}
        </Section>

        <Section id="screenshots" title="Screenshots" show={gallery.length > 0}>
          <div className="rv">
            <Gallery shots={gallery} />
          </div>
        </Section>

        <Section id="results" title="Results" show={results.length > 0}>
          <ul className="lm-sec">
            {results.map((r) => (
              <li key={r} className="rv">
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </Section>
      </article>

      <section className="wrap" style={{ paddingTop: 96, paddingBottom: 96 }} aria-labelledby="cs-cta-h">
        <CaseStudyCta
          title={s.cta || "Need something like this built?"}
          lead="Tell me what you're building. I reply within one working day with next steps and an honest estimate."
          source={source}
        />
        {s.next && (
          <p className="mono cs-next lm-next rv">
            Next case study: <a className="tl" href={s.next.href}>{s.next.title} →</a>
          </p>
        )}
      </section>
    </>
  );
}
