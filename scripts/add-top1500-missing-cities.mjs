/**
 * Add missing top-1500 tourism cities to city-targets.json, then:
 *   node scripts/generate-cities.mjs
 *   $env:NODE_TLS_REJECT_UNAUTHORIZED=0; node scripts/fetch-top1500-city-images.mjs
 */
import fs from "node:fs";
import { uniqueTop1500 } from "./top1500-tourism-cities.mjs";

const targetsPath = new URL("./city-targets.json", import.meta.url);
const countriesGen = fs.readFileSync(new URL("../src/data/countries.generated.ts", import.meta.url), "utf8");
const countriesCur = fs.readFileSync(new URL("../src/data/countries.ts", import.meta.url), "utf8");

function hasCountry(slug) {
  return countriesGen.includes(`"slug": "${slug}"`) || countriesCur.includes(`slug: "${slug}"`);
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

function exists(entry) {
  const slugs = new Set([entry.slug, ...(entry.alts || [])]);
  return targets.some((t) => slugs.has(t.slug) && countryMatch(t.countrySlug, entry.countrySlug));
}

const ALLOW_WITHOUT_COUNTRY = new Set([
  "hong-kong", "taiwan", "macau", "puerto-rico", "aruba", "curacao", "guam",
  "reunion", "martinique", "guadeloupe", "french-polynesia", "new-caledonia",
  "cayman-islands", "us-virgin-islands", "british-virgin-islands", "cayman",
  "jersey", "isle-of-man", "faroe-islands", "greenland", "bermuda", "sint-maarten",
  "northern-mariana-islands", "cook-islands", "palau", "vanuatu", "samoa", "tonga",
  "mauritius", "seychelles", "maldives", "fiji",
]);

const list = uniqueTop1500().map((c) => ({
  ...c,
  countrySlug: c.countrySlug === "czech-republic" ? "czechia" : c.countrySlug,
}));

const toAdd = [];
const skipped = [];

for (const c of list) {
  if (!hasCountry(c.countrySlug) && !ALLOW_WITHOUT_COUNTRY.has(c.countrySlug)) {
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

console.log(`Added ${uniqueAdd.length} cities to city-targets.json (now ${targets.length})`);
for (const t of uniqueAdd) console.log(`  + ${t.slug} (${t.countrySlug})`);
if (skipped.length) {
  console.log(`\nSkipped ${skipped.length}:`);
  for (const s of skipped.slice(0, 40)) console.log(`  - ${s}`);
  if (skipped.length > 40) console.log(`  ... +${skipped.length - 40} more`);
}
console.log("\nNext: node scripts/generate-cities.mjs");
