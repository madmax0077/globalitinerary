/**
 * Dry-run: how many top3000 candidates are actually missing from city-targets.
 */
import fs from "node:fs";
import { uniqueTop2500 } from "./top2500-tourism-cities.mjs";

const targets = JSON.parse(fs.readFileSync(new URL("./city-targets.json", import.meta.url), "utf8"));
const redirects = fs.readFileSync(new URL("../src/data/city-slug-redirects.ts", import.meta.url), "utf8");
const redirectSlugs = new Set(
  [...redirects.matchAll(/"([^"]+)":\s*"[^"]+"/g)].map((m) => m[1]),
);

function countryMatch(a, b) {
  const norm = (s) => (s === "turkey" ? "turkiye" : s === "czech-republic" ? "czechia" : s);
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

const slugs = new Set(targets.map((t) => t.slug));
const top2500 = uniqueTop2500();
for (const c of top2500) slugs.add(c.slug);

const DROP = new Set([
  "railay", "khao-sok", "khao-sok-town", "stone-town", "zanzibar-stone-town",
  "vanga-vieng", "vangvieng", "cathedral-cove-hahei", "hobbiton-matamata",
  "casco-viejo", "arashiyama", "kanazawa-higashi", "beitou", "pingxi", "shifen",
  "yangmingshan", "taroko-hualien", "kenting", "dogo", "amanohashidate",
  "sossusvlei-sesriem", "volubilis-moulay", "manuel-antonio",
  "phong-nha-town", "trollstigen-andalsnes", "reynisfjara-vik",
  "blue-lagoon-grindavik", "thingvellir-laugarvatn", "landmannalaugar-skip",
  "ninh-binh-tam-coc", "vang-vieng-nong", "vang-vieng-skip",
]);

const raw = fs
  .readFileSync(new URL("./top3000-candidates.txt", import.meta.url), "utf8")
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith("#"))
  .map((l) => {
    const [slug, name, countrySlug, countryCode, countryName, wikiTitle] = l.split("|");
    return { slug, name, countrySlug, countryCode, countryName, wikiTitle: wikiTitle || name };
  })
  .filter((c) => c.slug && !DROP.has(c.slug) && !redirectSlugs.has(c.slug));

const seen = new Set();
const fresh = [];
const already = [];
for (const c of raw) {
  if (seen.has(c.slug) || slugs.has(c.slug)) {
    already.push(c.slug);
    continue;
  }
  const name = String(c.name || "").toLowerCase();
  const dup = targets.some((t) => {
    if (!countryMatch(t.countrySlug, c.countrySlug)) return false;
    return String(t.name).toLowerCase() === name;
  });
  if (dup) {
    already.push(c.slug);
    continue;
  }
  seen.add(c.slug);
  fresh.push(c);
}

console.log(
  JSON.stringify(
    {
      uniqueTop2500: top2500.length,
      targets: targets.length,
      candidates: raw.length,
      alreadyOnSite: already.length,
      newIfResolved: fresh.length,
      targetTouristTotal: top2500.length + fresh.length,
      sampleNew: fresh.slice(0, 25).map((c) => `${c.slug}/${c.countrySlug}`),
    },
    null,
    2,
  ),
);
