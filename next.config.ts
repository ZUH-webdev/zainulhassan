import type { NextConfig } from "next";

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,

  async redirects() {
    return [
      // Case studies used to live under /work. Only these slugs: /work/leadsmind/*.webp are screenshots in /public.
      { source: "/work", destination: "/case-studies", statusCode: 301 },
      { source: "/work/:slug(flutron|pulse|sentinel)", destination: "/case-studies/:slug", statusCode: 301 },
      // www -> apex for whatever domain the site is served on (no domain hardcoded).
      {
        source: "/:path*",
        has: [{ type: "host", value: "www\\.(?<apex>.+)" }],
        destination: "https://:apex/:path*",
        statusCode: 301,
      },
      // Force HTTPS behind proxies that report the original protocol (Vercel already does this at the edge).
      {
        source: "/:path*",
        has: [
          { type: "header", key: "x-forwarded-proto", value: "http" },
          { type: "host", value: "(?<host>(?!localhost|127\\.0\\.0\\.1).+)" },
        ],
        destination: "https://:host/:path*",
        statusCode: 301,
      },
    ];
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
