"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { track } from "@/lib/track";

/**
 * Owns the "Hire me" modal: open state, the #hire URL hash (so Back closes it),
 * ?hire=1 deep links, scroll lock and focus return. The dialog itself is code-split
 * and only downloaded on first hover/focus/click of a HireButton.
 */

type OpenOptions = {
  /** Element to return focus to on close (defaults to the focused element). */
  opener?: HTMLElement | null;
  /** Fallback focus target (CSS selector) when the opener is hidden by then, e.g. a closed mobile menu. */
  returnFocusTo?: string;
};

type HireModalContext = {
  openHireModal: (source?: string, options?: OpenOptions) => void;
  closeHireModal: (options?: { navigating?: boolean }) => void;
  preloadHireModal: () => void;
};

const Ctx = createContext<HireModalContext | null>(null);

export const useHireModal = () => useContext(Ctx);

const loadDialog = () => import("@/components/hire/HireDialog");
const HireDialog = dynamic(loadDialog, { ssr: false });

const HASH = "#hire";

const urlWithoutHash = () => window.location.pathname + window.location.search;

export default function ModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("unknown");
  const [requested, setRequested] = useState(false);
  const openRef = useRef(false);
  const pushedHash = useRef(false);
  const focusReturn = useRef<OpenOptions>({});

  const preloadHireModal = useCallback(() => {
    void loadDialog();
  }, []);

  const show = useCallback((src: string, options: OpenOptions = {}) => {
    if (openRef.current) return;
    openRef.current = true;
    focusReturn.current = {
      opener: options.opener ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null),
      returnFocusTo: options.returnFocusTo,
    };
    const html = document.documentElement;
    html.style.setProperty("--hsbw", `${window.innerWidth - html.clientWidth}px`);
    html.classList.add("hire-open");
    setSource(src);
    setRequested(true);
    setOpen(true);
    track("hire_modal_open", { source: src });
  }, []);

  const openHireModal = useCallback(
    (src = "unknown", options?: OpenOptions) => {
      if (openRef.current) return;
      if (window.location.hash !== HASH) {
        history.pushState(null, "", urlWithoutHash() + HASH);
        pushedHash.current = true;
      }
      show(src, options);
    },
    [show],
  );

  const closeHireModal = useCallback((options: { navigating?: boolean } = {}) => {
    if (!openRef.current) return;
    openRef.current = false;
    setOpen(false);
    if (window.location.hash !== HASH) return;
    if (pushedHash.current && !options.navigating) history.back();
    else history.replaceState(null, "", urlWithoutHash());
    pushedHash.current = false;
  }, []);

  /** Runs after the exit animation: release scroll lock and return focus. */
  const onClosed = useCallback(() => {
    const html = document.documentElement;
    html.classList.remove("hire-open");
    html.style.removeProperty("--hsbw");
    const { opener, returnFocusTo } = focusReturn.current;
    const visible = (el: Element | null | undefined): el is HTMLElement =>
      el instanceof HTMLElement &&
      el.isConnected &&
      el.checkVisibility?.({ visibilityProperty: true }) !== false &&
      !el.closest("[aria-hidden=true],[inert]");
    const fallback = returnFocusTo ? document.querySelector(returnFocusTo) : null;
    const target = visible(opener) ? opener : visible(fallback) ? fallback : null;
    target?.focus({ preventScroll: true });
    focusReturn.current = {};
  }, []);

  // Back/forward and in-page #hire links keep the modal in sync with the URL.
  useEffect(() => {
    const sync = () => {
      const wantOpen = window.location.hash === HASH;
      if (wantOpen && !openRef.current) {
        pushedHash.current = false;
        show("url");
      } else if (!wantOpen && openRef.current) {
        pushedHash.current = false;
        openRef.current = false;
        setOpen(false);
      }
    };
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);

    // Deep links: ?hire=1 or #hire on first load.
    const url = new URL(window.location.href);
    if (url.searchParams.get("hire") === "1") {
      url.searchParams.delete("hire");
      history.replaceState(null, "", url.pathname + url.search + HASH);
      sync();
    } else if (url.hash === HASH) {
      sync();
    }
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, [show]);

  const value = useMemo(
    () => ({ openHireModal, closeHireModal, preloadHireModal }),
    [openHireModal, closeHireModal, preloadHireModal],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      {requested && <HireDialog open={open} source={source} onRequestClose={closeHireModal} onClosed={onClosed} />}
    </Ctx.Provider>
  );
}
