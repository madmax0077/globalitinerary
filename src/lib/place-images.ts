import { PHOTOS, unsplash } from "@/lib/images";

/** Unsplash keys that depict a specific named place. */
export const PLACE_SPECIFIC_KEYS = new Set<keyof typeof PHOTOS>([
  "fuji",
  "fujiLake",
  "tokyo",
  "tokyoStreet",
  "eiffel",
  "paris",
  "colosseum",
  "rome",
  "venice",
  "santorini",
  "santoriniDomes",
  "dubai",
  "machuPicchu",
  "aurora",
  "icelandFalls",
  "bali",
  "maldives",
  "nyc",
  "london",
  "phiPhi",
  "longtail",
  "greeceSea",
  "norway",
  "kyoto",
]);

const PLACE_ALLOWED_BY_SLUG: Record<string, Array<keyof typeof PHOTOS>> = {
  paris: ["eiffel", "paris"],
  london: ["london"],
  tokyo: ["tokyo", "tokyoStreet", "fuji", "fujiLake", "kyoto"],
  kyoto: ["kyoto", "fuji", "fujiLake", "tokyo"],
  rome: ["rome", "colosseum"],
  venice: ["venice"],
  santorini: ["santorini", "santoriniDomes", "greeceSea"],
  dubai: ["dubai"],
  bali: ["bali"],
  "new-york-city": ["nyc"],
  phuket: ["phiPhi", "longtail"],
  krabi: ["phiPhi", "longtail"],
  "koh-samui": ["phiPhi", "longtail"],
  maldives: ["maldives"],
  reykjavik: ["aurora", "icelandFalls", "norway"],
  athens: ["greeceSea", "santorini"],
  mykonos: ["greeceSea", "santorini", "santoriniDomes"],
  "hong-kong": [],
  singapore: [],
  bangkok: [],
  cairo: [],
  sydney: [],
  miami: [],
  sharjah: ["dubai"],
  "abu-dhabi": ["dubai"],
};

const GENERIC_BY_CONTINENT: Record<string, Array<keyof typeof PHOTOS>> = {
  Europe: ["coast", "mountains", "cityNight", "alps", "beach", "food", "temple"],
  Asia: ["temple", "cityNight", "coast", "mountains", "beach", "food", "lantern"],
  Africa: ["desertCamp", "sahara", "coast", "beach", "mountains", "temple"],
  "North America": ["cityNight", "beach", "mountains", "coast", "food"],
  "South America": ["mountains", "coast", "beach", "temple", "food"],
  Oceania: ["beach", "coast", "mountains", "food", "cityNight"],
};

function keyFromUnsplashUrl(url: string): keyof typeof PHOTOS | null {
  const m = url.match(/photo-(\d{10,13}-[a-f0-9]+)/i);
  if (!m) return null;
  const id = m[1];
  const matches = (Object.entries(PHOTOS) as Array<[keyof typeof PHOTOS, string]>)
    .filter(([, photoId]) => photoId === id)
    .map(([key]) => key);
  if (matches.length === 0) return null;
  // Prefer generic keys when IDs collide (legacy fujiLake/lantern shared IDs)
  const generic = matches.find((k) => !PLACE_SPECIFIC_KEYS.has(k));
  return generic ?? matches[0];
}

function allowedKey(slug: string, key: keyof typeof PHOTOS): boolean {
  if (!PLACE_SPECIFIC_KEYS.has(key)) return true;
  const allowed = PLACE_ALLOWED_BY_SLUG[slug];
  return Boolean(allowed && allowed.includes(key));
}

function genericKey(slug: string, continentHint?: string): keyof typeof PHOTOS {
  const pool = GENERIC_BY_CONTINENT[continentHint || "Asia"] || GENERIC_BY_CONTINENT.Asia;
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return pool[Math.abs(h) % pool.length];
}

/** Replace wrong-place Unsplash stock URLs with generic scenic alternatives. */
export function sanitizeCityImages<T extends { slug: string; heroImage: string; thumbnail: string; gallery: string[] }>(
  city: T,
  continentHint?: string,
): T {
  const fix = (url: string): string => {
    if (!url || !url.includes("images.unsplash.com")) return url;
    const key = keyFromUnsplashUrl(url);
    if (!key || allowedKey(city.slug, key)) return url;
    const w = url.includes("w=2400") ? 2400 : url.includes("w=900") ? 900 : 1400;
    return unsplash(PHOTOS[genericKey(city.slug, continentHint)], w);
  };

  return {
    ...city,
    heroImage: fix(city.heroImage),
    thumbnail: fix(city.thumbnail),
    gallery: (city.gallery || []).map(fix),
  };
}
