import { posts } from "@/content/blog";
import { allCaseStudies } from "@/content/case-studies";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";
import { BIO, SITE } from "@/lib/site";

export const dynamic = "force-static";

/** Optional llms.txt summary for AI tools (Google says it is not needed; harmless for others). */
export function GET() {
  const body = `# ${SITE.name}

> ${BIO}

Based in Pakistan. 4+ years of experience. Clients in Africa, the US and the MENA region.
Stack: Next.js, React, TypeScript, Supabase (PostgreSQL, Auth, RLS, Edge Functions), Node.js, OpenAI and Claude APIs, Stripe, Paystack.

## Services
${services.map((s) => `- [${s.name}](${absoluteUrl(`/services/${s.slug}`)}): ${s.summary}`).join("\n")}

## Case studies
${allCaseStudies.map((c) => `- [${c.name}](${absoluteUrl(`/case-studies/${c.slug}`)}): ${c.summary}`).join("\n")}

## Guides
${posts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)})`).join("\n")}

## Contact
- Email: ${SITE.email}
- Upwork: ${SITE.upwork}
- LinkedIn: ${SITE.linkedin}
- GitHub: ${SITE.github}
- About: ${absoluteUrl("/about")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
