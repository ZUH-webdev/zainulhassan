"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import {
  BUDGETS,
  LIMITS,
  SERVICES,
  TIMELINES,
  validateContact,
  type ContactData,
  type ContactField,
  type ContactResponse,
  type FieldErrors,
} from "@/lib/contact-schema";
import { mailto, SITE } from "@/lib/site";
import { track } from "@/lib/track";
import "./hire.css";

/**
 * Project inquiry form. Used inside the hire modal and, server-rendered, on /contact.
 * Validates with the shared zod schema, keeps an unsent draft in sessionStorage,
 * and posts JSON to /api/contact.
 */

type Values = {
  name: string;
  email: string;
  service: string;
  message: string;
  budget: string;
  timeline: string;
  company: string;
};

const EMPTY: Values = { name: "", email: "", service: "", message: "", budget: "", timeline: "", company: "" };
const FIELD_ORDER: ContactField[] = ["name", "email", "service", "message", "budget", "timeline", "company"];
const DRAFT_KEY = "hire-form-draft";

type Draft = { values: Values; openedAt: number };

function readDraft(): Draft | null {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const d = JSON.parse(raw) as Partial<Draft>;
    if (!d.values || typeof d.openedAt !== "number") return null;
    const values = { ...EMPTY };
    for (const k of Object.keys(EMPTY) as (keyof Values)[]) if (typeof d.values[k] === "string") values[k] = d.values[k];
    return { values, openedAt: d.openedAt };
  } catch {
    return null;
  }
}

function writeDraft(d: Draft | null) {
  try {
    if (d) sessionStorage.setItem(DRAFT_KEY, JSON.stringify(d));
    else sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    /* storage blocked (private mode, etc.): drafts are a convenience only */
  }
}

export const isDirty = (v: Values) => Object.values(v).some((x) => x.trim() !== "");

/* ---------------- Turnstile (optional, only when the site key is set) ---------------- */

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};

const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
let turnstileScript: Promise<void> | null = null;

function loadTurnstile() {
  turnstileScript ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      turnstileScript = null;
      reject(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(s);
  });
  return turnstileScript;
}

function useTurnstile() {
  const ref = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const token = useRef<string | undefined>(undefined);
  const waiters = useRef<((t?: string) => void)[]>([]);

  useEffect(() => {
    if (!TURNSTILE_KEY) return;
    let cancelled = false;
    const flush = (t?: string) => waiters.current.splice(0).forEach((w) => w(t));
    loadTurnstile()
      .then(() => {
        const api = (window as Window & { turnstile?: TurnstileApi }).turnstile;
        if (cancelled || !ref.current || !api) return;
        widget.current = api.render(ref.current, {
          sitekey: TURNSTILE_KEY,
          appearance: "interaction-only",
          theme: "dark",
          "refresh-expired": "auto",
          callback: (t: string) => {
            token.current = t;
            flush(t);
          },
          "expired-callback": () => (token.current = undefined),
          "error-callback": () => flush(undefined),
        });
      })
      .catch(() => flush(undefined));
    return () => {
      cancelled = true;
      const api = (window as Window & { turnstile?: TurnstileApi }).turnstile;
      if (widget.current) api?.remove(widget.current);
      widget.current = null;
    };
  }, []);

  const getToken = useCallback(async (): Promise<string | undefined> => {
    if (!TURNSTILE_KEY) return undefined;
    if (token.current) return token.current;
    return new Promise((resolve) => {
      const t = setTimeout(() => resolve(undefined), 10_000);
      waiters.current.push((v) => {
        clearTimeout(t);
        resolve(v);
      });
    });
  }, []);

  const reset = useCallback(() => {
    token.current = undefined;
    const api = (window as Window & { turnstile?: TurnstileApi }).turnstile;
    if (widget.current) api?.reset(widget.current);
  }, []);

  return { ref, getToken, reset };
}

/* ---------------- Icons ---------------- */

const ErrIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9.5" />
    <path d="M12 7.5v5.5M12 16.5h.01" />
  </svg>
);

const Arrow = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ---------------- Component ---------------- */

