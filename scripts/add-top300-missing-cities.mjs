/**
 * Add missing top-300 tourism cities to city-targets.json.
 * Treats entry.alts as matching existing target slugs in the same country (e.g. cologne ↔ koeln).
 *
 * Run: node scripts/add-top300-missing-cities.mjs
 * Then: node scripts/generate-cities.mjs
 */
import fs from "node:fs";
import { uniqueTop300 } from "./top300-tourism-cities.mjs";

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

function haversine(a, b) {
  if (a?.lat == null || b?.lat == null) return Infinity;
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

let targets = JSON.parse(fs.readFileSync(targetsPath, "utf8"));

// Rename Costa Rica collision so US can own san-francisco
const crSf = targets.find((t) => t.slug === "san-francisco" && t.countrySlug === "costa-rica");
if (crSf) {
  crSf.slug = "san-francisco-costa-rica";
  crSf.wikiTitle = "San Francisco, Costa Rica";
  console.log("Renamed Costa Rica San Francisco → san-francisco-costa-rica");
}

function exists(entry) {
  const slugs = new Set([entry.slug, ...(entry.alts || [])]);
  if (targets.some((t) => slugs.has(t.slug) && countryMatch(t.countrySlug, entry.countrySlug))) {
    return true;
  }
  const name = String(entry.name || "").toLowerCase();
  return targets.some((t) => {
    if (!countryMatch(t.countrySlug, entry.countrySlug)) return false;
    if (String(t.name).toLowerCase() !== name) return false;
    if (entry.lat == null || t.lat == null) return true;
    return haversine(t, entry) < 40;
  });
}

const list = uniqueTop300().map((c) => ({
  ...c,
  countrySlug: c.countrySlug === "czech-republic" ? "czechia" : c.countrySlug,
}));

const toAdd = [];
const skipped = [];

for (const c of list) {
  if (c.countrySlug === "puerto-rico" && !hasCountry("puerto-rico")) {
    skipped.push(`${c.slug} (no country stub for puerto-rico)`);
    continue;
  }
  if (c.countrySlug === "aruba" && !hasCountry("aruba")) {
    skipped.push(`${c.slug} (no country stub for aruba)`);
    continue;
  }
  if (!hasCountry(c.countrySlug) && c.countrySlug !== "hong-kong" && c.countrySlug !== "taiwan" && c.countrySlug !== "macau") {
    skipped.push(`${c.slug} (missing country ${c.countrySlug})`);
    continue;
  }
  if (exists(c)) continue;

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

const existingSlugs = new Set(targets.map((t) => t.slug));
const uniqueAdd = toAdd.filter((t) => {
  if (existingSlugs.has(t.slug)) return false;
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
console.log("\nNext: node scripts/generate-cities.mjs");
