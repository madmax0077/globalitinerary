/**
 * Audit wrong-place Unsplash stock on live city/country pages.
 * Run: npx tsx scripts/audit-place-images.mjs
 */
import fs from "node:fs";
import { cities } from "../src/data/cities.ts";
import { countries } from "../src/data/countries.ts";
import { PHOTOS } from "../src/lib/images.ts";
import { PLACE_SPECIFIC_KEYS, PLACE_ALLOWED_BY_SLUG } from "../scripts/lib/stock-pools.mjs";

function keyFromUrl(url) {
  if (!url || !url.includes("images.unsplash.com")) return null;
  const m = url.match(/photo-(\d{10,13}-[a-f0-9]+)/i);
  if (!m) return null;
  const id = m[1];
  for (const [key, photoId] of Object.entries(PHOTOS)) {
    if (photoId === id) return key;
  }
  return null;
}

function isWrong(slug, key, countrySlug) {
  if (!key || !PLACE_SPECIFIC_KEYS.has(key)) return false;
  const allowed = PLACE_ALLOWED_BY_SLUG[slug];
  if (allowed && allowed.includes(key)) return false;
  // country-level: allow if key's home country matches
  const home = {
    eiffel: "france", paris: "france", colosseum: "italy", rome: "italy", venice: "italy",
    santorini: "greece", santoriniDomes: "greece", greeceSea: "greece", norway: "norway",
    london: "united-kingdom", tokyo: "japan", tokyoStreet: "japan", kyoto: "japan",
    fuji: "japan", fujiLake: "japan", dubai: "united-arab-emirates", bali: "indonesia",
    phiPhi: "thailand", longtail: "thailand", machuPicchu: "peru", nyc: "united-states",
    icelandFalls: "iceland", aurora: "iceland", maldives: "maldives",
  };
  if (home[key] && (slug === home[key] || countrySlug === home[key])) return false;
  return true;
}

const cityWrong = [];
const countryWrong = [];
let wikiHeroes = 0;
let stockHeroes = 0;

for (const c of cities) {
  if (c.heroImage?.includes("upload.wikimedia.org")) wikiHeroes++;
  else stockHeroes++;
  for (const [role, url] of [["hero", c.heroImage], ["thumb", c.thumbnail], ...c.gallery.map((u, i) => [`g${i}`, u])]) {
    const key = keyFromUrl(url);
    if (key && isWrong(c.slug, key, c.countrySlug)) {
      cityWrong.push({ slug: c.slug, country: c.countrySlug, role, key, url: url.slice(0, 90) });
    }
  }
}

for (const c of countries) {
  for (const [role, url] of [["hero", c.heroImage], ["thumb", c.thumbnail], ...c.gallery.map((u, i) => [`g${i}`, u])]) {
    const key = keyFromUrl(url);
    if (key && isWrong(c.slug, key, c.slug)) {
      countryWrong.push({ slug: c.slug, role, key, url: url.slice(0, 90) });
    }
  }
}

const report = {
  cities: cities.length,
  countries: countries.length,
  wikiHeroes,
  stockHeroes,
  cityWrongCount: cityWrong.length,
  countryWrongCount: countryWrong.length,
  cityWrong: cityWrong.slice(0, 80),
  countryWrong: countryWrong.slice(0, 40),
};

fs.writeFileSync(new URL("./audit-place-images-report.json", import.meta.url), JSON.stringify(report, null, 2));
console.log("cities", cities.length, "wiki heroes", wikiHeroes, "stock heroes", stockHeroes);
console.log("WRONG place unsplash — cities", cityWrong.length, "countries", countryWrong.length);
for (const w of cityWrong.slice(0, 25)) console.log(" C", w.slug, w.role, w.key);
for (const w of countryWrong.slice(0, 15)) console.log(" N", w.slug, w.role, w.key);
process.exit(cityWrong.length + countryWrong.length > 0 ? 1 : 0);
