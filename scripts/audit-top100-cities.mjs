import fs from "node:fs";

// Top tourist-visited cities (composite of Euromonitor / Mastercard / common visitor rankings).
// Each entry: preferred slug, display name, countrySlug, alt slugs to match in DB.
const TOP100 = [
  { slug: "bangkok", name: "Bangkok", countrySlug: "thailand" },
  { slug: "paris", name: "Paris", countrySlug: "france" },
  { slug: "london", name: "London", countrySlug: "united-kingdom" },
  { slug: "dubai", name: "Dubai", countrySlug: "united-arab-emirates" },
  { slug: "singapore", name: "Singapore", countrySlug: "singapore" },
  { slug: "new-york-city", name: "New York City", countrySlug: "united-states", alts: ["new-york", "nyc"] },
  { slug: "kuala-lumpur", name: "Kuala Lumpur", countrySlug: "malaysia" },
  { slug: "tokyo", name: "Tokyo", countrySlug: "japan" },
  { slug: "istanbul", name: "Istanbul", countrySlug: "turkey" },
  { slug: "seoul", name: "Seoul", countrySlug: "south-korea", alts: ["seoul-si"] },
  { slug: "hong-kong", name: "Hong Kong", countrySlug: "hong-kong", alts: ["hongkong"] },
  { slug: "barcelona", name: "Barcelona", countrySlug: "spain" },
  { slug: "amsterdam", name: "Amsterdam", countrySlug: "netherlands" },
  { slug: "milan", name: "Milan", countrySlug: "italy", alts: ["milano"] },
  { slug: "rome", name: "Rome", countrySlug: "italy", alts: ["roma"] },
  { slug: "osaka", name: "Osaka", countrySlug: "japan" },
  { slug: "vienna", name: "Vienna", countrySlug: "austria", alts: ["wien"] },
  { slug: "prague", name: "Prague", countrySlug: "czech-republic", alts: ["praha"] },
  { slug: "los-angeles", name: "Los Angeles", countrySlug: "united-states", alts: ["la"] },
  { slug: "madrid", name: "Madrid", countrySlug: "spain" },
  { slug: "shanghai", name: "Shanghai", countrySlug: "china" },
  { slug: "sydney", name: "Sydney", countrySlug: "australia" },
  { slug: "munich", name: "Munich", countrySlug: "germany", alts: ["muenchen", "munchen"] },
  { slug: "dublin", name: "Dublin", countrySlug: "ireland" },
  { slug: "berlin", name: "Berlin", countrySlug: "germany" },
  { slug: "beijing", name: "Beijing", countrySlug: "china", alts: ["peking"] },
  { slug: "moscow", name: "Moscow", countrySlug: "russia", alts: ["moskva"] },
  { slug: "toronto", name: "Toronto", countrySlug: "canada" },
  { slug: "lisbon", name: "Lisbon", countrySlug: "portugal", alts: ["lisboa"] },
  { slug: "frankfurt", name: "Frankfurt", countrySlug: "germany", alts: ["frankfurt-am-main"] },
  { slug: "mexico-city", name: "Mexico City", countrySlug: "mexico", alts: ["ciudad-de-mexico"] },
  { slug: "miami", name: "Miami", countrySlug: "united-states" },
  { slug: "venice", name: "Venice", countrySlug: "italy", alts: ["venezia"] },
  { slug: "orlando", name: "Orlando", countrySlug: "united-states" },
  { slug: "delhi", name: "Delhi", countrySlug: "india", alts: ["new-delhi"] },
  { slug: "mumbai", name: "Mumbai", countrySlug: "india", alts: ["bombay"] },
  { slug: "cairo", name: "Cairo", countrySlug: "egypt" },
  { slug: "athens", name: "Athens", countrySlug: "greece", alts: ["athina"] },
  { slug: "budapest", name: "Budapest", countrySlug: "hungary" },
  { slug: "warsaw", name: "Warsaw", countrySlug: "poland", alts: ["warszawa"] },
  { slug: "stockholm", name: "Stockholm", countrySlug: "sweden" },
  { slug: "copenhagen", name: "Copenhagen", countrySlug: "denmark", alts: ["kobenhavn"] },
  { slug: "brussels", name: "Brussels", countrySlug: "belgium", alts: ["bruxelles"] },
  { slug: "zurich", name: "Zurich", countrySlug: "switzerland" },
  { slug: "geneva", name: "Geneva", countrySlug: "switzerland", alts: ["geneve"] },
  { slug: "edinburgh", name: "Edinburgh", countrySlug: "united-kingdom" },
  { slug: "florence", name: "Florence", countrySlug: "italy", alts: ["firenze"] },
  { slug: "naples", name: "Naples", countrySlug: "italy", alts: ["napoli"] },
  { slug: "porto", name: "Porto", countrySlug: "portugal" },
  { slug: "seville", name: "Seville", countrySlug: "spain", alts: ["sevilla"] },
  { slug: "valencia", name: "Valencia", countrySlug: "spain" },
  { slug: "nice", name: "Nice", countrySlug: "france" },
  { slug: "lyon", name: "Lyon", countrySlug: "france" },
  { slug: "marrakesh", name: "Marrakesh", countrySlug: "morocco", alts: ["marrakech"] },
  { slug: "cape-town", name: "Cape Town", countrySlug: "south-africa" },
  { slug: "rio-de-janeiro", name: "Rio de Janeiro", countrySlug: "brazil", alts: ["rio"] },
  { slug: "buenos-aires", name: "Buenos Aires", countrySlug: "argentina" },
  { slug: "lima", name: "Lima", countrySlug: "peru" },
  { slug: "cusco", name: "Cusco", countrySlug: "peru", alts: ["cuzco"] },
  { slug: "san-francisco", name: "San Francisco", countrySlug: "united-states" },
  { slug: "las-vegas", name: "Las Vegas", countrySlug: "united-states" },
  { slug: "chicago", name: "Chicago", countrySlug: "united-states" },
  { slug: "washington-dc", name: "Washington, D.C.", countrySlug: "united-states", alts: ["washington", "washington-d-c"] },
  { slug: "boston", name: "Boston", countrySlug: "united-states" },
  { slug: "vancouver", name: "Vancouver", countrySlug: "canada" },
  { slug: "montreal", name: "Montreal", countrySlug: "canada" },
  { slug: "melbourne", name: "Melbourne", countrySlug: "australia" },
  { slug: "auckland", name: "Auckland", countrySlug: "new-zealand" },
  { slug: "queenstown", name: "Queenstown", countrySlug: "new-zealand" },
  { slug: "bali", name: "Bali", countrySlug: "indonesia", alts: ["denpasar"] },
  { slug: "jakarta", name: "Jakarta", countrySlug: "indonesia" },
  { slug: "ho-chi-minh-city", name: "Ho Chi Minh City", countrySlug: "vietnam", alts: ["saigon", "ho-chi-minh"] },
  { slug: "hanoi", name: "Hanoi", countrySlug: "vietnam" },
  { slug: "phuket", name: "Phuket", countrySlug: "thailand" },
  { slug: "chiang-mai", name: "Chiang Mai", countrySlug: "thailand" },
  { slug: "siem-reap", name: "Siem Reap", countrySlug: "cambodia" },
  { slug: "phnom-penh", name: "Phnom Penh", countrySlug: "cambodia" },
  { slug: "manila", name: "Manila", countrySlug: "philippines" },
  { slug: "cebu", name: "Cebu", countrySlug: "philippines", alts: ["cebu-city"] },
  { slug: "taipei", name: "Taipei", countrySlug: "taiwan" },
  { slug: "macau", name: "Macau", countrySlug: "macau", alts: ["macao"] },
  { slug: "doha", name: "Doha", countrySlug: "qatar" },
  { slug: "abu-dhabi", name: "Abu Dhabi", countrySlug: "united-arab-emirates" },
  { slug: "tel-aviv", name: "Tel Aviv", countrySlug: "israel", alts: ["tel-aviv-yafo"] },
  { slug: "jerusalem", name: "Jerusalem", countrySlug: "israel" },
  { slug: "amman", name: "Amman", countrySlug: "jordan" },
  { slug: "petra", name: "Petra", countrySlug: "jordan", alts: ["wadi-musa"] },
  { slug: "kyoto", name: "Kyoto", countrySlug: "japan" },
  { slug: "santorini", name: "Santorini", countrySlug: "greece", alts: ["thira", "fira"] },
  { slug: "mykonos", name: "Mykonos", countrySlug: "greece" },
  { slug: "reykjavik", name: "Reykjavik", countrySlug: "iceland" },
  { slug: "helsinki", name: "Helsinki", countrySlug: "finland" },
  { slug: "oslo", name: "Oslo", countrySlug: "norway" },
  { slug: "krakow", name: "Krakow", countrySlug: "poland", alts: ["cracow"] },
  { slug: "dubrovnik", name: "Dubrovnik", countrySlug: "croatia" },
  { slug: "split", name: "Split", countrySlug: "croatia" },
  { slug: "salzburg", name: "Salzburg", countrySlug: "austria" },
  { slug: "bruges", name: "Bruges", countrySlug: "belgium", alts: ["brugge"] },
  { slug: "istanbul", name: "Istanbul", countrySlug: "turkey" }, // duplicate guard
  { slug: "antalya", name: "Antalya", countrySlug: "turkey" },
  { slug: "cancun", name: "Cancún", countrySlug: "mexico", alts: ["cancun"] },
  { slug: "havana", name: "Havana", countrySlug: "cuba", alts: ["la-habana"] },
  { slug: "cartagena", name: "Cartagena", countrySlug: "colombia" },
  { slug: "santiago", name: "Santiago", countrySlug: "chile", alts: ["santiago-de-chile"] },
  { slug: "johannesburg", name: "Johannesburg", countrySlug: "south-africa" },
  { slug: "nairobi", name: "Nairobi", countrySlug: "kenya" },
  { slug: "zanzibar", name: "Zanzibar", countrySlug: "tanzania", alts: ["zanzibar-city", "stone-town"] },
  { slug: "marrakech", name: "Marrakech", countrySlug: "morocco", alts: ["marrakesh"] },
  { slug: "jaipur", name: "Jaipur", countrySlug: "india" },
  { slug: "agra", name: "Agra", countrySlug: "india" },
  { slug: "kathmandu", name: "Kathmandu", countrySlug: "nepal" },
  { slug: "colombo", name: "Colombo", countrySlug: "sri-lanka" },
  { slug: "male", name: "Malé", countrySlug: "maldives", alts: ["male-city"] },
  { slug: "honolulu", name: "Honolulu", countrySlug: "united-states" },
  { slug: "san-diego", name: "San Diego", countrySlug: "united-states" },
  { slug: "seattle", name: "Seattle", countrySlug: "united-states" },
  { slug: "houston", name: "Houston", countrySlug: "united-states" },
  { slug: "philadelphia", name: "Philadelphia", countrySlug: "united-states" },
  { slug: "atlanta", name: "Atlanta", countrySlug: "united-states" },
];

