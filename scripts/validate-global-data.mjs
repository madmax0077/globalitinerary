/**
 * Multi-pass validation of cities + countries for global data integrity.
 * Run: npx tsx scripts/validate-global-data.mjs
 */
import fs from "node:fs";
import { cities } from "../src/data/cities.ts";
import { countries } from "../src/data/countries.ts";

const issues = [];
const warn = (pass, code, msg, meta = {}) => issues.push({ pass, severity: "warn", code, msg, ...meta });
const err = (pass, code, msg, meta = {}) => issues.push({ pass, severity: "error", code, msg, ...meta });

const countryBySlug = new Map(countries.map((c) => [c.slug, c]));
const cityBySlug = new Map();
for (const c of cities) {
  if (cityBySlug.has(c.slug)) err(1, "DUP_CITY_SLUG", `Duplicate city slug ${c.slug}`, { slug: c.slug });
  cityBySlug.set(c.slug, c);
}

// Rough country bounding boxes (latMin, latMax, lngMin, lngMax) — loose pads for overseas territories
const BOUNDS = {
  "united-states": { lat: [18, 72], lng: [-180, -65] }, // includes Hawaii/Alaska roughly via widen
  hawaii: { lat: [18, 23], lng: [-161, -154] },
  canada: { lat: [41, 84], lng: [-141, -52] },
  mexico: { lat: [14, 33], lng: [-118, -86] },
  brazil: { lat: [-34, 6], lng: [-74, -34] },
  argentina: { lat: [-56, -21], lng: [-74, -53] },
  chile: { lat: [-56, -17], lng: [-76, -66] },
  peru: { lat: [-19, 0], lng: [-82, -68] },
  colombia: { lat: [-5, 13], lng: [-80, -66] },
  ecuador: { lat: [-6, 2], lng: [-92, -75] }, // includes Galapagos
  bolivia: { lat: [-23, -9], lng: [-70, -57] },
  cuba: { lat: [19, 24], lng: [-85, -74] },
  "dominican-republic": { lat: [17, 20], lng: [-72, -68] },
  "united-kingdom": { lat: [49, 61], lng: [-9, 2] },
  ireland: { lat: [51, 56], lng: [-11, -5] },
  france: { lat: [41, 52], lng: [-6, 10] },
  spain: { lat: [27, 44], lng: [-19, 5] }, // Canaries/Balearics
  portugal: { lat: [32, 43], lng: [-32, -6] },
  italy: { lat: [36, 48], lng: [6, 19] },
  germany: { lat: [47, 56], lng: [5, 16] },
  austria: { lat: [46, 50], lng: [9, 18] },
  switzerland: { lat: [45, 48], lng: [5, 11] },
  netherlands: { lat: [50, 54], lng: [3, 8] },
  belgium: { lat: [49, 52], lng: [2, 7] },
  greece: { lat: [34, 42], lng: [19, 30] },
  turkiye: { lat: [35, 43], lng: [25, 45] },
  russia: { lat: [41, 82], lng: [19, 180] },
  china: { lat: [18, 54], lng: [73, 135] },
  japan: { lat: [24, 46], lng: [122, 146] },
  "south-korea": { lat: [33, 39], lng: [124, 132] },
  india: { lat: [6, 36], lng: [68, 98] },
  thailand: { lat: [5, 21], lng: [97, 106] },
  vietnam: { lat: [8, 24], lng: [102, 110] },
  indonesia: { lat: [-11, 6], lng: [95, 141] },
  malaysia: { lat: [0, 8], lng: [99, 120] },
  philippines: { lat: [4, 21], lng: [116, 127] },
  cambodia: { lat: [10, 15], lng: [102, 108] },
  laos: { lat: [13, 23], lng: [100, 108] },
  myanmar: { lat: [9, 29], lng: [92, 102] },
  "sri-lanka": { lat: [5, 10], lng: [79, 82] },
  nepal: { lat: [26, 31], lng: [80, 89] },
  maldives: { lat: [-1, 8], lng: [72, 74] },
  australia: { lat: [-44, -10], lng: [112, 154] },
  "new-zealand": { lat: [-48, -34], lng: [166, 179] },
  fiji: { lat: [-21, -12], lng: [177, 180] },
  egypt: { lat: [22, 32], lng: [24, 37] },
  morocco: { lat: [27, 36], lng: [-14, -1] },
  "south-africa": { lat: [-35, -22], lng: [16, 33] },
  kenya: { lat: [-5, 5], lng: [33, 42] },
  tanzania: { lat: [-12, 0], lng: [29, 41] },
  zimbabwe: { lat: [-23, -15], lng: [25, 34] },
  "saudi-arabia": { lat: [16, 33], lng: [34, 56] },
  "united-arab-emirates": { lat: [22, 27], lng: [51, 57] },
  qatar: { lat: [24, 27], lng: [50, 52] },
  jordan: { lat: [29, 34], lng: [34, 40] },
  israel: { lat: [29, 34], lng: [34, 36] },
  iceland: { lat: [63, 67], lng: [-25, -13] },
  norway: { lat: [57, 72], lng: [4, 32] },
  sweden: { lat: [55, 70], lng: [10, 25] },
  denmark: { lat: [54, 58], lng: [7, 16] },
  finland: { lat: [59, 71], lng: [19, 32] },
  poland: { lat: [49, 55], lng: [14, 25] },
  "czech-republic": { lat: [48, 52], lng: [12, 19] },
  czechia: { lat: [48, 52], lng: [12, 19] },
  hungary: { lat: [45, 49], lng: [16, 23] },
  croatia: { lat: [42, 47], lng: [13, 20] },
  "hong-kong": { lat: [22, 23], lng: [113, 115] },
  taiwan: { lat: [21, 26], lng: [119, 123] },
  macau: { lat: [22, 23], lng: [113, 114] },
  singapore: { lat: [1, 2], lng: [103, 105] },
  "costa-rica": { lat: [7, 12], lng: [-86, -82] },
  uruguay: { lat: [-36, -30], lng: [-59, -53] },
  tunisia: { lat: [30, 38], lng: [7, 12] },
  bulgaria: { lat: [41, 45], lng: [22, 29] },
  romania: { lat: [43, 49], lng: [20, 30] },
  serbia: { lat: [42, 47], lng: [18, 23] },
  slovenia: { lat: [45, 47], lng: [13, 17] },
  slovakia: { lat: [47, 50], lng: [16, 23] },
  estonia: { lat: [57, 60], lng: [21, 29] },
  latvia: { lat: [55, 59], lng: [20, 29] },
  lithuania: { lat: [53, 57], lng: [20, 27] },
  georgia: { lat: [41, 44], lng: [39, 47] },
  armenia: { lat: [38, 42], lng: [43, 47] },
  azerbaijan: { lat: [38, 42], lng: [44, 51] },
  oman: { lat: [16, 27], lng: [51, 60] },
  bahrain: { lat: [25, 27], lng: [50, 51] },
  kuwait: { lat: [28, 31], lng: [46, 49] },
};

