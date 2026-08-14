/**
 * Audit top 300 tourism cities vs city-targets + curated cities.
 * Requires countrySlug match (avoids false positives like Costa Rica "san-francisco").
 */
import fs from "node:fs";
import { uniqueTop300 } from "./top300-tourism-cities.mjs";

const list = uniqueTop300();
const targets = JSON.parse(fs.readFileSync(new URL("./city-targets.json", import.meta.url), "utf8"));
const curatedSrc = fs.readFileSync(new URL("../src/data/cities.ts", import.meta.url), "utf8");
const curatedSlugs = new Set([...curatedSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]));

function countryMatch(a, b) {
  if (a === b) return true;
  const norm = (s) => {
    if (s === "turkey") return "turkiye";
    if (s === "czech-republic") return "czechia";
    return s;
  };
  return norm(a) === norm(b);
}

function find(entry) {
  const candidates = [entry.slug, ...(entry.alts || [])];
  for (const s of candidates) {
    const t = targets.find((x) => x.slug === s && countryMatch(x.countrySlug, entry.countrySlug));
    if (t) return { slug: t.slug, source: "targets", countrySlug: t.countrySlug };
    if (curatedSlugs.has(s)) {
      return { slug: s, source: "curated", countrySlug: entry.countrySlug };
    }
  }
  const byName = targets.find(
    (x) => countryMatch(x.countrySlug, entry.countrySlug) && x.name.toLowerCase() === entry.name.toLowerCase(),
  );
  if (byName) return { slug: byName.slug, source: "targets-name", countrySlug: byName.countrySlug };
  const wrongCountry = targets.find((x) => candidates.includes(x.slug) && !countryMatch(x.countrySlug, entry.countrySlug));
  if (wrongCountry) {
    return {
      slug: null,
      source: "wrong-country",
      countrySlug: wrongCountry.countrySlug,
      note: `slug ${wrongCountry.slug} exists under ${wrongCountry.countrySlug}, need ${entry.countrySlug}`,
    };
  }
  return null;
}

const present = [];
const missing = [];
const wrongCountry = [];

for (const e of list) {
  const hit = find(e);
  if (!hit) missing.push(e);
  else if (hit.source === "wrong-country") wrongCountry.push({ ...e, matched: hit });
  else present.push({ ...e, matched: hit });
}

console.log("TOP300 unique:", list.length);
console.log("PRESENT (correct country):", present.length);
console.log("WRONG COUNTRY collision:", wrongCountry.length);
console.log("MISSING:", missing.length);
console.log("\n--- WRONG COUNTRY ---");
for (const m of wrongCountry) console.log(`- ${m.name} (${m.slug}) need ${m.countrySlug}; have ${m.matched.countrySlug}`);
console.log("\n--- MISSING ---");
for (const m of missing) console.log(`- ${m.name} (${m.slug}) / ${m.countrySlug}`);

const out = { checked: list.length, present, missing, wrongCountry };
fs.writeFileSync(new URL("./top300-audit.json", import.meta.url), JSON.stringify(out, null, 2));
console.log("\nWrote scripts/top300-audit.json");
