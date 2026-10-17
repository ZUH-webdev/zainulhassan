/**
 * Everything you still need to fill in lives here.
 * Bracketed values are placeholders and render as-is on the page.
 * Once `email` / `upworkUrl` hold real values, the CTA buttons switch
 * to a mailto: link and an external Upwork link automatically.
 */
export const site = {
  name: "Zain Ul Hassan",
  url: "https://zainulhassan.site",

  email: "[YOUR EMAIL]",
  upworkUrl: "[YOUR UPWORK URL]",

  // Footer links (currently point to the contact section)
  social: {
    linkedin: "#contact",
    youtube: "#contact",
    upwork: "#contact",
  },

  photoNote: "[Replace with your photo]",

  testimonials: [
    {
      quote: "[Paste your 5-star Upwork review for LeadsMind here]",
      author: "[Client name], [Role]",
      source: "Upwork contract",
    },
    {
      quote: "[Paste a second client review here]",
      author: "[Client name], [Role]",
      source: "Upwork contract",
    },
    {
      quote: "[Paste a third client review here]",
      author: "[Client name], [Role]",
      source: "Upwork contract",
    },
  ],
};

export const isPlaceholder = (value: string) => value.startsWith("[");

export const isExternal = (href: string) => /^https?:\/\//.test(href);

export const emailHref = isPlaceholder(site.email) ? "#contact" : `mailto:${site.email}`;

export const upworkHref = isPlaceholder(site.upworkUrl) ? "#contact" : site.upworkUrl;

/** Props for an <a> that opens external URLs in a new tab. */
export const linkProps = (href: string) =>
  isExternal(href) ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
