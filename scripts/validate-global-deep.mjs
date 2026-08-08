/**
 * Deep validation pass — catch wrong-country / wrong-geo / inconsistent metadata.
 * Run: npx tsx scripts/validate-global-deep.mjs
 */
import fs from "node:fs";
import { cities } from "../src/data/cities.ts";
import { countries } from "../src/data/countries.ts";

const targets = JSON.parse(fs.readFileSync(new URL("./city-targets.json", import.meta.url), "utf8"));
const targetBySlug = new Map(targets.map((t) => [t.slug, t]));
const countryBySlug = new Map(countries.map((c) => [c.slug, c]));

const errors = [];
const warnings = [];
const e = (code, msg, meta = {}) => errors.push({ code, msg, ...meta });
const w = (code, msg, meta = {}) => warnings.push({ code, msg, ...meta });

// ISO2 -> expected countrySlug(s)
const ISO_TO_SLUG = new Map();
for (const c of countries) {
  if (c.id) ISO_TO_SLUG.set(c.id.toUpperCase(), c.slug);
}

// Timezone prefix -> plausible country slugs
const TZ_COUNTRY = {
  "America/New_York": ["united-states", "canada"],
  "America/Chicago": ["united-states"],
  "America/Denver": ["united-states"],
  "America/Los_Angeles": ["united-states"],
  "America/Anchorage": ["united-states"],
  "Pacific/Honolulu": ["united-states"],
  "America/Toronto": ["canada"],
  "America/Vancouver": ["canada"],
  "America/Edmonton": ["canada"],
  "America/Mexico_City": ["mexico"],
  "America/Cancun": ["mexico"],
  "America/Sao_Paulo": ["brazil"],
  "America/Argentina/Buenos_Aires": ["argentina"],
  "America/Santiago": ["chile"],
  "America/Lima": ["peru"],
  "America/Bogota": ["colombia"],
  "America/Guayaquil": ["ecuador"],
  "Pacific/Galapagos": ["ecuador"],
  "America/La_Paz": ["bolivia"],
  "America/Havana": ["cuba"],
  "America/Santo_Domingo": ["dominican-republic"],
  "America/Montevideo": ["uruguay"],
  "America/Costa_Rica": ["costa-rica"],
  "Europe/London": ["united-kingdom", "ireland"],
  "Europe/Dublin": ["ireland"],
  "Europe/Paris": ["france"],
  "Europe/Madrid": ["spain"],
  "Europe/Lisbon": ["portugal"],
  "Europe/Rome": ["italy"],
  "Europe/Berlin": ["germany"],
  "Europe/Vienna": ["austria"],
  "Europe/Zurich": ["switzerland"],
  "Europe/Amsterdam": ["netherlands"],
  "Europe/Brussels": ["belgium"],
  "Europe/Athens": ["greece"],
  "Europe/Istanbul": ["turkiye"],
  "Europe/Moscow": ["russia"],
  "Europe/Prague": ["czechia", "czech-republic"],
  "Europe/Budapest": ["hungary"],
  "Europe/Warsaw": ["poland"],
  "Europe/Stockholm": ["sweden"],
  "Europe/Copenhagen": ["denmark"],
  "Europe/Helsinki": ["finland"],
  "Europe/Oslo": ["norway"],
  "Atlantic/Reykjavik": ["iceland"],
  "Europe/Zagreb": ["croatia"],
  "Asia/Tokyo": ["japan"],
  "Asia/Seoul": ["south-korea"],
  "Asia/Shanghai": ["china"],
  "Asia/Hong_Kong": ["hong-kong"],
  "Asia/Taipei": ["taiwan"],
  "Asia/Macau": ["macau"],
  "Asia/Singapore": ["singapore"],
  "Asia/Bangkok": ["thailand", "cambodia", "laos"],
  "Asia/Ho_Chi_Minh": ["vietnam"],
  // legacy wrong TZ sometimes still present in old data
  "Asia/Tbilisi": ["georgia"],
  "Asia/Jakarta": ["indonesia"],
  "Asia/Makassar": ["indonesia"],
  "Asia/Kuala_Lumpur": ["malaysia"],
  "Asia/Manila": ["philippines"],
  "Asia/Phnom_Penh": ["cambodia"],
  "Asia/Yangon": ["myanmar"],
  "Asia/Kolkata": ["india"],
  "Asia/Kathmandu": ["nepal"],
  "Asia/Colombo": ["sri-lanka"],
  "Indian/Maldives": ["maldives"],
  "Asia/Dubai": ["united-arab-emirates"],
  "Asia/Qatar": ["qatar"],
  "Asia/Riyadh": ["saudi-arabia"],
  "Asia/Jerusalem": ["israel"],
  "Asia/Amman": ["jordan"],
  "Asia/Muscat": ["oman"],
  "Asia/Bahrain": ["bahrain"],
  "Asia/Kuwait": ["kuwait"],
  "Asia/Tbilisi": ["georgia"],
  "Asia/Yerevan": ["armenia"],
  "Asia/Baku": ["azerbaijan"],
  "Australia/Sydney": ["australia"],
  "Australia/Melbourne": ["australia"],
  "Australia/Brisbane": ["australia"],
  "Australia/Perth": ["australia"],
  "Australia/Hobart": ["australia"],
  "Pacific/Auckland": ["new-zealand"],
  "Pacific/Fiji": ["fiji"],
  "Africa/Cairo": ["egypt"],
  "Africa/Casablanca": ["morocco"],
  "Africa/Johannesburg": ["south-africa"],
  "Africa/Nairobi": ["kenya"],
  "Africa/Dar_es_Salaam": ["tanzania"],
  "Africa/Harare": ["zimbabwe"],
  "Africa/Tunis": ["tunisia"],
};

