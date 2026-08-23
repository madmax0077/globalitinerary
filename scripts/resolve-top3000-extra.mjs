/**
 * Resolve Wikipedia coordinates for top3000 candidates → top3000-extra.txt
 * Run: $env:NODE_TLS_REJECT_UNAUTHORIZED=0; node scripts/resolve-top3000-extra.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { uniqueTop2500 } from "./top2500-tourism-cities.mjs";
import { TZ_BY_CC } from "./lib/country-tz.mjs";
import { TOP3000_DROP } from "./top3000-drop.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.NODE_TLS_REJECT_UNAUTHORIZED ??= "0";

const UA = "GlobalItinerary/1.0 (mailto:globalitinerary0104@gmail.com)";
const SLEEP_MS = 250;

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
  const pages = data?.query?.pages || {};
  const page = Object.values(pages)[0];
  if (!page || page.missing) return null;
  const coords = page.coordinates?.[0];
  if (!coords) return null;
  return { lat: coords.lat, lng: coords.lon, title: page.title };
}

const targets = JSON.parse(fs.readFileSync(path.join(__dirname, "city-targets.json"), "utf8"));
const redirects = fs.readFileSync(path.join(__dirname, "../src/data/city-slug-redirects.ts"), "utf8");
const redirectSlugs = new Set([...redirects.matchAll(/"([^"]+)":\s*"[^"]+"/g)].map((m) => m[1]));
const existingSlugs = new Set([...targets.map((t) => t.slug), ...uniqueTop2500().map((c) => c.slug)]);

const candidates = fs
  .readFileSync(path.join(__dirname, "top3000-candidates.txt"), "utf8")
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith("#"))
  .map((l) => {
    const [slug, name, countrySlug, countryCode, countryName, wikiTitle] = l.split("|");
    return { slug, name, countrySlug, countryCode, countryName, wikiTitle: wikiTitle || name };
  })
  .filter((c) => {
    if (!c.slug || TOP3000_DROP.has(c.slug) || redirectSlugs.has(c.slug) || existingSlugs.has(c.slug)) {
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
  "# Top tourism cities beyond uniqueTop2500. Format:\n# slug|name|countrySlug|CC|countryName|lat|lng|timezone|population|isCapital|wikiTitle?\n";

function writePartial() {
  fs.writeFileSync(path.join(__dirname, "top3000-extra.txt"), header + out.join("\n") + (out.length ? "\n" : ""));
}

for (let i = 0; i < unique.length; i++) {
  const c = unique[i];
  process.stdout.write(`[${i + 1}/${unique.length}] ${c.slug}... `);
  try {
    let hit = await wikiCoords(c.wikiTitle);
    if (!hit && c.wikiTitle !== c.name) hit = await wikiCoords(c.name);
    if (!hit) {
      console.log("NO COORDS");
      failed.push(c.slug);
      await sleep(SLEEP_MS);
      continue;
    }
    const tz = TZ_BY_CC[c.countryCode] || "UTC";
    const wikiBit = hit.title !== c.name ? `|${hit.title}` : "";
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
  path.join(__dirname, "top3000-resolve-log.json"),
  JSON.stringify({ resolved: out.length, failed: failed.length, failedSlugs: failed }, null, 2),
);
console.log("\nResolved", out.length, "failed", failed.length);
