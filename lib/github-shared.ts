/* Types and pure helpers for the GitHub section. No secrets here: safe to import from client components. */

export type Level = 0 | 1 | 2 | 3 | 4;
export type Day = { date: string; count: number; level: Level; weekday: number };
export type Calendar = { total: number; weeks: Day[][] };

/** "last" = the last 12 months; otherwise a calendar year. */
export type Range = "last" | number;

export const LEVELS: Record<string, Level> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

/** Year pills: the current year and the two before it. */
export const yearOptions = (now = new Date()) => {
  const y = now.getUTCFullYear();
  return [y, y - 1, y - 2];
};

export const parseRange = (v: string | null | undefined, now = new Date()): Range | null => {
  if (!v || v === "last") return "last";
  const y = Number(v);
  return yearOptions(now).includes(y) ? y : null;
};

const fmtWeekday = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "UTC" });
const fmtMonth = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
export const monthShort = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });

/** "12 contributions on Mon, 12 Oct 2026" */
export const dayLabel = (d: Day) => {
  const t = new Date(`${d.date}T00:00:00Z`);
  const when = `${fmtWeekday.format(t)}, ${t.getUTCDate()} ${monthShort.format(t)} ${t.getUTCFullYear()}`;
  return `${d.count === 0 ? "No" : d.count} contribution${d.count === 1 ? "" : "s"} on ${when}`;
};

export function calendarStats(c: Calendar) {
  const days = c.weeks.flat();
  let active = 0;
  let streak = 0;
  let longest = 0;
  const months = new Map<string, number>();
  for (const d of days) {
    if (d.count > 0) {
      active++;
      longest = Math.max(longest, ++streak);
    } else streak = 0;
    const m = d.date.slice(0, 7);
    months.set(m, (months.get(m) ?? 0) + d.count);
  }
  let busiest = "";
  let max = 0;
  for (const [m, n] of months) if (n > max) [busiest, max] = [m, n];
  return {
    total: c.total,
    active,
    longest,
    busiestMonth: busiest ? fmtMonth.format(new Date(`${busiest}-01T00:00:00Z`)) : "",
  };
}
