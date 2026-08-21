// Generates src/data/cities.generated.ts from selected GeoNames cities and the
// Wikipedia image map. Run: node scripts/generate-cities.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isScenic } from "./lib/bad-image.mjs";
import { poolFor } from "./lib/stock-pools.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const cities = JSON.parse(fs.readFileSync(path.join(__dirname, "city-targets.json"), "utf8"));
const mledoze = JSON.parse(fs.readFileSync(path.join(__dirname, "mledoze.json"), "utf8"));
let imagesMap = {};
try {
  imagesMap = JSON.parse(fs.readFileSync(path.join(__dirname, "images-map.json"), "utf8"));
} catch {
  console.warn("images-map.json not found — falling back to stock photos only.");
}
let galleryMap = {};
try {
  galleryMap = JSON.parse(fs.readFileSync(path.join(__dirname, "gallery-map.json"), "utf8"));
} catch {
  console.warn("gallery-map.json not found — galleries will fall back to stock.");
}

// Real "Eat / See / Do / Drink / Buy / Sleep" listings from Wikivoyage (CC-BY-SA).
let wikivoyageMap = {};
try {
  const rawWv = fs.readFileSync(path.join(__dirname, "wikivoyage-map.json"), "utf8").replace(/^\uFEFF/, "");
  wikivoyageMap = JSON.parse(rawWv);
} catch (e) {
  console.warn("wikivoyage-map.json not found — real listings will be empty.", e.message);
}

const uniq = (arr) => Array.from(new Set(arr));

// Slugs already owned by hand-curated cities (these win, so we skip them here).
const curatedSlugs = new Set(["tokyo", "kyoto", "rome", "venice", "dubai", "santorini", "bali"]);

// Continent lookup by cca2 (mirrors generate-countries.mjs).
function continentOf(region, subregion) {
  if (region === "Americas") return /south america/i.test(subregion || "") ? "South America" : "North America";
  if (["Europe", "Asia", "Africa", "Oceania"].includes(region)) return region;
  return "Asia";
}
const continentByCca2 = new Map();
for (const c of mledoze) {
  continentByCca2.set(c.cca2, continentOf(c.region || "Asia", c.subregion || ""));
}

const bestTimeByContinent = {
  Europe: "May–June & September–October for mild weather and thinner crowds",
  Asia: "November–March for cooler, drier conditions",
  Africa: "The dry season for the most comfortable travel",
  "North America": "Late spring and early autumn for pleasant temperatures",
  "South America": "The dry season (roughly May–September) is ideal",
  Oceania: "The warmer, drier months for the outdoors",
};
const weatherByContinent = {
  Europe: "Temperate, with warm summers and cool winters",
  Asia: "Varies from tropical to temperate depending on the season",
  Africa: "Largely warm year-round with distinct wet and dry seasons",
  "North America": "Diverse — temperate to subtropical",
  "South America": "From highland cool to tropical warmth",
  Oceania: "Mild to tropical, with plenty of sunshine",
};

const fmt = (n) => new Intl.NumberFormat("en-US").format(n);

// Build a day-by-day plan from the city's real, sourced sights and eateries.
// This organizes actual Wikivoyage listings into a schedule — it never invents
// places. Cities without enough real sights get no itinerary (left empty).
const DAY_TITLES = [
  "Icons & landmarks",
  "Culture & neighborhoods",
  "Markets, parks & hidden corners",
  "Day trips & more",
];
function buildItinerary(sights, eat) {
  if (!sights || sights.length < 3) return [];
  const perDay = 3;
  const days = Math.min(4, Math.ceil(sights.length / perDay));
  const itinerary = [];
  for (let d = 0; d < days; d++) {
    const chunk = sights.slice(d * perDay, d * perDay + perDay);
    if (chunk.length === 0) break;
    const activities = chunk.map((s) => `Visit ${s}`);
    if (eat[d]) activities.push(`Eat at ${eat[d]}`);
    itinerary.push({ day: d + 1, title: DAY_TITLES[d] || `Day ${d + 1}`, activities });
  }
  return itinerary;
}

