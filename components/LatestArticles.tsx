import Link from "next/link";
import Related from "@/components/Related";
import { posts } from "@/content/blog";

/** Homepage row linking the newest guides (posts are sorted newest first). */
export default function LatestArticles({ count = 3 }: { count?: number }) {
  return (
    <>
      <Related
        id="latest-articles"
        eyebrow="Latest articles"
        title="Guides from the build log"
        items={posts.slice(0, count).map((p) => ({ href: `/blog/${p.slug}`, kicker: "Guide", title: p.title, text: p.description, cta: "Read the article" }))}
      />
      <div className="wrap">
        <p className="mono rv" style={{ margin: "28px 0 0", fontSize: 13 }}>
          <Link className="tl" href="/blog">
            Read all {posts.length} articles →
          </Link>
        </p>
      </div>
    </>
  );
}
