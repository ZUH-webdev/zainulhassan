import Image from "next/image";
import { BIO, PHOTO, SITE } from "@/lib/site";

/** "About the author" panel closing each blog post, linking to /about. */
export default function AuthorBox() {
  return (
    <aside className="card" aria-labelledby="author-h" style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "flex-start", marginTop: 56 }}>
      <Image
        src={PHOTO.src}
        alt={`${SITE.name}, Senior Full Stack Developer`}
        width={72}
        height={72}
        sizes="72px"
        style={{ borderRadius: 999, objectFit: "cover", flex: "none" }}
      />
      <div style={{ flex: "1 1 260px", minWidth: 0 }}>
        <p className="mono" style={{ margin: 0, fontSize: 12.5, color: "#9A9DA6", letterSpacing: ".04em" }}>
          About the author
        </p>
        <p id="author-h" className="disp" style={{ margin: "6px 0 8px", fontWeight: 700, fontSize: 22, letterSpacing: "-.02em" }}>
          <a href="/about">{SITE.name}</a>
        </p>
        <p style={{ margin: 0, color: "#9A9DA6", fontSize: 16 }}>{BIO}</p>
        <p className="mono" style={{ margin: "14px 0 0", fontSize: 13 }}>
          <a className="tl" href="/about">
            More about my background and how I work →
          </a>
        </p>
      </div>
    </aside>
  );
}
