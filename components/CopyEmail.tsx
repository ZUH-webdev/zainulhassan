"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // Fallback for browsers/contexts without the async Clipboard API
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "absolute";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  ta.remove();
}

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const onClick = async () => {
    try {
      await copyText(SITE.email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      className="ghost-btn"
      onClick={onClick}
      aria-label="Copy email address"
      title={copied ? "Copied" : "Copy email"}
      style={{
        border: "1.5px solid #0A0B0D",
        borderRadius: 999,
        padding: "16px 18px",
        background: "transparent",
        color: "inherit",
        font: "inherit",
        lineHeight: 1.6,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ display: "inline-flex", alignItems: "center", height: "1.6em" }}>
        {copied ? (
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
          </svg>
        )}
      </span>
      <span className="sr" aria-live="polite">
        {copied ? "Email copied" : ""}
      </span>
    </button>
  );
}
