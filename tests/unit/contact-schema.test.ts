import { describe, expect, it } from "vitest";
import { cleanText, contactSchema, LIMITS, validateContact, type ContactData } from "@/lib/contact-schema";
import { escapeHtml, inquiryHtml, inquiryText } from "@/lib/contact-email";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  service: "SaaS MVP",
  message: "I need a multi-tenant SaaS MVP with Stripe billing.",
};

describe("contactSchema", () => {
  it("accepts a valid minimal submission and fills optional fields", () => {
    const r = validateContact(valid);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data).toEqual({ ...valid, budget: "", timeline: "", company: "" });
  });

  it("accepts every optional field", () => {
    const r = validateContact({ ...valid, budget: "$5k - $15k", timeline: "ASAP", company: "  acme.io  " });
    expect(r.ok && r.data.company).toBe("acme.io");
  });

  it("requires name, email, service and message", () => {
    const r = validateContact({});
    expect(r.ok).toBe(false);
    if (!r.ok) expect(Object.keys(r.fieldErrors).sort()).toEqual(["email", "message", "name", "service"]);
  });

  it("enforces name length 2-80 after trimming", () => {
    expect(validateContact({ ...valid, name: " A " }).ok).toBe(false);
    expect(validateContact({ ...valid, name: "A".repeat(81) }).ok).toBe(false);
    expect(validateContact({ ...valid, name: "Al" }).ok).toBe(true);
  });

  it("rejects invalid emails", () => {
    for (const email of ["nope", "a@b", "a b@c.com", "@example.com"]) {
      expect(validateContact({ ...valid, email }).ok, email).toBe(false);
    }
  });

  it("rejects services, budgets and timelines outside the allowed lists", () => {
    expect(validateContact({ ...valid, service: "Hacking" }).ok).toBe(false);
    expect(validateContact({ ...valid, budget: "$1M" }).ok).toBe(false);
    expect(validateContact({ ...valid, timeline: "yesterday" }).ok).toBe(false);
  });

  it("enforces message length 20-4000", () => {
    expect(validateContact({ ...valid, message: "too short" }).ok).toBe(false);
    expect(validateContact({ ...valid, message: "x".repeat(LIMITS.messageMax + 1) }).ok).toBe(false);
    expect(validateContact({ ...valid, message: "x".repeat(LIMITS.messageMin) }).ok).toBe(true);
  });

  it("rejects header injection in name and email", () => {
    const n = validateContact({ ...valid, name: "Eve\r\nBcc: victim@example.com" });
    expect(n.ok).toBe(false);
    if (!n.ok) expect(n.fieldErrors.name).toMatch(/line breaks/);
    expect(validateContact({ ...valid, email: "eve@example.com\nBcc: x@y.com" }).ok).toBe(false);
    expect(validateContact({ ...valid, name: "Eve\u2028Bcc" }).ok).toBe(false);
  });

  it("strips control characters but keeps newlines in the message", () => {
    const r = contactSchema.parse({ ...valid, name: "Ada\u0000 L", message: "Line one is long enough\r\nline\u0007 two\ttab" });
    expect(r.name).toBe("Ada L");
    expect(r.message).toBe("Line one is long enough\nline two\ttab");
    expect(cleanText("  a\u001Fb  ")).toBe("ab");
  });
});

describe("email templates", () => {
  const evil: ContactData = {
    ...valid,
    service: "SaaS MVP",
    name: `<script>alert("x")</script>`,
    message: `<img src=x onerror=alert(1)> & "quotes" 'single'\nsecond line`,
    budget: "",
    timeline: "",
    company: `<a href="javascript:alert(1)">x</a>`,
  };
  const meta = { source: "nav", page: "/", receivedAt: new Date("2026-10-18T09:00:00Z"), country: "PK", userAgent: "<ua>" };

  it("escapes HTML special characters", () => {
    expect(escapeHtml(`<>&"'\``)).toBe("&lt;&gt;&amp;&quot;&#39;&#96;");
  });

  it("never puts raw user input into the HTML email", () => {
    const html = inquiryHtml(evil, meta);
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img src=x");
    expect(html).not.toContain(`<a href="javascript`);
    expect(html).not.toContain("<ua>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("second line"); // newline became <br>
    expect(html).toContain("<br>second line");
    expect(html).toContain("PKT");
  });

  it("includes every field in the plain-text version", () => {
    const text = inquiryText(evil, meta);
    expect(text).toContain("Email: ada@example.com");
    expect(text).toContain("Budget: Not given");
    expect(text).toContain("Opened from: nav on /");
    expect(text).toContain("Country: PK");
  });
});
