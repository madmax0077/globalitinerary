/**
 * Collapse near-duplicate city targets (same name + country + <40km)
 * into one canonical slug, restore Hanover (Germany), and emit redirects.
 *
 * Run: node scripts/dedupe-city-targets.mjs && node scripts/generate-cities.mjs
 */
import fs from "node:fs";

const targetsPath = new URL("./city-targets.json", import.meta.url);
const redirectsPath = new URL("../src/data/city-slug-redirects.ts", import.meta.url);

let targets = JSON.parse(fs.readFileSync(targetsPath, "utf8"));

function haversine(a, b) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function slugify(name) {
  return String(name || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .replace(/æ/g, "ae")
    .replace(/ø/g, "oe")
    .replace(/å/g, "aa")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Prefer these slugs when a cluster contains them. */
const PREFERRED = new Set([
  "hampi",
  "bruges",
  "cusco",
  "banff",
  "da-nang",
  "xi-an",
  "cebu",
  "ibiza",
  "como",
  "paros",
  "queenstown",
  "seville",
  "toledo",
  "uluru",
  "whistler",
  "labuan-bajo",
  "port-louis",
  "victoria",
  "akureyri",
  "antigua",
  "apia",
  "arles",
  "arusha",
  "aspen",
  "basseterre",
  "bharatpur",
  "bridgetown",
  "cabo-san-lucas",
  "cambridge",
  "capri",
  "carmel-by-the-sea",
  "cartagena",
  "castries",
  "charleston",
  "cordoba",
  "freeport",
  "krabi",
  "kuressaare",
  "la-ceiba",
  "leon",
  "malacca",
  "malmo",
  "matera",
  "merida",
  "moab",
  "musanze",
  "nadi",
  "naha",
  "naxos",
  "oban",
  "pai",
  "paro",
  "port-of-spain",
  "roseau",
  "salvador",
  "san-jose",
  "san-marino",
  "san-miguel-de-allende",
  "san-pedro",
  "santa-fe",
  "savannah",
  "sedona",
  "skopje",
  "stellenbosch",
  "suva",
  "tequila",
  "vang-vieng",
  "victoria-falls",
  "gili-trawangan",
  "jackson-hole",
  "penang-george-town",
  "zanzibar-stone-town",
  "south-lake-tahoe",
  "nags-head",
  "page-arizona",
]);

function score(t, name) {
  const expected = slugify(name);
  let s = 0;
  if (PREFERRED.has(t.slug)) s += 500;
  if (t.slug === expected) s += 200;
  if (t.wikiTitle && slugify(t.wikiTitle) === t.slug) s += 40;
  // Penalise country-prefixed / suffixed aliases (iceland-akureyri, banff-canada).
  if (t.countrySlug && (t.slug.startsWith(`${t.countrySlug}-`) || t.slug.endsWith(`-${t.countrySlug}`))) s -= 80;
  if (/-(uk|us|nz|az|ga|sc|nm|cr|es|hn|mx|wy|town|city|india|bahamas|colombia|argentina|nicaragua|belize|zimbabwe|thailand|canada)$/.test(t.slug)) {
    s -= 60;
  }
  s += Math.min(40, Math.log10((t.population || 1) + 1) * 8);
  s -= t.slug.length * 0.4;
  return s;
}

function pickCanonical(cluster) {
  const name = cluster[0].name;
  return [...cluster].sort((a, b) => score(b, name) - score(a, name))[0];
}

const byNameCountry = new Map();
for (const t of targets) {
  const k = `${String(t.name).toLowerCase()}|${t.countrySlug}`;
  if (!byNameCountry.has(k)) byNameCountry.set(k, []);
  byNameCountry.get(k).push(t);
}

const redirects = {};
const dropSlugs = new Set();
const kept = [];
const seenSlug = new Set();
const logs = [];

for (const t of targets) {
  const k = `${String(t.name).toLowerCase()}|${t.countrySlug}`;
  const group = byNameCountry.get(k);
  if (!group || group.length === 1) {
    if (!seenSlug.has(t.slug)) {
      kept.push(t);
      seenSlug.add(t.slug);
    }
    continue;
  }

  // Cluster by distance so Portland OR / Portland ME stay distinct.
  const clusters = [];
  for (const item of group) {
    let placed = false;
    for (const c of clusters) {
      if (haversine(c[0], item) < 40) {
        c.push(item);
        placed = true;
        break;
      }
    }
    if (!placed) clusters.push([item]);
  }

  const mine = clusters.find((c) => c.some((x) => x.slug === t.slug));
  if (!mine) continue;
  if (mine.length === 1) {
    if (!seenSlug.has(t.slug)) {
      kept.push(t);
      seenSlug.add(t.slug);
    }
    continue;
  }

  const canonical = pickCanonical(mine);
  if (t.slug === canonical.slug) {
    if (!seenSlug.has(t.slug)) {
      kept.push(t);
      seenSlug.add(t.slug);
    }
    continue;
  }
  dropSlugs.add(t.slug);
  redirects[t.slug] = canonical.slug;
  logs.push(`${t.slug} -> ${canonical.slug} (${t.name}, ${t.countrySlug})`);
}

// Identity bug: slug "hannover" was Hampi. After dropping it, add the real German city
// under the English Wikipedia slug so we do not reuse the poisoned URL.
const hasHanoverDe = kept.some(
  (t) => t.countrySlug === "germany" && /hannover|hanover/i.test(`${t.slug} ${t.name}`),
);
if (!hasHanoverDe) {
  kept.push({
    slug: "hanover",
    name: "Hanover",
    wikiTitle: "Hanover",
    countrySlug: "germany",
    countryName: "Germany",
    countryCode: "DE",
    population: 543000,
    lat: 52.3759,
    lng: 9.732,
    timezone: "Europe/Berlin",
    isCapital: false,
  });
  logs.push("added hanover (Germany) — slug hannover remains a redirect to hampi");
}

kept.sort((a, b) => a.name.localeCompare(b.name));
fs.writeFileSync(targetsPath, JSON.stringify(kept, null, 2) + "\n");

const redirectEntries = Object.entries(redirects).sort(([a], [b]) => a.localeCompare(b));
const ts = `/** Auto-generated by scripts/dedupe-city-targets.mjs — old slug → canonical slug. */
export const CITY_SLUG_REDIRECTS: Record<string, string> = {
${redirectEntries.map(([from, to]) => `  ${JSON.stringify(from)}: ${JSON.stringify(to)},`).join("\n")}
};

export function canonicalCitySlug(slug: string): string {
  return CITY_SLUG_REDIRECTS[slug] ?? slug;
}
`;
fs.writeFileSync(redirectsPath, ts);

console.log(`Removed ${dropSlugs.size} duplicate targets; now ${kept.length}`);
logs.forEach((l) => console.log(" -", l));
console.log(`Wrote ${redirectEntries.length} redirects -> src/data/city-slug-redirects.ts`);
