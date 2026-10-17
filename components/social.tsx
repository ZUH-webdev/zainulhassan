import type { ComponentType } from "react";
import { GithubIcon, LinkedinIcon, MailIcon, UpworkIcon, YoutubeIcon } from "@/components/icons";
import { mailto, SITE } from "@/lib/site";

export type SocialLink = {
  label: string;
  href: string;
  aria: string;
  external: boolean;
  track: string;
  Icon: ComponentType<{ size?: number }>;
};

/** Shared by the footer and the mobile menu. YouTube appears only once SITE.youtube is set. */
export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: SITE.github, aria: "Zain on GitHub (opens in a new tab)", external: true, track: "github_click", Icon: GithubIcon },
  { label: "LinkedIn", href: SITE.linkedin, aria: "Zain on LinkedIn (opens in a new tab)", external: true, track: "linkedin_click", Icon: LinkedinIcon },
  ...(SITE.youtube
    ? [{ label: "YouTube", href: SITE.youtube, aria: "Zain on YouTube (opens in a new tab)", external: true, track: "youtube_click", Icon: YoutubeIcon }]
    : []),
  { label: "Upwork", href: SITE.upwork, aria: "Zain on Upwork (opens in a new tab)", external: true, track: "upwork_click", Icon: UpworkIcon },
  { label: "Email", href: mailto, aria: `Email Zain at ${SITE.email}`, external: false, track: "email_click", Icon: MailIcon },
];
