import fs from "node:fs";

const targets = JSON.parse(fs.readFileSync(new URL("./city-targets.json", import.meta.url), "utf8"));
const sightsSrc = fs.readFileSync(new URL("../src/data/city-sights.ts", import.meta.url), "utf8");
const keys = [...sightsSrc.matchAll(/^\s+(?:"([^"]+)"|([a-z0-9-]+)):/gm)].map((m) => m[1] || m[2]);
const set = new Set(keys);
const targetSlugs = new Set(targets.map((t) => t.slug));

const famous = [
  "paris", "london", "rome", "barcelona", "amsterdam", "berlin", "prague", "vienna", "budapest",
  "athens", "istanbul", "dubai", "tokyo", "kyoto", "osaka", "seoul", "bangkok", "singapore",
  "hong-kong", "kuala-lumpur", "bali", "jakarta", "hanoi", "ho-chi-minh-city", "siem-reap",
  "delhi", "mumbai", "new-delhi", "cairo", "marrakesh", "cape-town", "sydney", "melbourne",
  "new-york-city", "los-angeles", "san-francisco", "mexico-city", "rio-de-janeiro",
  "buenos-aires", "lima", "cusco", "phuket", "chiang-mai", "goa", "jaipur", "varanasi",
  "amman", "doha", "manila", "taipei", "shanghai", "beijing", "macau", "colombo",
  "zanzibar", "nairobi", "auckland", "honolulu", "las-vegas", "miami", "chicago",
  "toronto", "vancouver", "montreal", "havana", "cartagena", "bogota", "santiago",
  "reykjavik", "edinburgh", "dublin", "copenhagen", "stockholm", "oslo", "helsinki",
  "warsaw", "krakow", "lisbon", "porto", "madrid", "seville", "granada", "florence",
  "milan", "naples", "venice", "santorini", "dubrovnik", "salzburg", "bruges",
  "queenstown", "christchurch", "wellington", "perth", "brisbane", "adelaide",
  "phnom-penh", "luang-prabang", "yangon", "kathmandu", "pokhara", "tehran",
  "tbilisi", "yerevan", "baku", "almaty", "tashkent", "samarkand",
];

const missing = famous.filter((s) => targetSlugs.has(s) && !set.has(s));
console.log("curated sights:", set.size);
console.log("famous in targets missing sights (" + missing.length + "):");
console.log(missing.join(", "));
