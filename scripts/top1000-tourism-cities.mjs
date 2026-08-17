/**
 * Top ~1000 tourism cities = uniqueTop300 + TOP1000_EXTRA.
 * Compact parser loads scripts/top1000-extra.txt
 */
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { uniqueTop300 } from "./top300-tourism-cities.mjs";

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

const extraFiles = ["top1000-extra.txt", "top1000-extra-wave2.txt", "top1000-extra-wave3.txt", "top1000-extra-wave4.txt"];
export const TOP1000_EXTRA = (() => {
  const seen = new Set();
  const out = [];
  for (const f of extraFiles) {
    const p = path.join(__dirname, f);
    if (!fs.existsSync(p)) continue;
    for (const row of parseExtra(fs.readFileSync(p, "utf8"))) {
      if (seen.has(row.slug)) continue;
      seen.add(row.slug);
      out.push(row);
    }
  }
  return out;
})();

export function uniqueTop1000() {
  const seen = new Set();
  const out = [];
  for (const c of [...uniqueTop300(), ...TOP1000_EXTRA]) {
    if (seen.has(c.slug)) continue;
    seen.add(c.slug);
    out.push(c);
  }
  return out;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const list = uniqueTop1000();
  console.log("TOP1000_EXTRA", TOP1000_EXTRA.length);
  console.log("uniqueTop1000", list.length);
}
