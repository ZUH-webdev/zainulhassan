"use client";

import Link from "next/link";

/** Error boundary (must be a client component). Lets the visitor retry or go home. */
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main>
      <div className="wrap" style={{ paddingTop: 96, paddingBottom: 120 }}>
        <div className="eyebrow">Error</div>
        <h1 className="ph1">Something went wrong</h1>
        <p className="lead">The page failed to load. Try again, or go back to the home page.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 36 }}>
          <button
            type="button"
            className="shine"
            onClick={() => reset()}
            style={{
              background: "var(--ac)",
              color: "#0A0B0D",
              fontWeight: 600,
              padding: "16px 28px",
              borderRadius: 999,
              border: 0,
              font: "inherit",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          <Link className="ghost-btn" href="/" style={{ border: "1px solid #2E323B", padding: "16px 28px", borderRadius: 999, fontWeight: 500 }}>
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
