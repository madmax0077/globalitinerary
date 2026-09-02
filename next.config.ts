import type { NextConfig } from "next";
import { CITY_SLUG_REDIRECTS } from "./src/data/city-slug-redirects";

/**
 * Custom CDN loader is the default so production does not burn Vercel
 * Image Optimization cache writes (Hobby cap 100K/month).
 *
 * Opt back into `/_next/image` only if you explicitly want Vercel to transform:
 *   USE_VERCEL_IMAGE_OPTIMIZATION=1
 */
const useVercelImageOptimization =
  process.env.USE_VERCEL_IMAGE_OPTIMIZATION === "1";

const nextConfig: NextConfig = {
  images: {
    ...(useVercelImageOptimization
      ? {}
      : {
          loader: "custom" as const,
          loaderFile: "./src/lib/image-loader.ts",
        }),
    formats: ["image/avif", "image/webp"],
    // Prefer modern formats aggressively; keep originals only as last resort.
    dangerouslyAllowSVG: false,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "flagcdn.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "commons.wikimedia.org" },
      { protocol: "https", hostname: "**.wikipedia.org" },
    ],
    // Cache optimized images for a day (Vercel CDN still immutable-hashes).
    minimumCacheTTL: 60 * 60 * 24,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "recharts"],
  },
  async redirects() {
    return Object.entries(CITY_SLUG_REDIRECTS).map(([from, to]) => ({
      source: `/cities/${from}`,
      destination: `/cities/${to}`,
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
if (process.env.NODE_ENV !== "production") {
  initOpenNextCloudflareForDev();
}
