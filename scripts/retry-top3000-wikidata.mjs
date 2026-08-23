/**
 * Retry remaining towns via Wikidata P625 coordinates.
 * Run: $env:NODE_TLS_REJECT_UNAUTHORIZED=0; node scripts/retry-top3000-wikidata.mjs
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
  ["noli", "Noli", "italy", "IT", "Italy", "Noli"],
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
  ["ubeda", "Úbeda", "spain", "ES", "Spain", "Úbeda"],
  ["baeza", "Baeza", "spain", "ES", "Spain", "Baeza, Spain"],
  ["tossa", "Tossa de Mar", "spain", "ES", "Spain", "Tossa de Mar"],
  ["blanes", "Blanes", "spain", "ES", "Spain", "Blanes"],
  ["plasencia", "Plasencia", "spain", "ES", "Spain", "Plasencia"],
  ["viveiro", "Viveiro", "spain", "ES", "Spain", "Viveiro"],
  ["labin", "Labin", "croatia", "HR", "Croatia", "Labin"],
  ["kinosaki", "Kinosaki", "japan", "JP", "Japan", "Kinosaki, Hyōgo"],
  ["inuyama", "Inuyama", "japan", "JP", "Japan", "Inuyama"],
  ["phrae", "Phrae", "thailand", "TH", "Thailand", "Phrae"],
  ["ao-nang", "Ao Nang", "thailand", "TH", "Thailand", "Ao Nang"],
  ["uvita", "Uvita", "costa-rica", "CR", "Costa Rica", "Uvita"],
  ["dominical", "Dominical", "costa-rica", "CR", "Costa Rica", "Dominical"],
  ["pedasi", "Pedasí", "panama", "PA", "Panama", "Pedasí"],
  ["otavalo", "Otavalo", "ecuador", "EC", "Ecuador", "Otavalo"],
  ["futaleufu", "Futaleufú", "chile", "CL", "Chile", "Futaleufú"],
  ["joao-pessoa", "João Pessoa", "brazil", "BR", "Brazil", "João Pessoa"],
  ["barreirinhas", "Barreirinhas", "brazil", "BR", "Brazil", "Barreirinhas"],
  ["my-tho", "Mỹ Tho", "vietnam", "VN", "Vietnam", "Mỹ Tho"],
  ["sa-dec", "Sa Đéc", "vietnam", "VN", "Vietnam", "Sa Đéc"],
  ["hofn", "Höfn", "iceland", "IS", "Iceland", "Höfn"],
  ["amed", "Amed", "indonesia", "ID", "Indonesia", "Amed, Bali"],
  ["pemuteran", "Pemuteran", "indonesia", "ID", "Indonesia", "Pemuteran"],
  ["mompox", "Santa Cruz de Mompox", "colombia", "CO", "Colombia", "Santa Cruz de Mompox"],
  ["tayrona-taganga", "Taganga", "colombia", "CO", "Colombia", "Taganga"],
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function wikiDataCoords(title) {
  const url =
    "https://www.wikidata.org/w/api.php?action=wbgetentities&sites=enwiki&titles=" +
    encodeURIComponent(title) +
    "&props=claims|sitelinks&format=json&redirects=yes";
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const entity = Object.values(data.entities || {})[0];
  if (!entity || entity.missing) return null;
  const mainsnak = entity.claims?.P625?.[0]?.mainsnak?.datavalue?.value;
  if (!mainsnak || mainsnak.latitude == null) return null;
  return { lat: mainsnak.latitude, lng: mainsnak.longitude, title };
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
    let hit = await wikiDataCoords(wikiTitle);
    if (!hit && wikiTitle !== name) hit = await wikiDataCoords(name);
    if (!hit) {
      console.log("NO COORDS");
      failed.push(slug);
      await sleep(200);
      continue;
    }
    const tz = TZ_BY_CC[cc] || "UTC";
    const wikiBit = wikiTitle !== name ? `|${wikiTitle}` : "";
    added.push(
      `${slug}|${name}|${countrySlug}|${cc}|${countryName}|${hit.lat.toFixed(4)}|${hit.lng.toFixed(4)}|${tz}|0|0${wikiBit}`,
    );
    existing.add(slug);
    console.log("OK", hit.lat.toFixed(2), hit.lng.toFixed(2));
  } catch (e) {
    console.log("ERR", e.message);
    failed.push(slug);
  }
  await sleep(200);
}

if (added.length) fs.appendFileSync(extraPath, added.join("\n") + "\n");
console.log("wikidata added", added.length, "failed", failed.length);
