/**
 * Lightweight URL queue for IndexNow / Bing URL Submission.
 * Do not import cities.generated.ts here — cron must stay small.
 */
import { siteConfig } from "@/lib/config";
import { destinationGuides } from "@/data/destination-guides";
import { citySitemapSlugs } from "@/data/city-sitemap-slugs.generated";
import {
  listTop100GuideSitemapEntries,
  listTop200GuideSitemapEntries,
} from "@/data/top100-guide-meta";

const LEGACY_BLOG = [
  "48-hours-in-tokyo",
  "iceland-ring-road-guide",
  "italy-food-cities",
  "santorini-sunset-secrets",
  "dubai-desert-adventure",
  "peru-altitude-tips",
];

const STATIC_PAGES = [
  "",
  "/blog",
  "/countries",
  "/cities",
  "/blog/top-100-cities-to-visit-2026",
  "/blog/top-200-cities-to-visit-2026",
  "/sitemap.xml",
];

export const DAILY_SUBMIT_LIMIT = 100;

function abs(path: string): string {
  if (path.startsWith("http")) return path;
  return `${siteConfig.url}${path}`;
}

/** Newest / most important first so the first 100-day cycle hits 101–200 guides. */
export function listIndexableUrls(): string[] {
  const seen = new Set<string>();
  const out: string[] = [];

  const push = (url: string) => {
    if (seen.has(url)) return;
    seen.add(url);
    out.push(url);
  };

  for (const path of STATIC_PAGES) push(abs(path));

  for (const a of listTop200GuideSitemapEntries()) {
    push(abs(`/blog/${a.slug}`));
  }
  for (const a of listTop100GuideSitemapEntries()) {
    push(abs(`/blog/${a.slug}`));
  }
  for (const a of destinationGuides) {
    push(abs(`/blog/${a.slug}`));
  }
  for (const slug of LEGACY_BLOG) {
    push(abs(`/blog/${slug}`));
  }
  for (const slug of citySitemapSlugs) {
    push(abs(`/cities/${slug}`));
  }

  return out;
}

export function dailyUrlBatch(
  all: string[],
  size = DAILY_SUBMIT_LIMIT,
  dayOffset?: number,
): { urls: string[]; batch: number; totalBatches: number; offset: number } {
  const totalBatches = Math.max(1, Math.ceil(all.length / size));
  const utcDay = Math.floor(Date.now() / 86_400_000);
  const batch = ((dayOffset ?? utcDay) % totalBatches + totalBatches) % totalBatches;
  const offset = batch * size;
  return {
    urls: all.slice(offset, offset + size),
    batch,
    totalBatches,
    offset,
  };
}
