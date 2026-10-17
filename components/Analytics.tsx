"use client";

import Script from "next/script";
import { useEffect } from "react";

/**
 * Privacy-friendly analytics + conversion events.
 * - GA4 if NEXT_PUBLIC_GA_ID is set, otherwise Plausible if NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set, otherwise nothing loads.
 * - One delegated click listener sends events for any element with data-track="event_name"
 *   and optional data-track-location="hero|nav|footer|service-page|case-study|...".
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

type W = Window & {
  gtag?: (...args: unknown[]) => void;
  plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
};

export default function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const name = el.dataset.track!;
      const location = el.dataset.trackLocation ?? "unknown";
      const w = window as W;
      if (GA_ID) w.gtag?.("event", name, { location });
      else w.plausible?.(name, { props: { location } });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (GA_ID)
    return (
      <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
        <Script id="ga4" strategy="lazyOnload">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
      </>
    );

  if (PLAUSIBLE_DOMAIN)
    return (
      <>
        <Script id="plausible-init" strategy="lazyOnload">
          {`window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`}
        </Script>
        <Script defer data-domain={PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js" strategy="lazyOnload" />
      </>
    );

  return null;
}
