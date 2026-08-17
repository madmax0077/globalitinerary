/**
 * Patch generated cities/countries: remove hash-invented rating & reviews.
 * Run: node scripts/strip-fake-ratings.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function patchFile(rel, label) {
  const file = path.join(__dirname, "..", rel);
  let src = fs.readFileSync(file, "utf8");
  const marker = "const raw: Gen[] = ";
  const start = src.indexOf(marker);
  if (start < 0) throw new Error(`raw marker not found in ${rel}`);
  const jsonStart = start + marker.length;
  const end = src.indexOf("\n];\n\nexport", jsonStart);
  if (end < 0) throw new Error(`raw end not found in ${rel}`);
  const data = JSON.parse(src.slice(jsonStart, end + 2));
  for (const row of data) {
    delete row.rating;
    delete row.reviews;
  }
  fs.writeFileSync(file, src.slice(0, jsonStart) + JSON.stringify(data, null, 2) + src.slice(end + 2));
  console.log(`${label}: stripped rating/reviews from ${data.length} rows`);
}

patchFile("src/data/cities.generated.ts", "cities");
patchFile("src/data/countries.generated.ts", "countries");
