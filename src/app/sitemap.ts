import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import { attractions } from "@/data/attractions";
import { articles, collections } from "@/data/content";
import { iso2ToIso3, visaMatrix } from "@/data/visa.generated";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/countries",
    "/cities",
    "/attractions",
    "/collections",
    "/blog",
    "/map",
    "/planner",
    "/compare",
    "/route-planner",
    "/packing-list",
    "/trip-cost",
    "/etias-ees",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
    "/disclaimer",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const countryRoutes = countries.map((c) => ({
    url: `${base}/countries/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const cityRoutes = cities.map((c) => ({
    url: `${base}/cities/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const attractionRoutes = attractions.map((a) => ({
    url: `${base}/attractions/${a.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Per-country visa requirement pages (only where we have visa data).
  const visaRoutes = countries
    .filter((c) => {
      const iso3 = iso2ToIso3[(c.id || "").toUpperCase()];
      return !!iso3 && !!visaMatrix[iso3];
    })
    .map((c) => ({
      url: `${base}/countries/${c.slug}/visa`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }));

  const collectionRoutes = collections.map((c) => ({
    url: `${base}/collections/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const articleRoutes = articles.map((a) => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...countryRoutes,
    ...visaRoutes,
    ...cityRoutes,
    ...attractionRoutes,
    ...collectionRoutes,
    ...articleRoutes,
  ];
}
