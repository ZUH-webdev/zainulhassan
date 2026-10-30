import type { ContactData } from "@/lib/contact-schema";
import { caseStudyBySlug } from "@/content/case-studies";
import { SITE } from "@/lib/site";

/**
 * Email bodies for the contact form. Every user value goes through escapeHtml()
 * before it touches HTML; nothing raw is ever interpolated into markup.
 */

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "`": "&#96;",
};

export function escapeHtml(value: string) {
  return value.replace(/[&<>"'`]/g, (c) => HTML_ESCAPES[c]);
}

/** Escapes, then turns newlines into <br> for multi-line text. */
const escapeMultiline = (value: string) => escapeHtml(value).replace(/\n/g, "<br>");

export type LeadMeta = {
  source: string;
  page: string;
  receivedAt: Date;
  country?: string;
  userAgent?: string;
};

export function formatKarachi(date: Date) {
  return (
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Karachi",
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date) + " PKT"
  );
}

export function inquirySubject(d: ContactData) {
  return `New inquiry: ${d.service} from ${d.name}`;
}

const dash = (v: string) => v || "Not given";

const font = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

function row(label: string, valueHtml: string) {
  return `<tr><td style="padding:10px 0;border-bottom:1px solid #23262D;color:#9A9DA6;font-size:13px;width:120px;vertical-align:top;font-family:${font}">${escapeHtml(label)}</td><td style="padding:10px 0;border-bottom:1px solid #23262D;color:#ECEAE4;font-size:15px;font-family:${font}">${valueHtml}</td></tr>`;
}

function shell(title: string, inner: string) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><title>${escapeHtml(title)}</title></head><body style="margin:0;padding:0;background:#0A0B0D"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A0B0D;padding:32px 12px"><tr><td align="center"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#121418;border:1px solid #23262D;border-radius:20px"><tr><td style="padding:32px">${inner}</td></tr></table></td></tr></table></body></html>`;
}

export function inquiryHtml(d: ContactData, meta: LeadMeta) {
  const email = escapeHtml(d.email);
  const inner = `
<p style="margin:0 0 6px;font-family:'Courier New',monospace;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#D4FF3F">New project inquiry</p>
<h1 style="margin:0 0 24px;font-family:${font};font-size:24px;line-height:1.25;color:#ECEAE4">${escapeHtml(d.service)} from ${escapeHtml(d.name)}</h1>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${row("Name", escapeHtml(d.name))}
${row("Email", `<a href="mailto:${email}" style="color:#D4FF3F;text-decoration:none">${email}</a>`)}
${row("Service", escapeHtml(d.service))}
${row("Budget", escapeHtml(dash(d.budget)))}
${row("Timeline", escapeHtml(dash(d.timeline)))}
${row("Company", escapeHtml(dash(d.company)))}
</table>
<p style="margin:24px 0 8px;color:#9A9DA6;font-size:13px;font-family:${font}">Message</p>
<div style="background:#0E1013;border:1px solid #23262D;border-radius:14px;padding:18px;color:#ECEAE4;font-size:15px;line-height:1.6;font-family:${font}">${escapeMultiline(d.message)}</div>
<p style="margin:24px 0 0"><a href="mailto:${email}?subject=${encodeURIComponent(`Re: ${d.service}`)}" style="display:inline-block;background:#D4FF3F;color:#0A0B0D;font-weight:600;font-family:${font};font-size:15px;padding:12px 22px;border-radius:999px;text-decoration:none">Reply to ${escapeHtml(d.name)}</a></p>
<p style="margin:28px 0 0;color:#6B707B;font-size:12px;line-height:1.6;font-family:${font}">
Opened from: ${escapeHtml(meta.source)} on ${escapeHtml(meta.page)}<br>
Received: ${escapeHtml(formatKarachi(meta.receivedAt))}${meta.country ? `<br>Country: ${escapeHtml(meta.country)}` : ""}${meta.userAgent ? `<br>User agent: ${escapeHtml(meta.userAgent)}` : ""}
</p>`;
  return shell(inquirySubject(d), inner);
}

export function inquiryText(d: ContactData, meta: LeadMeta) {
  return [
    `New project inquiry: ${d.service} from ${d.name}`,
    "",
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Service: ${d.service}`,
    `Budget: ${dash(d.budget)}`,
    `Timeline: ${dash(d.timeline)}`,
    `Company: ${dash(d.company)}`,
    "",
    "Message:",
    d.message,
    "",
    "---",
    `Opened from: ${meta.source} on ${meta.page}`,
    `Received: ${formatKarachi(meta.receivedAt)}`,
    ...(meta.country ? [`Country: ${meta.country}`] : []),
    ...(meta.userAgent ? [`User agent: ${meta.userAgent}`] : []),
  ].join("\n");
}

/** Reply-time line in the auto-reply. Set to "" to leave the sentence out entirely. */
export const AUTO_REPLY_PROMISE = "I usually reply within one working day.";

/** Long messages are cut to this many characters in the auto-reply summary. */
export const AUTO_REPLY_MESSAGE_MAX = 400;

/** Case studies linked under "Recent work", in this order. */
const RECENT_WORK = ["leadsmind", "velocity", "world-teachers-academy"] as const;

const NEXT_STEPS = [
  "I read your message and reply with questions or a call link.",
  "We align on scope and timeline.",
  "I send a clear proposal.",
];

type AutoReplyOptions = { replyPromise?: string };

