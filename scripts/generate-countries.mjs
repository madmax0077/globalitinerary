// Generates src/data/countries.generated.ts from open datasets.
// Run: node scripts/generate-countries.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isScenic } from "./lib/bad-image.mjs";
import { poolFor, hash } from "./lib/stock-pools.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const mledoze = JSON.parse(fs.readFileSync(path.join(__dirname, "mledoze.json"), "utf8"));
const populations = JSON.parse(fs.readFileSync(path.join(__dirname, "population.json"), "utf8"));

// Real representative photos fetched from Wikipedia (title -> image URL).
let imagesMap = {};
try {
  imagesMap = JSON.parse(fs.readFileSync(path.join(__dirname, "images-map.json"), "utf8"));
} catch {
  console.warn("images-map.json not found — falling back to stock photos only.");
}

// Real image galleries fetched from Wikipedia article media (title -> [urls]).
let galleryMap = {};
try {
  galleryMap = JSON.parse(fs.readFileSync(path.join(__dirname, "gallery-map.json"), "utf8"));
} catch {
  console.warn("gallery-map.json not found — galleries will fall back to stock.");
}

// Selected cities per country — used to build scenic country galleries from the
// real, travel-focused photos of each country's major cities (skylines,
// landmarks) rather than the history-heavy media in country articles.
let cityHerosByCountry = new Map();
try {
  const cityTargets = JSON.parse(fs.readFileSync(path.join(__dirname, "city-targets.json"), "utf8"));
  for (const c of cityTargets) {
    const hero = imagesMap[c.wikiTitle] || (Array.isArray(galleryMap[c.wikiTitle]) ? galleryMap[c.wikiTitle][0] : null);
    if (!hero) continue;
    const arr = cityHerosByCountry.get(c.countrySlug) || [];
    arr.push(hero);
    cityHerosByCountry.set(c.countrySlug, arr);
  }
} catch {
  console.warn("city-targets.json not found — country galleries will use article media.");
}

const popByName = new Map();
for (const p of populations) popByName.set(p.country.toLowerCase(), p.population);

function slugify(input) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function continentOf(region, subregion) {
  if (region === "Americas") {
    return /south america/i.test(subregion || "") ? "South America" : "North America";
  }
  if (["Europe", "Asia", "Africa", "Oceania"].includes(region)) return region;
  return "Asia";
}

const bestTimeByContinent = {
  Europe: "May–June & September–October for mild weather and thinner crowds",
  Asia: "November–March for cooler, drier conditions in most regions",
  Africa: "The dry season offers the best wildlife viewing and travel comfort",
  "North America": "Late spring and early autumn for pleasant temperatures",
  "South America": "The dry season (roughly May–September) is ideal for most regions",
  Oceania: "The warmer, drier months for beaches and the outdoors",
};

const weatherByContinent = {
  Europe: "Temperate, with warm summers and cool winters",
  Asia: "Varies widely — tropical in the south, temperate and continental in the north",
  Africa: "Largely warm year-round, with distinct wet and dry seasons",
  "North America": "Diverse climates from temperate to subtropical",
  "South America": "From Andean highlands to tropical lowlands and everything between",
  Oceania: "Mild to tropical, with plenty of sunshine",
};

function pickImages(slug, continent) {
  const { hero, gallery } = poolFor(slug, continent);
  return { hero, gallery };
}

const skip = new Set(["Antarctica"]);

