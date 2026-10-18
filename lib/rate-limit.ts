import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/** 5 requests per 10 minutes per key (IP). */
export const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 } as const;

export type RateLimitResult = { allowed: boolean; retryAfterSec: number };

let upstash: Ratelimit | null | undefined;

function getUpstash() {
  if (upstash !== undefined) return upstash;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  upstash =
    url && token
      ? new Ratelimit({
          redis: new Redis({ url, token }),
          limiter: Ratelimit.slidingWindow(RATE_LIMIT.max, "10 m"),
          prefix: "contact",
          analytics: false,
        })
      : null;
  return upstash;
}

/**
 * In-memory fallback. On serverless (Vercel) each instance has its own Map and it resets
 * on every cold start, so this only slows down a single abuser hitting one warm instance.
 * Set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN for a real, shared limit.
 */
const memory = new Map<string, number[]>();

function memoryLimit(key: string, now: number): RateLimitResult {
  const since = now - RATE_LIMIT.windowMs;
  const hits = (memory.get(key) ?? []).filter((t) => t > since);
  if (hits.length >= RATE_LIMIT.max) {
    memory.set(key, hits);
    return { allowed: false, retryAfterSec: Math.ceil((hits[0] + RATE_LIMIT.windowMs - now) / 1000) };
  }
  hits.push(now);
  memory.set(key, hits);
  // Keep the map bounded on long-lived instances.
  if (memory.size > 5000) for (const [k, v] of memory) if (!v.some((t) => t > since)) memory.delete(k);
  return { allowed: true, retryAfterSec: 0 };
}

export async function rateLimit(key: string, now = Date.now()): Promise<RateLimitResult> {
  const rl = getUpstash();
  if (rl) {
    try {
      const r = await rl.limit(key);
      return { allowed: r.success, retryAfterSec: r.success ? 0 : Math.max(1, Math.ceil((r.reset - now) / 1000)) };
    } catch (err) {
      // Redis outage: fall back to memory rather than blocking every lead.
      console.error("[contact] Upstash rate limit failed, using in-memory fallback:", err instanceof Error ? err.message : err);
    }
  }
  return memoryLimit(key, now);
}

/** Test helper. */
export function resetRateLimit() {
  memory.clear();
  upstash = undefined;
}
