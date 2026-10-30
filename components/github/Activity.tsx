"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { calendarStats, dayLabel, monthShort, type Calendar, type Day, type Range } from "@/lib/github-shared";

const WAVE = 1.2; // seconds spread across the diagonal; plus the .4s cell animation ≈ 1.6s total

const rangeText = (r: Range) => (r === "last" ? "the last year" : String(r));

/** Full-width stats row, then the heatmap card with `aside` (the languages panel) beside it at equal height. */
export default function Activity({ initial, publicRepos, years, aside }: { initial: Calendar; publicRepos: number; years: number[]; aside?: ReactNode }) {
  const [range, setRange] = useState<Range>("last");
  const [cal, setCal] = useState(initial);
  const [pending, setPending] = useState<Range | null>(null);
  const [error, setError] = useState("");
  const [anim, setAnim] = useState<"idle" | "wait" | "on">("idle");
  const [hover, setHover] = useState<number | null>(null);
  const [cursor, setCursor] = useState<number | null>(null);
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null);
  const [ind, setInd] = useState<{ x: number; w: number } | null>(null);

  const cache = useRef(new Map<Range, Calendar>([["last", initial]]));
  const card = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const pills = useRef<HTMLDivElement>(null);

  const days = useMemo(() => cal.weeks.flatMap((w, wi) => w.map((d) => ({ ...d, wi }))), [cal]);
  const pos = useMemo(() => new Map(days.map((d, i) => [`${d.wi}-${d.weekday}`, i])), [days]);
  const stats = useMemo(() => calendarStats(cal), [cal]);
  const cols = cal.weeks.length;

  const months = useMemo(() => {
    const out: { col: number; label: string }[] = [];
    let prev = -1;
    cal.weeks.forEach((w, i) => {
      const m = Number(w[0].date.slice(5, 7));
      const first = i === 0 ? Number(w[0].date.slice(8, 10)) <= 7 : m !== Number(cal.weeks[i - 1][0].date.slice(5, 7));
      if (first && (out.length === 0 || i - out[out.length - 1].col >= 3) && m !== prev) {
        out.push({ col: i, label: monthShort.format(new Date(`${w[0].date}T00:00:00Z`)) });
        prev = m;
      }
    });
    return out;
  }, [cal]);

  // Reveal once on first view; reduced motion (or no IntersectionObserver) renders everything instantly.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window) || !card.current) return;
    setAnim("wait");
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setAnim("on");
        io.disconnect();
      },
      { threshold: 0.25 },
    );
    io.observe(card.current);
    return () => io.disconnect();
  }, []);

  // Phones: start scrolled to the most recent weeks.
  useEffect(() => {
    const s = scroller.current;
    if (s) s.scrollLeft = s.scrollWidth;
  }, [cal]);

  // Sliding active-pill indicator.
  useLayoutEffect(() => {
    const el = pills.current?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (el) setInd({ x: el.offsetLeft, w: el.offsetWidth });
  }, [range]);

  const active = cursor ?? hover;
  useLayoutEffect(() => {
    const cell = active === null ? null : (grid.current?.children[active] as HTMLElement | undefined);
    if (!cell || !card.current) return setTip(null);
    const c = card.current.getBoundingClientRect();
    const r = cell.getBoundingClientRect();
    setTip({ x: Math.min(Math.max(r.left - c.left + r.width / 2, 120), c.width - 120), y: r.top - c.top });
  }, [active]);

  async function choose(r: Range) {
    if (r === range || pending !== null) return;
    setError("");
    setHover(null);
    setCursor(null);
    let next = cache.current.get(r);
    if (!next) {
      setPending(r);
      try {
        const res = await fetch(`/api/github/contributions?year=${r}`);
        if (!res.ok) throw new Error();
        next = ((await res.json()) as { calendar: Calendar }).calendar;
        cache.current.set(r, next);
      } catch {
        setError(`Couldn't load ${rangeText(r)} from GitHub. Showing ${rangeText(range)}.`);
      } finally {
        setPending(null);
      }
    }
    if (!next) return;
    setAnim("idle"); // the wave plays once; later switches cross-fade
    setRange(r);
    setCal(next);
  }

  function onKey(e: KeyboardEvent) {
    const cur = cursor ?? days.length - 1;
    const d = days[cur];
    const go: Record<string, () => number | undefined> = {
      ArrowLeft: () => pos.get(`${d.wi - 1}-${d.weekday}`),
      ArrowRight: () => pos.get(`${d.wi + 1}-${d.weekday}`),
      ArrowUp: () => (cur > 0 ? cur - 1 : undefined),
      ArrowDown: () => (cur < days.length - 1 ? cur + 1 : undefined),
      Home: () => 0,
      End: () => days.length - 1,
    };
    if (e.key === "Escape") return setCursor(null);
    if (!go[e.key]) return;
    e.preventDefault();
    const n = go[e.key]() ?? cur;
    setCursor(n);
    (grid.current?.children[n] as HTMLElement | undefined)?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  const tiles = [
    { label: `Contributions in ${rangeText(range)}`, value: stats.total },
    { label: "Active days", value: stats.active },
    { label: "Longest streak (days)", value: stats.longest },
    { label: "Public repos", value: publicRepos },
  ];
  const lastWeek = cols - 1;
  const busy = pending !== null;

  return (
    <div className="gh-act">
        <div className="gh-stats">
          {tiles.map((t) => (
            <div key={t.label} className="gh-stat">
              <div className="draw"></div>
              <div key={`${range}-${t.value}`} className="disp cnt gh-n" style={{ "--to": t.value } as CSSProperties} aria-hidden="true"></div>
              <div className="gh-stat-l">
                <span className="sr">{t.value} </span>
                {t.label}
              </div>
            </div>
          ))}
        </div>

      <div className="gh-row">
      <div ref={card} className={`gh-card gh-${anim}`} aria-busy={busy}>
        <div className="gh-top">
          <h3 className="mono gh-h">Contribution activity</h3>
          <div ref={pills} className={`gh-pills mono${ind ? " ready" : ""}`} role="group" aria-label="Choose a period">
            {ind && <span className="gh-ind" style={{ transform: `translateX(${ind.x}px)`, width: ind.w }} aria-hidden="true"></span>}
            {(["last", ...years] as Range[]).map((r) => (
              <button key={r} type="button" aria-pressed={r === range} onClick={() => choose(r)} disabled={busy && pending !== r}>
                {r === "last" ? "Last 12 months" : r}
                {pending === r && <span className="sr"> (loading)</span>}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={scroller}
          className="gh-scroll"
          tabIndex={0}
          aria-label="Contribution heatmap. Use the arrow keys to move between days."
          onKeyDown={onKey}
          onBlur={() => setCursor(null)}
        >
          <div className="gh-frame" style={{ "--cols": cols } as CSSProperties}>
            <div className="gh-months mono" aria-hidden="true">
              {months.map((m) => (
                <span key={m.col} style={{ gridColumn: `${m.col + 1} / span 3` }}>
                  {m.label}
                </span>
              ))}
            </div>
            <div className="gh-wd mono" aria-hidden="true">
              <span style={{ gridRow: 2 }}>Mon</span>
              <span style={{ gridRow: 4 }}>Wed</span>
              <span style={{ gridRow: 6 }}>Fri</span>
            </div>
            <div
              key={String(range)}
              ref={grid}
              className="gh-grid"
              role="img"
              aria-label={`${stats.total} contributions in ${rangeText(range)}${stats.busiestMonth ? `, busiest month ${stats.busiestMonth}` : ""}.`}
              onPointerOver={(e) => {
                const i = (e.target as HTMLElement).dataset.i;
                if (i !== undefined) setHover(Number(i));
              }}
              onPointerLeave={() => setHover(null)}
            >
              {days.map((d, i) => (
                <i
                  key={d.date}
                  data-i={i}
                  className={`gh-c l${d.level}${d.weekday === 0 ? " s" : ""}${d.wi === lastWeek ? " gh-last" : ""}${i === active ? " cur" : ""}`}
                  style={{ gridColumn: d.wi + 1, gridRow: d.weekday + 1, "--d": `${(((d.wi + d.weekday) / (cols + 5)) * WAVE).toFixed(3)}s` } as CSSProperties}
                ></i>
              ))}
            </div>
          </div>
        </div>

        {tip && active !== null && days[active] && (
          <div className="gh-tip mono" style={{ left: tip.x, top: tip.y }} aria-hidden="true">
            {dayLabel(days[active] as Day)}
          </div>
        )}
        <p className="sr" aria-live="polite">
          {cursor !== null && days[cursor] ? dayLabel(days[cursor]) : ""}
        </p>

        <div className="gh-foot mono">
          {error ? <span className="gh-err">{error}</span> : <span>{stats.busiestMonth && `Busiest month: ${stats.busiestMonth}`}</span>}
          <span className="gh-legend" aria-hidden="true">
            Less
            {[0, 1, 2, 3, 4].map((l) => (
              <i key={l} className={`gh-c l${l}`}></i>
            ))}
            More
          </span>
        </div>

        <table className="sr">
          <caption>Weekly contribution totals for {rangeText(range)}</caption>
          <thead>
            <tr>
              <th scope="col">Week starting</th>
              <th scope="col">Contributions</th>
            </tr>
          </thead>
          <tbody>
            {cal.weeks.map((w) => (
              <tr key={w[0].date}>
                <td>{w[0].date}</td>
                <td>{w.reduce((n, d) => n + d.count, 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {aside}
      </div>
    </div>
  );
}
