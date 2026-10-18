import { Fragment } from "react";
import Image from "next/image";
import { PHOTO, external, SITE } from "@/lib/site";

const words = ["Hi,", "I'm", "Zain."];
const role = "Senior Full Stack Developer · AI SaaS";
const facts = ["Bahawalpur, Pakistan", "Africa · US · MENA", "4+ years"];

export default function About() {
  return (
    <section
      id="about"
      className="wrap"
      style={{ paddingTop: 96, paddingBottom: 40, display: "flex", flexWrap: "wrap", gap: 64, alignItems: "center" }}
    >
      <div className="awrap">
        <div className="ab1">
          <div className="badge abf">
            <span className="astar">★</span> Top Rated
          </div>
        </div>
        <div className="ab2">
          <div className="badge abf">
            <span className="adot"></span> 100% Job Success
          </div>
        </div>
        <div className="pflt">
          <span className="tz tz1" aria-hidden="true"></span>
          <span className="tz tz2" aria-hidden="true"></span>
          <span className="tz tz3" aria-hidden="true"></span>
          <span className="tz tz4" aria-hidden="true"></span>
          <div className="ptilt">
            <div className="photo">
              <Image
                src={PHOTO.src}
                alt="Zain Ul Hassan, Senior Full Stack Developer"
                fill
                sizes="(max-width: 899px) 320px, 440px"
                className="photo-img"
              />
            </div>
            <div className="aring" aria-hidden="true">
              <i></i>
            </div>
            <div className="aring r2" aria-hidden="true">
              <i></i>
            </div>
          </div>
        </div>
      </div>
      <div className="atext">
        <div className="eyebrow rv">06 / About</div>
        <h2 className="h2 ahead" style={{ marginBottom: 14 }}>
          {words.map((w, i) => (
            <Fragment key={w}>
              {i > 0 && " "}
              <span className="aw" style={{ "--i": i } as React.CSSProperties}>
                <span>{w}</span>
              </span>
            </Fragment>
          ))}
          <svg className="hand" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 11V6a2 2 0 0 0-4 0" />
            <path d="M14 10V4a2 2 0 0 0-4 0v2" />
            <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
            <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
          </svg>
          <span className="auline"></span>
        </h2>
        <div className="arole mono" style={{ "--ch": role.length } as React.CSSProperties}>
          <span className="atype">{role}</span>
          <span className="acur" aria-hidden="true"></span>
        </div>
        <p className="rv d1" style={{ margin: "0 0 18px", color: "#9A9DA6" }}>
          I&apos;m a senior full stack developer based in Bahawalpur, Pakistan, working with founders and teams across Africa,
          the US and the MENA region.
        </p>
        <p className="rv d2" style={{ margin: "0 0 18px", color: "#9A9DA6" }}>
          I started on Upwork as a Rising Talent and became <mark className="hl">Top Rated</mark> by keeping a{" "}
          <mark className="hl">100% Job Success Score</mark>, which comes down to one habit:{" "}
          <mark className="hl">say what I will deliver, then deliver it</mark>.
        </p>
        <p className="rv d3" style={{ margin: 0, color: "#9A9DA6" }}>
          Alongside client work I build my own products and share the process on{" "}
          <a
            className="alnk"
            href={SITE.linkedin}
            {...external}
            data-track="linkedin_click"
            data-track-location="about"
            aria-label="LinkedIn (opens in a new tab)"
          >
            LinkedIn
          </a>
          {SITE.youtube && (
            <>
              {" "}
              and{" "}
              <a className="alnk" href={SITE.youtube} {...external} aria-label="YouTube (opens in a new tab)">
                YouTube
              </a>
            </>
          )}
          . I&apos;m also finishing a BS in Software Engineering.
        </p>
        <div className="facts">
          {facts.map((f) => (
            <span key={f} className="fact mono">
              {f}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
