/**
 * Fires a custom analytics event through whichever provider components/Analytics.tsx loaded
 * (GA4 or Plausible). No-op when neither is configured. Never pass message contents or emails here.
 */
type W = Window & {
  gtag?: (...args: unknown[]) => void;
  plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
};

export function track(event: string, props: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const w = window as W;
  if (process.env.NEXT_PUBLIC_GA_ID) w.gtag?.("event", event, props);
  else w.plausible?.(event, { props });
}
