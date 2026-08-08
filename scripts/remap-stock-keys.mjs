/**
 * Remap heroKey/galleryKeys in generated city/country data to generic continent pools.
 * Also scrub non-scenic real photos. Does not regenerate copy/listings.
 *
 * Run: npx tsx scripts/remap-stock-keys.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isScenic } from "./lib/bad-image.mjs";
import { poolFor } from "./lib/stock-pools.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const mledoze = JSON.parse(fs.readFileSync(path.join(__dirname, "mledoze.json"), "utf8"));

function continentOf(region, subregion) {
  if (region === "Americas") return /south america/i.test(subregion || "") ? "South America" : "North America";
  if (["Europe", "Asia", "Africa", "Oceania"].includes(region)) return region;
  return "Asia";
}

const continentByCca2 = new Map();
const continentBySlug = new Map();
for (const c of mledoze) {
  const cont = continentOf(c.region || "Asia", c.subregion || "");
  continentByCca2.set(c.cca2, cont);
  const slug = (c.name.common || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  continentBySlug.set(slug, cont);
}

function extractRaw(src) {
  const marker = "const raw: Gen[] = ";
  const start = src.indexOf(marker);
  if (start < 0) throw new Error("raw marker not found");
  const jsonStart = start + marker.length;
  const end = src.indexOf("\n];\n\nexport", jsonStart);
  if (end < 0) throw new Error("raw end not found");
  return { before: src.slice(0, jsonStart), json: src.slice(jsonStart, end + 2), after: src.slice(end + 2) };
}

function remapCities() {
  const file = path.join(root, "src", "data", "cities.generated.ts");
  const src = fs.readFileSync(file, "utf8");
  const { before, json, after } = extractRaw(src);
  const data = JSON.parse(json);
  let keyFixes = 0;
  let photoNull = 0;
  let galleryRemoved = 0;

  // Need countryCode — cities have countrySlug. Build slug→continent via countries if needed.
  const countryCont = new Map();
  for (const [slug, cont] of continentBySlug) countryCont.set(slug, cont);

  for (const c of data) {
    const continent = countryCont.get(c.countrySlug) || "Asia";
    const { hero, gallery } = poolFor(c.slug, continent);
    if (c.heroKey !== hero || JSON.stringify(c.galleryKeys) !== JSON.stringify(gallery)) {
      keyFixes++;
      c.heroKey = hero;
      c.galleryKeys = gallery;
    }
    if (c.realPhoto && !isScenic(c.realPhoto)) {
      c.realPhoto = null;
      photoNull++;
    }
    const beforeLen = (c.realGallery || []).length;
    c.realGallery = (c.realGallery || []).filter(isScenic);
    galleryRemoved += beforeLen - c.realGallery.length;
    if (!c.realPhoto && c.realGallery.length) c.realPhoto = c.realGallery[0];
  }

  fs.writeFileSync(file, before + JSON.stringify(data, null, 2) + after);
  console.log(`cities: remapped keys ${keyFixes}, null heroes ${photoNull}, gallery removed ${galleryRemoved}`);
}

function remapCountries() {
  const file = path.join(root, "src", "data", "countries.generated.ts");
  const src = fs.readFileSync(file, "utf8");
  const { before, json, after } = extractRaw(src);
  const data = JSON.parse(json);
  let keyFixes = 0;
  let removed = 0;

  for (const c of data) {
    const continent = c.continent || continentBySlug.get(c.slug) || "Asia";
    const { hero, gallery } = poolFor(c.slug, continent);
    if (c.heroKey !== hero || JSON.stringify(c.galleryKeys) !== JSON.stringify(gallery)) {
      keyFixes++;
      c.heroKey = hero;
      c.galleryKeys = gallery;
    }
    const beforeLen = (c.realImages || []).length;
    c.realImages = (c.realImages || []).filter(isScenic);
    removed += beforeLen - c.realImages.length;
  }

  fs.writeFileSync(file, before + JSON.stringify(data, null, 2) + after);
  console.log(`countries: remapped keys ${keyFixes}, removed realImages ${removed}`);
}

remapCities();
remapCountries();
console.log("done");
