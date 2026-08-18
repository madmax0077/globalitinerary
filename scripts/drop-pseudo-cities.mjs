/**
 * Remove district / pseudo / duplicate tourism stubs from city-targets.json.
 * Run: node scripts/drop-pseudo-cities.mjs && node scripts/generate-cities.mjs
 */
import fs from "node:fs";

const path = new URL("./city-targets.json", import.meta.url);
const targets = JSON.parse(fs.readFileSync(path, "utf8"));

/** Explicit junk slugs from top1000 waves */
const DROP = new Set([
  "edinburgh-old",
  "tallinn-old",
  "cesky-krumlov-old", // duplicate of cesky-krumlov
  "bled-lake", // duplicate of bled
  "brasov-center", // duplicate of brasov
  "guadalajara-tlaquepaque",
  "zicatela", // alias of puerto-escondido
  "valencia-albufera",
  "stone-town-spice", // duplicate of zanzibar-stone-town
  "parikia", // district-ish when paros exists — keep if unique; actually keep
]);

/** Pattern-based: "X Old Town" as standalone city — keep named lakes that are real resorts */
function isPseudo(t) {
  if (DROP.has(t.slug)) return true;
  if (/-old$/.test(t.slug) && /old town/i.test(t.name)) return true;
  // Tiny unnamed lake stubs only — not Banff/Louise-style resort towns
  if (/^Lake /.test(t.name) && (t.population || 0) < 100 && !/louise|como|bled|atitlan|naivasha/i.test(t.slug)) {
    return true;
  }
  return false;
}

const kept = [];
const removed = [];
for (const t of targets) {
  if (isPseudo(t)) removed.push(`${t.slug} (${t.name})`);
  else kept.push(t);
}

fs.writeFileSync(path, JSON.stringify(kept, null, 2) + "\n");
console.log(`Removed ${removed.length} pseudo cities; now ${kept.length}`);
removed.forEach((r) => console.log(" -", r));
