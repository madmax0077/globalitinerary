/**
 * Continent stock pools — GENERIC scenic only.
 * Never put landmark-specific keys (eiffel, tokyo, bali…) here; those belong
 * only on the matching curated destination pages.
 */

export const GENERIC_POOLS = {
  Europe: ["coast", "mountains", "cityNight", "alps", "beach", "food", "temple"],
  Asia: ["temple", "cityNight", "coast", "mountains", "beach", "food", "lantern"],
  Africa: ["desertCamp", "sahara", "coast", "beach", "mountains", "temple"],
  "North America": ["cityNight", "beach", "mountains", "coast", "food"],
  "South America": ["mountains", "coast", "beach", "temple", "food"],
  Oceania: ["beach", "coast", "mountains", "food", "cityNight"],
};

/** Unsplash keys that depict a specific named place — only use on that place. */
export const PLACE_SPECIFIC_KEYS = new Set([
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

/** Slug → Unsplash keys that are legitimately of that place. */
export const PLACE_ALLOWED_BY_SLUG = {
  paris: ["eiffel", "paris"],
  london: ["london"],
  tokyo: ["tokyo", "tokyoStreet", "fuji", "fujiLake", "kyoto"],
  kyoto: ["kyoto", "fuji", "fujiLake", "tokyo", "temple", "lantern"],
  rome: ["rome", "colosseum"],
  venice: ["venice"],
  santorini: ["santorini", "santoriniDomes", "greeceSea"],
  dubai: ["dubai", "desertCamp", "sahara"],
  bali: ["bali", "temple", "beach", "coast"],
  "new-york-city": ["nyc", "cityNight"],
  nyc: ["nyc", "cityNight"],
  "machu-picchu": ["machuPicchu", "mountains"],
  cusco: ["machuPicchu", "mountains"],
  phuket: ["phiPhi", "longtail", "beach", "coast"],
  "krabi": ["phiPhi", "longtail", "beach"],
  "koh-samui": ["phiPhi", "longtail", "beach"],
  maldives: ["maldives", "beach", "coast"],
  male: ["maldives", "beach"],
  iceland: ["aurora", "icelandFalls", "norway"],
  reykjavik: ["aurora", "icelandFalls", "norway"],
  norway: ["norway", "aurora", "alps"],
  bergen: ["norway", "aurora"],
  athens: ["greeceSea", "santorini"],
  mykonos: ["greeceSea", "santorini", "santoriniDomes"],
  hongkong: ["cityNight", "temple"],
  "hong-kong": ["cityNight", "temple", "coast"],
  singapore: ["cityNight", "temple", "food"],
  bangkok: ["temple", "lantern", "cityNight", "food"],
  "chiang-mai": ["temple", "lantern", "mountains"],
  cairo: ["sahara", "desertCamp", "temple"],
  marrakech: ["sahara", "desertCamp", "temple"],
  sydney: ["beach", "coast", "cityNight"],
  miami: ["beach", "coast", "cityNight"],
  honolulu: ["beach", "coast", "maldives"],
  sharjah: ["dubai", "desertCamp", "cityNight"],
  "abu-dhabi": ["dubai", "desertCamp", "sahara"],
};

export function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function poolFor(slug, continent) {
  const pool = GENERIC_POOLS[continent] || GENERIC_POOLS.Asia;
  const start = hash(slug) % pool.length;
  const chosen = [];
  for (let i = 0; i < 4; i++) chosen.push(pool[(start + i) % pool.length]);
  return { hero: pool[start], gallery: chosen };
}

export function isPlaceSpecific(key) {
  return PLACE_SPECIFIC_KEYS.has(key);
}

export function keyAllowedForSlug(slug, key) {
  if (!PLACE_SPECIFIC_KEYS.has(key)) return true;
  const allowed = PLACE_ALLOWED_BY_SLUG[slug];
  return Boolean(allowed && allowed.includes(key));
}
