import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import { attractions } from "@/data/attractions";
import { articles, collections } from "@/data/content";
import { iso2ToIso3, visaMatrix } from "@/data/visa.generated";

/**
 * Split sitemap into chunks so search engines get a reliable index
 * (a single 250KB+ sitemap has timed out / 500'd under cold starts).
 *
 * Produces:
 *   /sitemap.xml          → sitemap index
 *   /sitemap/0.xml        → static + guides + collections + attractions
 *   /sitemap/1.xml        → countries + visa pages
 *   /sitemap/2.xml…       → city chunks
 */
const CITY_CHUNK = 400;

export async function generateSitemaps() {
  const cityParts = Math.max(1, Math.ceil(cities.length / CITY_CHUNK));
  return Array.from({ length: 2 + cityParts }, (_, id) => ({ id }));
}

export default async function sitemap(props: {
  id: number | string;
}): Promise<MetadataRoute.Sitemap> {
  const id = Number(props.id);
  const base = siteConfig.url;
  const now = new Date();

  if (id === 0) {
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
      priority: path === "" ? 1 : path === "/blog" ? 0.9 : 0.8,
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
      changeFrequency: "weekly" as const,
      priority: a.featured ? 0.85 : 0.7,
    }));

    const attractionRoutes = attractions.map((a) => ({
      url: `${base}/attractions/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...collectionRoutes, ...articleRoutes, ...attractionRoutes];
  }

  if (id === 1) {
    const countryRoutes = countries.map((c) => ({
      url: `${base}/countries/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

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

    return [...countryRoutes, ...visaRoutes];
  }

  const chunkIndex = id - 2;
  const start = chunkIndex * CITY_CHUNK;
  const slice = cities.slice(start, start + CITY_CHUNK);

  return slice.map((c) => ({
    url: `${base}/cities/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: c.featured ? 0.85 : 0.75,
  }));
}