type Props = {
  variant: "modal" | "page";
  /** Which button opened the form (sent with the lead). */
  source: string;
  /** Modal only: closes the modal. */
  onClose?: () => void;
  /** Modal only: called before following an in-page link (closes without history.back). */
  onNavigate?: () => void;
  /** Lets the modal know whether closing would leave unsent input. */
  onDirtyChange?: (dirty: boolean) => void;
};

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm({ variant, source, onClose, onNavigate, onDirtyChange }: Props) {
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [serverErrors, setServerErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [banner, setBanner] = useState("");
  const [announce, setAnnounce] = useState("");
  const [sent, setSent] = useState<ContactData | null>(null);
  const [successMinHeight, setSuccessMinHeight] = useState<number | undefined>();
  const openedAt = useRef(0);
  const restored = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const turnstile = useTurnstile();

  // Restore an unsent draft (after hydration, so the server-rendered /contact form matches).
  useEffect(() => {
    const d = readDraft();
    openedAt.current = d?.openedAt ?? Date.now();
    restored.current = true;
    if (d) setValues(d.values);
  }, []);

  const dirty = isDirty(values);
  useEffect(() => {
    onDirtyChange?.(dirty && status !== "success");
    if (!restored.current || status === "success") return;
    writeDraft(dirty ? { values, openedAt: openedAt.current } : null);
  }, [values, dirty, status, onDirtyChange]);

  useEffect(() => {
    if (status === "success") successHeading.current?.focus();
  }, [status]);

  const check = validateContact(values);
  const clientErrors: FieldErrors = check.ok ? {} : check.fieldErrors;
  const errorFor = (f: ContactField) => (touched[f] || submitted ? (clientErrors[f] ?? serverErrors[f]) : undefined);

  const set = (f: keyof Values, v: string) => {
    setValues((prev) => ({ ...prev, [f]: v }));
    if (serverErrors[f])
      setServerErrors((prev) => {
        const next = { ...prev };
        delete next[f];
        return next;
      });
  };
  const blur = (f: ContactField) => setTouched((t) => (t[f] ? t : { ...t, [f]: true }));

  const focusField = (f: ContactField) => {
    const el = formRef.current?.querySelector<HTMLElement>(f === "service" ? `input[name="service"]` : `#${CSS.escape(id(f))}`);
    el?.focus();
    el?.scrollIntoView?.({ block: "center", behavior: "smooth" });
  };

  async function submit(e?: FormEvent) {
    e?.preventDefault();
    if (status === "sending") return;
    setSubmitted(true);
    setBanner("");
    const r = validateContact(values);
    if (!r.ok) {
      const first = FIELD_ORDER.find((f) => r.fieldErrors[f]);
      const n = Object.keys(r.fieldErrors).length;
      setAnnounce(`Please fix ${n} field${n === 1 ? "" : "s"} before sending.`);
      if (first) focusField(first);
      return;
    }

    setStatus("sending");
    setAnnounce("Sending your message.");
    try {
      const turnstileToken = await turnstile.getToken();
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website_url: honeypot.current?.value ?? "",
          elapsedMs: Math.max(0, Date.now() - openedAt.current),
          source,
          page: window.location.pathname,
          turnstileToken,
        }),
      });
      const data = (await res.json().catch(() => null)) as ContactResponse | null;
      if (res.ok && data?.ok) {
        setSuccessMinHeight(formRef.current?.offsetHeight);
        setSent(r.data);
        setStatus("success");
        setAnnounce(`Message sent. Thank you. I'll reply to ${r.data.email} within one working day.`);
        writeDraft(null);
        track("hire_form_submit_success", { source, service: r.data.service });
        return;
      }
      turnstile.reset();
      track("hire_form_submit_error", { source, status: String(res.status) });
      if (data && !data.ok && data.fieldErrors && Object.keys(data.fieldErrors).length) {
        setServerErrors(data.fieldErrors);
        setStatus("idle");
        const first = FIELD_ORDER.find((f) => data.fieldErrors?.[f]);
        setAnnounce(data.error);
        if (first) focusField(first);
        return;
      }
      setStatus("error");
      // 422 (too fast) and 429 (rate limit) carry a specific, safe message; everything else is generic.
      setBanner(data && !data.ok && (res.status === 422 || res.status === 429) ? data.error : "");
      setAnnounce("Something went wrong. Your message was not sent.");
    } catch {
      turnstile.reset();
      track("hire_form_submit_error", { source, status: "network" });
      setStatus("error");
      setBanner("");
      setAnnounce("Something went wrong. Your message was not sent.");
    }
  }

  const reset = () => {
    setValues(EMPTY);
    setTouched({});
    setSubmitted(false);
    setServerErrors({});
    setSent(null);
    setStatus("idle");
    setAnnounce("");
    openedAt.current = Date.now();
    requestAnimationFrame(() => focusField("name"));
  };

  const live = (
    <div className="sr" role="status" aria-live="polite">
      {announce}
    </div>
  );

  if (status === "success" && sent) {
    return (
      <div className={`cf cf-${variant}`}>
        {live}
        <div className="cf-success" style={{ minHeight: successMinHeight }}>
          <svg className="cf-check" width="76" height="76" viewBox="0 0 52 52" aria-hidden="true">
            <circle cx="26" cy="26" r="24" pathLength={1} />
            <path d="M15 27l7.5 7.5L37.5 19" pathLength={1} />
          </svg>
          <h3 ref={successHeading} tabIndex={-1} className="disp cf-sh">
            Message sent. Thank you.
          </h3>
          <p className="cf-sp">
            I&apos;ll reply to <strong>{sent.email}</strong> within one working day.
          </p>
          <div className="cf-sbtns">
            {variant === "modal" ? (
              <button type="button" className="cf-btn2" onClick={onClose}>
                Close
              </button>
            ) : (
              <button type="button" className="cf-btn2" onClick={reset}>
                Send another message
              </button>
            )}
            <Link className="shine cf-btn1" href="/#work" onClick={() => onNavigate?.()}>
              See my work
            </Link>
          </div>
          <details className="cf-copy">
            <summary>What you sent</summary>
            <dl>
              {(
                [
                  ["Name", sent.name],
                  ["Email", sent.email],
                  ["Service", sent.service],
                  ["Budget", sent.budget],
                  ["Timeline", sent.timeline],
                  ["Company", sent.company],
                  ["Details", sent.message],
                ] as const
              )
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k}>
                    <dt className="mono">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
            </dl>
          </details>
        </div>
      </div>
    );
  }

  const sending = status === "sending";
  let i = 0;
  const stagger = () => ({ "--i": i++ }) as CSSProperties;

  const describedBy = (f: ContactField, ...extra: string[]) =>
    [errorFor(f) ? id(`${f}-err`) : "", ...extra].filter(Boolean).join(" ") || undefined;

  const errorText = (f: ContactField) => {
    const msg = errorFor(f);
    return msg ? (
      <p className="cf-err" id={id(`${f}-err`)}>
        <ErrIcon />
        <span>{msg}</span>
      </p>
    ) : null;
  };

  const label = (f: string, children: ReactNode, optional?: boolean) => (
    <label className="cf-label mono" htmlFor={id(f)}>
      {children}
      {optional ? (
        <span className="cf-opt">Optional</span>
      ) : (
        <span className="cf-req" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );

  const chips = (f: "service" | "budget" | "timeline", legend: string, options: readonly string[], optional?: boolean) => (
    <fieldset
      className="cf-f cf-fs"
      style={stagger()}
      aria-describedby={describedBy(f)}
      aria-required={optional ? undefined : true}
    >
      <legend className="cf-label mono">
        {legend}
        {optional ? (
          <span className="cf-opt">Optional</span>
        ) : (
          <span className="cf-req" aria-hidden="true">
            *
          </span>
        )}
      </legend>
      <div className="cf-chips">
        {options.map((o) => (
          <label key={o} className="cf-chipl">
            <input
              type="radio"
              className="cf-chip-in"
              name={f}
              value={o}
              checked={values[f] === o}
              onChange={() => set(f, o)}
              onBlur={() => blur(f)}
              data-invalid={errorFor(f) ? "" : undefined}
            />
            <span className="cf-chip">{o}</span>
          </label>
        ))}
      </div>
      {errorText(f)}
    </fieldset>
  );

  const messageLen = values.message.trim().length;
  const short = messageLen < LIMITS.messageMin;

  return (
    <div className={`cf cf-${variant}`}>
      {live}
      <form ref={formRef} className="cf-form" noValidate onSubmit={submit} aria-label="Project inquiry" aria-busy={sending}>
        <div className="cf-row">
          <div className="cf-f" style={stagger()}>
            {label("name", "Name")}
            <input
              id={id("name")}
              name="name"
              className="cf-in"
              autoComplete="name"
              required
              maxLength={LIMITS.nameMax}
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              onBlur={() => blur("name")}
              aria-invalid={errorFor("name") ? true : undefined}
              aria-describedby={describedBy("name")}
            />
            {errorText("name")}
          </div>
          <div className="cf-f" style={stagger()}>
            {label("email", "Email")}
            <input
              id={id("email")}
              name="email"
              type="email"
              inputMode="email"
              className="cf-in"
              autoComplete="email"
              required
              maxLength={LIMITS.emailMax}
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              onBlur={() => blur("email")}
              aria-invalid={errorFor("email") ? true : undefined}
              aria-describedby={describedBy("email")}
            />
            {errorText("email")}
          </div>
        </div>

        {chips("service", "What do you need?", SERVICES)}

        <div className="cf-f" style={stagger()}>
          {label("message", "Project details")}
          <textarea
            id={id("message")}
            name="message"
            className="cf-in cf-ta"
            rows={5}
            required
            maxLength={LIMITS.messageMax}
            placeholder="What are you building, who is it for, and what is the first thing you need?"
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            onBlur={() => blur("message")}
            aria-invalid={errorFor("message") ? true : undefined}
            aria-describedby={describedBy("message", id("count"))}
          />
          <div className="cf-under">
            {errorText("message")}
            <span id={id("count")} className={`cf-count mono${short && messageLen > 0 ? " warn" : ""}`}>
              {short
                ? `${LIMITS.messageMin - messageLen} more characters needed`
                : `${values.message.length} / ${LIMITS.messageMax}`}
            </span>
          </div>
        </div>

        {chips("budget", "Budget range", BUDGETS, true)}
        {chips("timeline", "Timeline", TIMELINES, true)}

        <div className="cf-f" style={stagger()}>
          {label("company", "Company or website", true)}
          <input
            id={id("company")}
            name="company"
            className="cf-in"
            autoComplete="organization"
            maxLength={LIMITS.companyMax}
            value={values.company}
            onChange={(e) => set("company", e.target.value)}
            onBlur={() => blur("company")}
            aria-invalid={errorFor("company") ? true : undefined}
            aria-describedby={describedBy("company")}
          />
          {errorText("company")}
        </div>

        {/* Honeypot: invisible to people, tempting to bots. */}
        <div className="cf-hp" aria-hidden="true">
          <label htmlFor={id("website_url")}>Website URL</label>
          <input
            ref={honeypot}
            id={id("website_url")}
            name="website_url"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        {TURNSTILE_KEY && <div ref={turnstile.ref} className="cf-ts" />}

        <p className="cf-consent" style={stagger()}>
          By sending this you agree I can reply to you by email about your project.
        </p>

        {status === "error" && (
          <div className="cf-banner" role="alert">
            <ErrIcon />
            <div>
              <p>
                {banner ? `${banner} ` : "Something went wrong. "}
                Please email me directly at{" "}
                <a href={mailto} data-track="email_click" data-track-location={`hire-form-error-${variant}`}>
                  {SITE.email}
                </a>
              </p>
              <button type="button" className="cf-retry" onClick={() => submit()}>
                Try again
              </button>
            </div>
          </div>
        )}

        <div className="cf-actions">
          <button type="submit" className="shine cf-submit" aria-disabled={sending || undefined}>
            {sending ? (
              <>
                <span className="cf-spin" aria-hidden="true"></span>
                Sending…
              </>
            ) : (
              <>
                Send message
                <Arrow />
              </>
            )}
          </button>
          <p className="cf-nospam">No spam. I only use your details to reply.</p>
        </div>
      </form>
    </div>
  );
}
