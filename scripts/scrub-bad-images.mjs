/**
 * Scrub non-scenic Wikimedia URLs from generated city/country data.
 * Run: npx tsx scripts/scrub-bad-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isScenic } from "./lib/bad-image.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function extractRawArray(src) {
  const marker = "const raw: Gen[] = ";
  const start = src.indexOf(marker);
  if (start < 0) throw new Error("raw array marker not found");
  const jsonStart = start + marker.length;
  // Find matching end: `\n];\n\nexport`
  const end = src.indexOf("\n];\n\nexport", jsonStart);
  if (end < 0) throw new Error("raw array end not found");
  return { before: src.slice(0, jsonStart), json: src.slice(jsonStart, end + 2), after: src.slice(end + 2) };
}

function scrubCities() {
  const file = path.join(root, "src", "data", "cities.generated.ts");
  const src = fs.readFileSync(file, "utf8");
  const { before, json, after } = extractRawArray(src);
  const data = JSON.parse(json);
  let photoNull = 0;
  let galleryRemoved = 0;
  for (const c of data) {
    if (c.realPhoto && !isScenic(c.realPhoto)) {
      c.realPhoto = null;
      photoNull++;
    }
    const beforeLen = (c.realGallery || []).length;
    c.realGallery = (c.realGallery || []).filter(isScenic);
    galleryRemoved += beforeLen - c.realGallery.length;
    if (c.realPhoto && !c.realGallery.includes(c.realPhoto) && isScenic(c.realPhoto)) {
      // keep hero even if not in gallery
    }
    // If hero was nulled but gallery still has good shots, promote first
    if (!c.realPhoto && c.realGallery.length) c.realPhoto = c.realGallery[0];
  }
  const out = before + JSON.stringify(data, null, 2) + after;
  fs.writeFileSync(file, out);
  console.log(`cities: nullified heroes ${photoNull}, removed gallery urls ${galleryRemoved}`);
}

function scrubCountries() {
  const file = path.join(root, "src", "data", "countries.generated.ts");
  const src = fs.readFileSync(file, "utf8");
  const { before, json, after } = extractRawArray(src);
  const data = JSON.parse(json);
  let removed = 0;
  for (const c of data) {
    const beforeLen = (c.realImages || []).length;
    c.realImages = (c.realImages || []).filter(isScenic);
    removed += beforeLen - c.realImages.length;
  }
  const out = before + JSON.stringify(data, null, 2) + after;
  fs.writeFileSync(file, out);
  console.log(`countries: removed realImages urls ${removed}`);
}

scrubCities();
scrubCountries();
console.log("done");
