/**
 * Server-only GitHub GraphQL client. GITHUB_TOKEN is read here and never sent to the browser
 * (it has no NEXT_PUBLIC_ prefix, and nothing in this file is imported by client components).
 * Every function returns null on a missing token or any API error, so callers can hide live data.
 */
import { GITHUB_LOGIN } from "@/content/github";
import { LEVELS, type Calendar, type Range } from "@/lib/github-shared";

export const REVALIDATE = 21600; // 6 hours

type RawRepo = {
  isPrivate: boolean;
  isFork: boolean;
  primaryLanguage: { name: string; color: string | null } | null;
};
type RawCalendar = {
  totalContributions: number;
  weeks: { contributionDays: { date: string; contributionCount: number; contributionLevel: string; weekday: number }[] }[];
};

const CALENDAR = `contributionsCollection(from: $from, to: $to) {
  contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel weekday } } }
}`;

async function query<T>(q: string, variables: Record<string, unknown>): Promise<T | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: q, variables }),
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { data?: T; errors?: unknown };
    return json.errors || !json.data ? null : json.data;
  } catch {
    return null;
  }
}

/** Day-aligned bounds, so the request body (and so the fetch cache key) only changes once a day. */
function bounds(range: Range, now = new Date()) {
  if (range !== "last") return { from: `${range}-01-01T00:00:00Z`, to: `${range}-12-31T23:59:59Z` };
  const to = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59));
  const from = new Date(Date.UTC(now.getUTCFullYear() - 1, now.getUTCMonth(), now.getUTCDate() + 1));
  return { from: from.toISOString(), to: to.toISOString() };
}

const toCalendar = (c: RawCalendar): Calendar => ({
  total: c.totalContributions,
  weeks: c.weeks.map((w) =>
    w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount, level: LEVELS[d.contributionLevel] ?? 0, weekday: d.weekday })),
  ),
});

export async function getContributions(range: Range): Promise<Calendar | null> {
  const data = await query<{ user: { contributionsCollection: { contributionCalendar: RawCalendar } } | null }>(
    `query($login: String!, $from: DateTime!, $to: DateTime!) { user(login: $login) { ${CALENDAR} } }`,
    { login: GITHUB_LOGIN, ...bounds(range) },
  );
  const cal = data?.user?.contributionsCollection.contributionCalendar;
  return cal ? toCalendar(cal) : null;
}

export type GitHubProfile = {
  calendar: Calendar;
  publicRepos: number;
  /** Repo count per primary language across public, non-fork repos. */
  languages: { name: string; color: string; count: number }[];
};

export async function getGitHubProfile(): Promise<GitHubProfile | null> {
  const data = await query<{
    user: {
      contributionsCollection: { contributionCalendar: RawCalendar };
      repositories: { totalCount: number; nodes: RawRepo[] };
    } | null;
  }>(
    `query($login: String!, $from: DateTime!, $to: DateTime!) { user(login: $login) {
      ${CALENDAR}
      repositories(privacy: PUBLIC, ownerAffiliations: OWNER, first: 100, orderBy: { field: PUSHED_AT, direction: DESC }) {
        totalCount nodes { isPrivate isFork primaryLanguage { name color } }
      }
    } }`,
    { login: GITHUB_LOGIN, ...bounds("last") },
  );
  const u = data?.user;
  if (!u) return null;

  // Public repositories only: private ones are dropped even if the token can see them.
  const repos = u.repositories.nodes.filter((r) => !r.isPrivate);

  const langs = new Map<string, { name: string; color: string; count: number }>();
  for (const r of repos) {
    if (r.isFork || !r.primaryLanguage) continue;
    const l = langs.get(r.primaryLanguage.name) ?? { name: r.primaryLanguage.name, color: r.primaryLanguage.color ?? "#9A9DA6", count: 0 };
    l.count++;
    langs.set(l.name, l);
  }

  return {
    calendar: toCalendar(u.contributionsCollection.contributionCalendar),
    publicRepos: u.repositories.totalCount,
    languages: [...langs.values()].sort((a, b) => b.count - a.count),
  };
}
