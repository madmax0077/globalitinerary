/** Detect invented/template destination copy so we never show it as facts. */

import type { City } from "@/lib/types";

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

/**
 * Whether a city page is strong enough to index in Google.
 * Pages with real visitor listings (sights, eats, stays) should be indexed
 * even when the intro copy is a short honest stub. Empty shells stay out of
 * the sitemap so they cannot dilute rankings.
 */
export function isCityIndexable(
  city: Pick<
    City,
    | "featured"
    | "categories"
    | "thingsToDo"
    | "overview"
    | "tagline"
    | "countryName"
    | "itinerary"
    | "restaurants"
    | "hotels"
    | "stays"
  >,
): boolean {
  if (city.featured) return true;
  if (city.categories && city.categories.length > 0) return true;

  const sights = filterRealSights(city.thingsToDo).length;
  const restaurants = city.restaurants?.length ?? 0;
  const stays = (city.stays?.length ?? 0) || (city.hotels?.length ?? 0);
  const hasItinerary = (city.itinerary?.length ?? 0) > 0;

  // Real places to visit — this is a usable guide even without unique prose.
  if (sights >= 3) return true;
  if (sights >= 2 && (hasItinerary || restaurants >= 2 || stays >= 2)) return true;

  const overview = city.overview ?? "";
  const thinOverview =
    overview.length < 140 ||
    /^Travel guide for /i.test(overview) ||
    isGenericCityOverview(overview);
  if (!thinOverview && (sights >= 1 || restaurants >= 2 || stays >= 2)) return true;

  return false;
}
