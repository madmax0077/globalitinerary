/**
 * Append curated REAL_PACKS overlays for cities that lack keys.
 * Safe insert: never creates leading commas or duplicate keys.
 */
import fs from "node:fs";
import { REAL_PACKS } from "./real-city-packs.mjs";
import { MAJOR_HUB_PACKS } from "./major-hub-packs.mjs";

const CURATED = new Set(["tokyo", "kyoto", "rome", "venice", "dubai", "santorini", "bali"]);
const ALL_PACKS = { ...REAL_PACKS, ...MAJOR_HUB_PACKS };

function hasKey(src, slug) {
  return new RegExp(`(?:^|\\n)\\s+(?:\"${slug}\"|${slug}):\\s*[\\[{]`, "m").test(src);
}

function keyLiteral(slug) {
  return /^[a-z][a-z0-9]*$/.test(slug) ? slug : `"${slug}"`;
}

function esc(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function enrichmentBlock(slug, p) {
  const [h, ...g] = p.stock;
  const gallery = g.length ? g : p.stock;
  return `  ${keyLiteral(slug)}: {
    ...stock("${h}", [${gallery.map((x) => `"${x}"`).join(", ")}]),
    tagline: "${esc(p.tagline)}",
    overview:
      "${esc(p.overview)}",
    bestTime: "${esc(p.bestTime)}",
    weather: "${esc(p.weather)}",
    airport: "${esc(p.airport)}",
    metro: "${esc(p.metro)}",
    transport: "${esc(p.transport)}",
    shopping: [${p.shopping.map((x) => `"${esc(x)}"`).join(", ")}],
    nightlife: [${p.nightlife.map((x) => `"${esc(x)}"`).join(", ")}],
    museums: [${p.museums.map((x) => `"${esc(x)}"`).join(", ")}],
    localFoods: [${p.localFoods.map((x) => `"${esc(x)}"`).join(", ")}],
    hiddenGems: [${p.hiddenGems.map((x) => `"${esc(x)}"`).join(", ")}],
    tips: [
${p.tips.map((x) => `      "${esc(x)}"`).join(",\n")}
    ],
    faqs: [
      { question: "How many days do I need?", answer: "Two to four full days cover the highlights at a comfortable pace for most travellers." },
    ],
    featured: true,
  }`;
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

function insertBeforeClosing(src, blocks) {
  if (!blocks.length) return src;
  const marker = "\n};";
  const idx = src.lastIndexOf(marker);
  if (idx < 0) throw new Error("Cannot find closing };");
  let head = src.slice(0, idx).replace(/\s*$/, "");
  if (!head.endsWith(",")) head += ",";
  return `${head}\n${blocks.join(",\n")}\n};\n`;
}

const enrichPath = new URL("../src/data/city-enrichments.ts", import.meta.url);
const sightsPath = new URL("../src/data/city-sights.ts", import.meta.url);
const picksPath = new URL("../src/data/city-picks.ts", import.meta.url);

let enrichSrc = fs.readFileSync(enrichPath, "utf8");
let sightsSrc = fs.readFileSync(sightsPath, "utf8");
let picksSrc = fs.readFileSync(picksPath, "utf8");

const enrichBlocks = [];
const sightBlocks = [];
const pickBlocks = [];

for (const slug of Object.keys(ALL_PACKS).sort()) {
  if (CURATED.has(slug)) continue;
  const p = ALL_PACKS[slug];
  if (!p?.restaurants?.length || !p?.stays?.length || !p?.sights?.length) {
    console.warn("incomplete", slug);
    continue;
  }
  if (!hasKey(enrichSrc, slug)) enrichBlocks.push(enrichmentBlock(slug, p));
  if (!hasKey(sightsSrc, slug)) sightBlocks.push(sightsBlock(slug, p.sights));
  if (!hasKey(picksSrc, slug)) pickBlocks.push(picksBlock(slug, p));
}

enrichSrc = insertBeforeClosing(enrichSrc, enrichBlocks);
sightsSrc = insertBeforeClosing(sightsSrc, sightBlocks);
picksSrc = insertBeforeClosing(picksSrc, pickBlocks);

fs.writeFileSync(enrichPath, enrichSrc);
fs.writeFileSync(sightsPath, sightsSrc);
fs.writeFileSync(picksPath, picksSrc);

console.log({
  enrichAdded: enrichBlocks.length,
  sightsAdded: sightBlocks.length,
  picksAdded: pickBlocks.length,
});

// quick syntax smoke: balanced braces
for (const [name, src] of [
  ["enrichments", enrichSrc],
  ["sights", sightsSrc],
  ["picks", picksSrc],
]) {
  const open = (src.match(/\{/g) || []).length;
  const close = (src.match(/\}/g) || []).length;
  if (open !== close) console.warn(`BRACE MISMATCH ${name}`, open, close);
  if (/,\s*,/.test(src) || /\},\s*,/.test(src) || /\],\s*,/.test(src)) console.warn(`DOUBLE COMMA in ${name}`);
  if (!src.trimEnd().endsWith("};")) console.warn(`${name} does not end with };`);
}
