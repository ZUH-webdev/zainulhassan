import type { ReactNode } from "react";
import { external, mailto, SITE } from "@/lib/site";

const icon = (children: ReactNode) => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

type FooterLink = { label: string; href: string; aria: string; external: boolean; icon: ReactNode };

const links: FooterLink[] = [
  {
    label: "GitHub",
    href: SITE.github,
    aria: "Zain on GitHub (opens in a new tab)",
    external: true,
    icon: icon(
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />,
    ),
  },
  {
    label: "LinkedIn",
    href: SITE.linkedin,
    aria: "Zain on LinkedIn (opens in a new tab)",
    external: true,
    icon: icon(
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 10.5V16" />
        <path d="M8 7.5v.01" />
        <path d="M12 16v-5.5" />
        <path d="M16 16v-3a2.5 2.5 0 0 0-4-2" />
      </>,
    ),
  },
  ...(SITE.youtube
    ? [
        {
          label: "YouTube",
          href: SITE.youtube,
          aria: "Zain on YouTube (opens in a new tab)",
          external: true,
          icon: icon(
            <>
              <rect x="2.5" y="5" width="19" height="14" rx="4" />
              <path d="M10 9.5v5l4.5-2.5z" />
            </>,
          ),
        },
      ]
    : []),
  {
    label: "Upwork",
    href: SITE.upwork,
    aria: "Zain on Upwork (opens in a new tab)",
    external: true,
    icon: icon(
      <path d="M3 6v5a4 4 0 0 0 8 0V6m0 4.5C12 14 13.5 16 16 16a4 4 0 0 0 0-8c-2.5 0-3.7 2-4.4 4.5L10 20" />,
    ),
  },
  {
    label: "Email",
    href: mailto,
    aria: `Email Zain at ${SITE.email}`,
    external: false,
    icon: icon(
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3.5 6.5L12 13l8.5-6.5" />
      </>,
    ),
  },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #1B1E24" }}>
      <div
        className="wrap"
        style={{
          paddingTop: 28,
          paddingBottom: 28,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 16,
          fontSize: 14,
          color: "#9A9DA6",
        }}
      >
        <div>© 2026 Zain Ul Hassan</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0 24px" }}>
          {links.map((l) => (
            <a
              key={l.label}
              className="lnk flnk"
              href={l.href}
              aria-label={l.aria}
              {...(l.external ? external : {})}
            >
              {l.icon}
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
