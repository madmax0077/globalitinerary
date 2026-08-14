/**
 * Seed city-sights (and optional city-picks) for top-300 cities missing overlay keys.
 * Run: node scripts/seed-top300-sights.mjs
 */
import fs from "node:fs";
import { uniqueTop300 } from "./top300-tourism-cities.mjs";
import { SIGHTS_PACK, PICKS_PACK } from "./top300-sights-data.mjs";

const ROOT = new URL("../src/data/", import.meta.url);
const targets = JSON.parse(fs.readFileSync(new URL("./city-targets.json", import.meta.url), "utf8"));
let sightsSrc = fs.readFileSync(new URL("city-sights.ts", ROOT), "utf8");
let picksSrc = fs.readFileSync(new URL("city-picks.ts", ROOT), "utf8");

function countryMatch(a, b) {
  if (a === b) return true;
  const norm = (s) => {
    if (s === "turkey") return "turkiye";
    if (s === "czech-republic") return "czechia";
    return s;
  };
  return norm(a) === norm(b);
}

function resolveSlug(entry) {
  const candidates = [entry.slug, ...(entry.alts || [])];
  for (const s of candidates) {
    const t = targets.find((x) => x.slug === s && countryMatch(x.countrySlug, entry.countrySlug));
    if (t) return t.slug;
  }
  const byName = targets.find(
    (x) => countryMatch(x.countrySlug, entry.countrySlug) && x.name.toLowerCase() === entry.name.toLowerCase(),
  );
  return byName?.slug || null;
}

function hasKey(src, slug) {
  const re = new RegExp(`(?:^|\\n)\\s+(?:\"${slug}\"|${slug}):\\s*[\\[{]`, "m");
  return re.test(src);
}

function keyLiteral(slug) {
  return /^[a-z][a-z0-9]*$/.test(slug) ? slug : `"${slug}"`;
}

function esc(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function sightsBlock(slug, sights) {
  return `  ${keyLiteral(slug)}: [
${sights.map((s) => `    "${esc(s)}"`).join(",\n")}
  ]`;
}

function picksBlock(slug, p) {
  return `  ${keyLiteral(slug)}: {
    restaurants: [
${p.restaurants.map((r) => `      { name: "${esc(r.name)}", cuisine: "${esc(r.cuisine)}", priceLevel: ${r.priceLevel}, note: "${esc(r.note)}" }`).join(",\n")}
    ],
    stays: [
${p.stays.map((r) => `      { name: "${esc(r.name)}", area: "${esc(r.area)}", priceLevel: ${r.priceLevel}, note: "${esc(r.note)}" }`).join(",\n")}
    ],
  }`;
}

function insertBeforeClosing(src, blocks, label) {
  if (!blocks.length) return src;
  const idx = src.lastIndexOf("\n};");
  if (idx < 0) throw new Error(`Cannot find closing }; in ${label}`);
  let before = src.slice(0, idx).replace(/\r$/, "").trimEnd();
  const sep = before.endsWith(",") ? "\n" : ",\n";
  return before + sep + blocks.join(",\n") + src.slice(idx);
}

const sightBlocks = [];
const pickBlocks = [];
const added = [];
const skipped = [];

for (const entry of uniqueTop300()) {
  const slug = resolveSlug(entry);
  if (!slug) {
    skipped.push(`${entry.slug} (no target)`);
    continue;
  }
  if (!targets.some((t) => t.slug === slug)) {
    skipped.push(`${slug} (not in targets)`);
    continue;
  }
  if (hasKey(sightsSrc, slug)) continue;

  const sights = SIGHTS_PACK[slug];
  if (!sights || sights.length < 6) {
    skipped.push(`${slug} (no sights data)`);
    continue;
  }

  sightBlocks.push(sightsBlock(slug, sights));
  added.push(slug);

  const picks = PICKS_PACK[slug];
  if (picks && !hasKey(picksSrc, slug)) {
    pickBlocks.push(picksBlock(slug, picks));
  }
}

sightsSrc = insertBeforeClosing(sightsSrc, sightBlocks, "city-sights.ts");
picksSrc = insertBeforeClosing(picksSrc, pickBlocks, "city-picks.ts");

fs.writeFileSync(new URL("city-sights.ts", ROOT), sightsSrc);
fs.writeFileSync(new URL("city-picks.ts", ROOT), picksSrc);

console.log(`Added ${added.length} new city-sights keys`);
console.log(`Added ${pickBlocks.length} new city-picks keys`);
if (skipped.length) {
  console.log(`Skipped ${skipped.length}:`);
  for (const s of skipped) console.log(`  - ${s}`);
}
