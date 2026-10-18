"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import HireButton from "@/components/hire/HireButton";
import { socialLinks } from "@/components/social";
import { external, mailto, SITE } from "@/lib/site";

const items = [
  { href: "/services", label: "Services", active: (p: string) => p.startsWith("/services") },
  { href: "/case-studies", label: "Work", active: (p: string) => p.startsWith("/case-studies") },
  { href: "/#process", label: "Process", active: () => false },
  { href: "/about", label: "About", active: (p: string) => p === "/about" },
  { href: "/blog", label: "Blog", active: (p: string) => p.startsWith("/blog") },
  { href: "/contact", label: "Contact", active: (p: string) => p === "/contact" },
];

const starPath = "M24 2 C25 15 33 23 46 24 C33 25 25 33 24 46 C23 33 15 25 2 24 C15 23 23 15 24 2 Z";
const FOCUSABLE = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';
const DESKTOP = "(min-width: 1024px)";

const noopSubscribe = () => () => {};
const useIsClient = () => useSyncExternalStore(noopSubscribe, () => true, () => false);

/** Hamburger + full-screen menu for viewports below 1024px. */
export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState({ x: "100%", y: "0px" });
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
  const isClient = useIsClient();
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on route change (state adjusted during render, as React recommends).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  const toggle = () => {
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setOrigin({ x: `${r.left + r.width / 2}px`, y: `${r.top + r.height / 2}px` });
    }
    setOpen((o) => !o);
  };

  // Scroll lock, inert background, focus in/out.
  useEffect(() => {
    const html = document.documentElement;
    const behind = document.querySelectorAll<HTMLElement>("main, footer");
    if (open) {
      html.style.setProperty("--sbw", `${window.innerWidth - html.clientWidth}px`);
      html.classList.add("menu-open");
      behind.forEach((el) => (el.inert = true));
      const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      first?.focus({ preventScroll: true });
    } else {
      const wasOpen = html.classList.contains("menu-open");
      html.classList.remove("menu-open");
      html.style.removeProperty("--sbw");
      behind.forEach((el) => (el.inert = false));
      if (wasOpen && panelRef.current?.contains(document.activeElement)) btnRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  // Escape, focus trap, and closing when the viewport becomes desktop-sized.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        btnRef.current?.focus({ preventScroll: true });
        return;
      }
      if (e.key !== "Tab" || !panelRef.current || !btnRef.current) return;
      const nodes = [btnRef.current, ...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const idx = nodes.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey ? (idx <= 0 ? nodes.length - 1 : idx - 1) : idx === nodes.length - 1 || idx === -1 ? 0 : idx + 1;
      e.preventDefault();
      nodes[next].focus({ preventScroll: true });
    };
    const mq = window.matchMedia(DESKTOP);
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const onLink = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = href.startsWith("/#") ? href.slice(2) : null;
    if (hash && window.location.pathname === "/") {
      // Same-page anchor: close first (releases the scroll lock), then smooth-scroll.
      e.preventDefault();
      setOpen(false);
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
          history.pushState(null, "", `#${hash}`);
        }),
      );
      return;
    }
    setOpen(false);
  };

  const panel = (
    <div
      id="mobile-menu"
      ref={panelRef}
      className={`mm${open ? " open" : ""}`}
      aria-hidden={!open}
      style={{ "--mx": origin.x, "--my": origin.y } as CSSProperties}
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}
    >
      <svg className="mstar" width="220" height="220" viewBox="0 0 48 48" aria-hidden="true">
        <path d={starPath} fill="#ECEAE4" />
      </svg>
      <div className="minner">
        <nav aria-label="Mobile">
          <ol className="mlinks">
            {items.map((it, i) => {
              const active = it.active(pathname);
              return (
                <li key={it.href} style={{ "--i": i } as CSSProperties}>
                  <Link
                    href={it.href}
                    className="mlink"
                    aria-current={active ? "page" : undefined}
                    tabIndex={open ? undefined : -1}
                    onClick={(e) => onLink(e, it.href)}
                  >
                    <span className="midx mono" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mlabel">{it.label}</span>
                    {active && <span className="mdot" aria-hidden="true"></span>}
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>
        <div className="mfoot" style={{ "--i": items.length } as CSSProperties}>
          <HireButton
            source="mobile-menu"
            returnFocusTo=".burger"
            href="/contact"
            className="shine mcta"
            tabIndex={open ? undefined : -1}
            data-track="cta_click"
            data-track-location="mobile-menu"
            onClick={() => setOpen(false)}
          >
            Start a project
          </HireButton>
          <a
            href={mailto}
            className="memail mono"
            tabIndex={open ? undefined : -1}
            data-track="email_click"
            data-track-location="mobile-menu"
          >
            {SITE.email}
          </a>
          <div className="msoc">
            {socialLinks.map(({ label, href, aria, external: ext, track, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={aria}
                className="msocl"
                tabIndex={open ? undefined : -1}
                data-track={track}
                data-track-location="mobile-menu"
                {...(ext ? external : {})}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className={`burger${open ? " open" : ""}`}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={toggle}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      {isClient && createPortal(panel, document.body)}
    </>
  );
}
