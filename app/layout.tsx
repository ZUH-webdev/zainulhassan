import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";
import Analytics from "@/components/Analytics";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import ModalProvider from "@/components/hire/ModalProvider";
import Nav from "@/components/Nav";
import { BRAND } from "@/lib/seo";
import { SITE, isIndexable } from "@/lib/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  adjustFontFallback: true,
  variable: "--font-bricolage",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  adjustFontFallback: true,
  variable: "--font-dm-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  adjustFontFallback: true,
  variable: "--font-jetbrains",
});

const verification: Metadata["verification"] = {
  google: process.env.GOOGLE_SITE_VERIFICATION || "IuCCjzGIXyIIXwIQL82oV3_9lkj6MADZ9FXWOhbhTjw",
  ...(process.env.BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } } : {}),
};

/** Site-wide defaults; every page overrides title/description/canonical/OG via buildMetadata(). */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: BRAND, template: `%s | ${BRAND}` },
  applicationName: BRAND,
  authors: [{ name: SITE.name, url: `${SITE.url}/about` }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { types: { "application/rss+xml": `${SITE.url}/feed.xml` } },
  robots: isIndexable
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } }
    : { index: false, follow: false },
  verification,
};

export const viewport: Viewport = {
  themeColor: "#0A0B0D",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bricolage.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="me" href={SITE.linkedin} />
        <link rel="me" href={SITE.github} />
      </head>
      <body>
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
          <ModalProvider>
            <Nav />
            {children}
            <Footer />
          </ModalProvider>
        </div>
        <Analytics />
        <CustomCursor />
      </body>
    </html>
  );
}
