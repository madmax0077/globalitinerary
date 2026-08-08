/**
 * Add missing top-150 tourism cities to city-targets.json.
 * Also fixes the Costa Rica slug collision so US San Francisco can use san-francisco.
 *
 * Run: node scripts/add-top150-missing-cities.mjs
 * Then: node scripts/generate-cities.mjs
 * Then: node scripts/seed-top150-overlays.mjs
 */
import fs from "node:fs";
import { uniqueTop150 } from "./top150-tourism-cities.mjs";

const targetsPath = new URL("./city-targets.json", import.meta.url);
const countriesGen = fs.readFileSync(new URL("../src/data/countries.generated.ts", import.meta.url), "utf8");
const countriesCur = fs.readFileSync(new URL("../src/data/countries.ts", import.meta.url), "utf8");

function hasCountry(slug) {
  const needle = `"slug": "${slug}"`;
  return countriesGen.includes(needle) || countriesCur.includes(`slug: "${slug}"`);
}

function countryMatch(a, b) {
  const norm = (s) => {
    if (s === "turkey") return "turkiye";
    if (s === "czech-republic") return "czechia";
    return s;
  };
  return norm(a) === norm(b);
}

let targets = JSON.parse(fs.readFileSync(targetsPath, "utf8"));

// 1) Rename Costa Rica collision so US can own san-francisco
const crSf = targets.find((t) => t.slug === "san-francisco" && t.countrySlug === "costa-rica");
if (crSf) {
  crSf.slug = "san-francisco-costa-rica";
  crSf.wikiTitle = "San Francisco, Costa Rica";
  console.log("Renamed Costa Rica San Francisco → san-francisco-costa-rica");
}

function exists(slug, countrySlug) {
  return targets.some((t) => t.slug === slug && countryMatch(t.countrySlug, countrySlug));
}

const list = uniqueTop150().map((c) => ({
  ...c,
  // DB uses czechia, not czech-republic
  countrySlug: c.countrySlug === "czech-republic" ? "czechia" : c.countrySlug,
}));

const toAdd = [];
const skipped = [];

for (const c of list) {
  if (c.countrySlug === "puerto-rico" && !hasCountry("puerto-rico")) {
    skipped.push(`${c.slug} (no country stub for puerto-rico)`);
    continue;
  }
  if (!hasCountry(c.countrySlug) && c.countrySlug !== "hong-kong" && c.countrySlug !== "taiwan" && c.countrySlug !== "macau") {
    // double-check curated territories already covered
    skipped.push(`${c.slug} (missing country ${c.countrySlug})`);
    continue;
  }
  if (exists(c.slug, c.countrySlug)) continue;
  // Prefer alt slug if that exact slug already exists under wrong country
  let slug = c.slug;
  if (targets.some((t) => t.slug === slug && !countryMatch(t.countrySlug, c.countrySlug))) {
    if (c.alts?.[0] && !targets.some((t) => t.slug === c.alts[0])) slug = c.alts[0];
    else slug = `${c.slug}-${c.countryCode.toLowerCase()}`;
  }

  toAdd.push({
    slug,
    name: c.name,
    wikiTitle: c.wikiTitle || c.name,
    countrySlug: c.countrySlug,
    countryName: c.countryName,
    countryCode: c.countryCode,
    population: c.population,
    lat: c.lat,
    lng: c.lng,
    timezone: c.timezone,
    isCapital: !!c.isCapital,
  });
}

// Special: Penang as george-town if penang slug problematic
if (!exists("george-town", "malaysia") && !exists("penang", "malaysia")) {
  const penang = list.find((c) => c.slug === "penang");
  if (penang && !toAdd.some((t) => t.slug === "george-town" || t.slug === "penang")) {
    toAdd.push({
      slug: "george-town",
      name: "George Town",
      wikiTitle: "George Town, Penang",
      countrySlug: "malaysia",
      countryName: "Malaysia",
      countryCode: "MY",
      population: 708127,
      lat: 5.4141,
      lng: 100.3288,
      timezone: "Asia/Kuala_Lumpur",
      isCapital: false,
    });
  }
}

const existingSlugs = new Set(targets.map((t) => t.slug));
const uniqueAdd = toAdd.filter((t) => {
  if (existingSlugs.has(t.slug)) {
    // allow if same country already handled by exists()
    return false;
  }
  existingSlugs.add(t.slug);
  return true;
});

targets = [...targets, ...uniqueAdd].sort((a, b) => a.name.localeCompare(b.name));
fs.writeFileSync(targetsPath, JSON.stringify(targets, null, 2) + "\n");

console.log(`Added ${uniqueAdd.length} cities to city-targets.json`);
for (const t of uniqueAdd) console.log(`  + ${t.slug} (${t.countrySlug})`);
if (skipped.length) {
  console.log(`\nSkipped ${skipped.length}:`);
  for (const s of skipped) console.log(`  - ${s}`);
}
console.log("\nNext: node scripts/generate-cities.mjs && node scripts/seed-top150-overlays.mjs");
