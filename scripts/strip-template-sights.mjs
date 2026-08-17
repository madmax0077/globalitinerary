/**
 * Remove template sights seeded by seed-top1000-overlays.mjs.
 * Run: node scripts/strip-template-sights.mjs
 */
import fs from "node:fs";

const path = new URL("../src/data/city-sights.ts", import.meta.url);
const src = fs.readFileSync(path, "utf8");

const TEMPLATE_MARKERS = [
  /historic center \/ Old Town/i,
  /main square and landmark viewpoints/i,
  /cathedral \/ historic church/i,
  /temple \/ shrine circuit/i,
  /historic mosque \/ medina walk/i,
  /central market or bazaar/i,
  /regional museum in /i,
  /Scenic park, waterfront or hillside walk in /i,
  /Signature day trip from /i,
  /Sunset viewpoint overlooking /i,
];

function isTemplateList(list) {
  const blob = list.join("\n");
  return TEMPLATE_MARKERS.filter((re) => re.test(blob)).length >= 3;
}

function keyLiteral(slug) {
  return /^[a-z][a-z0-9]*$/.test(slug) ? slug : JSON.stringify(slug);
}

function esc(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

const start = src.indexOf("export const citySights");
const brace = src.indexOf("{", start);
const end = src.lastIndexOf("};");
if (brace < 0 || end < 0) throw new Error("Cannot locate citySights object");

const objSrc = src.slice(brace, end + 1);
const data = new Function(`"use strict"; return (${objSrc});`)();

const kept = [];
const removed = [];
for (const [slug, list] of Object.entries(data)) {
  if (!Array.isArray(list)) continue;
  if (isTemplateList(list)) {
    removed.push(slug);
    continue;
  }
  kept.push([slug, list]);
}

const header = `// Curated famous places to visit — landmarks travellers actually search for.
// Overrides polluted Wikivoyage see/do lists (universities, city passes, tour buses).
// Keyed by city slug.
// Template filler from seed-top1000-overlays was removed by strip-template-sights.mjs.

export const citySights: Record<string, string[]> = {
`;

const body = kept
  .map(
    ([slug, list]) =>
      `  ${keyLiteral(slug)}: [\n${list.map((s) => `    "${esc(s)}"`).join(",\n")}\n  ]`,
  )
  .join(",\n");

fs.writeFileSync(path, header + body + "\n};\n");
console.log(`Kept ${kept.length}; removed ${removed.length} template keys`);
console.log("sample removed:", removed.slice(0, 15).join(", "));
