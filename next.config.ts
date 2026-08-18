import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Use a custom loader so remote images are served directly from their CDN
    // to the browser. This avoids the Node-side optimizer, which fails behind
    // corporate SSL-inspecting proxies (SELF_SIGNED_CERT_IN_CHAIN), and lets
    // each CDN handle resizing. Works identically in local and cloud deploys.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "flagcdn.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "recharts"],
  },
  // Production security + caching headers.
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
        // Long-cache static Next assets (hashed filenames).
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
