/**
 * Resolve Wikipedia coordinates for top2500 candidates → top2500-extra.txt
 * Run: $env:NODE_TLS_REJECT_UNAUTHORIZED=0; node scripts/resolve-top2500-extra.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.NODE_TLS_REJECT_UNAUTHORIZED ??= "0";

const UA = "GlobalItinerary/1.0 (mailto:globalitinerary0104@gmail.com)";
const SLEEP_MS = 250;

const DROP = new Set([
  "ghent-gent",
  "cologne",
  "pune",
  "amboseli",
  "los-roques",
  "phong-nha",
  "khao-sok",
  "railay",
  "terelj",
  "neom",
  "sun-city",
  "dougga",
]);

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
  LU: "Europe/Luxembourg",
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
  LB: "Asia/Beirut",
  IR: "Asia/Tehran",
  GE: "Asia/Tbilisi",
  AM: "Asia/Yerevan",
  AZ: "Asia/Baku",
  KZ: "Asia/Almaty",
  UZ: "Asia/Tashkent",
  MN: "Asia/Ulaanbaatar",
  MM: "Asia/Yangon",
  BT: "Asia/Thimphu",
  MV: "Indian/Maldives",
  BH: "Asia/Bahrain",
  KW: "Asia/Kuwait",
  CY: "Asia/Nicosia",
  MT: "Europe/Malta",
  AD: "Europe/Andorra",
  MC: "Europe/Monaco",
  LI: "Europe/Vaduz",
  SM: "Europe/San_Marino",
  VA: "Europe/Vatican",
  GI: "Europe/Gibraltar",
  IM: "Europe/Isle_of_Man",
  JE: "Europe/Jersey",
  GG: "Europe/Guernsey",
  FO: "Atlantic/Faroe",
  GL: "America/Nuuk",
  SJ: "Arctic/Longyearbyen",
  FK: "Atlantic/Stanley",
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
  ET: "Africa/Addis_Ababa",
  GH: "Africa/Accra",
  SN: "Africa/Dakar",
  ZW: "Africa/Harare",
  ZM: "Africa/Lusaka",
  NG: "Africa/Lagos",
  AU: "Australia/Sydney",
  NZ: "Pacific/Auckland",
  FJ: "Pacific/Fiji",
  PF: "Pacific/Tahiti",
  NC: "Pacific/Noumea",
  WS: "Pacific/Apia",
  TO: "Pacific/Tongatapu",
  VU: "Pacific/Efate",
  AS: "Pacific/Pago_Pago",
  GU: "Pacific/Guam",
  MP: "Pacific/Saipan",
  PW: "Pacific/Palau",
  CK: "Pacific/Rarotonga",
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
  BS: "America/Nassau",
  AW: "America/Aruba",
  CW: "America/Curacao",
  SX: "America/Lower_Princes",
  KY: "America/Cayman",
  VG: "America/Tortola",
  VI: "America/St_Thomas",
  PR: "America/Puerto_Rico",
  BM: "Atlantic/Bermuda",
  RE: "Indian/Reunion",
  MQ: "America/Martinique",
  GP: "America/Guadeloupe",
  GF: "America/Cayenne",
  VE: "America/Caracas",
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
  .readFileSync(path.join(__dirname, "top2500-candidates.filtered.txt"), "utf8")
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith("#"))
  .map((l) => {
    const [slug, name, countrySlug, countryCode, countryName, wikiTitle] = l.split("|");
    return { slug, name, countrySlug, countryCode, countryName, wikiTitle: wikiTitle || name };
  })
  .filter((c) => c.slug && !DROP.has(c.slug));

console.log("candidates", candidates.length);

const out = [];
const failed = [];
const header =
  "# Top tourism cities beyond uniqueTop2000. Format:\n# slug|name|countrySlug|CC|countryName|lat|lng|timezone|population|isCapital|wikiTitle?\n";

function writePartial() {
  fs.writeFileSync(path.join(__dirname, "top2500-extra.txt"), header + out.join("\n") + "\n");
}

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
  if ((i + 1) % 40 === 0) {
    writePartial();
    console.log("checkpoint", out.length);
  }
}

writePartial();
fs.writeFileSync(
  path.join(__dirname, "top2500-resolve-log.json"),
  JSON.stringify({ resolved: out.length, failed: failed.length, failedSlugs: failed }, null, 2),
);
console.log("\nResolved", out.length, "failed", failed.length);
