import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/favorites"],
      },
      {
        // Keep AI crawlers that respect robots on public guides.
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/admin", "/api/", "/favorites"],
      },
      {
        userAgent: "Baiduspider",
        allow: "/",
        disallow: ["/admin", "/api/", "/favorites"],
      },
    ],
    sitemap: [
      `${siteConfig.url}/sitemap.xml`,
      `${siteConfig.url}/sitemap-cities.xml`,
      `${siteConfig.url}/sitemap-countries.xml`,
      `${siteConfig.url}/sitemap-pages.xml`,
    ],
    host: siteConfig.url,
  };
}
