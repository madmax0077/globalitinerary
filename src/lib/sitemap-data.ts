import { siteConfig } from "@/lib/config";
import { countries } from "@/data/countries";
import { attractions } from "@/data/attractions";
import { destinationGuides } from "@/data/destination-guides";
import { citySitemapSlugs } from "@/data/city-sitemap-slugs.generated";
import { iso2ToIso3, visaMatrix } from "@/data/visa.generated";
import { listTop100GuideSitemapEntries, listTop200GuideSitemapEntries } from "@/data/top100-guide-meta";

/** Keep sitemap generation off cities.generated.ts (7MB+) so this route can build on Vercel. */
const COLLECTION_SLUGS = [
  "luxury-escapes",
  "beach-paradise",
  "mountain-adventures",
  "food-journeys",
  "ancient-wonders",
  "island-hopping",
] as const;

const LEGACY_ARTICLES: { slug: string; date: string; featured: boolean }[] = [
  { slug: "48-hours-in-tokyo", date: "2026-06-18", featured: true },
  { slug: "iceland-ring-road-guide", date: "2026-05-30", featured: true },
  { slug: "italy-food-cities", date: "2026-06-02", featured: false },
  { slug: "santorini-sunset-secrets", date: "2026-05-12", featured: false },
  { slug: "dubai-desert-adventure", date: "2026-04-22", featured: false },
  { slug: "peru-altitude-tips", date: "2026-03-15", featured: false },
];

export type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

/** Bump this when city/country content is bulk-updated so crawlers see a new lastmod. */
export const SITEMAP_CONTENT_DATE = new Date("2026-08-23T00:00:00.000Z");

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function dedupe(entries: SitemapEntry[]): SitemapEntry[] {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}

export function entriesToUrlsetXml(entries: SitemapEntry[]): string {
  const body = entries
    .map((entry) => {
      const lastmod = entry.lastModified.toISOString().slice(0, 10);
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

export function sitemapIndexXml(locs: { loc: string; lastModified: Date }[]): string {
  const body = locs
    .map((item) => {
      const lastmod = item.lastModified.toISOString().slice(0, 10);
      return `  <sitemap>
    <loc>${escapeXml(item.loc)}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>
`;
}

export function buildPageSitemapEntries(): SitemapEntry[] {
  const base = siteConfig.url;
  const now = SITEMAP_CONTENT_DATE;

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
    priority: path === "" ? 1 : path === "/blog" || path === "/countries" || path === "/cities" ? 0.9 : 0.8,
  }));

  const collectionRoutes = COLLECTION_SLUGS.map((slug) => ({
    url: `${base}/collections/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const articleMeta = [
    ...destinationGuides.map((a) => ({ slug: a.slug, date: a.date, featured: !!a.featured })),
    ...LEGACY_ARTICLES,
    ...listTop100GuideSitemapEntries(),
    ...listTop200GuideSitemapEntries(),
  ];
  const articleRoutes = articleMeta.map((a) => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "weekly" as const,
    priority: a.featured ? 0.9 : 0.8,
  }));

  const rssRoute = {
    url: `${base}/blog/rss.xml`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.5,
  };

  const attractionRoutes = attractions.map((a) => ({
    url: `${base}/attractions/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return dedupe([...staticRoutes, rssRoute, ...collectionRoutes, ...articleRoutes, ...attractionRoutes]);
}

export function buildCountrySitemapEntries(): SitemapEntry[] {
  const base = siteConfig.url;
  const now = SITEMAP_CONTENT_DATE;

  const countryRoutes = countries.map((c) => ({
    url: `${base}/countries/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: c.featured || c.trending ? 0.9 : 0.85,
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
      priority: 0.7,
    }));

  return dedupe([...countryRoutes, ...visaRoutes]);
}

export function buildCitySitemapEntries(): SitemapEntry[] {
  const base = siteConfig.url;
  const now = SITEMAP_CONTENT_DATE;
  return dedupe(
    citySitemapSlugs.map((slug) => ({
      url: `${base}/cities/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  );
}

/**
 * Public URLs for Google. sitemap.xml is the full urlset (so Search Console
 * URL counts go up). Child sitemaps repeat subsets for crawlers that prefer split files.
 */
export function buildFullSitemapEntries(): SitemapEntry[] {
  return dedupe([...buildPageSitemapEntries(), ...buildCountrySitemapEntries(), ...buildCitySitemapEntries()]);
}

export function buildFullSitemapXml(): string {
  return entriesToUrlsetXml(buildFullSitemapEntries());
}

export function buildSitemapIndexXml(): string {
  const base = siteConfig.url;
  const lastModified = SITEMAP_CONTENT_DATE;
  return sitemapIndexXml([
    { loc: `${base}/sitemap-pages.xml`, lastModified },
    { loc: `${base}/sitemap-countries.xml`, lastModified },
    { loc: `${base}/sitemap-cities.xml`, lastModified },
  ]);
}

export const sitemapXmlHeaders = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
} as const;
