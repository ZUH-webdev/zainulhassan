# SEO to-do (things code can't do for you)

Run `npm run seo:check` after any content change; it also prints every placeholder still on the site.

## 0. Set the production URL (required before launch)

The domain is not hardcoded anywhere. Canonicals, sitemap, robots.txt, Open Graph and JSON-LD use:

1. `NEXT_PUBLIC_SITE_URL` (set this in Vercel → Project → Settings → Environment Variables, Production, e.g. `https://your-domain.com`), else
2. Vercel's production domain (automatic on Vercel), else
3. `http://localhost:3000` (local builds).

Optional env vars:

| Variable | Purpose |
|---|---|
| `GOOGLE_SITE_VERIFICATION` | Search Console HTML-tag verification code |
| `BING_SITE_VERIFICATION` | Bing Webmaster Tools `msvalidate.01` code |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Enables Plausible analytics + conversion events |
| `NEXT_PUBLIC_GA_ID` | Uses GA4 instead of Plausible |

Preview deployments (`VERCEL_ENV=preview`) are automatically `noindex` and robots.txt disallows everything there.

## 1. Search Console and Bing

- [ ] Verify the domain in Google Search Console (Domain property, DNS) and in Bing Webmaster Tools.
- [ ] Submit `/sitemap.xml` in both.
- [ ] Request indexing for: `/`, every `/services/*` page, every `/case-studies/*` page.
- [ ] Run Google's Rich Results Test on `/`, `/about`, one service page and one blog post (the build only checks that JSON-LD parses).

## 2. Make your profiles match the site (consistent entity)

Use this exact bio everywhere:

> Zain Ul Hassan is a Senior Full Stack Developer building AI-powered SaaS applications with Next.js, Supabase and the OpenAI and Claude APIs, Top Rated on Upwork with a 100% Job Success Score.

- [ ] Upwork: title and overview using the same keywords; link portfolio items to the matching service and case-study pages.
- [ ] LinkedIn: headline, About and Featured section; link the site.
- [ ] GitHub: pin the site in your profile README.

## 3. Fill these placeholders (shown in brackets on the live site)

| Placeholder | Where | File |
|---|---|---|
| `[CLIENT TESTIMONIAL]`, `[Client name], [Role]` | Each case study | `app/case-studies/[slug]/page.tsx` |
| `[PLACEHOLDER: the client's main problem/goal ...]` | LeadsMind, World Teachers Academy | `content/case-studies.ts` |
| `[PLACEHOLDER: any measurable outcome ...]` | All 3 case studies | `content/case-studies.ts` |
| `[PLACEHOLDER: other engagement models ...]`, `[PLACEHOLDER: your typical starting budget or day rate]` | All service pages | `content/services.ts` → `ENGAGEMENT_COMMON` |
| Timeline / price placeholders (MVP, AI feature, chatbot, Next.js, billing, RLS audit, availability) | Each service page's engagement list and FAQ | `content/services.ts` |
| `[PLACEHOLDER: your typical MVP budget range and what it includes]` | Blog: SaaS MVP cost | `content/blog/saas-mvp-cost.ts` |
| `[PLACEHOLDER: scheduling link, e.g. Calendly or Cal.com]` | Contact page | `app/contact/page.tsx` |

Your photo (`public/ZUH.png`) is shown in the About section and used as the Person schema `image`. If you replace it, keep the same path or update `PHOTO` in `lib/site.ts`.

Never add `aggregateRating` or `review` structured data for reviews of yourself on your own site.

## 4. Testimonials

- [ ] Ask LeadsMind and other clients two questions: what problem did we solve, and what was it like working together? Get their name, title and permission to publish.

## 5. Earn links

- [ ] Republish guides on Dev.to and Hashnode with the canonical URL pointing to your site.
- [ ] List Velocity on Product Hunt.
- [ ] Answer relevant questions in communities and link only where genuinely helpful.
- [ ] Apply to directories such as Clutch or GoodFirms once you have enough reviews.

## 6. Publishing rhythm

- [ ] Publish at least 2 posts per month for the first 6 months (add a file in `content/blog/` and register it in `content/blog/index.ts`).
- [ ] Refresh each post at least twice a year and update its `dateModified`.
- [ ] Watch Search Console for queries where you rank 8-20 and improve those pages first.

## 7. Optional

- [ ] Google Business Profile only if you decide to present as a local business (not needed for remote work).
