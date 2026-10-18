"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import ContactForm from "@/components/hire/ContactForm";
import { external, mailto, SITE } from "@/lib/site";
import "./hire.css";

const starPath = "M24 2 C25 15 33 23 46 24 C33 25 25 33 24 46 C23 33 15 25 2 24 C15 23 23 15 24 2 Z";
const PROOF = [
  "Top Rated on Upwork, 100% Job Success",
  "4+ years building AI SaaS",
  "Clients in Africa, the US and the MENA region",
];
const EXIT_MS = 180;

type Props = {
  open: boolean;
  source: string;
  onRequestClose: (options?: { navigating?: boolean }) => void;
  /** After the exit animation, once the dialog is closed. */
  onClosed: () => void;
};

type Phase = "closed" | "open" | "closing";

export default function HireDialog({ open, source, onRequestClose, onClosed }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const keepRef = useRef<HTMLButtonElement>(null);
  const [phase, setPhase] = useState<Phase>("closed");
  const [confirming, setConfirming] = useState(false);
  const dirty = useRef(false);
  const downOnBackdrop = useRef(false);

  // Derive the phase from `open` during render (content mounts before showModal runs).
  if (open && phase !== "open") setPhase("open");
  if (!open && phase === "open") setPhase("closing");

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (phase === "open") {
      // Also covers reopening mid exit animation.
      d.removeAttribute("data-closing");
      if (d.open) return;
      d.showModal();
      d.scrollTop = 0;
      // On touch phones focus the heading, so the keyboard doesn't cover the form on open.
      const touchPhone = window.matchMedia("(max-width: 899px) and (pointer: coarse)").matches;
      const first = d.querySelector<HTMLElement>(".cf-in");
      (touchPhone || !first ? headingRef.current : first)?.focus({ preventScroll: true });
    }
    if (phase === "closing") {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        if (d.open) d.close();
        d.removeAttribute("data-closing");
        setConfirming(false);
        setPhase("closed");
        onClosed();
      };
      if (!d.open || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        finish();
        return;
      }
      d.setAttribute("data-closing", "");
      const t = setTimeout(finish, EXIT_MS + 60);
      return () => clearTimeout(t);
    }
  }, [phase, onClosed]);

  useEffect(() => {
    if (confirming) keepRef.current?.focus();
  }, [confirming]);

  const onDirtyChange = useCallback((v: boolean) => {
    dirty.current = v;
  }, []);

  const close = () => onRequestClose();

  const onPointerDown = (e: PointerEvent<HTMLDialogElement>) => {
    downOnBackdrop.current = e.target === e.currentTarget;
  };

  const onClick = (e: MouseEvent<HTMLDialogElement>) => {
    // Only a click that started and ended outside the panel counts as a backdrop click.
    if (e.target !== e.currentTarget || !downOnBackdrop.current) return;
    if (dirty.current) setConfirming(true);
    else close();
  };

  const visible = phase !== "closed";

  return (
    <dialog
      ref={ref}
      className="hm"
      aria-labelledby="hire-title"
      aria-describedby="hire-desc"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      // The browser can still close the dialog itself (e.g. repeated Escape); keep state in sync.
      onClose={() => phase === "open" && close()}
      onPointerDown={onPointerDown}
      onClick={onClick}
    >
      {visible && (
        <div className="hm-panel">
          <button type="button" className="hm-x" aria-label="Close" onClick={close}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <div className="hm-scroll">
            <aside className="hm-info">
              <div className="hm-grid" aria-hidden="true"></div>
              <svg className="hm-star" width="200" height="200" viewBox="0 0 48 48" aria-hidden="true">
                <path d={starPath} fill="#ECEAE4" />
              </svg>
              <p className="hm-eyebrow mono">Start a project</p>
              <h2 id="hire-title" ref={headingRef} tabIndex={-1} className="disp hm-title">
                Tell me what you&apos;re building.
              </h2>
              <p id="hire-desc" className="hm-desc">
                I reply within one working day with next steps and an honest estimate.
              </p>
              <ul className="hm-proof">
                {PROOF.map((p) => (
                  <li key={p}>
                    <span className="hm-tick" aria-hidden="true">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="hm-meta">
                <span className="hm-avail mono">
                  <span className="live-dot" aria-hidden="true"></span>
                  Open for new projects
                </span>
                <div className="hm-links">
                  <a href={mailto} className="hm-link" data-track="email_click" data-track-location="hire-modal">
                    {SITE.email}
                  </a>
                  <a
                    href={SITE.upwork}
                    {...external}
                    className="hm-link"
                    data-track="upwork_click"
                    data-track-location="hire-modal"
                    aria-label="Hire me on Upwork (opens in a new tab)"
                  >
                    Hire me on Upwork ↗
                  </a>
                </div>
              </div>
            </aside>

            <div className="hm-body">
              <ContactForm
                variant="modal"
                source={source}
                onClose={close}
                onNavigate={() => onRequestClose({ navigating: true })}
                onDirtyChange={onDirtyChange}
              />
            </div>
          </div>

          {confirming && (
            <div className="hm-confirm" role="alertdialog" aria-modal="false" aria-labelledby="hire-confirm-t">
              <div className="hm-confirm-card">
                <p id="hire-confirm-t">Close the form? Your unsent message is kept as a draft until you close this tab.</p>
                <div className="hm-confirm-btns">
                  <button ref={keepRef} type="button" className="cf-btn2" onClick={() => setConfirming(false)}>
                    Keep editing
                  </button>
                  <button
                    type="button"
                    className="shine cf-btn1"
                    onClick={() => {
                      setConfirming(false);
                      close();
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