// Ground-truth coords for critical tourist cities (approx)
const TRUTH = {
  "san-francisco": { country: "united-states", lat: 37.77, lng: -122.42, tol: 1 },
  honolulu: { country: "united-states", lat: 21.31, lng: -157.86, tol: 1 },
  tokyo: { country: "japan", lat: 35.68, lng: 139.69, tol: 1 },
  paris: { country: "france", lat: 48.86, lng: 2.35, tol: 1 },
  london: { country: "united-kingdom", lat: 51.51, lng: -0.13, tol: 1 },
  dubai: { country: "united-arab-emirates", lat: 25.2, lng: 55.27, tol: 1 },
  "new-york-city": { country: "united-states", lat: 40.71, lng: -74.0, tol: 1 },
  rome: { country: "italy", lat: 41.9, lng: 12.5, tol: 1 },
  bali: { country: "indonesia", lat: -8.4, lng: 115.19, tol: 2 },
  bangkok: { country: "thailand", lat: 13.76, lng: 100.5, tol: 1 },
  singapore: { country: "singapore", lat: 1.35, lng: 103.82, tol: 1 },
  sydney: { country: "australia", lat: -33.87, lng: 151.21, tol: 1 },
  "hong-kong": { country: "hong-kong", lat: 22.32, lng: 114.17, tol: 1 },
  istanbul: { country: "turkiye", lat: 41.01, lng: 28.98, tol: 1 },
  cairo: { country: "egypt", lat: 30.04, lng: 31.24, tol: 1 },
  "rio-de-janeiro": { country: "brazil", lat: -22.91, lng: -43.17, tol: 1 },
  "cape-town": { country: "south-africa", lat: -33.92, lng: 18.42, tol: 1 },
  "mexico-city": { country: "mexico", lat: 19.43, lng: -99.13, tol: 1 },
  moscow: { country: "russia", lat: 55.76, lng: 37.62, tol: 1 },
  beijing: { country: "china", lat: 39.9, lng: 116.4, tol: 1 },
  "hoi-an": { country: "vietnam", lat: 15.88, lng: 108.34, tol: 1 },
  jaipur: { country: "india", lat: 26.91, lng: 75.79, tol: 1 },
  agra: { country: "india", lat: 27.18, lng: 78.01, tol: 1 },
  luxor: { country: "egypt", lat: 25.69, lng: 32.64, tol: 1 },
  cappadocia: { country: "turkiye", lat: 38.64, lng: 34.83, tol: 1.5 },
  banff: { country: "canada", lat: 51.18, lng: -115.57, tol: 1 },
  tulum: { country: "mexico", lat: 20.21, lng: -87.47, tol: 1 },
  "xi-an": { country: "china", lat: 34.34, lng: 108.94, tol: 1 },
  mecca: { country: "saudi-arabia", lat: 21.39, lng: 39.86, tol: 1 },
  medina: { country: "saudi-arabia", lat: 24.47, lng: 39.61, tol: 1 },
  galapagos: { country: "ecuador", lat: -0.74, lng: -90.31, tol: 2 },
  "victoria-falls": { country: "zimbabwe", lat: -17.92, lng: 25.86, tol: 1 },
  "san-francisco-costa-rica": { country: "costa-rica", lat: 9.99, lng: -84.13, tol: 1, skipContent: true },
};