const out = [];
for (const c of mledoze) {
  if (!c.unMember) continue; // 193 UN member states
  const name = c.name.common;
  if (skip.has(name)) continue;

  const slug = slugify(name);
  const region = c.region || "Asia";
  const subregion = c.subregion || region;
  const continent = continentOf(region, subregion);
  const capital = (c.capital && c.capital[0]) || "—";
  const population = popByName.get(name.toLowerCase()) ?? popByName.get((c.name.official || "").toLowerCase()) ?? 0;

  const currencyEntry = c.currencies ? Object.entries(c.currencies)[0] : null;
  const currencyCode = currencyEntry ? currencyEntry[0] : "";
  const currency = currencyEntry ? currencyEntry[1].name : "Local currency";

  const languages = c.languages ? Object.values(c.languages) : [];
  const lat = c.latlng ? c.latlng[0] : 0;
  const lng = c.latlng ? c.latlng[1] : 0;
  const offset = Math.round(lng / 15);
  const timezone = `GMT${offset >= 0 ? "+" : ""}${offset}`;

  let callingCode = "";
  if (c.idd && c.idd.root) {
    callingCode = c.idd.root + (c.idd.suffixes && c.idd.suffixes.length === 1 ? c.idd.suffixes[0] : "");
  }

  const { hero, gallery } = pickImages(slug, continent);
  const lead = isScenic(imagesMap[name]) ? imagesMap[name] : null;
  const cityHeros = cityHerosByCountry.get(slug) || [];
  const articleMedia = Array.isArray(galleryMap[name]) ? galleryMap[name] : [];

  // Prefer scenic imagery: the country's own lead photo + its cities' real
  // photos (skylines/landmarks). Country-article media (often historical
  // paintings/portraits) is used only to top up when we have too few scenic
  // shots, and stock is the final fallback. Flags/maps/emblems are excluded.
  const scenic = [];
  const pushUnique = (u) => { if (isScenic(u) && !scenic.includes(u)) scenic.push(u); };
  // Prefer lead + city photos. Skip country-article media (often maps/portraits).
  pushUnique(lead);
  for (const u of cityHeros) pushUnique(u);
  if (scenic.length < 2) for (const u of articleMedia) pushUnique(u);
  const realImages = scenic.slice(0, 6);
  const h = hash(slug);
  const rating = Number((4.3 + (h % 60) / 100).toFixed(1)); // 4.30–4.89
  const reviews = 800 + (h % 9000);

  const langLine = languages.length
    ? `The main language${languages.length > 1 ? "s are" : " is"} ${languages.slice(0, 3).join(", ")}.`
    : "";
  const curLine = currencyCode ? `The currency is the ${currency} (${currencyCode}).` : "";
  const popLine = population ? `home to around ${Intl.NumberFormat("en-US").format(population)} people` : "a captivating destination";

  const overview =
    `${name} is a ${subregion} nation in ${region}, with ${capital} as its capital and ${popLine}. ` +
    `${curLine} ${langLine} `.trim() +
    ` From its landscapes and cities to its cuisine and traditions, ${name} offers travelers a distinctive slice of the world to explore.`;

  out.push({
    id: c.cca2.toLowerCase(),
    slug,
    name,
    officialName: c.name.official || undefined,
    flag: c.flag || "🏳️",
    continent,
    region: subregion,
    capital,
    population,
    currency,
    currencyCode,
    languages,
    timezone,
    callingCode,
    visa: "Entry requirements vary by nationality — check visa rules before you travel.",
    bestTime: bestTimeByContinent[continent],
    weather: weatherByContinent[continent],
    internet: "Mobile data and Wi-Fi are widely available in cities and tourist areas.",
    transportation: "A mix of flights, trains, buses and taxis connect the main destinations.",
    safety: "Exercise normal precautions and check the latest local travel advice.",
    budgetPerDay: "$60–200",
    tagline: `Discover the wonders of ${name}`,
    heroKey: hero,
    galleryKeys: gallery,
    realImages,
    overview: overview.replace(/\s+/g, " ").trim(),
    history: `${name} has a rich history shaped by its position in ${region} and the cultures of ${subregion}, leaving a legacy visible in its landmarks, cities and traditions today.`,
    culture: `Culture in ${name} is expressed through its food, festivals, music and daily rhythms — a warm invitation to experience local life first-hand.`,
    rating,
    reviews,
    lat,
    lng,
    tags: Array.from(new Set([continent, subregion, "Culture", "Travel"])),
    faqs: [
      { question: `What is the capital of ${name}?`, answer: `The capital of ${name} is ${capital}.` },
      { question: `When is the best time to visit ${name}?`, answer: bestTimeByContinent[continent] + "." },
    ],
  });
}

out.sort((a, b) => a.name.localeCompare(b.name));

const header = `// AUTO-GENERATED by scripts/generate-countries.mjs — do not edit by hand.
// Data derived from open datasets (mledoze/countries, samayo/country-json).
import type { Country } from "@/lib/types";
import { PHOTOS, unsplash } from "@/lib/images";

type Gen = Omit<
  Country,
  "heroImage" | "thumbnail" | "gallery" | "coordinates" | "topCitySlugs" | "topAttractionSlugs"
> & {
  heroKey: keyof typeof PHOTOS;
  galleryKeys: (keyof typeof PHOTOS)[];
  realImages: string[];
  lat: number;
  lng: number;
};

const raw: Gen[] = ${JSON.stringify(out, null, 2)};

export const generatedCountries: Country[] = raw.map((c) => {
  const { heroKey, galleryKeys, realImages, lat, lng, ...rest } = c;
  const pool = galleryKeys.map((k) => unsplash(PHOTOS[k], 1400));
  const hero = realImages[0] ?? null;
  const gallery = realImages.length > 0 ? realImages : pool;
  return {
    ...rest,
    coordinates: { lat, lng },
    heroImage: hero ?? unsplash(PHOTOS[heroKey], 2400),
    thumbnail: hero ?? unsplash(PHOTOS[heroKey], 900),
    gallery,
    topCitySlugs: [],
    topAttractionSlugs: [],
  };
});
`;

fs.writeFileSync(path.join(root, "src", "data", "countries.generated.ts"), header);
console.log(`Generated ${out.length} countries -> src/data/countries.generated.ts`);