const out = [];
for (const city of cities) {
  if (curatedSlugs.has(city.slug)) continue;

  const continent = continentByCca2.get(city.countryCode) || "Asia";
  const { hero, gallery } = poolFor(city.slug, continent);
  const realPhoto = isScenic(imagesMap[city.wikiTitle]) ? imagesMap[city.wikiTitle] : null;
  const realGallery = (Array.isArray(galleryMap[city.wikiTitle]) ? galleryMap[city.wikiTitle] : []).filter(isScenic);
  // Do NOT invent ratings/reviews — only curated cities may set those.
  const { name, countryName, isCapital, population } = city;

  // Real listings sourced from Wikivoyage (empty when the city has no article).
  const wv = wikivoyageMap[city.wikiTitle] || {};
  const eat = wv.eat || [];
  const see = wv.see || [];
  const doList = wv.do || [];
  const drink = wv.drink || [];
  const buy = wv.buy || [];
  const sleep = wv.sleep || [];

  // Normalize Wikivoyage listings: older maps are bare strings; enriched maps
  // are { name, note?, priceLevel? }.
  const asListing = (x) =>
    typeof x === "string" ? { name: x } : x && x.name ? { name: x.name, note: x.note, priceLevel: x.priceLevel } : null;
  const eatList = eat.map(asListing).filter(Boolean);
  const sleepList = sleep.map(asListing).filter(Boolean);

  // "Where to eat" = local favourites: prefer budget/mid ($-$$) when priced.
  const localEats = [
    ...eatList.filter((e) => !e.priceLevel || e.priceLevel <= 2),
    ...eatList.filter((e) => e.priceLevel && e.priceLevel > 2),
  ].slice(0, 6);

  // "Where to stay" = tourist favourites / top-rated hotels — drop hostels &
  // backpacker dorms, prefer proper hotels/resorts.
  const BUDGET_SLEEP = /hostel|backpack|capsule|pod\b|camping|campsite|couchsurfing|media cafe|manga cafe/i;
  const HOTELISH = /hotel|resort|palace|ritz|hyatt|marriott|hilton|sheraton|sofitel|novotel|ibis|radisson|westin|conrad|fairmont|peninsula|oberoi|belmond|aman\b|st\.?\s*regis|four seasons|mandarin|shangri|ryokan|riad|villa|suite|inn\b|lodge|boutique/i;
  const touristStays = [
    ...sleepList.filter((s) => HOTELISH.test(s.name) && !BUDGET_SLEEP.test(s.name)),
    ...sleepList.filter((s) => !BUDGET_SLEEP.test(s.name) && !HOTELISH.test(s.name)),
  ].slice(0, 5);

  // Drop junk Wikivoyage see/do: universities, city passes, tour operators,
  // district wiki anchors (e.g. "Paris/7th arrondissement#Q243").
  const sightName = (x) => (typeof x === "string" ? x : x && x.name ? x.name : "");
  const JUNK_SIGHT =
    /university|college|campus|institute|school\b|administration|\bpass\b|city.?card|\bticket\b|hop[- ]?on|\btours?\b|biking|bicycle|scooter|rental|bus\s*tur|segway|cruise|boat(?:y|s|\b)|yacht|charter|festival|concert|comedy|jazz|rock\s*in|moda\s|culinary|cordon\s*bleu|foodist|cuisine\s|cooking|cyclones|#|\/\d|arrondissement|district#|wikipedia|wikivoyage|go\s*city|omnitour|big\s*bus|adventures?|spice.?road|grasshopper|follow\s*me|company\b|private\s*boat|rent\s*a\s*boat|sloep|lovers\s*company|canal\s*company|wine\s*boat|steam\s*boats|evd\b|sonar\b|monegros|festes|indie|peixe\em|dias\s*da|santos\b|ultraschall|berlinale|maerzmusik|stern\s*und|werder/i;
  const LANDMARKISH =
    /temple|palace|castle|cathedral|basilica|mosque|church|shrine|museum|gallery|monument|tower|bridge|fort\b|park|garden|market|square|plaza|beach|island|pyramid|ruins?|old\s*town|historic|waterfall|lake|mountain|viewpoint|statue|memorial|zoo|aquarium|opera|pagoda|stupa|citadel|medina|souks?|harbour|harbor|waterfront|promenade|necropolis|observatory|acropolis|colosseum|pyramid|tomb|mausoleum|mosque|synagogue|chapel|abbey|monastery|wall\b|gate\b|fountain|pier\b|wharf|quay|bund\b|medina/i;
  const cleanSights = uniq(
    [...see, ...doList]
      .map(sightName)
      .map((n) => n.trim())
      .filter((n) => n.length >= 3 && n.length <= 80)
      .filter((n) => !JUNK_SIGHT.test(n))
      .filter((n) => !/[\/#]/.test(n)),
  );
  // Prefer landmark-like names; leave empty rather than listing tour operators.
  const landmarkSights = cleanSights.filter((n) => LANDMARKISH.test(n));
  const allSights = (landmarkSights.length >= 2 ? landmarkSights : []).slice(0, 12);
  const thingsToDo = allSights.slice(0, 8);
  const eatNames = localEats.map((e) => e.name);
  const itinerary = buildItinerary(allSights, eatNames);
  const museums = cleanSights
    .filter((n) => /museum|gallery|cathedral|palace|castle|temple|basilica|monument|shrine|mosque|church/i.test(n))
    .slice(0, 6);
  const restaurants = localEats.map((e) => ({
    name: e.name,
    ...(e.note ? { note: e.note } : {}),
    ...(e.priceLevel ? { priceLevel: e.priceLevel } : {}),
  }));
  const stays = touristStays.map((s) => ({
    name: s.name,
    ...(s.note ? { note: s.note } : {}),
    ...(s.priceLevel ? { priceLevel: s.priceLevel } : {}),
  }));

  const popLine = population ? `home to around ${fmt(population)} people` : null;
  const roleLine = isCapital
    ? `${name} is the capital of ${countryName}${popLine ? `, ${popLine}` : ""}.`
    : `${name} is one of ${countryName}'s major cities${popLine ? `, ${popLine}` : ""}.`;

  out.push({
    id: city.slug,
    slug: city.slug,
    name,
    countrySlug: city.countrySlug,
    countryName,
    tagline: isCapital
      ? `The capital of ${countryName}`
      : `A city in ${countryName}`,
    heroKey: hero,
    galleryKeys: gallery,
    realPhoto,
    realGallery,
    overview: roleLine,
    bestTime: bestTimeByContinent[continent],
    weather: weatherByContinent[continent],
    airport: "",
    metro: "",
    transport: "",
    thingsToDo,
    restaurants,
    hotels: stays.map((s) => s.name),
    stays,
    shopping: buy.slice(0, 6),
    nightlife: drink.slice(0, 6),
    museums,
    localFoods: [],
    itinerary,
    hiddenGems: [],
    tips: [],
    lat: city.lat,
    lng: city.lng,
    faqs: [],
  });
}

out.sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(
  path.join(root, "src", "data", "cities.generated.json"),
  JSON.stringify(out),
);

const header = `// AUTO-GENERATED by scripts/generate-cities.mjs — do not edit by hand.
// City list from GeoNames (cities15000); photos from Wikipedia where available.
// Data lives in cities.generated.json so tsc does not infer a 3k-member union.
import type { City } from "@/lib/types";
import { PHOTOS, unsplash } from "@/lib/images";
import rawJson from "./cities.generated.json";

type Gen = Omit<
  City,
  "heroImage" | "thumbnail" | "gallery" | "coordinates" | "attractionSlugs"
> & {
  heroKey: keyof typeof PHOTOS;
  galleryKeys: (keyof typeof PHOTOS)[];
  realPhoto: string | null;
  realGallery: string[];
  lat: number;
  lng: number;
};

const raw = rawJson as Gen[];

export const generatedCities: City[] = raw.map((c) => {
  const { heroKey, galleryKeys, realPhoto, realGallery, lat, lng, ...rest } = c;
  const pool = galleryKeys.map((k) => unsplash(PHOTOS[k], 1400));
  const hero = realPhoto ?? realGallery[0] ?? null;
  // Prefer real, subject-relevant photos; only fall back to stock when we have
  // no real imagery at all (so galleries never show unrelated pictures).
  // Wikimedia originals are normalized at runtime (sanitizeCityImages) so we
  // keep raw Commons URLs here for regenerate stability.
  const realImages = Array.from(new Set([...(hero ? [hero] : []), ...realGallery]));
  const gallery = realImages.length > 0 ? realImages.slice(0, 6) : pool;
  return {
    ...rest,
    coordinates: { lat, lng },
    heroImage: hero ?? unsplash(PHOTOS[heroKey], 2400),
    thumbnail: hero ?? unsplash(PHOTOS[heroKey], 900),
    gallery,
    attractionSlugs: [],
  };
});
`;

fs.writeFileSync(path.join(root, "src", "data", "cities.generated.ts"), header);
console.log(`Generated ${out.length} cities -> src/data/cities.generated.json`);
