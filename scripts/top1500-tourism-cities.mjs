/**
 * Top ~1500 tourism cities = uniqueTop1000 + TOP1500_EXTRA.
 */
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { uniqueTop1000 } from "./top1000-tourism-cities.mjs";

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

export const TOP1500_EXTRA = (() => {
  const seen = new Set();
  const out = [];
  for (const f of ["top1500-extra.txt"]) {
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

export function uniqueTop1500() {
  const drop = new Set([
    "edinburgh-old",
    "tallinn-old",
    "cesky-krumlov-old",
    "bled-lake",
    "brasov-center",
    "guadalajara-tlaquepaque",
    "zicatela",
    "valencia-albufera",
    "stone-town-spice",
  ]);
  const seen = new Set();
  const out = [];
  for (const c of [...uniqueTop1000(), ...TOP1500_EXTRA]) {
    if (drop.has(c.slug) || seen.has(c.slug)) continue;
    seen.add(c.slug);
    out.push(c);
  }
  return out;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const list = uniqueTop1500();
  console.log("TOP1500_EXTRA", TOP1500_EXTRA.length);
  console.log("uniqueTop1500", list.length);
}