// Deduplicate by slug
const seen = new Set();
const unique = [];
for (const c of TOP100) {
  if (seen.has(c.slug)) continue;
  seen.add(c.slug);
  unique.push(c);
}

const targets = JSON.parse(fs.readFileSync(new URL("./city-targets.json", import.meta.url), "utf8"));
const bySlug = new Map(targets.map((t) => [t.slug, t]));
const byName = new Map(targets.map((t) => [t.name.toLowerCase(), t]));

// Also parse curated cities.ts slugs
const curatedSrc = fs.readFileSync(new URL("../src/data/cities.ts", import.meta.url), "utf8");
const curatedSlugs = new Set([...curatedSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]));

function find(entry) {
  const candidates = [entry.slug, ...(entry.alts || [])];
  for (const s of candidates) {
    if (bySlug.has(s) || curatedSlugs.has(s)) {
      return { slug: bySlug.has(s) ? s : s, source: curatedSlugs.has(s) ? "curated" : "generated", match: s };
    }
  }
  // fuzzy name
  const n = entry.name.toLowerCase();
  if (byName.has(n)) return { slug: byName.get(n).slug, source: "generated", match: "name" };
  // slug contains
  for (const t of targets) {
    if (t.countrySlug === entry.countrySlug && (t.slug.includes(entry.slug) || entry.slug.includes(t.slug))) {
      return { slug: t.slug, source: "generated-fuzzy", match: t.slug };
    }
  }
  return null;
}

const present = [];
const missing = [];
for (const e of unique.slice(0, 100)) {
  const hit = find(e);
  if (hit) present.push({ ...e, matched: hit });
  else missing.push(e);
}

console.log("TOP list size (deduped):", unique.length);
console.log("Checked first 100 unique:", Math.min(100, unique.length));
console.log("PRESENT:", present.length);
console.log("MISSING:", missing.length);
console.log("\n--- MISSING ---");
for (const m of missing) console.log(`- ${m.name} (${m.slug}) / ${m.countrySlug}`);
console.log("\n--- PRESENT (sample) ---");
for (const p of present.slice(0, 15)) console.log(`+ ${p.name} -> ${p.matched.slug} [${p.matched.source}]`);

fs.writeFileSync(
  new URL("./top100-audit.json", import.meta.url),
  JSON.stringify({ present, missing, checked: unique.slice(0, 100) }, null, 2),
);
console.log("\nWrote scripts/top100-audit.json");
