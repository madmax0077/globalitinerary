/**
 * Resolve Wikipedia/Wikidata coordinates for top3500 candidates → top3500-extra.txt
 * Run: $env:NODE_TLS_REJECT_UNAUTHORIZED=0; node scripts/resolve-top3500-extra.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { uniqueTop3000 } from "./top3000-tourism-cities.mjs";
import { TZ_BY_CC } from "./lib/country-tz.mjs";
import { TOP3500_DROP } from "./top3500-drop.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.NODE_TLS_REJECT_UNAUTHORIZED ??= "0";

const UA = "GlobalItinerary/1.0 (mailto:globalitinerary0104@gmail.com)";
const SLEEP_MS = 220;

function countryMatch(a, b) {
  const norm = (s) => (s === "turkey" ? "turkiye" : s === "czech-republic" ? "czechia" : s);
  return norm(a) === norm(b);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function wikiCoords(title) {
  const url =
    "https://en.wikipedia.org/w/api.php?action=query&prop=coordinates|pageprops&colimit=1&titles=" +
    encodeURIComponent(title) +
    "&format=json&redirects=1";
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const page = Object.values(data?.query?.pages || {})[0];
  if (!page || page.missing) return null;
  const coords = page.coordinates?.[0];
  if (!coords) return null;
  return { lat: coords.lat, lng: coords.lon, title: page.title };
}

async function wikiDataCoords(title) {
  const url =
    "https://www.wikidata.org/w/api.php?action=wbgetentities&sites=enwiki&titles=" +
    encodeURIComponent(title) +
    "&props=claims&format=json&redirects=yes";
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const entity = Object.values(data.entities || {})[0];
  if (!entity || entity.missing) return null;
  const mainsnak = entity.claims?.P625?.[0]?.mainsnak?.datavalue?.value;
  if (!mainsnak || mainsnak.latitude == null) return null;
  return { lat: mainsnak.latitude, lng: mainsnak.longitude, title };
}

const targets = JSON.parse(fs.readFileSync(path.join(__dirname, "city-targets.json"), "utf8"));
const redirects = fs.readFileSync(path.join(__dirname, "../src/data/city-slug-redirects.ts"), "utf8");
const redirectSlugs = new Set([...redirects.matchAll(/"([^"]+)":\s*"[^"]+"/g)].map((m) => m[1]));
const existingSlugs = new Set([...targets.map((t) => t.slug), ...uniqueTop3000().map((c) => c.slug)]);

const candidates = fs
  .readFileSync(path.join(__dirname, "top3500-candidates.txt"), "utf8")
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith("#"))
  .map((l) => {
    const [slug, name, countrySlug, countryCode, countryName, wikiTitle] = l.split("|");
    return { slug, name, countrySlug, countryCode, countryName, wikiTitle: wikiTitle || name };
  })
  .filter((c) => {
    if (!c.slug || /skip/i.test(c.slug) || /skip/i.test(c.name) || /skip/i.test(c.wikiTitle)) return false;
    if (TOP3500_DROP.has(c.slug) || redirectSlugs.has(c.slug) || existingSlugs.has(c.slug)) {
      return false;
    }
    const name = String(c.name || "").toLowerCase();
    return !targets.some(
      (t) => countryMatch(t.countrySlug, c.countrySlug) && String(t.name).toLowerCase() === name,
    );
  });

const seen = new Set();
const unique = candidates.filter((c) => {
  if (seen.has(c.slug)) return false;
  seen.add(c.slug);
  return true;
});

console.log("candidates to resolve", unique.length);

const out = [];
const failed = [];
const header =
  "# Top tourism cities beyond uniqueTop3000. Format:\n# slug|name|countrySlug|CC|countryName|lat|lng|timezone|population|isCapital|wikiTitle?\n";

function writePartial() {
  fs.writeFileSync(path.join(__dirname, "top3500-extra.txt"), header + out.join("\n") + (out.length ? "\n" : ""));
}

for (let i = 0; i < unique.length; i++) {
  const c = unique[i];
  process.stdout.write(`[${i + 1}/${unique.length}] ${c.slug}... `);
  try {
    let hit = await wikiCoords(c.wikiTitle);
    if (!hit && c.wikiTitle !== c.name) hit = await wikiCoords(c.name);
    if (!hit) hit = await wikiDataCoords(c.wikiTitle);
    if (!hit && c.wikiTitle !== c.name) hit = await wikiDataCoords(c.name);
    if (!hit) {
      console.log("NO COORDS");
      failed.push(c.slug);
      await sleep(SLEEP_MS);
      continue;
    }
    const tz = TZ_BY_CC[c.countryCode] || "UTC";
    const wikiBit = hit.title && hit.title !== c.name ? `|${hit.title}` : "";
    out.push(
      `${c.slug}|${c.name}|${c.countrySlug}|${c.countryCode}|${c.countryName}|${hit.lat.toFixed(4)}|${hit.lng.toFixed(4)}|${tz}|0|0${wikiBit}`,
    );
    console.log("OK", hit.lat.toFixed(2), hit.lng.toFixed(2));
  } catch (e) {
    console.log("ERR", e.message);
    failed.push(c.slug);
  }
  await sleep(SLEEP_MS);
  if ((i + 1) % 40 === 0) {
    writePartial();
    console.log("checkpoint", out.length);
  }
}

writePartial();
fs.writeFileSync(
  path.join(__dirname, "top3500-resolve-log.json"),
  JSON.stringify({ resolved: out.length, failed: failed.length, failedSlugs: failed }, null, 2),
);
console.log("\nResolved", out.length, "failed", failed.length);
