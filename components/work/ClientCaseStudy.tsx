import Image from "next/image";
import type { ReactNode } from "react";
import HireButton from "@/components/hire/HireButton";
import PageHeader from "@/components/PageHeader";
import CaseStudyCta from "@/components/work/CaseStudyCta";
import type { ClientCaseStudy as Study } from "@/content/work/types";
import type { Crumb } from "@/lib/schema";
import { external } from "@/lib/site";

/** Titled section, or nothing when there is no content. */
export function Section({ id, title, show, children }: { id: string; title: string; show: boolean; children: ReactNode }) {
  if (!show) return null;
  return (
    <section id={id} className="cs-sec" aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`} className="ah2 rv">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Data-driven layout for a client case study (/case-studies/<slug>). Empty fields hide themselves. */
export default function ClientCaseStudy({ study: s, crumbs }: { study: Study; crumbs: Crumb[] }) {
  const source = `case-study-${s.slug}`;
  const host = new URL(s.siteUrl).host;
  const meta = [
    { label: "Client", value: s.client },
    { label: "Role", value: s.role },
    { label: "Timeline", value: s.timeline },
    { label: "Stack", value: s.stack.join(", ") },
  ].filter((m) => m.value);
  const results = s.results.filter((r) => r.value);

  return (
    <>
      <PageHeader crumbs={crumbs} eyebrow={s.eyebrow} title={s.title} lead={s.summary}>
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
        <div className="btnrow" style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 36 }}>
          <a
            className="shine"
            href={s.siteUrl}
            {...external}
            data-track="case_study_site_click"
            data-track-location={source}
            aria-label={`Visit the live ${s.client} site (opens in a new tab)`}
            style={{ background: "var(--ac)", color: "#0A0B0D", fontWeight: 600, padding: "16px 28px", borderRadius: 999 }}
          >
            Visit live site ↗
          </a>
          <HireButton
            source={source}
            className="ghost-btn"
            href="/contact"
            data-track="cta_click"
            data-track-location={source}
            style={{ border: "1px solid #2E323B", padding: "16px 28px", borderRadius: 999, fontWeight: 500 }}
          >
            Hire me for something similar
          </HireButton>
        </div>
      </PageHeader>

      {s.hero && (
        <figure className="wrap cs-shot">
          <div className="bframe">
            <div className="bbar" aria-hidden="true">
              <i></i>
              <i></i>
              <i></i>
              <span className="mono">{host}</span>
            </div>
            <Image
              src={s.hero.src}
              alt={s.hero.alt}
              width={s.hero.width}
              height={s.hero.height}
              sizes="(max-width: 1200px) calc(100vw - 40px), 1150px"
              priority
            />
          </div>
        </figure>
      )}

      <article className="wrap">
        <Section id="challenge" title="The challenge" show={!!s.challenge}>
          <p className="cs-p rv">{s.challenge}</p>
        </Section>

        <Section id="built" title="What I built" show={s.features.length > 0}>
          <div className="cs-feats">
            {s.features.map((f, i) => (
              <div key={f.title} className="card rv">
                <div className="mono" style={{ fontSize: 13, color: "var(--ac)" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="disp" style={{ fontWeight: 700, fontSize: 22, letterSpacing: "-.02em", margin: "12px 0 10px" }}>
                  {f.title}
                </h3>
                <p style={{ margin: 0, color: "#9A9DA6" }}>{f.detail ? `${f.body} ${f.detail}` : f.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="process" title="How the booking flow works" show={s.process.steps.length > 0}>
          {s.process.intro && <p className="cs-p rv">{s.process.intro}</p>}
          <ol className="cs-steps">
            {s.process.steps.map((st, i) => (
              <li key={st.title} className="rv">
                <span className="cs-n mono" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="disp">{st.title}</h3>
                <p>{st.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="tech" title="Tech and decisions" show={s.stack.length > 0 || s.decisions.length > 0}>
          {s.stack.length > 0 && (
            <ul className="cs-chips rv" aria-label="Stack">
              {s.stack.map((t) => (
                <li key={t} className="pill">
                  {t}
                </li>
              ))}
            </ul>
          )}
          {s.decisions.length > 0 && (
            <ul className="slist">
              {s.decisions.map((d) => (
                <li key={d.title} className="sitem rv">
                  <span className="sname">{d.title}</span>
                  <span className="swhy">{d.why}</span>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section id="results" title="Results" show={results.length > 0}>
          <div className="stats" style={{ paddingTop: 16 }}>
            {results.map((r) => (
              <div key={r.label} className="stat rv">
                <div className="draw"></div>
                <div className="disp statn">{r.value}</div>
                <div style={{ color: "#9A9DA6", fontSize: 15, marginTop: 10 }}>{r.label}</div>
              </div>
            ))}
          </div>
        </Section>
      </article>

      <section className="wrap" style={{ paddingTop: 96, paddingBottom: 96 }} aria-labelledby="cs-cta-h">
        {s.next && (
          <p className="mono cs-next rv">
            Next case study: <a className="tl" href={s.next.href}>{s.next.title} →</a>
          </p>
        )}
        <CaseStudyCta
          title={s.cta}
          lead="Tell me what you're selling. I reply within one working day with next steps and an honest estimate."
          source={source}
        />
      </section>
    </>
  );
}
