/**
 * Lightweight itinerary metadata for Top 100 + ranks 101–200 — no city records.
 * Used by sitemap generation so /sitemap.xml does not import cities.generated.ts.
 */
import { TOP_100_CITIES } from "@/data/top-100-cities";
import { TOP_101_200_CITIES } from "@/data/top-200-cities";

export const EXISTING_TOP100_ITINERARY_SLUGS: Record<string, { slug: string; days: number }> = {
  bali: { slug: "7-day-bali-itinerary-trip-cost-2026", days: 7 },
  dubai: { slug: "dubai-5-day-itinerary-trip-cost-2026", days: 5 },
  london: { slug: "london-5-day-itinerary-trip-cost-2026", days: 5 },
  paris: { slug: "paris-5-day-itinerary-best-time-trip-cost-2026", days: 5 },
  singapore: { slug: "singapore-4-day-itinerary-trip-cost-2026", days: 4 },
  "new-york-city": { slug: "new-york-5-day-itinerary-trip-cost-2026", days: 5 },
};

function hash32(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function itineraryDaysForCity(slug: string): number {
  return 5 + (hash32(slug) % 11);
}

export function top100GuideArticleSlug(citySlug: string, days: number): string {
  return `${citySlug}-${days}-day-itinerary-trip-cost-2026`;
}

export type Top100GuideLink = {
  articleSlug: string;
  days: number;
  title: string;
};

function rankedCityBySlug(citySlug: string) {
  return (
    TOP_100_CITIES.find((c) => c.slug === citySlug) ||
    TOP_101_200_CITIES.find((c) => c.slug === citySlug)
  );
}

export function getTop100GuideLink(citySlug: string): Top100GuideLink | undefined {
  const existing = EXISTING_TOP100_ITINERARY_SLUGS[citySlug];
  if (existing) {
    const seed = rankedCityBySlug(citySlug);
    const name = seed?.name || citySlug;
    return {
      articleSlug: existing.slug,
      days: existing.days,
      title: `${existing.days}-Day ${name} itinerary`,
    };
  }
  const seed = rankedCityBySlug(citySlug);
  if (!seed) return undefined;
  const days = itineraryDaysForCity(citySlug);
  return {
    articleSlug: top100GuideArticleSlug(citySlug, days),
    days,
    title: `${days}-Day ${seed.name} itinerary`,
  };
}

export function listTop100GuideSitemapEntries(): { slug: string; date: string; featured: boolean }[] {
  const seen = new Set<string>();
  const out: { slug: string; date: string; featured: boolean }[] = [];
  for (const city of TOP_100_CITIES) {
    const link = getTop100GuideLink(city.slug);
    if (!link || seen.has(link.articleSlug)) continue;
    seen.add(link.articleSlug);
    const day = 10 + (city.rank % 10);
    out.push({
      slug: link.articleSlug,
      date: `2026-08-${String(day).padStart(2, "0")}`,
      featured: false,
    });
  }
  return out;
}

export function listTop200GuideSitemapEntries(): { slug: string; date: string; featured: boolean }[] {
  const seen = new Set<string>();
  const out: { slug: string; date: string; featured: boolean }[] = [];
  for (const city of TOP_101_200_CITIES) {
    const link = getTop100GuideLink(city.slug);
    if (!link || seen.has(link.articleSlug)) continue;
    seen.add(link.articleSlug);
    const day = 14 + (city.rank % 9);
    out.push({
      slug: link.articleSlug,
      date: `2026-08-${String(day).padStart(2, "0")}`,
      featured: false,
    });
  }
  return out;
}
