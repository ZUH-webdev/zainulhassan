import type { Crumb } from "@/lib/schema";

/** Visible breadcrumb trail (BreadcrumbList JSON-LD is added in each page's @graph). */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="crumbs mono">
      <ol>
        {items.map((c, i) =>
          i === items.length - 1 ? (
            <li key={c.path}>
              <span aria-current="page">{c.name}</span>
            </li>
          ) : (
            <li key={c.path}>
              <a href={c.path}>{c.name}</a>
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}
