/**
 * Retry failed top3000 Wikipedia lookups with more specific titles.
 * Run: $env:NODE_TLS_REJECT_UNAUTHORIZED=0; node scripts/retry-top3000-failed.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { TZ_BY_CC } from "./lib/country-tz.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.NODE_TLS_REJECT_UNAUTHORIZED ??= "0";
const UA = "GlobalItinerary/1.0 (mailto:globalitinerary0104@gmail.com)";

const RETRIES = [
  ["trevi-umbria", "Trevi", "italy", "IT", "Italy", "Trevi, Umbria"],
  ["fabriano", "Fabriano", "italy", "IT", "Italy", "Fabriano"],
  ["cesenatico", "Cesenatico", "italy", "IT", "Italy", "Cesenatico"],
  ["finale-ligure", "Finale Ligure", "italy", "IT", "Italy", "Finale Ligure"],
  ["alassio", "Alassio", "italy", "IT", "Italy", "Alassio"],
  ["noli", "Noli", "italy", "IT", "Italy", "Noli, Liguria"],
  ["salo", "Salò", "italy", "IT", "Italy", "Salò"],
  ["pizzo-calabria", "Pizzo", "italy", "IT", "Italy", "Pizzo, Calabria"],
  ["maratea", "Maratea", "italy", "IT", "Italy", "Maratea"],
  ["favignana", "Favignana", "italy", "IT", "Italy", "Favignana"],
  ["monteriggioni", "Monteriggioni", "italy", "IT", "Italy", "Monteriggioni"],
  ["san-quirico", "San Quirico d'Orcia", "italy", "IT", "Italy", "San Quirico d'Orcia"],
  ["orbetello", "Orbetello", "italy", "IT", "Italy", "Orbetello"],
  ["forte-dei-marmi", "Forte dei Marmi", "italy", "IT", "Italy", "Forte dei Marmi"],
  ["barga", "Barga", "italy", "IT", "Italy", "Barga"],
  ["castelnuovo-garfagnana", "Castelnuovo di Garfagnana", "italy", "IT", "Italy", "Castelnuovo di Garfagnana"],
  ["bagni-di-lucca", "Bagni di Lucca", "italy", "IT", "Italy", "Bagni di Lucca"],
  ["san-miniato", "San Miniato", "italy", "IT", "Italy", "San Miniato"],
  ["colle-val-d-elsa", "Colle di Val d'Elsa", "italy", "IT", "Italy", "Colle di Val d'Elsa"],
  ["grazalema", "Grazalema", "spain", "ES", "Spain", "Grazalema"],
  ["arcos-de-la-frontera", "Arcos de la Frontera", "spain", "ES", "Spain", "Arcos de la Frontera"],
  ["cazorla", "Cazorla", "spain", "ES", "Spain", "Cazorla, Jaén"],
  ["ubeda", "Úbeda", "spain", "ES", "Spain", "Úbeda"],
  ["baeza", "Baeza", "spain", "ES", "Spain", "Baeza, Spain"],
  ["tossa", "Tossa de Mar", "spain", "ES", "Spain", "Tossa de Mar"],
  ["blanes", "Blanes", "spain", "ES", "Spain", "Blanes"],
  ["plasencia", "Plasencia", "spain", "ES", "Spain", "Plasencia"],
  ["astorga", "Astorga", "spain", "ES", "Spain", "Astorga, Spain"],
  ["viveiro", "Viveiro", "spain", "ES", "Spain", "Viveiro"],
  ["peniche", "Peniche", "portugal", "PT", "Portugal", "Peniche, Portugal"],
  ["labin", "Labin", "croatia", "HR", "Croatia", "Labin"],
  ["blagaj", "Blagaj", "bosnia-and-herzegovina", "BA", "Bosnia and Herzegovina", "Blagaj, Mostar"],
  ["feldkirch", "Feldkirch", "austria", "AT", "Austria", "Feldkirch, Vorarlberg"],
  ["kinosaki", "Kinosaki", "japan", "JP", "Japan", "Kinosaki Onsen"],
  ["inuyama", "Inuyama", "japan", "JP", "Japan", "Inuyama"],
  ["si-satchanalai", "Si Satchanalai", "thailand", "TH", "Thailand", "Si Satchanalai Historical Park"],
  ["phrae", "Phrae", "thailand", "TH", "Thailand", "Phrae (city)"],
  ["ao-nang", "Ao Nang", "thailand", "TH", "Thailand", "Ao Nang"],
  ["hammamet", "Hammamet", "tunisia", "TN", "Tunisia", "Hammamet, Tunisia"],
  ["uvita", "Uvita", "costa-rica", "CR", "Costa Rica", "Uvita, Costa Rica"],
  ["dominical", "Dominical", "costa-rica", "CR", "Costa Rica", "Dominical, Costa Rica"],
  ["pedasi", "Pedasí", "panama", "PA", "Panama", "Pedasí"],
  ["santa-catalina-pa", "Santa Catalina", "panama", "PA", "Panama", "Santa Catalina, Veraguas"],
  ["tayrona-taganga", "Taganga", "colombia", "CO", "Colombia", "Taganga"],
  ["mompox", "Santa Cruz de Mompox", "colombia", "CO", "Colombia", "Santa Cruz de Mompox"],
  ["urubamba", "Urubamba", "peru", "PE", "Peru", "Urubamba, Peru"],
  ["otavalo", "Otavalo", "ecuador", "EC", "Ecuador", "Otavalo"],
  ["mindo", "Mindo", "ecuador", "EC", "Ecuador", "Mindo, Ecuador"],
  ["futaleufu", "Futaleufú", "chile", "CL", "Chile", "Futaleufú"],
  ["joao-pessoa", "João Pessoa", "brazil", "BR", "Brazil", "João Pessoa"],
  ["barreirinhas", "Barreirinhas", "brazil", "BR", "Brazil", "Barreirinhas"],
  ["thann", "Thann", "france", "FR", "France", "Thann, Haut-Rhin"],
  ["aberfeldy", "Aberfeldy", "united-kingdom", "GB", "United Kingdom", "Aberfeldy, Scotland"],
  ["my-tho", "Mỹ Tho", "vietnam", "VN", "Vietnam", "Mỹ Tho"],
  ["dong-van", "Đồng Văn", "vietnam", "VN", "Vietnam", "Đồng Văn (town)"],
  ["bac-ha", "Bắc Hà", "vietnam", "VN", "Vietnam", "Bắc Hà district"],
  ["sa-dec", "Sa Đéc", "vietnam", "VN", "Vietnam", "Sa Đéc"],
  ["kampong-cham", "Kampong Cham", "cambodia", "KH", "Cambodia", "Kampong Cham (city)"],
  ["loen", "Loen", "norway", "NO", "Norway", "Loen, Norway"],
  ["stryn", "Stryn", "norway", "NO", "Norway", "Stryn (village)"],
  ["lom-norway", "Lom", "norway", "NO", "Norway", "Lom, Norway"],
  ["rauma", "Rauma", "finland", "FI", "Finland", "Rauma, Finland"],
  ["hofn", "Höfn", "iceland", "IS", "Iceland", "Höfn"],
  ["san-francisco-nayarit", "San Francisco", "mexico", "MX", "Mexico", "San Francisco, Nayarit"],
  ["hoa-lu", "Hoa Lư", "vietnam", "VN", "Vietnam", "Hoa Lư"],
  ["wadi-rum-village", "Wadi Rum Village", "jordan", "JO", "Jordan", "Wadi Rum"],
  ["amed", "Amed", "indonesia", "ID", "Indonesia", "Amed, Bali"],
  ["pemuteran", "Pemuteran", "indonesia", "ID", "Indonesia", "Pemuteran"],
  ["sidemen", "Sidemen", "indonesia", "ID", "Indonesia", "Sidemen, Bali"],
  ["munduk", "Munduk", "indonesia", "ID", "Indonesia", "Munduk"],
];

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
  const page = Object.values(data?.query?.pages || {})[0];
  if (!page || page.missing) return null;
  const coords = page.coordinates?.[0];
  if (!coords) return null;
  return { lat: coords.lat, lng: coords.lon, title: page.title };
}

const extraPath = path.join(__dirname, "top3000-extra.txt");
const existing = new Set(
  fs
    .readFileSync(extraPath, "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => l.split("|")[0]),
);

const added = [];
const failed = [];
for (const [slug, name, countrySlug, cc, countryName, wikiTitle] of RETRIES) {
  if (existing.has(slug)) continue;
  process.stdout.write(`${slug}... `);
  try {
    let hit = await wikiCoords(wikiTitle);
    if (!hit) hit = await wikiCoords(name);
    if (!hit) {
      console.log("NO COORDS");
      failed.push(slug);
      await sleep(250);
      continue;
    }
    const tz = TZ_BY_CC[cc] || "UTC";
    const wikiBit = hit.title !== name ? `|${hit.title}` : "";
    const line = `${slug}|${name}|${countrySlug}|${cc}|${countryName}|${hit.lat.toFixed(4)}|${hit.lng.toFixed(4)}|${tz}|0|0${wikiBit}`;
    added.push(line);
    existing.add(slug);
    console.log("OK", hit.lat.toFixed(2), hit.lng.toFixed(2));
  } catch (e) {
    console.log("ERR", e.message);
    failed.push(slug);
  }
  await sleep(250);
}

if (added.length) {
  fs.appendFileSync(extraPath, added.join("\n") + "\n");
}
console.log("retry added", added.length, "failed", failed.length);
