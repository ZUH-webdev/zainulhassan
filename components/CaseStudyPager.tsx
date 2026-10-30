import Related from "@/components/Related";
import { caseStudyNeighbours } from "@/content/case-studies";

/** Previous / next case study links, closing every case study whichever layout renders it. */
export default function CaseStudyPager({ slug }: { slug: string }) {
  const { prev, next } = caseStudyNeighbours(slug);
  return (
    <Related
      id="more-work"
      eyebrow="More work"
      title="Previous and next case study"
      items={[
        { href: `/case-studies/${prev.slug}`, kicker: `Previous · ${prev.kicker}`, title: prev.name, text: prev.summary, cta: `Read the ${prev.name} case study` },
        { href: `/case-studies/${next.slug}`, kicker: `Next · ${next.kicker}`, title: next.name, text: next.summary, cta: `Read the ${next.name} case study` },
      ]}
    />
  );
}
