import type { NextConfig } from "next";
import path from "node:path";

const SECURITY_HEADERS = [
  // Stop browsers from sniffing MIME types — closes a class of XSS tricks.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Don't let the site be framed by anyone. Protects against clickjacking.
  { key: "X-Frame-Options", value: "DENY" },
  // Same intent, modern equivalent. Both is fine.
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  // Don't leak full URLs (including query strings) to third-party origins.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Aggressively deny APIs the browser may grant by default.
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=(), bluetooth=()",
  },
  // Force HTTPS for two years, include subdomains, preloadable.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Cross-origin isolation hints — safe defaults.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  // Some legacy proxies still honor this.
  { key: "X-DNS-Prefetch-Control", value: "off" },
];

const NO_STORE = [
  { key: "Cache-Control", value: "no-store, max-age=0, must-revalidate" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  poweredByHeader: false,
  images: {
    qualities: [75, 90, 92],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    return [
      {
        // Apply baseline security headers to every response.
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
      {
        // Never let an intermediate cache hold an auth page.
        source: "/login",
        headers: NO_STORE,
      },
      {
        source: "/dashboard/:path*",
        headers: NO_STORE,
      },
      {
        source: "/api/auth/:path*",
        headers: NO_STORE,
      },
      {
        source: "/api/dashboard/:path*",
        headers: NO_STORE,
      },
    ];
  },
};

export default nextConfig;
