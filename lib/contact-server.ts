import { Resend } from "resend";
import {
  autoReplyHtml,
  autoReplySubject,
  autoReplyText,
  inquiryHtml,
  inquirySubject,
  inquiryText,
  type LeadMeta,
} from "@/lib/contact-email";
import { LIMITS, metaSchema, validateContact, type ContactData, type ContactResponse } from "@/lib/contact-schema";
import { rateLimit } from "@/lib/rate-limit";
import { SITE } from "@/lib/site";

/**
 * POST /api/contact logic, kept out of the route file so it can be unit tested.
 * Never returns internal errors or secrets to the client; details go to server logs only.
 */

export const MAX_BODY_BYTES = 20 * 1024;

const GENERIC_ERROR = `Something went wrong. Please email me directly at ${SITE.email}`;

function json(body: ContactResponse, status = 200, headers?: Record<string, string>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers },
  });
}

const fail = (
  status: number,
  error: string,
  extra?: Omit<Extract<ContactResponse, { ok: false }>, "ok" | "error">,
  headers?: Record<string, string>,
) => json({ ok: false, error, ...extra }, status, headers);

function clientIp(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : req.headers.get("x-real-ip"))?.trim() || "unknown";
}

/** Same-origin check: the Origin header must match the host serving the request (or the configured site URL). */
function isSameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }
  const allowed = new Set<string>();
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (host) allowed.add(host);
  for (const u of [process.env.NEXT_PUBLIC_SITE_URL, SITE.url]) {
    try {
      if (u) allowed.add(new URL(u).host);
    } catch {}
  }
  if (process.env.VERCEL_URL) allowed.add(process.env.VERCEL_URL);
  return allowed.has(originHost);
}

async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) return true; // not configured: skip
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip !== "unknown") body.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (!data.success) console.warn("[contact] Turnstile rejected:", data["error-codes"]);
    return data.success === true;
  } catch (err) {
    console.error("[contact] Turnstile verification failed:", err instanceof Error ? err.message : err);
    return false;
  }
}

async function sendEmails(d: ContactData, meta: LeadMeta): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !from) {
    console.error(
      `[contact] Email not sent: ${!key ? "RESEND_API_KEY" : "CONTACT_FROM_EMAIL"} is not set. Add it in your environment (see .env.example).`,
    );
    return false;
  }
  const resend = new Resend(key);
  const to = process.env.CONTACT_TO_EMAIL || SITE.email;
  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: d.email,
      subject: inquirySubject(d),
      html: inquiryHtml(d, meta),
      text: inquiryText(d, meta),
    });
    if (error) {
      console.error("[contact] Resend rejected the inquiry email:", error.name, error.message);
      return false;
    }
  } catch (err) {
    console.error("[contact] Resend request failed:", err instanceof Error ? err.message : err);
    return false;
  }

  if (process.env.CONTACT_SEND_AUTOREPLY === "true") {
    try {
      const { error } = await resend.emails.send({
        from,
        to: d.email,
        replyTo: to,
        subject: autoReplySubject(d),
        html: autoReplyHtml(d),
        text: autoReplyText(d),
      });
      if (error) console.error("[contact] Auto-reply failed (inquiry was delivered):", error.name, error.message);
    } catch (err) {
      console.error("[contact] Auto-reply request failed (inquiry was delivered):", err instanceof Error ? err.message : err);
    }
  }
  return true;
}

/** Fallback copy in Supabase (service role, server only). Returns null when not configured. */
async function storeLead(d: ContactData, meta: LeadMeta): Promise<boolean | null> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  try {
    const res = await fetch(`${url.replace(/\/+$/, "")}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: d.name,
        email: d.email,
        service: d.service,
        message: d.message,
        budget: d.budget || null,
        timeline: d.timeline || null,
        company: d.company || null,
        source: meta.source,
        page: meta.page,
        country: meta.country ?? null,
        user_agent: meta.userAgent ?? null,
      }),
    });
    if (!res.ok) {
      console.error("[contact] Supabase insert failed with status", res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[contact] Supabase insert failed:", err instanceof Error ? err.message : err);
    return false;
  }
}

export async function handleContactRequest(req: Request): Promise<Response> {
  if (!isSameOrigin(req)) return fail(403, "Forbidden.");

  const type = req.headers.get("content-type") ?? "";
  if (!/^application\/json\b/i.test(type)) return fail(415, "Content-Type must be application/json.");

  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return fail(413, "Message is too large.");

  const ip = clientIp(req);
  const limit = await rateLimit(`ip:${ip}`);
  if (!limit.allowed)
    return fail(429, "Too many messages. Please wait a few minutes or email me directly.", undefined, {
      "Retry-After": String(limit.retryAfterSec),
    });

  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return fail(400, "Invalid request body.");
  }
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return fail(413, "Message is too large.");

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail(400, "Invalid JSON.");
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return fail(400, "Invalid request body.");

  const meta = metaSchema.safeParse(body);
  if (!meta.success) return fail(400, "Invalid request.");

  // Honeypot filled: pretend it worked so bots don't learn anything.
  if (meta.data.website_url && meta.data.website_url.trim() !== "") {
    console.info("[contact] Honeypot triggered; dropped silently.");
    return json({ ok: true });
  }

  if (meta.data.elapsedMs < LIMITS.minFillMs) return fail(422, "That was quick. Please check your details and send again.");

  const result = validateContact(body);
  if (!result.ok) return fail(422, "Please fix the highlighted fields.", { fieldErrors: result.fieldErrors });

  if (!(await verifyTurnstile(meta.data.turnstileToken, ip)))
    return fail(400, "Verification failed. Please try again or email me directly.");

  const d = result.data;
  const leadMeta: LeadMeta = {
    source: meta.data.source,
    page: meta.data.page,
    receivedAt: new Date(),
    country: req.headers.get("x-vercel-ip-country") ?? req.headers.get("cf-ipcountry") ?? undefined,
    userAgent: req.headers.get("user-agent")?.slice(0, 300) ?? undefined,
  };

  const [sent, stored] = await Promise.all([sendEmails(d, leadMeta), storeLead(d, leadMeta)]);

  if (sent) return json({ ok: true });
  if (stored) {
    console.error(`[contact] EMAIL FAILED but the lead was saved in Supabase (leads table). Follow up with ${d.email} manually.`);
    return json({ ok: true });
  }
  return fail(500, GENERIC_ERROR);
}