/** Header-safe single line: line breaks and control characters become spaces, whitespace collapses. */
const oneLine = (v: string) =>
  v
    .replace(/[\p{Cc}\p{Zl}\p{Zp}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

export function firstName(name: string) {
  return Array.from(oneLine(name).split(" ")[0]).slice(0, 40).join("");
}

/** Cuts to max characters (never splitting a surrogate pair) and adds an ellipsis. */
export function truncate(value: string, max: number) {
  const chars = Array.from(value);
  return chars.length > max ? chars.slice(0, max).join("").trimEnd() + "…" : value;
}

const siteHost = () => SITE.url.replace(/^https?:\/\//, "");

function recentWork() {
  return RECENT_WORK.flatMap((slug) => {
    const c = caseStudyBySlug(slug);
    return c ? [{ name: c.name, summary: c.summary, url: `${SITE.url}/case-studies/${c.slug}` }] : [];
  });
}

/** Only the fields the visitor actually filled in, raw (callers escape). */
function submittedFields(d: ContactData): [string, string][] {
  const fields: [string, string][] = [
    ["Service", d.service],
    ["Budget", d.budget],
    ["Timeline", d.timeline],
    ["Message", d.message ? truncate(d.message, AUTO_REPLY_MESSAGE_MAX) : ""],
  ];
  return fields.filter(([, v]) => v);
}

export function autoReplySubject(d: ContactData) {
  const first = firstName(d.name);
  return first ? `Thanks ${first}, I've got your message` : "Thanks, I've got your message";
}

export function autoReplyText(d: ContactData, { replyPromise = AUTO_REPLY_PROMISE }: AutoReplyOptions = {}) {
  const first = firstName(d.name);
  return [
    SITE.name.toUpperCase(),
    "",
    first ? `Hi ${first},` : "Hi,",
    "",
    `Thanks for reaching out. I've received your inquiry about ${d.service}.`,
    "",
    "What you sent:",
    ...submittedFields(d).map(([label, value]) => (label === "Message" ? `${label}:\n${value}` : `${label}: ${value}`)),
    "",
    ...(replyPromise ? [replyPromise, ""] : []),
    "What happens next:",
    ...NEXT_STEPS.map((step, i) => `${i + 1}. ${step}`),
    "",
    "Recent work:",
    ...recentWork().map((w) => `- ${w.name}: ${w.summary}\n  ${w.url}`),
    "",
    "--",
    SITE.name,
    SITE.jobTitle,
    `Website: ${SITE.url}`,
    `Upwork: ${SITE.upwork}`,
    `LinkedIn: ${SITE.linkedin}`,
  ].join("\n");
}

const link = (href: string, label: string) =>
  `<a href="${escapeHtml(href)}" style="color:#D4FF3F;text-decoration:none">${escapeHtml(label)}</a>`;

const heading = (text: string) =>
  `<h2 style="margin:28px 0 12px;font-family:${font};font-size:17px;line-height:1.3;color:#ECEAE4">${escapeHtml(text)}</h2>`;

const para = (html: string, margin: string) =>
  `<p style="margin:${margin};color:#C9C7C1;font-size:15px;line-height:1.6;font-family:${font}">${html}</p>`;

export function autoReplyHtml(d: ContactData, { replyPromise = AUTO_REPLY_PROMISE }: AutoReplyOptions = {}) {
  const first = firstName(d.name);
  const fields = submittedFields(d)
    .map(([label, value]) => row(label, label === "Message" ? escapeMultiline(value) : escapeHtml(value)))
    .join("\n");
  const steps = NEXT_STEPS.map(
    (step, i) =>
      `<tr><td style="padding:6px 12px 6px 0;width:20px;vertical-align:top;font-family:'Courier New',monospace;font-size:14px;color:#D4FF3F">${i + 1}</td><td style="padding:6px 0;color:#C9C7C1;font-size:15px;line-height:1.5;font-family:${font}">${escapeHtml(step)}</td></tr>`,
  ).join("\n");
  const work = recentWork()
    .map(
      (w) =>
        `<tr><td style="padding:10px 0;border-bottom:1px solid #23262D;font-family:${font}"><a href="${escapeHtml(w.url)}" style="color:#D4FF3F;text-decoration:none;font-size:15px;font-weight:600">${escapeHtml(w.name)}</a><br><span style="color:#9A9DA6;font-size:13px;line-height:1.5">${escapeHtml(w.summary)}</span></td></tr>`,
    )
    .join("\n");
  const inner = `
<p style="margin:0 0 20px;font-family:'Courier New',monospace;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#D4FF3F">${escapeHtml(SITE.name)}</p>
<h1 style="margin:0 0 12px;font-family:${font};font-size:24px;line-height:1.25;color:#ECEAE4">${first ? `Hi ${escapeHtml(first)},` : "Hi,"}</h1>
${para(`Thanks for reaching out. I've received your inquiry about ${escapeHtml(d.service)}.`, "0 0 20px")}
<p style="margin:0 0 8px;color:#9A9DA6;font-size:13px;font-family:${font}">What you sent</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${fields}
</table>
${replyPromise ? para(escapeHtml(replyPromise), "20px 0 0") : ""}
${heading("What happens next")}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${steps}
</table>
${heading("Recent work")}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${work}
</table>
<p style="margin:28px 0 0;color:#ECEAE4;font-size:15px;font-weight:600;font-family:${font}">${escapeHtml(SITE.name)}</p>
<p style="margin:2px 0 8px;color:#9A9DA6;font-size:13px;font-family:${font}">${escapeHtml(SITE.jobTitle)}</p>
<p style="margin:0;font-size:13px;font-family:${font};color:#6B707B">${link(SITE.url, siteHost())} &middot; ${link(SITE.upwork, "Upwork")} &middot; ${link(SITE.linkedin, "LinkedIn")}</p>`;
  return shell(autoReplySubject(d), inner);
}
