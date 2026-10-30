import { getContributions, REVALIDATE } from "@/lib/github";
import { parseRange } from "@/lib/github-shared";

/** GET /api/github/contributions?year=last|2026|2025|2024 -> { calendar }. Same 6-hour cache as the homepage. */
export async function GET(req: Request) {
  const range = parseRange(new URL(req.url).searchParams.get("year"));
  if (range === null) return Response.json({ error: "Unsupported year" }, { status: 400 });

  const calendar = await getContributions(range);
  if (!calendar) return Response.json({ error: "GitHub data unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } });

  return Response.json(
    { calendar },
    { headers: { "Cache-Control": `public, s-maxage=${REVALIDATE}, stale-while-revalidate=86400` } },
  );
}
