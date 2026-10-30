import type { CSSProperties } from "react";
import Activity from "@/components/github/Activity";
import HireButton from "@/components/hire/HireButton";
import { getGitHubProfile, type GitHubProfile } from "@/lib/github";
import { yearOptions } from "@/lib/github-shared";
import { external, SITE } from "@/lib/site";

/** Percent by repo count; languages under 3% fold into "Other". */
function languageShares(langs: GitHubProfile["languages"]) {
  const total = langs.reduce((n, l) => n + l.count, 0);
  if (!total) return [];
  const main = langs.filter((l) => l.count / total >= 0.03);
  const other = total - main.reduce((n, l) => n + l.count, 0);
  return [...main, ...(other ? [{ name: "Other", color: "#2E323B", count: other }] : [])].map((l) => ({ ...l, pct: (l.count / total) * 100 }));
}

function LanguageBar({ langs }: { langs: GitHubProfile["languages"] }) {
  const shares = languageShares(langs);
  if (shares.length === 0) return null;
  return (
    <div className="gh-lang rv">
      <h3 className="mono gh-h">Languages across public repos</h3>
      <div className="gh-bar" aria-hidden="true">
        {shares.map((l, i) => (
          <span key={l.name} style={{ "--w": `${l.pct}%`, "--k": i, background: l.color } as CSSProperties}></span>
        ))}
      </div>
      <ul className="gh-langs mono">
        {shares.map((l) => (
          <li key={l.name}>
            <i style={{ background: l.color }} aria-hidden="true"></i>
            {l.name} <span>{Math.round(l.pct)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function GitHub() {
  const data = await getGitHubProfile();
  const profile = SITE.github.replace(/\/+$/, "");

  return (
    <section id="github" className="wrap" style={{ paddingTop: 96, paddingBottom: 40 }} aria-labelledby="github-h">
      <div className="eyebrow rv">Open source and code</div>
      <h2 id="github-h" className="h2 rv d1">
        I build in public
      </h2>
      <p className="rv d2 gh-sub">Real commits, real products. Live data straight from GitHub.</p>

      {data && (
        <Activity
          initial={data.calendar}
          publicRepos={data.publicRepos}
          years={yearOptions()}
          aside={<LanguageBar langs={data.languages} />}
        />
      )}

      <div className="btnrow gh-cta rv">
        <a
          className="shine"
          href={profile}
          {...external}
          data-track="github_profile_click"
          data-track-location="home-github"
          style={{ background: "var(--ac)", color: "#0A0B0D", fontWeight: 600, padding: "16px 28px", borderRadius: 999 }}
        >
          View GitHub profile ↗
        </a>
        <HireButton
          source="home-github"
          className="ghost-btn"
          href="/contact"
          data-track="cta_click"
          data-track-location="home-github"
          style={{ border: "1px solid #2E323B", padding: "16px 28px", borderRadius: 999, fontWeight: 500 }}
        >
          Hire me
        </HireButton>
      </div>
      {data && (
        <p className="mono gh-note">Live data from GitHub, refreshed every few hours. Includes private work I can&apos;t show publicly.</p>
      )}
    </section>
  );
}
