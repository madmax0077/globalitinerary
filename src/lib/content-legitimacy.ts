/** Detect invented/template destination copy so we never show it as facts. */

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
