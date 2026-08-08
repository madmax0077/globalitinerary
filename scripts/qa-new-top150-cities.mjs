/**
 * QA newly added top tourist cities + sitemap coverage.
 * Run: npx tsx scripts/qa-new-top150-cities.mjs
 */
import fs from "node:fs";
import { cities } from "../src/data/cities.ts";
import { buildFullSitemapEntries } from "../src/lib/sitemap-data.ts";

const added = [
  "san-francisco", "honolulu", "san-diego", "seattle", "philadelphia", "atlanta",
  "hoi-an", "luang-prabang", "jeju", "hangzhou", "xi-an", "goa", "varanasi", "udaipur",
  "galle", "boracay", "palawan", "penang", "langkawi", "koh-samui", "krabi", "pattaya",
  "luxor", "aswan", "sharm-el-sheikh", "victoria-falls", "ibiza", "seville", "granada",
  "bilbao", "bordeaux", "interlaken", "lucerne", "innsbruck", "crete", "rhodes",
  "cappadocia", "bodrum", "medina", "mecca", "galapagos", "punta-cana", "quebec-city",
  "banff", "cairns", "hobart", "rotorua", "fiji", "new-orleans", "nashville", "denver",
  "austin", "savannah", "charleston", "playa-del-carmen", "tulum", "guadalajara",
  "oaxaca", "uyuni", "iguazu", "jaipur", "agra", "fez", "marrakech", "venice", "kyoto",
  "santorini", "frankfurt",
];

const expectedCountry = {
  "san-francisco": "united-states",
  honolulu: "united-states",
  "san-diego": "united-states",
  seattle: "united-states",
  philadelphia: "united-states",
  atlanta: "united-states",
  "new-orleans": "united-states",
  nashville: "united-states",
  denver: "united-states",
  austin: "united-states",
  savannah: "united-states",
  charleston: "united-states",
  "hoi-an": "vietnam",
  "luang-prabang": "laos",
  jeju: "south-korea",
  hangzhou: "china",
  "xi-an": "china",
  goa: "india",
  varanasi: "india",
  udaipur: "india",
  jaipur: "india",
  agra: "india",
  galle: "sri-lanka",
  boracay: "philippines",
  palawan: "philippines",
  penang: "malaysia",
  langkawi: "malaysia",
  "koh-samui": "thailand",
  krabi: "thailand",
  pattaya: "thailand",
  luxor: "egypt",
  aswan: "egypt",
  "sharm-el-sheikh": "egypt",
  "victoria-falls": "zimbabwe",
  ibiza: "spain",
  seville: "spain",
  granada: "spain",
  bilbao: "spain",
  bordeaux: "france",
  interlaken: "switzerland",
  lucerne: "switzerland",
  innsbruck: "austria",
  crete: "greece",
  rhodes: "greece",
  cappadocia: "turkiye",
  bodrum: "turkiye",
  medina: "saudi-arabia",
  mecca: "saudi-arabia",
  galapagos: "ecuador",
  "punta-cana": "dominican-republic",
  "quebec-city": "canada",
  banff: "canada",
  cairns: "australia",
  hobart: "australia",
  rotorua: "new-zealand",
  fiji: "fiji",
  "playa-del-carmen": "mexico",
  tulum: "mexico",
  guadalajara: "mexico",
  oaxaca: "mexico",
  uyuni: "bolivia",
  iguazu: "brazil",
  fez: "morocco",
  marrakech: "morocco",
  venice: "italy",
  kyoto: "japan",
  santorini: "greece",
  frankfurt: "germany",
};

const issues = [];
const ok = [];

for (const slug of added) {
  const c = cities.find((x) => x.slug === slug);
  if (!c) {
    issues.push({ slug, problems: ["MISSING from cities export"] });
    continue;
  }
  const problems = [];
  if (expectedCountry[slug] && c.countrySlug !== expectedCountry[slug]) {
    problems.push(`wrong country: ${c.countrySlug} (want ${expectedCountry[slug]})`);
  }
  if (!c.overview || c.overview.length < 80) problems.push("thin overview");
  if (!c.thingsToDo || c.thingsToDo.length < 5) problems.push(`few sights: ${c.thingsToDo?.length || 0}`);
  if (!c.restaurants || c.restaurants.length < 3) problems.push("few restaurants");
  if (!c.stays || c.stays.length < 2) problems.push("few stays");
  if (!c.heroImage) problems.push("no hero");
  if (!c.coordinates?.lat) problems.push("no coords");
  const blob = JSON.stringify({
    r: c.restaurants,
    s: c.stays,
    t: c.thingsToDo,
    tag: c.tagline,
  });
  if (/local bistro|grand hotel|Main landmark \/ viewpoint|Top sights and local flavour/i.test(blob)) {
    problems.push("GENERIC placeholders");
  }
  if (/historic centre$|Day-trip highlight nearby/i.test((c.thingsToDo || []).join("|"))) {
    problems.push("generic sights list");
  }
  if (problems.length) issues.push({ slug, country: c.countrySlug, problems });
  else ok.push(slug);
}

const sm = buildFullSitemapEntries();
const missingSm = added.filter((s) => !sm.some((e) => e.url.endsWith(`/cities/${s}`)));

console.log("OK cities:", ok.length);
console.log("Issue cities:", issues.length);
for (const i of issues) console.log(` - ${i.slug}: ${i.problems.join("; ")}`);
console.log("Sitemap total:", sm.length, "city urls:", sm.filter((e) => e.url.includes("/cities/")).length);
console.log("Added missing from sitemap:", missingSm.length, missingSm);

fs.writeFileSync(
  new URL("./top150-qa.json", import.meta.url),
  JSON.stringify({ ok, issues, missingSm, sitemapTotal: sm.length }, null, 2),
);
