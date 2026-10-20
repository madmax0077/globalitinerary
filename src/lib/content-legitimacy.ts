/** Detect invented/template destination copy so we never show it as facts. */

import type { City, Country } from "@/lib/types";

const TEMPLATE_SIGHT_RE =
  /historic center \/ Old Town|main square and landmark viewpoints|cathedral \/ historic church|temple \/ shrine circuit|historic mosque \/ medina walk|central market or bazaar|regional museum in |Scenic park, waterfront or hillside walk in |Signature day trip from |Sunset viewpoint overlooking /i;

export function isTemplateSight(s: string): boolean {
  return TEMPLATE_SIGHT_RE.test(s);
}

export function filterRealSights(sights: string[] | undefined): string[] {
  if (!sights?.length) return [];
  const cleaned = sights.filter((s) => s && !isTemplateSight(s));
  // If most of the list was template filler, drop all of it.
  if (sights.length >= 4 && cleaned.length <= sights.length - 3) return cleaned.length >= 3 ? cleaned : [];
  return cleaned;
}

export function isGenericCityTagline(tagline?: string): boolean {
  if (!tagline) return true;
  return /^(A city in |The capital of )/i.test(tagline.trim());
}

export function isGenericCityOverview(overview?: string): boolean {
  if (!overview) return true;
  return / is (one of .+?'s major cities|the capital of )/i.test(overview);
}

export function isGenericCountryTagline(tagline?: string): boolean {
  if (!tagline) return true;
  return /^Discover the wonders of /i.test(tagline.trim());
}

export function honestCityTagline(tagline: string | undefined, countryName: string): string {
  if (!tagline || isGenericCityTagline(tagline)) return countryName;
  return tagline;
}

export function honestCityOverview(overview: string | undefined, name: string, countryName: string): string {
  if (!overview || isGenericCityOverview(overview)) {
    return `Travel guide for ${name}, ${countryName} — practical tips, places to visit, and planning help.`;
  }
  return overview;
}

function practicalDepth(parts: {
  itinerary?: { length: number } | null;
  restaurants?: { length: number } | null;
  hotels?: { length: number } | null;
  stays?: { length: number } | null;
  tips?: { length: number } | null;
  faqs?: { length: number } | null;
  localFoods?: { length: number } | null;
}): number {
  const restaurants = parts.restaurants?.length ?? 0;
  const stays = (parts.stays?.length ?? 0) || (parts.hotels?.length ?? 0);
  const days = parts.itinerary?.length ?? 0;
  const tips = parts.tips?.length ?? 0;
  const faqs = parts.faqs?.length ?? 0;
  const foods = parts.localFoods?.length ?? 0;
  return (
    (days >= 2 ? 1 : 0) +
    (restaurants >= 3 ? 1 : 0) +
    (stays >= 2 ? 1 : 0) +
    (tips >= 3 ? 1 : 0) +
    (faqs >= 2 ? 1 : 0) +
    (foods >= 3 ? 1 : 0)
  );
}

function isStubOverview(overview?: string): boolean {
  const text = overview?.trim() ?? "";
  return (
    text.length < 120 ||
    /^Travel guide for /i.test(text) ||
    isGenericCityOverview(text) ||
    /Use this guide for trip planning/i.test(text) ||
    /distinctive slice of the world to explore/i.test(text)
  );
}

/**
 * A city page is indexable only when it is a real guide: several genuine
 * sights, plus planning detail (itinerary, food, stays, tips or FAQs).
 * A category tag or a short name list is not enough. Stub intros are allowed
 * only when the rest of the page is deep, so landmark guides stay in.
 */
export function isCityIndexable(
  city: Pick<
    City,
    | "thingsToDo"
    | "overview"
    | "itinerary"
    | "restaurants"
    | "hotels"
    | "stays"
    | "tips"
    | "faqs"
    | "localFoods"
  >,
): boolean {
  const sights = filterRealSights(city.thingsToDo).length;
  const depth = practicalDepth(city);
  if (sights < 4 || depth < 2) return false;
  if (isStubOverview(city.overview) && depth < 4) return false;
  return true;
}

/**
 * Generated country shells share one template sentence and no history or
 * culture. Editorial guides keep history, culture or a real FAQ set.
 */
export function isCountryIndexable(
  country: Pick<Country, "overview" | "history" | "culture" | "faqs" | "featured" | "trending">,
): boolean {
  const history = (country.history ?? "").trim().length;
  const culture = (country.culture ?? "").trim().length;
  const faqs = country.faqs?.length ?? 0;
  const editorial = history >= 80 || culture >= 80 || faqs >= 2;
  if (!editorial && !(country.featured || country.trending)) return false;
  // A template intro is acceptable when history or culture is actually written.
  if (isStubOverview(country.overview) && history < 80 && culture < 80) return false;
  return editorial || !!(country.featured || country.trending);
}
