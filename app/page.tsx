import About from "@/components/About";
import Cta from "@/components/Cta";
import GitHub from "@/components/github/GitHub";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Stack from "@/components/Stack";
import Stats from "@/components/Stats";
import TechMarquee from "@/components/TechMarquee";
import Testimonials from "@/components/Testimonials";
import Work from "@/components/Work";
import { graph, professionalServiceNode, webPageNode } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const title = "AI SaaS Developer & Full Stack Developer for Hire | Zain Ul Hassan";
const description =
  "AI SaaS developer and senior full stack developer for hire. I build Next.js, Supabase and OpenAI products from database to deploy. Top Rated on Upwork.";

export const metadata = buildMetadata({ title, absoluteTitle: title, description, path: "/" });

export default function Home() {
  return (
    <main>
      <JsonLd data={graph(professionalServiceNode(), webPageNode("/", title, description))} />
      <Hero />
      <TechMarquee />
      <Stats />
      <Services />
      <Work />
      <GitHub />
      <Process />
      <Stack />
      <Testimonials />
      <About />
      <Cta />
    </main>
  );
}
