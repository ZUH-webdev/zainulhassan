import type { ReactNode } from "react";
import CtaButtons from "@/components/CtaButtons";
import PageHeader from "@/components/PageHeader";
import type { CaseStudy } from "@/content/work/types";
import type { Crumb } from "@/lib/schema";
import { external } from "@/lib/site";

/** Renders a titled section, or nothing when the content is empty. */
function Section({ id, title, show, children }: { id: string; title: string; show: boolean; children: ReactNode }) {
  if (!show) return null;
  return (
    <section id={id} aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`} className="ah2">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Layout for concept projects (e.g. Pulse, Sentinel). Empty strings and arrays hide their section. */
export default function ConceptCaseStudy({ study: w, crumbs }: { study: CaseStudy; crumbs: Crumb[] }) {
  const facts = [
    { label: "Type", value: w.type },
    { label: "Role", value: w.role },
    { label: "Timeline", value: w.timeline },
  ].filter((f) => f.value);

  return (
    <>
      <PageHeader crumbs={crumbs} eyebrow={w.badge} title={w.title} lead={w.pitch}>
        {facts.length > 0 && (
          <dl className="mono" style={{ display: "flex", flexWrap: "wrap", gap: "12px 32px", margin: "24px 0 0", fontSize: 13 }}>
            {facts.map((f) => (
              <div key={f.label}>
                <dt style={{ color: "#9A9DA6" }}>{f.label}</dt>
                <dd style={{ margin: "4px 0 0", color: "#ECEAE4" }}>{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {w.stack.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 28 }}>
            {w.stack.map((t) => (
              <span key={t} className="pill">
                {t}
              </span>
            ))}
          </div>
        )}
        {w.demoUrl && (
          <p className="mono" style={{ margin: "20px 0 0", fontSize: 13 }}>
            <a className="tl" href={w.demoUrl} {...external}>
              View the live demo
            </a>
          </p>
        )}
        <CtaButtons location="case-study" />
      </PageHeader>

      <article className="wrap" style={{ paddingTop: 56 }}>
        <div className="prose">
          <Section id="screens" title="Screens" show={w.images.length > 0}>
            {w.images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt={`${w.title} screen ${i + 1}`} loading="lazy" style={{ width: "100%", height: "auto", borderRadius: 16, margin: "0 0 18px" }} />
            ))}
          </Section>

          <Section id="problem" title="The problem" show={!!w.problem}>
            <p>{w.problem}</p>
          </Section>

          <Section id="features" title="Key features" show={w.features.length > 0}>
            {w.features.map((f) => (
              <div key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </Section>

          <Section id="architecture" title="Architecture" show={!!w.architecture}>
            <p>{w.architecture}</p>
          </Section>

          <Section id="decisions" title="Technical decisions" show={w.decisions.length > 0}>
            {w.decisions.map((d) => (
              <div key={d.title}>
                <h3>{d.title}</h3>
                <p>{d.why}</p>
              </div>
            ))}
          </Section>

          <Section id="challenges" title="Challenges and solutions" show={w.challenges.length > 0}>
            {w.challenges.map((c) => (
              <div key={c.challenge}>
                <h3>{c.challenge}</h3>
                <p>{c.solution}</p>
              </div>
            ))}
          </Section>

          <Section id="roadmap" title="What comes next" show={w.roadmap.length > 0}>
            <ul>
              {w.roadmap.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Section>
        </div>
      </article>
    </>
  );
}