const GENERIC_RE =
  /local bistro|(?<!Grand )Central market stalls|Waterfront \/ plaza café|Destination tasting restaurant|Modern design hotel|Boutique historic stay|Main landmark \/ viewpoint|Day-trip highlight nearby|Top sights and local flavour|Check seasonal norms for the region|Main international gateway serving|historic center \/ Old Town|main square and landmark viewpoints|regional museum in |Signature day trip from |Sunset viewpoint overlooking |Scenic park, waterfront or hillside walk in /i;

const GENERIC_TAGLINE_RE = /^(A city in |The capital of |Discover the wonders of )/i;

// Known wrong-country collisions historically
const EXPECTED_COUNTRY = {
  "san-francisco": "united-states",
  "san-francisco-costa-rica": "costa-rica",
  honolulu: "united-states",
  tokyo: "japan",
  kyoto: "japan",
  bali: "indonesia",
  dubai: "united-arab-emirates",
  rome: "italy",
  venice: "italy",
  santorini: "greece",
  prague: "czechia",
  istanbul: "turkiye",
  antalya: "turkiye",
  cappadocia: "turkiye",
  bodrum: "turkiye",
  "new-york-city": "united-states",
  "washington-dc": "united-states",
  penang: "malaysia",
  "george-town": "malaysia",
  fiji: "fiji",
  galapagos: "ecuador",
  iguazu: "brazil",
  palawan: "philippines",
  crete: "greece",
};

