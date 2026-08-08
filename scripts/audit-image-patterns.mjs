/**
 * Offline image legitimacy audit (no network).
 * Run: npx tsx scripts/audit-image-patterns.mjs
 */
import fs from "node:fs";
import { cities } from "../src/data/cities.ts";
import { countries } from "../src/data/countries.ts";

const BAD =
  /flag[_ ]?of|\.svg(?:\?|$)|locator|orthographic|coat[_ ]?of[_ ]?arms|\bemblem|insignia|location_map|seal_of|BlankMap|political_map|world_map|Globe_icon|Wappen|Blason|Héraldique|heraldic|File:Flag|Flag_of_|commons\.wikimedia\.org\/wiki\/Special:FilePath\/.*Flag/i;
const WEAK =
  /map_of|Map_of|position_map|topo.?map|demography|population|diagram|chart|logo|stamp|passport|qr.?code|screenshot|wikidata|Commons-logo|Icon_|pictogram|silhouette|_coa\.|_CoA|Escudo|Armoiries|bandeira|bandera|Seal_of|Emblem_of|Badge_of|Crest_of|Arms_of/i;

const bad = [];
const weak = [];
const hosts = new Map();
let emptyHero = 0;
let wikiCount = 0;
let unsplashCount = 0;

function scan(ent, kind) {
  const urls = [ent.heroImage, ent.thumbnail, ...(ent.gallery || [])].filter(Boolean);
  if (!ent.heroImage) emptyHero++;
  for (const u of urls) {
    try {
      const h = new URL(u).hostname;
      hosts.set(h, (hosts.get(h) || 0) + 1);
    } catch {
      bad.push({ kind, slug: ent.slug, reason: "bad-url", u: String(u).slice(0, 160) });
      continue;
    }
    if (u.includes("upload.wikimedia.org")) wikiCount++;
    if (u.includes("images.unsplash.com")) unsplashCount++;
    if (BAD.test(u)) bad.push({ kind, slug: ent.slug, reason: "bad-pattern", u: u.slice(0, 180) });
    else if (WEAK.test(u)) weak.push({ kind, slug: ent.slug, reason: "weak-pattern", u: u.slice(0, 180) });
  }
}

for (const c of cities) scan(c, "city");
for (const c of countries) scan(c, "country");

// Featured city hero samples
const feat = cities.filter((c) => c.featured);
const featReport = feat.map((c) => ({
  slug: c.slug,
  country: c.country,
  heroHost: (() => {
    try {
      return new URL(c.heroImage).hostname;
    } catch {
      return "invalid";
    }
  })(),
  hero: (c.heroImage || "").slice(0, 140),
  galleryN: (c.gallery || []).length,
}));

const report = {
  cities: cities.length,
  countries: countries.length,
  hosts: Object.fromEntries([...hosts.entries()].sort((a, b) => b[1] - a[1])),
  wikiCount,
  unsplashCount,
  emptyHero,
  badCount: bad.length,
  weakCount: weak.length,
  bad: bad.slice(0, 100),
  weak: weak.slice(0, 100),
  featured: featReport,
};

fs.writeFileSync(
  new URL("./audit-image-patterns-report.json", import.meta.url),
  JSON.stringify(report, null, 2),
);

console.log("cities", cities.length, "countries", countries.length);
console.log("hosts", report.hosts);
console.log("wiki", wikiCount, "unsplash", unsplashCount, "emptyHero", emptyHero);
console.log("BAD", bad.length);
for (const x of bad.slice(0, 50)) console.log(" B", x.kind, x.slug, x.u);
console.log("WEAK", weak.length);
for (const x of weak.slice(0, 50)) console.log(" W", x.kind, x.slug, x.u);
console.log("featured", feat.length);
process.exit(bad.length ? 1 : 0);
