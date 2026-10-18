import { z } from "zod";

/**
 * Shared contact form schema: used by the form (client) and by /api/contact (server),
 * so both sides apply exactly the same rules.
 */

export const SERVICES = [
  "SaaS MVP",
  "AI features",
  "Payments and billing",
  "Security audit",
  "Front end",
  "Technical co-founder",
  "Something else",
] as const;

export const BUDGETS = ["Under $1k", "$1k - $5k", "$5k - $15k", "$15k+", "Not sure yet"] as const;

export const TIMELINES = ["ASAP", "1-2 months", "3+ months", "Flexible"] as const;

export const LIMITS = {
  nameMin: 2,
  nameMax: 80,
  emailMax: 254,
  messageMin: 20,
  messageMax: 4000,
  companyMax: 200,
  /** Submissions faster than this after the form opened are treated as bots. */
  minFillMs: 3000,
} as const;

/** C0/C1 control characters, except tab and newline (allowed in the message only). */
const CONTROL = /[\u0000-\u0008\u000B-\u001F\u007F-\u009F]/g;
const CONTROL_ALL = /[\u0000-\u001F\u007F-\u009F]/g;
const LINE_BREAK = /[\r\n\u2028\u2029]/;

/** Strips control characters; keeps newlines and tabs when multiline. Normalises CRLF to LF. */
export function cleanText(value: string, multiline = false) {
  const v = multiline ? value.replace(/\r\n?/g, "\n").replace(CONTROL, "") : value.replace(CONTROL_ALL, "");
  return v.trim();
}

/** Single-line value that ends up in an email header (name, email): line breaks are rejected, not stripped. */
const headerSafe = (label: string) =>
  z
    .string({ error: `Please enter your ${label}.` })
    .refine((v) => !LINE_BREAK.test(v), { message: `Your ${label} can't contain line breaks.` })
    .transform((v) => cleanText(v));

const optionalText = (max: number) =>
  z
    .string()
    .max(max * 2) // generous pre-clean cap; the real limit is applied after cleaning
    .optional()
    .transform((v) => (v ? cleanText(v) : ""))
    .pipe(z.string().max(max, `Please keep this under ${max} characters.`));

/** Optional single-select: accepts one of the values or an empty string. */
const optionalChoice = <T extends readonly [string, ...string[]]>(values: T) =>
  z
    .union([z.enum(values), z.literal("")])
    .optional()
    .transform((v) => v ?? "");

export const contactSchema = z.object({
  name: headerSafe("name").pipe(
    z
      .string()
      .min(LIMITS.nameMin, `Please enter your name (at least ${LIMITS.nameMin} characters).`)
      .max(LIMITS.nameMax, `Please keep your name under ${LIMITS.nameMax} characters.`),
  ),
  email: headerSafe("email").pipe(
    z
      .string()
      .min(1, "Please enter your email.")
      .max(LIMITS.emailMax, "That email is too long.")
      .pipe(z.email("Please enter a valid email address.")),
  ),
  service: z.enum(SERVICES, { error: "Please choose what you need." }),
  message: z
    .string({ error: "Please describe your project." })
    .max(LIMITS.messageMax * 2)
    .transform((v) => cleanText(v, true))
    .pipe(
      z
        .string()
        .min(LIMITS.messageMin, `Please add a little more detail (at least ${LIMITS.messageMin} characters).`)
        .max(LIMITS.messageMax, `Please keep this under ${LIMITS.messageMax} characters.`),
    ),
  budget: optionalChoice(BUDGETS),
  timeline: optionalChoice(TIMELINES),
  company: optionalText(LIMITS.companyMax),
});

/** Extra fields the API accepts alongside the form values (not shown to the user). */
export const metaSchema = z.object({
  /** Honeypot: must be empty. Checked before validation so bots get a fake success. */
  website_url: z.string().max(500).optional(),
  /** Milliseconds between the form opening and submit, measured on the client clock. */
  elapsedMs: z.number().int().nonnegative().max(1e10),
  /** Which button opened the form, e.g. "nav", "hero", "contact-page". */
  source: z
    .string()
    .max(40)
    .regex(/^[a-z0-9-]*$/)
    .optional()
    .transform((v) => v || "unknown"),
  /** Path the visitor was on. */
  page: z
    .string()
    .max(200)
    .regex(/^\/[^\s]*$/)
    .optional()
    .transform((v) => v || "/"),
  turnstileToken: z.string().max(4096).optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type FieldErrors = Partial<Record<ContactField, string>>;

/** First error message per field, in the shape both the API and the form use. */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as ContactField | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

export function validateContact(values: unknown): { ok: true; data: ContactData } | { ok: false; fieldErrors: FieldErrors } {
  const r = contactSchema.safeParse(values);
  return r.success ? { ok: true, data: r.data } : { ok: false, fieldErrors: toFieldErrors(r.error) };
}

/** Response shape of POST /api/contact. */
export type ContactResponse = { ok: true } | { ok: false; error: string; fieldErrors?: FieldErrors };
