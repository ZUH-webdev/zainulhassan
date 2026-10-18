"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { useHireModal } from "@/components/hire/ModalProvider";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Where the button lives, for analytics and the lead email (e.g. "nav", "hero"). */
  source: string;
  /** Focus fallback (CSS selector) if this button is hidden when the modal closes. */
  returnFocusTo?: string;
};

/**
 * A normal link to the contact page that opens the hire modal when JS is available.
 * Renders exactly the anchor it replaces, so existing classes and styles apply unchanged.
 * Modified clicks (new tab, etc.) and no-JS visits follow the href.
 */
export default function HireButton({
  source,
  returnFocusTo,
  href = "/contact",
  onClick,
  onPointerEnter,
  onFocus,
  onTouchStart,
  ...rest
}: Props) {
  const modal = useHireModal();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (!modal || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    modal.openHireModal(source, { opener: e.currentTarget, returnFocusTo });
  };

  return (
    <a
      href={href}
      aria-haspopup="dialog"
      {...rest}
      onClick={handleClick}
      onPointerEnter={(e) => {
        modal?.preloadHireModal();
        onPointerEnter?.(e);
      }}
      onFocus={(e) => {
        modal?.preloadHireModal();
        onFocus?.(e);
      }}
      onTouchStart={(e) => {
        modal?.preloadHireModal();
        onTouchStart?.(e);
      }}
    />
  );
}
