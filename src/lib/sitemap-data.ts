import { siteConfig } from "@/lib/config";
import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import { attractions } from "@/data/attractions";
import { articles, collections } from "@/data/content";
import { iso2ToIso3, visaMatrix } from "@/data/visa.generated";

/** City URLs per sitemap chunk (keeps each file well under Google's 50MB / 50k limits). */
export const CITY_CHUNK = 400;

export type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

export function sitemapChunkCount(): number {
  const cityParts = Math.max(1, Math.ceil(cities.length / CITY_CHUNK));
  return 2 + cityParts;
}

export function getSitemapChunkIds(): number[] {
  return Array.from({ length: sitemapChunkCount() }, (_, id) => id);
}

export function buildSitemapChunk(id: number): SitemapEntry[] {
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

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function entriesToUrlsetXml(entries: SitemapEntry[]): string {
  const body = entries
    .map((entry) => {
      const lastmod = entry.lastModified.toISOString();
      return `  <url>
    <loc>${escapeXml(entry.url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

export function buildSitemapIndexXml(): string {
  const base = siteConfig.url;
  const lastmod = new Date().toISOString();
  const body = getSitemapChunkIds()
    .map(
      (id) => `  <sitemap>
    <loc>${escapeXml(`${base}/sitemap/${id}.xml`)}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>
`;
}

/** All indexable URLs in one urlset (~1.5k entries — well under Google's 50k limit). */
export function buildFullSitemapEntries(): SitemapEntry[] {
  return getSitemapChunkIds().flatMap((id) => buildSitemapChunk(id));
}

export function buildFullSitemapXml(): string {
  return entriesToUrlsetXml(buildFullSitemapEntries());
}

export const sitemapXmlHeaders = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
} as const;
