/**
 * Seed city-sights for top-1000 cities that still lack overlay keys and have
 * thin/empty generated thingsToDo. Avoids inventing fake restaurants/hotels.
 *
 * Run: node scripts/seed-top1000-overlays.mjs
 */
import fs from "node:fs";
import { uniqueTop1000 } from "./top1000-tourism-cities.mjs";

const ROOT = new URL("../src/data/", import.meta.url);
const targets = JSON.parse(fs.readFileSync(new URL("./city-targets.json", import.meta.url), "utf8"));
let sightsSrc = fs.readFileSync(new URL("city-sights.ts", ROOT), "utf8");

const genSrc = fs.readFileSync(new URL("cities.generated.ts", ROOT), "utf8");

function countryMatch(a, b) {
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

function insertBeforeClosing(src, blocks, label) {
  if (!blocks.length) return src;
  const idx = src.lastIndexOf("\n};");
  if (idx < 0) throw new Error(`Cannot find closing }; in ${label}`);
  let before = src.slice(0, idx).replace(/\r$/, "").trimEnd();
  const sep = before.endsWith(",") ? "\n" : ",\n";
  return before + sep + blocks.join(",\n") + src.slice(idx);
}

function thinGenerated(slug) {
  // Heuristic: generated entry has empty or very short thingsToDo array
  const re = new RegExp(`"slug": "${slug}"[\\s\\S]*?"thingsToDo": \\[([^\\]]*)\\]`, "m");
  const m = genSrc.match(re);
  if (!m) return true;
  const inner = m[1].trim();
  if (!inner) return true;
  const count = (inner.match(/"/g) || []).length / 2;
  return count < 4;
}

function templateSights(name, countryName, continentHint) {
  const asian = /asia|japan|korea|china|thai|viet|indo|malay|cambodia|laos|philip|taiwan|india|nepal|sri|bhutan/i.test(
    `${countryName} ${continentHint}`,
  );
  const midEast = /arab|oman|qatar|kuwait|bahrain|jordan|lebanon|morocco|egypt|turkey|turkiye|iran|israel/i.test(countryName);
  const sacred = asian
    ? `${name} temple / shrine circuit`
    : midEast
      ? `${name} historic mosque / medina walk`
      : `${name} cathedral / historic church`;
  return [
    `${name} historic center / Old Town`,
    `${name} main square and landmark viewpoints`,
    sacred,
    `${name} central market or bazaar`,
    `${countryName} regional museum in ${name}`,
    `Scenic park, waterfront or hillside walk in ${name}`,
    `Signature day trip from ${name}`,
    `Sunset viewpoint overlooking ${name}`,
  ];
}

const sightBlocks = [];
const added = [];
const skipped = [];

for (const entry of uniqueTop1000()) {
  const slug = resolveSlug(entry);
  if (!slug) {
    skipped.push(`${entry.slug} (no target)`);
    continue;
  }
  if (hasKey(sightsSrc, slug)) continue;
  if (!thinGenerated(slug)) {
    skipped.push(`${slug} (generated sights ok)`);
    continue;
  }

  const t = targets.find((x) => x.slug === slug);
  const sights = templateSights(t?.name || entry.name, t?.countryName || entry.countryName, entry.countrySlug);
  sightBlocks.push(sightsBlock(slug, sights));
  added.push(slug);
}

sightsSrc = insertBeforeClosing(sightsSrc, sightBlocks, "city-sights.ts");
fs.writeFileSync(new URL("city-sights.ts", ROOT), sightsSrc);

console.log(`Added ${added.length} city-sights keys for thin top-1000 cities`);
console.log(`Skipped ${skipped.length} (already covered or rich generated)`);
if (added.length) console.log("sample:", added.slice(0, 15).join(", "));
