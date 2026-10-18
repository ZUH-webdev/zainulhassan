import type { ContactData } from "@/lib/contact-schema";
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

export function autoReplySubject(d: ContactData) {
  return `Got your message about ${d.service}`;
}

export function autoReplyText(d: ContactData) {
  return [
    `Thanks ${d.name}, I got your message about ${d.service}.`,
    "",
    `I reply within one working day. If it is urgent, email me at ${SITE.email}.`,
    "",
    `You can also find me on Upwork: ${SITE.upwork}`,
    "",
    "Zain Ul Hassan",
  ].join("\n");
}

export function autoReplyHtml(d: ContactData) {
  const inner = `
<h1 style="margin:0 0 16px;font-family:${font};font-size:22px;line-height:1.3;color:#ECEAE4">Thanks ${escapeHtml(d.name)}, I got your message about ${escapeHtml(d.service)}.</h1>
<p style="margin:0 0 14px;color:#C9C7C1;font-size:15px;line-height:1.6;font-family:${font}">I reply within one working day. If it is urgent, email me at <a href="mailto:${escapeHtml(SITE.email)}" style="color:#D4FF3F;text-decoration:none">${escapeHtml(SITE.email)}</a>.</p>
<p style="margin:0 0 24px;color:#C9C7C1;font-size:15px;line-height:1.6;font-family:${font}">You can also find me on <a href="${escapeHtml(SITE.upwork)}" style="color:#D4FF3F;text-decoration:none">Upwork</a>.</p>
<p style="margin:0;color:#9A9DA6;font-size:14px;font-family:${font}">Zain Ul Hassan</p>`;
  return shell(autoReplySubject(d), inner);
}
