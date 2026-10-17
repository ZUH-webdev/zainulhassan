import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zain Ul Hassan, Senior Full Stack Developer",
    short_name: "Zain",
    description: "Senior Full Stack Developer building AI-powered SaaS applications.",
    start_url: "/",
    display: "standalone",
    theme_color: "#0A0B0D",
    background_color: "#0A0B0D",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
