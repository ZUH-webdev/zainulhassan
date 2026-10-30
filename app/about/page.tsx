import Link from "next/link";
import CtaButtons from "@/components/CtaButtons";
import JsonLd from "@/components/JsonLd";
import PageCta from "@/components/PageCta";
import PageHeader from "@/components/PageHeader";
import Related from "@/components/Related";
import { caseStudies } from "@/content/case-studies";
import { breadcrumbNode, graph, ids, webPageNode } from "@/lib/schema";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { BIO, SITE, external, mailto } from "@/lib/site";

const path = "/about";
const title = "About Me: Senior Full Stack Developer";
const description =
  "Zain Ul Hassan is a senior full stack developer from Pakistan, building AI-powered SaaS with Next.js and Supabase. Top Rated on Upwork, 100% JSS.";
const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path },
];

/** Real dates for ProfilePage: when this page was created and last changed. */
const DATE_CREATED = "2026-10-17";
const DATE_MODIFIED = "2026-10-17";

export const metadata = buildMetadata({ title, description, path });

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Supabase (PostgreSQL, Auth, RLS, Edge Functions)",
  "OpenAI API",
  "Claude API",
  "pgvector",
  "Stripe",
  "Paystack",
  "Tailwind CSS",
  "shadcn/ui",
  "Twilio",
  "Resend",
  "Vercel",
];

export default function AboutPage() {
  return (
    <main>
      <JsonLd
        data={graph(
          {
            ...webPageNode(path, title, description, "ProfilePage"),
            mainEntity: { "@id": ids.person },
            dateCreated: DATE_CREATED,
            dateModified: DATE_MODIFIED,
            breadcrumb: { "@id": `${absoluteUrl(path)}#breadcrumb` },
          },
          breadcrumbNode(crumbs),
        )}
      />
      <PageHeader crumbs={crumbs} eyebrow="About" title="About Zain Ul Hassan, Senior Full Stack Developer" lead={BIO}>
        <CtaButtons location="about" />
      </PageHeader>

      <article className="wrap" style={{ paddingTop: 40 }}>
        <div className="prose">
          <section aria-labelledby="who">
            <h2 id="who" className="ah2">
              Who I am
            </h2>
            <p>
              I&apos;m a senior full stack developer based in Pakistan, with 4+ years of experience. I work with
              founders and teams across Africa, the US and the MENA region, building AI-powered SaaS applications from
              database architecture to payments to production deploys.
            </p>
          </section>

          <section aria-labelledby="experience">
            <h2 id="experience" className="ah2">
              Experience
            </h2>
            <p>
              My work is full SaaS products, not isolated tickets. Recent projects include{" "}
              <Link href="/case-studies/leadsmind">LeadsMind, an all-in-one CRM, LMS and marketing platform</Link> for African
              businesses where I audited and hardened 157 API routes, built an AI suite and migrated billing from Stripe to
              Paystack; <Link href="/case-studies/world-teachers-academy">World Teachers Academy</Link>, a teacher certification
              site and job portal with nightly Adzuna and Reed ingestion; and{" "}
              <Link href="/case-studies/velocity">Velocity</Link>, an AI assistant that recovers missed calls, which I
              co-founded.
            </p>
            <p>
              Because I co-founded Velocity, I also work as a technical partner for founders who need architecture decisions
              and roadmap planning alongside hands-on building.
            </p>
          </section>

          <section aria-labelledby="upwork">
            <h2 id="upwork" className="ah2">
              Upwork status
            </h2>
            <p>
              I started on Upwork as a Rising Talent and became <strong>Top Rated</strong> by keeping a{" "}
              <strong>100% Job Success Score</strong>, which comes down to one habit: say what I will deliver, then deliver
              it. You can see my reviews and work history on my{" "}
              <a href={SITE.upwork} {...external} data-track="upwork_click" data-track-location="about-page">
                Upwork profile
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="stack">
            <h2 id="stack" className="ah2">
              Stack
            </h2>
            <ul className="chips">
              {stack.map((s) => (
                <li key={s} className="pill">
                  {s}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="education">
            <h2 id="education" className="ah2">
              Location and education
            </h2>
            <p>
              I live and work in Pakistan, and work remotely with clients in Africa, the US and the MENA region.
              I&apos;m finishing a BS in Software Engineering.
            </p>
          </section>

          <section aria-labelledby="profiles">
            <h2 id="profiles" className="ah2">
              Find me online
            </h2>
            <p>
              Alongside client work I build my own products and share the process. These are my official profiles:
            </p>
            <ul>
              <li>
                <a href={SITE.upwork} {...external} data-track="upwork_click" data-track-location="about-page">
                  Upwork
                </a>
              </li>
              <li>
                <a href={SITE.linkedin} rel="me noopener noreferrer" target="_blank" data-track="linkedin_click" data-track-location="about-page">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={SITE.github} rel="me noopener noreferrer" target="_blank" data-track="github_click" data-track-location="about-page">
                  GitHub
                </a>
              </li>
              <li>
                <a href={mailto} data-track="email_click" data-track-location="about-page">
                  Email: {SITE.email}
                </a>
              </li>
            </ul>
          </section>
        </div>
      </article>

      <Related
        id="work"
        eyebrow="Work"
        title="Case studies"
        items={caseStudies.map((c) => ({
          href: `/case-studies/${c.slug}`,
          kicker: c.kicker,
          title: c.name,
          text: c.summary,
          cta: "Read the case study",
        }))}
      />

      <PageCta location="about" />
    </main>
  );
}
