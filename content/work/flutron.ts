import type { ClientCaseStudy } from "./types";

/*
 * Copy for /work/flutron. Fields left as "" or [] are waiting on confirmed details
 * and are hidden on the page until filled in (see the FILL notes beside them).
 */
export const flutron: ClientCaseStudy = {
  slug: "flutron",
  client: "Flutron",
  siteUrl: "https://flutron.show",
  metaTitle: "Flutron Case Study: Drone Show Website",
  metaDescription:
    "How I built Flutron's drone show website: three audience paths, a 10-step booking process and a site in Albanian, English and German.",
  eyebrow: "Case study",
  title: "Flutron: a booking site for cinematic drone shows",
  summary:
    "Flutron turns the sky into a stage. I built the website that explains drone shows to first-time buyers and turns interest into booking requests across private, business and public events.",
  kicker: "CLIENT SITE · DRONE LIGHT SHOWS",
  cardBody:
    "A multilingual booking site for a drone light show company that explains a new, high-ticket product to first-time buyers and turns interest into booking requests.",
  cardBullets: [
    "Three audience paths for private, business and public events",
    "A 10-step process page so buyers know what happens after they book",
    "Albanian, English and German",
  ],
  role: "Design and full-stack development", // FILL: confirm role
  timeline: "", // FILL: duration
  challenge:
    "Drone shows are a new, high-ticket purchase. Visitors don't know what a show involves, what it costs, or whether it's even allowed where they live. The site had to explain the product, set price expectations, and make requesting a booking feel simple and safe, in more than one language.",
  features: [
    {
      title: "Three audience paths",
      body: "Dedicated pages for Private, Business and Public events, each with its own pitch and \"from\" pricing (€7,500 / €6,500 / €9,000), so every visitor lands on the page that speaks to them.",
      detail: "",
    },
    {
      title: "A clear 10-step process page",
      body: "From choosing the event to confirming the visual content, so buyers know exactly what happens after they click Book.",
      detail: "",
    },
    {
      title: "Booking and contact forms",
      body: "A request flow that sends the enquiry straight to the team.",
      detail: "", // FILL: how enquiries are delivered, e.g. email or CRM
    },
    {
      title: "Multilingual site",
      body: "Albanian, English and German.",
      detail: "", // FILL: how the language switching is built
    },
    {
      title: "Pricing and FAQ pages",
      body: "Answers to cost, permit and safety questions before the first call.",
      detail: "",
    },
    {
      title: "Affiliate program page",
      body: "A page for partners who refer clients.",
      detail: "",
    },
  ],
  process: {
    intro: "The process page walks a buyer from first idea to the final show, so nothing after the Book button is a surprise.",
    steps: [
      { title: "Choose your event", body: "Tell the team about your vision, location and the audience you want to reach." },
      { title: "The show is designed", body: "The creative team choreographs a custom 3D animation synced to music." },
      { title: "The experience is executed", body: "Pilots and engineers deploy the fleet and light up the sky safely." },
      { title: "Submit your request", body: "Complete the booking or contact form with event type, location, date, audience size and preferred package." },
      { title: "Review and consultation", body: "The team confirms feasibility, recommends the right package and clarifies key details." },
      { title: "Package and scope", body: "Package, drone count, duration and visual scope are agreed early to avoid uncertainty later." },
      { title: "Agreement and pre-payment", body: "An event agreement is issued. The date is secured once it is signed and the pre-payment is made." },
      { title: "Location review", body: "The location is validated remotely, with a site visit if needed to check space, visibility and safety." },
      { title: "Permits and coordination", body: "Planning and coordination with the relevant authorities, including airspace and event approvals." },
      { title: "Visual content confirmation", body: "Text, symbols, logos or event-specific visuals that will appear in the sky are finalised." },
    ],
  },
  stack: [], // FILL: framework, hosting, forms/email service, CMS if any, analytics
  decisions: [], // FILL: three short "why I chose X" notes
  results: [], // FILL: e.g. enquiries in the first month, page speed scores, ranking or traffic wins. Never invent figures.
  cta: "Need a site that turns visitors into bookings?",
  next: { href: "/case-studies/leadsmind", title: "LeadsMind: CRM, LMS and marketing platform" },
  datePublished: "2026-10-29",
  dateModified: "2026-10-30",
};