console.log("Deep pass A: targets vs runtime cities");
for (const c of cities) {
  const t = targetBySlug.get(c.slug);
  if (!t) continue; // curated may not be in targets
  if (t.countrySlug !== c.countrySlug) {
    e("TARGET_COUNTRY_MISMATCH", `targets ${t.countrySlug} vs city ${c.countrySlug}`, { slug: c.slug });
  }
  if (t.countryName && c.countryName && t.countryName !== c.countryName) {
    // allow Czechia/Czech Republic style differences later
    if (t.countryName.replace(/\s/g, "").toLowerCase() !== c.countryName.replace(/\s/g, "").toLowerCase()) {
      w("COUNTRY_NAME_MISMATCH", `${t.countryName} vs ${c.countryName}`, { slug: c.slug });
    }
  }
  if (Math.abs(t.lat - c.coordinates.lat) > 0.5 || Math.abs(t.lng - c.coordinates.lng) > 0.5) {
    e("COORDS_DRIFT", `coords drifted from targets`, {
      slug: c.slug,
      target: [t.lat, t.lng],
      city: [c.coordinates.lat, c.coordinates.lng],
    });
  }
  const expectedSlug = ISO_TO_SLUG.get((t.countryCode || "").toUpperCase());
  if (expectedSlug && expectedSlug !== t.countrySlug) {
    // territories / naming: turkiye, czechia, hong-kong etc.
    const aliases = {
      CZ: ["czechia", "czech-republic"],
      TR: ["turkiye", "turkey"],
      US: ["united-states"],
      GB: ["united-kingdom"],
      KR: ["south-korea"],
      AE: ["united-arab-emirates"],
      HK: ["hong-kong"],
      TW: ["taiwan"],
      MO: ["macau"],
    };
    const ok = (aliases[t.countryCode] || [expectedSlug]).includes(t.countrySlug);
    if (!ok) e("ISO_SLUG_MISMATCH", `countryCode ${t.countryCode} => expected ~${expectedSlug}, got ${t.countrySlug}`, { slug: c.slug });
  }
}

console.log("Deep pass B: timezone vs country");
for (const c of cities) {
  const t = targetBySlug.get(c.slug);
  const tz = t?.timezone;
  if (!tz) continue;
  const allowed = TZ_COUNTRY[tz];
  if (!allowed) continue;
  if (!allowed.includes(c.countrySlug)) {
    e("TZ_COUNTRY_MISMATCH", `timezone ${tz} not expected for ${c.countrySlug}`, { slug: c.slug, tz, countrySlug: c.countrySlug });
  }
}

