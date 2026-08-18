/**
 * Resolve Wikipedia coordinates for top1500 candidates → top1500-extra.txt
 * Format out: slug|name|countrySlug|CC|countryName|lat|lng|timezone|population|isCapital|wikiTitle?
 *
 * Run: $env:NODE_TLS_REJECT_UNAUTHORIZED=0; node scripts/resolve-top1500-extra.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.NODE_TLS_REJECT_UNAUTHORIZED ??= "0";

const UA = "GlobalItinerary/1.0 (mailto:globalitinerary0104@gmail.com)";
const SLEEP_MS = 250;

const TZ_BY_CC = {
  US: "America/New_York",
  CA: "America/Toronto",
  MX: "America/Mexico_City",
  GB: "Europe/London",
  IE: "Europe/Dublin",
  FR: "Europe/Paris",
  ES: "Europe/Madrid",
  PT: "Europe/Lisbon",
  IT: "Europe/Rome",
  DE: "Europe/Berlin",
  AT: "Europe/Vienna",
  CH: "Europe/Zurich",
  NL: "Europe/Amsterdam",
  BE: "Europe/Brussels",
  PL: "Europe/Warsaw",
  CZ: "Europe/Prague",
  SK: "Europe/Bratislava",
  HU: "Europe/Budapest",
  RO: "Europe/Bucharest",
  BG: "Europe/Sofia",
  GR: "Europe/Athens",
  HR: "Europe/Zagreb",
  SI: "Europe/Ljubljana",
  BA: "Europe/Sarajevo",
  RS: "Europe/Belgrade",
  ME: "Europe/Podgorica",
  AL: "Europe/Tirane",
  MK: "Europe/Skopje",
  XK: "Europe/Belgrade",
  TR: "Europe/Istanbul",
  SE: "Europe/Stockholm",
  NO: "Europe/Oslo",
  DK: "Europe/Copenhagen",
  FI: "Europe/Helsinki",
  EE: "Europe/Tallinn",
  LV: "Europe/Riga",
  LT: "Europe/Vilnius",
  IS: "Atlantic/Reykjavik",
  RU: "Europe/Moscow",
  UA: "Europe/Kyiv",
  JP: "Asia/Tokyo",
  KR: "Asia/Seoul",
  CN: "Asia/Shanghai",
  TW: "Asia/Taipei",
  HK: "Asia/Hong_Kong",
  TH: "Asia/Bangkok",
  VN: "Asia/Ho_Chi_Minh",
  KH: "Asia/Phnom_Penh",
  LA: "Asia/Vientiane",
  MY: "Asia/Kuala_Lumpur",
  SG: "Asia/Singapore",
  ID: "Asia/Jakarta",
  PH: "Asia/Manila",
  IN: "Asia/Kolkata",
  NP: "Asia/Kathmandu",
  LK: "Asia/Colombo",
  BD: "Asia/Dhaka",
  PK: "Asia/Karachi",
  AE: "Asia/Dubai",
  SA: "Asia/Riyadh",
  QA: "Asia/Qatar",
  OM: "Asia/Muscat",
  JO: "Asia/Amman",
  IL: "Asia/Jerusalem",
  EG: "Africa/Cairo",
  MA: "Africa/Casablanca",
  TN: "Africa/Tunis",
  ZA: "Africa/Johannesburg",
  KE: "Africa/Nairobi",
  TZ: "Africa/Dar_es_Salaam",
  UG: "Africa/Kampala",
  RW: "Africa/Kigali",
  BW: "Africa/Gaborone",
  NA: "Africa/Windhoek",
  MZ: "Africa/Maputo",
  MG: "Indian/Antananarivo",
  MU: "Indian/Mauritius",
  SC: "Indian/Mahe",
  AU: "Australia/Sydney",
  NZ: "Pacific/Auckland",
  FJ: "Pacific/Fiji",
  BR: "America/Sao_Paulo",
  AR: "America/Argentina/Buenos_Aires",
  CL: "America/Santiago",
  PE: "America/Lima",
  CO: "America/Bogota",
  EC: "America/Guayaquil",
  BO: "America/La_Paz",
  UY: "America/Montevideo",
  PY: "America/Asuncion",
  CR: "America/Costa_Rica",
  PA: "America/Panama",
  GT: "America/Guatemala",
  BZ: "America/Belize",
  CU: "America/Havana",
  DO: "America/Santo_Domingo",
  JM: "America/Jamaica",
  TT: "America/Port_of_Spain",
  IR: "Asia/Tehran",
  GE: "Asia/Tbilisi",
  AM: "Asia/Yerevan",
  AZ: "Asia/Baku",
  KZ: "Asia/Almaty",
  UZ: "Asia/Tashkent",
  MN: "Asia/Ulaanbaatar",
  MM: "Asia/Yangon",
  NP: "Asia/Kathmandu",
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function wikiCoords(title) {
  const url =
    "https://en.wikipedia.org/w/api.php?action=query&prop=coordinates|pageprops&colimit=1&titles=" +
    encodeURIComponent(title) +
    "&format=json&redirects=1";
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const pages = data?.query?.pages || {};
  const page = Object.values(pages)[0];
  if (!page || page.missing) return null;
  const coords = page.coordinates?.[0];
  if (!coords) return null;
  return {
    lat: coords.lat,
    lng: coords.lon,
    title: page.title,
  };
}

const candidates = fs
  .readFileSync(path.join(__dirname, "top1500-candidates.txt"), "utf8")
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith("#"))
  .map((l) => {
    const [slug, name, countrySlug, countryCode, countryName, wikiTitle] = l.split("|");
    return { slug, name, countrySlug, countryCode, countryName, wikiTitle: wikiTitle || name };
  });

console.log("candidates", candidates.length);

const out = [];
const failed = [];

for (let i = 0; i < candidates.length; i++) {
  const c = candidates[i];
  process.stdout.write(`[${i + 1}/${candidates.length}] ${c.slug}... `);
  try {
    let hit = await wikiCoords(c.wikiTitle);
    if (!hit && c.wikiTitle !== c.name) hit = await wikiCoords(c.name);
    if (!hit) {
      console.log("NO COORDS");
      failed.push(c.slug);
      await sleep(SLEEP_MS);
      continue;
    }
    const tz = TZ_BY_CC[c.countryCode] || "UTC";
    const wikiBit = hit.title !== c.name ? `|${hit.title}` : "";
    const line = `${c.slug}|${c.name}|${c.countrySlug}|${c.countryCode}|${c.countryName}|${hit.lat.toFixed(4)}|${hit.lng.toFixed(4)}|${tz}|0|0${wikiBit}`;
    out.push(line);
    console.log("OK", hit.lat.toFixed(2), hit.lng.toFixed(2));
  } catch (e) {
    console.log("ERR", e.message);
    failed.push(c.slug);
  }
  await sleep(SLEEP_MS);
  if ((i + 1) % 50 === 0) {
    fs.writeFileSync(
      path.join(__dirname, "top1500-extra.txt"),
      "# Top tourism cities beyond uniqueTop1000 (~500). Format:\n# slug|name|countrySlug|CC|countryName|lat|lng|timezone|population|isCapital|wikiTitle?\n" +
        out.join("\n") +
        "\n",
    );
    console.log("checkpoint", out.length);
  }
}

const header =
  "# Top tourism cities beyond uniqueTop1000 (~500). Format:\n# slug|name|countrySlug|CC|countryName|lat|lng|timezone|population|isCapital|wikiTitle?\n";
fs.writeFileSync(path.join(__dirname, "top1500-extra.txt"), header + out.join("\n") + "\n");
fs.writeFileSync(
  path.join(__dirname, "top1500-resolve-log.json"),
  JSON.stringify({ resolved: out.length, failed: failed.length, failedSlugs: failed }, null, 2),
);
console.log("\nResolved", out.length, "failed", failed.length);
