import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.fn();
vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

const { handleContactRequest, MAX_BODY_BYTES } = await import("@/lib/contact-server");
const { resetRateLimit } = await import("@/lib/rate-limit");

const HOST = "localhost:3000";
let ipCounter = 0;

const validBody = () => ({
  name: "Ada Lovelace",
  email: "ada@example.com",
  service: "AI features",
  message: "Please add a RAG chatbot to our support dashboard.",
  budget: "$5k - $15k",
  timeline: "1-2 months",
  company: "acme.io",
  website_url: "",
  elapsedMs: 15_000,
  source: "nav",
  page: "/services",
});

function request(body: unknown, init: { headers?: Record<string, string>; raw?: string; ip?: string } = {}) {
  return new Request(`http://${HOST}/api/contact`, {
    method: "POST",
    headers: {
      host: HOST,
      origin: `http://${HOST}`,
      "content-type": "application/json",
      "x-forwarded-for": init.ip ?? `10.0.0.${++ipCounter}`,
      "user-agent": "vitest",
      ...init.headers,
    },
    body: init.raw ?? JSON.stringify(body),
  });
}

beforeEach(() => {
  resetRateLimit();
  send.mockReset();
  send.mockResolvedValue({ data: { id: "email_1" }, error: null });
  vi.stubEnv("RESEND_API_KEY", "re_test_key");
  vi.stubEnv("CONTACT_FROM_EMAIL", "Zain <hello@example.com>");
  vi.stubEnv("CONTACT_TO_EMAIL", "owner@example.com");
  vi.stubEnv("CONTACT_SEND_AUTOREPLY", "false");
  vi.stubEnv("SUPABASE_URL", "");
  vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "");
  vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
  vi.stubEnv("TURNSTILE_SECRET_KEY", "");
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "info").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("POST /api/contact", () => {
  it("sends the inquiry with Reply-To set to the visitor", async () => {
    const res = await handleContactRequest(request(validBody()));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(send).toHaveBeenCalledTimes(1);
    const mail = send.mock.calls[0][0];
    expect(mail).toMatchObject({
      from: "Zain <hello@example.com>",
      to: "owner@example.com",
      replyTo: "ada@example.com",
      subject: "New inquiry: AI features from Ada Lovelace",
    });
    expect(mail.text).toContain("Opened from: nav on /services");
    expect(mail.html).toContain("mailto:ada@example.com");
  });

  it("sends an auto-reply only when enabled", async () => {
    vi.stubEnv("CONTACT_SEND_AUTOREPLY", "true");
    await handleContactRequest(request(validBody()));
    expect(send).toHaveBeenCalledTimes(2);
    expect(send.mock.calls[1][0]).toMatchObject({
      from: "Zain <hello@example.com>",
      to: "ada@example.com",
      replyTo: "owner@example.com",
      subject: "Thanks Ada, I've got your message",
    });
    expect(send.mock.calls[1][0].text).toContain("I've received your inquiry about AI features.");
  });

  it("does not send the auto-reply when the inquiry email fails", async () => {
    vi.stubEnv("CONTACT_SEND_AUTOREPLY", "true");
    send.mockResolvedValue({ data: null, error: { name: "validation_error", message: "nope" } });
    expect((await handleContactRequest(request(validBody()))).status).toBe(500);
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("still returns ok when only the auto-reply fails", async () => {
    vi.stubEnv("CONTACT_SEND_AUTOREPLY", "true");
    send.mockResolvedValueOnce({ data: { id: "email_1" }, error: null }).mockRejectedValueOnce(new Error("network down"));
    const res = await handleContactRequest(request(validBody()));
    expect(res.status).toBe(200);
    expect(send).toHaveBeenCalledTimes(2);
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining("Auto-reply request failed"), "network down");
  });

  it("does not send the auto-reply for honeypot submissions", async () => {
    vi.stubEnv("CONTACT_SEND_AUTOREPLY", "true");
    await handleContactRequest(request({ ...validBody(), website_url: "http://spam.example" }));
    expect(send).not.toHaveBeenCalled();
  });

  it("returns 422 with field errors for invalid input", async () => {
    const res = await handleContactRequest(request({ ...validBody(), email: "nope", message: "short" }));
    expect(res.status).toBe(422);
    const json = await res.json();
    expect(json.ok).toBe(false);
    expect(Object.keys(json.fieldErrors).sort()).toEqual(["email", "message"]);
    expect(send).not.toHaveBeenCalled();
  });

  it("rejects header injection", async () => {
    const res = await handleContactRequest(request({ ...validBody(), name: "Eve\r\nBcc: all@example.com" }));
    expect(res.status).toBe(422);
    expect((await res.json()).fieldErrors.name).toBeTruthy();
    expect(send).not.toHaveBeenCalled();
  });

  it("fakes success when the honeypot is filled, without sending", async () => {
    const res = await handleContactRequest(request({ ...validBody(), website_url: "http://spam.example" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(send).not.toHaveBeenCalled();
  });

  it("rejects submissions faster than 3 seconds", async () => {
    const res = await handleContactRequest(request({ ...validBody(), elapsedMs: 1200 }));
    expect(res.status).toBe(422);
    expect(send).not.toHaveBeenCalled();
  });

  it("rate limits to 5 requests per 10 minutes per IP", async () => {
    for (let i = 0; i < 5; i++) {
      expect((await handleContactRequest(request(validBody(), { ip: "203.0.113.9" }))).status).toBe(200);
    }
    const blocked = await handleContactRequest(request(validBody(), { ip: "203.0.113.9" }));
    expect(blocked.status).toBe(429);
    expect(Number(blocked.headers.get("retry-after"))).toBeGreaterThan(0);
    // A different IP is unaffected.
    expect((await handleContactRequest(request(validBody(), { ip: "203.0.113.10" }))).status).toBe(200);
  });

  it("rejects cross-origin and missing Origin", async () => {
    expect((await handleContactRequest(request(validBody(), { headers: { origin: "https://evil.example" } }))).status).toBe(403);
    const noOrigin = request(validBody());
    noOrigin.headers.delete("origin");
    expect((await handleContactRequest(noOrigin)).status).toBe(403);
  });

  it("requires application/json", async () => {
    const res = await handleContactRequest(request(validBody(), { headers: { "content-type": "text/plain" } }));
    expect(res.status).toBe(415);
  });

  it("rejects bodies over 20KB and malformed JSON", async () => {
    const big = { ...validBody(), message: "x".repeat(MAX_BODY_BYTES) };
    expect((await handleContactRequest(request(big))).status).toBe(413);
    expect((await handleContactRequest(request(null, { raw: "{not json" }))).status).toBe(400);
  });

  it("returns a generic 500 without leaking details when Resend fails", async () => {
    send.mockResolvedValue({ data: null, error: { name: "validation_error", message: "secret internal detail" } });
    const res = await handleContactRequest(request(validBody()));
    expect(res.status).toBe(500);
    const text = await res.text();
    expect(text).not.toContain("secret internal detail");
    expect(text).not.toContain("re_test_key");
    expect(JSON.parse(text).error).toMatch(/email me directly/);
  });

  it("returns 500 with a server log when RESEND_API_KEY is missing", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const res = await handleContactRequest(request(validBody()));
    expect(res.status).toBe(500);
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining("RESEND_API_KEY"));
  });

  it("still returns ok when email fails but the Supabase copy is stored", async () => {
    vi.stubEnv("SUPABASE_URL", "https://proj.supabase.co");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "service_key");
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
    vi.stubGlobal("fetch", fetchMock);
    send.mockRejectedValue(new Error("network down"));
    const res = await handleContactRequest(request(validBody()));
    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledWith("https://proj.supabase.co/rest/v1/leads", expect.objectContaining({ method: "POST" }));
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining("EMAIL FAILED"));
  });

  it("verifies Turnstile when configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "site");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ success: false, "error-codes": ["invalid-input-response"] }));
    vi.stubGlobal("fetch", fetchMock);
    expect((await handleContactRequest(request({ ...validBody(), turnstileToken: "bad" }))).status).toBe(400);
    expect((await handleContactRequest(request(validBody()))).status).toBe(400); // missing token
    fetchMock.mockResolvedValue(Response.json({ success: true }));
    expect((await handleContactRequest(request({ ...validBody(), turnstileToken: "good" }))).status).toBe(200);
  });
});
