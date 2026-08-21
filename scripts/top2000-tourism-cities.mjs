/**
 * Top ~2000 tourism cities = uniqueTop1500 + TOP2000_EXTRA.
 */
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { uniqueTop1500 } from "./top1500-tourism-cities.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function parseExtra(text) {
  const out = [];
  for (const line of text.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const p = t.split("|");
    if (p.length < 10) continue;
    const [slug, name, countrySlug, countryCode, countryName, lat, lng, timezone, population, isCapital, wikiTitle] = p;
    const row = {
      slug,
      name,
      countrySlug,
      countryCode,
      countryName,
      lat: Number(lat),
      lng: Number(lng),
      timezone,
      population: Number(population) || 0,
      isCapital: isCapital === "1" || isCapital === "true",
    };
    if (wikiTitle) row.wikiTitle = wikiTitle;
    out.push(row);
  }
  return out;
}

export const TOP2000_EXTRA = (() => {
  const seen = new Set();
  const out = [];
  const p = path.join(__dirname, "top2000-extra.txt");
  if (!fs.existsSync(p)) return out;
  for (const row of parseExtra(fs.readFileSync(p, "utf8"))) {
    if (seen.has(row.slug)) continue;
    seen.add(row.slug);
    out.push(row);
  }
  return out;
})();

export function uniqueTop2000() {
  const seen = new Set();
  const out = [];
  for (const c of [...uniqueTop1500(), ...TOP2000_EXTRA]) {
    if (seen.has(c.slug)) continue;
    seen.add(c.slug);
    out.push(c);
  }
  return out;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const list = uniqueTop2000();
  console.log("TOP2000_EXTRA", TOP2000_EXTRA.length);
  console.log("uniqueTop2000", list.length);
}
