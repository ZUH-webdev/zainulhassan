import About from "@/components/About";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Stack from "@/components/Stack";
import Stats from "@/components/Stats";
import TechMarquee from "@/components/TechMarquee";
import Testimonials from "@/components/Testimonials";
import Work from "@/components/Work";

export default function Home() {
  return (
    <div
      style={
        {
          "--ac": "#D4FF3F",
          background: "#0A0B0D",
          color: "#ECEAE4",
          fontFamily: "var(--font-dm-sans),'DM Sans',system-ui,sans-serif",
          fontSize: 17,
          lineHeight: 1.6,
          overflowX: "clip",
        } as React.CSSProperties
      }
    >
      <Nav />
      <main>
        <Hero />
        <TechMarquee />
        <Stats />
        <Services />
        <Work />
        <Process />
        <Stack />
        <Testimonials />
        <About />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
