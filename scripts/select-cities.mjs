// Selects major cities per country from GeoNames and prepares Wikipedia image
// title lists. Run: node scripts/select-cities.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const mledoze = JSON.parse(fs.readFileSync(path.join(__dirname, "mledoze.json"), "utf8"));

function slugify(input) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// cca2 -> country meta (UN members only, matching countries.generated)
const countryByCca2 = new Map();
for (const c of mledoze) {
  if (!c.unMember) continue;
  countryByCca2.set(c.cca2, {
    name: c.name.common,
    slug: slugify(c.name.common),
    capital: (c.capital && c.capital[0]) || "",
  });
}

// Parse GeoNames cities15000.txt (tab separated)
const txt = fs.readFileSync(path.join(__dirname, "geo", "cities15000.txt"), "utf8");
const byCountry = new Map();
for (const line of txt.split("\n")) {
  if (!line.trim()) continue;
  const f = line.split("\t");
  const name = f[1];
  const asciiname = f[2];
  const lat = parseFloat(f[4]);
  const lng = parseFloat(f[5]);
  const cc = f[8];
  const population = parseInt(f[14] || "0", 10);
  const timezone = f[17] || "";
  if (!countryByCca2.has(cc)) continue;
  const arr = byCountry.get(cc) || [];
  arr.push({ name, asciiname, lat, lng, population, timezone });
  byCountry.set(cc, arr);
}

const PER_COUNTRY = 6;
const usedSlugs = new Set();
const cities = [];
const titles = new Set();

for (const [cc, meta] of countryByCca2) {
  const list = (byCountry.get(cc) || []).sort((a, b) => b.population - a.population);
  const picked = list.slice(0, PER_COUNTRY);

  // Ensure the capital is represented if it exists in the dataset.
  if (meta.capital) {
    const capLower = meta.capital.toLowerCase();
    const inList = picked.some((c) => c.name.toLowerCase() === capLower || c.asciiname.toLowerCase() === capLower);
    if (!inList) {
      const cap = list.find((c) => c.name.toLowerCase() === capLower || c.asciiname.toLowerCase() === capLower);
      if (cap) picked.unshift(cap);
    }
  }

  for (const city of picked.slice(0, PER_COUNTRY + 1)) {
    let slug = slugify(city.asciiname || city.name);
    if (!slug) continue;
    if (usedSlugs.has(slug)) slug = `${slug}-${cc.toLowerCase()}`;
    if (usedSlugs.has(slug)) continue;
    usedSlugs.add(slug);

    const isCapital =
      meta.capital &&
      (city.name.toLowerCase() === meta.capital.toLowerCase() ||
        city.asciiname.toLowerCase() === meta.capital.toLowerCase());

    cities.push({
      slug,
      name: city.name,
      wikiTitle: city.asciiname || city.name,
      countrySlug: meta.slug,
      countryName: meta.name,
      countryCode: cc,
      population: city.population,
      lat: city.lat,
      lng: city.lng,
      timezone: city.timezone,
      isCapital: Boolean(isCapital),
    });
    titles.add(city.asciiname || city.name);
  }
}

// Also fetch real photos for every country page.
for (const meta of countryByCca2.values()) titles.add(meta.name);

fs.writeFileSync(path.join(__dirname, "city-targets.json"), JSON.stringify(cities, null, 2));
fs.writeFileSync(path.join(__dirname, "image-titles.json"), JSON.stringify([...titles], null, 2));
console.log(`Selected ${cities.length} cities across ${countryByCca2.size} countries.`);
console.log(`${titles.size} Wikipedia titles to fetch images for.`);
