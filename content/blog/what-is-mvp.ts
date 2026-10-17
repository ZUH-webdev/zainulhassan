import type { Post } from "./types";

export const post: Post = {
  slug: "what-is-mvp-in-software-development",
  title: "What Is an MVP in Software Development? A Founder's Guide",
  metaTitle: "What Is an MVP in Software Development?",
  description:
    "An MVP is the smallest version of a product that lets you learn from real users. What it includes, how it differs from a prototype, and how to scope one well.",
  keyword: "what is mvp in software development",
  datePublished: "2026-10-17",
  dateModified: "2026-10-17",
  service: "saas-mvp-development",
  related: ["saas-mvp-cost", "how-to-hire-an-ai-developer", "supabase-vs-firebase"],
  intro:
    "An MVP (minimum viable product) in software development is the smallest version of a product that real users can use, so you can learn whether it solves their problem before investing in everything else. For a SaaS, a good MVP lets a customer sign up, get value from one core workflow and pay. It is small, but it is real.",
  sections: [
    {
      id: "definition",
      title: "Where the term comes from",
      blocks: [
        {
          p: "The term was popularised by Eric Ries in The Lean Startup, where he describes the MVP as the version of a new product that allows a team to collect the maximum amount of validated learning about customers with the least effort. The key word is learning: an MVP exists to test a belief about customers, not to impress investors with features.",
        },
        {
          p: "In practice, for software products, that learning only counts when real people use the product for a real reason. That is why a clickable mockup is not an MVP, and a polished product with ten features is not minimum.",
        },
        {
          p: "The word viable deserves as much attention as minimum. Viable means a user can complete the job they came for without hitting a dead end, and trusts the product enough to put real data into it. A product that is small but broken, slow or insecure teaches you nothing about demand, because people leave for reasons unrelated to your idea.",
        },
      ],
    },
    {
      id: "mvp-vs-prototype",
      title: "MVP vs prototype vs proof of concept",
      blocks: [
        { p: "These three terms are often mixed up. They answer different questions:" },
        {
          table: {
            head: ["", "Question it answers", "Who uses it", "Is it production software?"],
            rows: [
              ["Proof of concept", "Can this be built at all?", "The team", "No"],
              ["Prototype", "How should it look and flow?", "Testers, stakeholders", "No"],
              ["MVP", "Will real users use it and pay?", "Real customers", "Yes"],
            ],
          },
        },
        {
          p: "A proof of concept might test whether an AI model can answer questions from your documents. A prototype shows the chat screen in Figma. The MVP is the working chatbot your first customers use.",
        },
      ],
    },
    {
      id: "types",
      title: "Common types of MVP",
      blocks: [
        {
          ul: [
            "**Single-feature MVP**: one workflow done well. The most common choice for SaaS.",
            "**Concierge MVP**: you deliver the result manually for the first customers to learn what they value before automating it.",
            "**Wizard of Oz MVP**: the product looks automated to users, while some steps are done by people behind the scenes.",
            "**Landing page MVP**: a page that describes the product and measures sign-ups or pre-orders before building.",
          ],
        },
        {
          p: "For B2B SaaS, a single-feature MVP with real billing usually teaches you the most, because a customer paying is the strongest signal there is.",
        },
      ],
    },
    {
      id: "what-to-include",
      title: "What a SaaS MVP should include",
      blocks: [
        { p: "Minimum does not mean flimsy. These parts are hard to add later, so they belong in version one:" },
        {
          ul: [
            "**Authentication**, with organisations and roles if businesses are your customers.",
            "**A sound data model**, with tenant isolation enforced in the database. In Supabase this means [Row Level Security policies](/blog/supabase-rls-mistakes).",
            "**Billing**, so you can charge from launch. See [Stripe vs Paystack](/blog/stripe-vs-paystack) if you sell in Africa.",
            "**The one core workflow** that solves the customer's problem, done properly.",
            "**Basic analytics**, so you can see whether people come back.",
          ],
        },
        { p: "Everything else, such as integrations, settings pages, exports and secondary features, waits until users ask for it." },
      ],
    },
    {
      id: "how-to-scope",
      title: "How to scope your MVP in five steps",
      blocks: [
        {
          ol: [
            "Write the problem in one sentence, in your customer's words.",
            "List every feature you imagine, then mark the ones a customer needs to get value the first time.",
            "Cut until removing anything else would stop the product from solving the problem.",
            "Decide what you will measure: sign-ups, activation, retention or payment.",
            "Turn the remaining list into milestones that each end with working software.",
          ],
        },
        {
          p: "Scope is also what sets the price. My guide on [how much a SaaS MVP costs](/blog/saas-mvp-cost) breaks down the cost drivers.",
        },
      ],
    },
    {
      id: "did-it-work",
      title: "How to tell if your MVP worked",
      blocks: [
        {
          p: "Decide what success looks like before launch, so you judge the MVP on evidence rather than on how it feels. Useful signals for a SaaS MVP:",
        },
        {
          ul: [
            "**Activation**: do new users reach the moment where the product solves their problem?",
            "**Retention**: do they come back next week without being reminded?",
            "**Willingness to pay**: do they start paying, or upgrade, when asked?",
            "**Pull**: do users ask for features, invite colleagues or complain when something breaks? Complaints are a good sign; indifference is not.",
          ],
        },
        {
          p: "If the signals are weak, the MVP still did its job: it taught you something for a fraction of the cost of the full product. Change one thing, such as the customer type, the core workflow or the pricing, and test again.",
        },
      ],
    },
    {
      id: "mistakes",
      title: "MVP mistakes I see most often",
      blocks: [
        {
          ul: [
            "**Building for every user at once.** Pick one customer type for version one.",
            "**Skipping security to save time.** Data leaks in a multi-tenant product end trust immediately, and fixing them later is harder.",
            "**Postponing payments.** Free users tell you what they like. Paying users tell you what they value.",
            "**Treating the MVP as throwaway.** If it works, you will build on it. Choose a stack that grows, like Next.js and Supabase.",
          ],
        },
        {
          p: "I build SaaS MVPs in milestones on Next.js and Supabase, with auth, multi-tenant data and billing in place from the start. See my [SaaS MVP development service](/services/saas-mvp-development).",
        },
      ],
    },
  ],
  sources: [{ label: "The Lean Startup: principles (Eric Ries)", href: "https://theleanstartup.com/principles" }],
};
