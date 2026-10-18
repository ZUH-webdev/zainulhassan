"use client";

import { useEffect, useRef, useState } from "react";
import { LIMITS } from "@/lib/contact-schema";

const TOTAL = 4;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Live "x of 4 required" meter for the /hire brief. Reads the sibling form's fields; hides once the form is gone (sent). */
export default function BriefProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(0);
  const [hasForm, setHasForm] = useState(true);

  useEffect(() => {
    const root = ref.current?.parentElement;
    if (!root) return;
    const val = (name: string) =>
      root.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${name}"]`)?.value.trim() ?? "";
    const update = () => {
      const form = root.querySelector("form");
      setHasForm(!!form);
      if (!form) return;
      setDone(
        [
          val("name").length >= LIMITS.nameMin,
          EMAIL_RE.test(val("email")),
          !!root.querySelector('input[name="service"]:checked'),
          val("message").length >= LIMITS.messageMin,
        ].filter(Boolean).length,
      );
    };
    // The form restores a saved draft after mount, so read once more shortly after.
    const t = setTimeout(update, 300);
    const mo = new MutationObserver(update);
    mo.observe(root, { childList: true, subtree: true });
    root.addEventListener("input", update);
    root.addEventListener("change", update);
    return () => {
      clearTimeout(t);
      mo.disconnect();
      root.removeEventListener("input", update);
      root.removeEventListener("change", update);
    };
  }, []);

  const complete = done === TOTAL;

  return (
    <div ref={ref} className="bp" hidden={!hasForm} data-complete={complete || undefined}>
      <div className="bp-row mono">
        <span>{complete ? "Ready to send" : "Takes about 2 minutes"}</span>
        <span aria-live="polite">
          {done} of {TOTAL} required
        </span>
      </div>
      <div className="bp-bar" aria-hidden="true">
        <span style={{ transform: `scaleX(${done / TOTAL})` }} />
      </div>
    </div>
  );
}