console.log("=== PASS 1: Structure ===");
for (const c of countries) {
  if (!c.slug || !c.name || !c.id) err(1, "COUNTRY_INCOMPLETE", `Country missing core fields`, { slug: c.slug });
  if (!c.continent) warn(1, "COUNTRY_NO_CONTINENT", `No continent`, { slug: c.slug });
  if (c.coordinates) {
    const { lat, lng } = c.coordinates;
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) err(1, "COUNTRY_BAD_COORDS", `Invalid country coords`, { slug: c.slug, lat, lng });
  }
  for (const cs of c.topCitySlugs || []) {
    if (!cityBySlug.has(cs)) warn(1, "TOP_CITY_MISSING", `topCitySlug missing: ${cs}`, { slug: c.slug, city: cs });
  }
}

for (const c of cities) {
  if (!c.slug || !c.name || !c.countrySlug) err(1, "CITY_INCOMPLETE", `City missing core fields`, { slug: c.slug });
  if (!countryBySlug.has(c.countrySlug)) err(1, "CITY_ORPHAN_COUNTRY", `City countrySlug not found: ${c.countrySlug}`, { slug: c.slug, countrySlug: c.countrySlug });
  if (!c.coordinates || typeof c.coordinates.lat !== "number" || typeof c.coordinates.lng !== "number") {
    err(1, "CITY_NO_COORDS", `Missing coordinates`, { slug: c.slug });
  } else {
    const { lat, lng } = c.coordinates;
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180 || (lat === 0 && lng === 0)) {
      err(1, "CITY_BAD_COORDS", `Invalid coordinates`, { slug: c.slug, lat, lng });
    }
  }
  if (EXPECTED_COUNTRY[c.slug] && c.countrySlug !== EXPECTED_COUNTRY[c.slug]) {
    err(1, "CITY_WRONG_COUNTRY", `Expected ${EXPECTED_COUNTRY[c.slug]}, got ${c.countrySlug}`, { slug: c.slug });
  }
}

console.log("=== PASS 2: Content quality ===");
for (const c of cities) {
  if (!c.overview || c.overview.length < 60) warn(2, "THIN_OVERVIEW", `Thin overview (${c.overview?.length || 0})`, { slug: c.slug });
  if (!c.thingsToDo || c.thingsToDo.length < 3) warn(2, "FEW_SIGHTS", `Few sights (${c.thingsToDo?.length || 0})`, { slug: c.slug });
  if (!c.heroImage) warn(2, "NO_HERO", `No hero image`, { slug: c.slug });
  if (!c.restaurants || c.restaurants.length < 1) warn(2, "NO_RESTAURANTS", `No restaurants`, { slug: c.slug });
  if (!c.stays || c.stays.length < 1) warn(2, "NO_STAYS", `No stays`, { slug: c.slug });

  const blob = [
    c.tagline,
    c.overview,
    ...(c.thingsToDo || []),
    ...(c.restaurants || []).map((r) => `${r.name} ${r.note}`),
    ...(c.stays || []).map((s) => `${s.name} ${s.note}`),
  ].join(" | ");

  if (GENERIC_RE.test(blob)) {
    err(2, "GENERIC_CONTENT", `Generic placeholder content`, { slug: c.slug, countrySlug: c.countrySlug });
  }
  if (c.tagline && GENERIC_TAGLINE_RE.test(c.tagline.trim())) {
    // After honesty pass taglines should be country name or curated — flag leftover generics
    if (/^(A city in |The capital of |Discover the wonders of )/i.test(c.tagline.trim())) {
      err(2, "GENERIC_TAGLINE", `Generic tagline still present`, { slug: c.slug, tagline: c.tagline });
    }
  }

  // Name vs country sanity: city name shouldn't equal wrong famous capital of another country
  const famous = {
    paris: "france",
    london: "united-kingdom",
    tokyo: "japan",
    rome: "italy",
    dubai: "united-arab-emirates",
    bangkok: "thailand",
    cairo: "egypt",
    moscow: "russia",
    beijing: "china",
    sydney: "australia",
  };
  if (famous[c.slug] && c.countrySlug !== famous[c.slug]) {
    err(2, "FAMOUS_CITY_WRONG_COUNTRY", `${c.slug} should be in ${famous[c.slug]}`, { slug: c.slug, countrySlug: c.countrySlug });
  }
}

