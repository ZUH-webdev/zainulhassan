"use client";

import { useEffect, useRef } from "react";

const HOVER_SEL = 'a, button, [role="button"], summary, label, [data-cursor="hover"]';
const LERP = 0.22;

/**
 * Lime dot that replaces the mouse pointer on fine-pointer devices.
 * Renders an inert, hidden div on the server; everything happens after mount, so no hydration diff.
 * It is a manual popover so it lives in the top layer, and it is re-raised whenever a modal
 * <dialog> opens, since later top-layer entries paint above earlier ones.
 */
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    let teardown: (() => void) | null = null;

    const setup = () => {
      root.classList.add("has-cursor");
      let tx = 0, ty = 0, x = 0, y = 0, raf = 0, seen = false;

      const raise = () => {
        if (typeof el.showPopover !== "function") return;
        try {
          if (el.matches(":popover-open")) el.hidePopover();
          el.showPopover();
        } catch {}
      };

      const render = () => {
        const k = reduceMq.matches ? 1 : LERP;
        x += (tx - x) * k;
        y += (ty - y) * k;
        if (Math.abs(tx - x) < 0.1 && Math.abs(ty - y) < 0.1) {
          x = tx;
          y = ty;
          raf = 0;
        } else {
          raf = requestAnimationFrame(render);
        }
        // Position via `translate`, not `transform`: the individual `scale` property is applied
        // before `transform`, so a scaled dot would also scale (and fling away) its position.
        el.style.translate = `${x}px ${y}px 0`;
      };

      const move = (e: PointerEvent) => {
        if (e.pointerType === "touch") return;
        tx = e.clientX;
        ty = e.clientY;
        if (!seen) {
          seen = true;
          x = tx;
          y = ty;
          el.dataset.show = "1";
        }
        if (!raf) raf = requestAnimationFrame(render);
      };
      const over = (e: PointerEvent) => {
        const t = e.target as Element | null;
        el.dataset.hover = t?.closest?.(HOVER_SEL) ? "1" : "0";
      };
      const down = (e: PointerEvent) => {
        if (e.pointerType !== "touch") el.dataset.down = "1";
      };
      const up = () => (el.dataset.down = "0");
      const leave = () => (el.dataset.show = "0");
      const enter = () => {
        if (seen) el.dataset.show = "1";
      };

      // Re-raise above any modal dialog the moment it opens (before paint).
      const mo = new MutationObserver((records) => {
        if (records.some((r) => r.target instanceof HTMLDialogElement && r.target.open)) raise();
      });
      mo.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["open"] });

      raise();
      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("pointerover", over, { passive: true });
      window.addEventListener("pointerdown", down, { passive: true });
      window.addEventListener("pointerup", up, { passive: true });
      window.addEventListener("blur", up);
      root.addEventListener("mouseleave", leave);
      root.addEventListener("mouseenter", enter);

      return () => {
        cancelAnimationFrame(raf);
        mo.disconnect();
        root.classList.remove("has-cursor");
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerover", over);
        window.removeEventListener("pointerdown", down);
        window.removeEventListener("pointerup", up);
        window.removeEventListener("blur", up);
        root.removeEventListener("mouseleave", leave);
        root.removeEventListener("mouseenter", enter);
        try {
          if (el.matches(":popover-open")) el.hidePopover();
        } catch {}
        delete el.dataset.show;
        delete el.dataset.hover;
        delete el.dataset.down;
      };
    };

    const sync = () => {
      if (fine.matches && !teardown) teardown = setup();
      else if (!fine.matches && teardown) {
        teardown();
        teardown = null;
      }
    };
    sync();
    fine.addEventListener("change", sync);

    return () => {
      fine.removeEventListener("change", sync);
      teardown?.();
      teardown = null;
    };
  }, []);

  return <div ref={ref} className="zcursor" popover="manual" aria-hidden="true" />;
}
