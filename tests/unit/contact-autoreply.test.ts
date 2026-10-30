import { describe, expect, it } from "vitest";
import {
  AUTO_REPLY_MESSAGE_MAX,
  AUTO_REPLY_PROMISE,
  autoReplyHtml,
  autoReplySubject,
  autoReplyText,
  inquiryHtml,
} from "@/lib/contact-email";
import type { ContactData } from "@/lib/contact-schema";
import { SITE } from "@/lib/site";

const full: ContactData = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  service: "AI features",
  message: "Please add a RAG chatbot to our support dashboard.\nIt should cite sources.",
  budget: "$5k - $15k",
  timeline: "1-2 months",
  company: "acme.io",
};

const minimal: ContactData = { ...full, budget: "", timeline: "", company: "" };

const hostile = {
  ...full,
  name: `<script>alert("x")</script>Eve`,
  message: `<script>alert(1)</script> <img src=x onerror=alert(1)> "double" 'single' ` + "A".repeat(5000),
  budget: `"><script>alert(2)</script>`,
} as unknown as ContactData;

describe("auto-reply subject", () => {
  it("uses the first name", () => {
    expect(autoReplySubject(full)).toBe("Thanks Ada, I've got your message");
  });

  it("falls back when the name is missing", () => {
    expect(autoReplySubject({ ...full, name: "" })).toBe("Thanks, I've got your message");
    expect(autoReplySubject({ ...full, name: "   " })).toBe("Thanks, I've got your message");
  });

  it("strips newlines and control characters", () => {
    const subject = autoReplySubject({ ...full, name: "\r\nBcc: all@example.com\nAda" });
    expect(subject).not.toMatch(/[\p{Cc}\p{Zl}\p{Zp}]/u);
    expect(subject).toBe("Thanks Bcc:, I've got your message");
  });

  it("keeps digits and accented letters in the first name", () => {
    expect(autoReplySubject({ ...full, name: "Zoë2029 Smith" })).toBe("Thanks Zoë2029, I've got your message");
  });

  it("caps very long first names", () => {
    expect(autoReplySubject({ ...full, name: "A".repeat(500) }).length).toBeLessThan(80);
  });
});

describe("auto-reply body", () => {
  it("renders every section with all fields", () => {
    const html = autoReplyHtml(full);
    for (const s of [
      "Hi Ada,",
      "inquiry about AI features",
      "$5k - $15k",
      "1-2 months",
      "<br>It should cite sources.",
      AUTO_REPLY_PROMISE,
      "What happens next",
      "We align on scope and timeline.",
      "Recent work",
      `${SITE.url}/case-studies/leadsmind`,
      `${SITE.url}/case-studies/velocity`,
      `${SITE.url}/case-studies/world-teachers-academy`,
      SITE.jobTitle,
      SITE.upwork,
      SITE.linkedin,
    ]) {
      expect(html).toContain(s);
    }
    expect(html).not.toContain("acme.io"); // company isn't part of the summary
    expect(html).not.toMatch(/<img/i); // no tracking pixels

    const text = autoReplyText(full);
    expect(text).toContain("Budget: $5k - $15k");
    expect(text).toContain("Timeline: 1-2 months");
    expect(text).toContain(`LinkedIn: ${SITE.linkedin}`);
    expect(text).toContain(`${SITE.url}/case-studies/velocity`);
  });

  it("hides optional fields that were left empty", () => {
    const html = autoReplyHtml(minimal);
    expect(html).not.toContain(">Budget<");
    expect(html).not.toContain(">Timeline<");
    expect(html).toContain(">Service<");
    const text = autoReplyText(minimal);
    expect(text).not.toContain("Budget:");
    expect(text).not.toContain("Timeline:");
  });

  it("escapes hostile input and truncates long messages", () => {
    const html = autoReplyHtml(hostile);
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img src=x");
    expect(html).not.toContain(`"><script`);
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&quot;double&quot; &#39;single&#39;");
    expect(html).not.toContain("A".repeat(AUTO_REPLY_MESSAGE_MAX));
    expect(html).toContain("…");

    const text = autoReplyText(hostile);
    const message = text.split("Message:\n")[1].split("\n")[0];
    expect(Array.from(message).length).toBe(AUTO_REPLY_MESSAGE_MAX + 1); // + ellipsis
  });

  it("omits the reply-promise sentence when it is empty", () => {
    expect(autoReplyHtml(full, { replyPromise: "" })).not.toContain(AUTO_REPLY_PROMISE);
    expect(autoReplyText(full, { replyPromise: "" })).not.toContain(AUTO_REPLY_PROMISE);
  });

  it("leaves the owner notification unchanged", () => {
    expect(inquiryHtml(full, { source: "nav", page: "/", receivedAt: new Date(0) })).toContain("New project inquiry");
  });
});