console.log("Deep pass C: ground-truth tourist hubs");
for (const [slug, truth] of Object.entries(TRUTH)) {
  const c = cities.find((x) => x.slug === slug);
  if (!c) {
    e("TRUTH_MISSING", `Critical city missing`, { slug });
    continue;
  }
  if (c.countrySlug !== truth.country) e("TRUTH_COUNTRY", `want ${truth.country}`, { slug, got: c.countrySlug });
  const dlat = Math.abs(c.coordinates.lat - truth.lat);
  const dlng = Math.abs(c.coordinates.lng - truth.lng);
  if (dlat > truth.tol || dlng > truth.tol) {
    e("TRUTH_COORDS", `coords off by ${dlat.toFixed(2)},${dlng.toFixed(2)}`, { slug, lat: c.coordinates.lat, lng: c.coordinates.lng });
  }
  if (!truth.skipContent) {
    if (!c.overview || c.overview.length < 80) e("TRUTH_THIN", `critical city thin overview`, { slug });
    if (!c.thingsToDo || c.thingsToDo.length < 5) e("TRUTH_FEW_SIGHTS", `critical city few sights`, { slug });
  }
}

console.log("Deep pass D: country topCitySlugs + capital refs");
for (const country of countries) {
  for (const cs of country.topCitySlugs || []) {
    if (!cities.some((c) => c.slug === cs)) e("BROKEN_TOP_CITY", `missing city ${cs}`, { country: country.slug, city: cs });
    else {
      const city = cities.find((c) => c.slug === cs);
      if (city.countrySlug !== country.slug) {
        e("TOP_CITY_WRONG_COUNTRY", `${cs} is in ${city.countrySlug}, listed under ${country.slug}`, {
          country: country.slug,
          city: cs,
        });
      }
    }
  }
}

console.log("Deep pass E: suspicious name/country pairs");
const suspicious = [
  [/paris/i, "france"],
  [/tokyo/i, "japan"],
  [/london/i, "united-kingdom"],
  [/dubai/i, "united-arab-emirates"],
  [/bangkok/i, "thailand"],
];
for (const c of cities) {
  for (const [re, country] of suspicious) {
    if (re.test(c.slug) && c.countrySlug !== country && !c.slug.includes("costa")) {
      // allow paris-texas style only if not exact
      if (c.slug === country || c.name.split(" ")[0].toLowerCase() === c.slug) {
        w("SUSPICIOUS_NAME", `${c.slug} in ${c.countrySlug}`, { slug: c.slug });
      }
    }
  }
}

// Featured cities must be solid
console.log("Deep pass F: featured cities quality");
for (const c of cities.filter((x) => x.featured)) {
  if (!c.restaurants || c.restaurants.length < 2) e("FEATURED_WEAK_FOOD", `featured city weak restaurants`, { slug: c.slug });
  if (!c.stays || c.stays.length < 2) e("FEATURED_WEAK_STAYS", `featured city weak stays`, { slug: c.slug });
  if (!c.thingsToDo || c.thingsToDo.length < 5) e("FEATURED_WEAK_SIGHTS", `featured city weak sights`, { slug: c.slug });
  if (/local bistro|Top sights and local flavour|Central market stalls/i.test(JSON.stringify(c))) {
    e("FEATURED_GENERIC", `featured city has generic content`, { slug: c.slug });
  }
}

console.log("\n=== DEEP SUMMARY ===");
console.log("errors", errors.length, "warnings", warnings.length);
const by = new Map();
for (const i of errors) by.set(i.code, (by.get(i.code) || 0) + 1);
for (const [k, v] of [...by.entries()].sort((a, b) => b[1] - a[1])) console.log(`  ${k}: ${v}`);
console.log("\n--- ERROR DETAIL ---");
for (const i of errors.slice(0, 100)) {
  console.log(`[${i.code}] ${i.msg}${i.slug ? " :: " + i.slug : ""}${i.country ? " :: " + i.country : ""}${i.city ? " / " + i.city : ""}`);
}

fs.writeFileSync(
  new URL("./validate-global-deep-report.json", import.meta.url),
  JSON.stringify({ errors, warnings }, null, 2),
);
process.exit(errors.length ? 1 : 0);
