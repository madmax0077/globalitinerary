/**
 * Patch budgetPerDay in countries.generated.ts without a full regenerate.
 * Run: node scripts/patch-country-budgets.mjs
 */
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { budgetPerDayForCountry } from "./lib/travel-budgets.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, "../src/data/countries.generated.ts");
let src = fs.readFileSync(file, "utf8");

const marker = "const raw: Gen[] = ";
const start = src.indexOf(marker);
if (start < 0) throw new Error("raw marker not found");
const jsonStart = start + marker.length;
const end = src.indexOf("\n];\n\nexport", jsonStart);
if (end < 0) throw new Error("raw end not found");

const data = JSON.parse(src.slice(jsonStart, end + 2));
let changed = 0;
const uniq = new Map();

for (const c of data) {
  const next = budgetPerDayForCountry({
    slug: c.slug,
    continent: c.continent,
    region: c.region,
  });
  if (c.budgetPerDay !== next) {
    c.budgetPerDay = next;
    changed++;
  }
  uniq.set(next, (uniq.get(next) || 0) + 1);
}

const nextSrc = src.slice(0, jsonStart) + JSON.stringify(data, null, 2) + src.slice(end + 2);
fs.writeFileSync(file, nextSrc);
console.log(`Updated ${changed}/${data.length} country budgets`);
console.log("Unique budget bands:", uniq.size);
console.log(
  [...uniq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([k, v]) => `  ${k}: ${v}`)
    .join("\n"),
);
