import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Crumb } from "@/lib/schema";

/** Inner-page hero: breadcrumbs, eyebrow, the single H1 and an answer-first lead (not animated, so it can be the LCP). */
export default function PageHeader({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header style={{ position: "relative" }}>
      <div className="grid" aria-hidden="true"></div>
      <div className="wrap" style={{ position: "relative", paddingTop: 56, paddingBottom: 24 }}>
        <Breadcrumbs items={crumbs} />
        <div className="eyebrow" style={{ marginTop: 40 }}>
          {eyebrow}
        </div>
        <h1 className="ph1">{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </header>
  );
}