console.log("=== PASS 3: Geo bounds + consistency ===");
for (const c of cities) {
  if (!c.coordinates) continue;
  const { lat, lng } = c.coordinates;
  // Special cases
  if (c.slug === "honolulu" || c.timezone === "Pacific/Honolulu") {
    if (lat < 18 || lat > 23 || lng > -154 || lng < -161) err(3, "GEO_HAWAII", `Honolulu-like coords wrong`, { slug: c.slug, lat, lng });
    continue;
  }
  if (c.slug === "galapagos") {
    if (lat < -2 || lat > 1 || lng > -88 || lng < -93) err(3, "GEO_GALAPAGOS", `Galapagos coords wrong`, { slug: c.slug, lat, lng });
    continue;
  }
  if (c.countrySlug === "united-states") {
    // continental + alaska + hawaii handled loosely
    const ok =
      (lat >= 24 && lat <= 50 && lng >= -125 && lng <= -66) || // contiguous
      (lat >= 51 && lat <= 72 && lng >= -180 && lng <= -130) || // alaska
      (lat >= 18 && lat <= 23 && lng >= -161 && lng <= -154); // hawaii
    if (!ok) err(3, "GEO_US", `US city outside expected bounds`, { slug: c.slug, lat, lng });
    continue;
  }
  if (c.countrySlug === "fiji") {
    // Fiji straddles dateline; allow both
    const ok = lat >= -21 && lat <= -12 && ((lng >= 177 && lng <= 180) || (lng >= -180 && lng <= -178));
    if (!ok) warn(3, "GEO_FIJI", `Fiji coords unusual`, { slug: c.slug, lat, lng });
    continue;
  }
  const b = BOUNDS[c.countrySlug];
  if (!b) continue;
  if (lat < b.lat[0] || lat > b.lat[1] || lng < b.lng[0] || lng > b.lng[1]) {
    err(3, "GEO_OUT_OF_BOUNDS", `Coords outside ${c.countrySlug} bounds`, { slug: c.slug, lat, lng, countrySlug: c.countrySlug });
  }
}

// Same-name different-country soft check for tourist hubs
const byName = new Map();
for (const c of cities) {
  const k = c.name.toLowerCase();
  if (!byName.has(k)) byName.set(k, []);
  byName.get(k).push(c);
}
for (const [name, list] of byName) {
  if (list.length < 2) continue;
  const countriesSet = new Set(list.map((c) => c.countrySlug));
  if (countriesSet.size > 1 && list.some((c) => EXPECTED_COUNTRY[c.slug])) {
    warn(3, "NAME_COLLISION", `Name "${name}" in multiple countries: ${[...countriesSet].join(", ")}`, {
      slugs: list.map((c) => `${c.slug}@${c.countrySlug}`),
    });
  }
}

// Pass loop summary
const errors = issues.filter((i) => i.severity === "error");
const warnings = issues.filter((i) => i.severity === "warn");
console.log("\n=== SUMMARY ===");
console.log("cities", cities.length, "countries", countries.length);
console.log("errors", errors.length, "warnings", warnings.length);

const byCode = new Map();
for (const i of errors) byCode.set(i.code, (byCode.get(i.code) || 0) + 1);
console.log("\nError codes:");
for (const [k, v] of [...byCode.entries()].sort((a, b) => b[1] - a[1])) console.log(`  ${k}: ${v}`);

console.log("\n--- ERRORS (first 80) ---");
for (const i of errors.slice(0, 80)) {
  console.log(`[P${i.pass}/${i.code}] ${i.msg}${i.slug ? ` :: ${i.slug}` : ""}`);
}

fs.writeFileSync(
  new URL("./validate-global-report.json", import.meta.url),
  JSON.stringify({ cities: cities.length, countries: countries.length, errors, warnings }, null, 2),
);
console.log("\nWrote scripts/validate-global-report.json");
process.exit(errors.length ? 1 : 0);
