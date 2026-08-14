/**
 * Fetch Wikipedia/Commons images ONLY for top-300 tourist cities still on stock.
 * Real Wikimedia photos only — scenic + place-relevance filtered.
 *
 * Run: node --env-file=.env scripts/fetch-top300-city-images.mjs
 * Or:  $env:NODE_TLS_REJECT_UNAUTHORIZED=0; node scripts/fetch-top300-city-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isScenic } from "./lib/bad-image.mjs";
import { uniqueTop300 } from "./top300-tourism-cities.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const UA = "GlobalItinerary/1.0 (mailto:globalitinerary0104@gmail.com)";
const SLEEP_MS = 400;
const CURATED_KEEP_STOCK = new Set([
  "tokyo", "kyoto", "rome", "venice", "dubai", "santorini", "bali",
]);

process.env.NODE_TLS_REJECT_UNAUTHORIZED ??= "0";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function norm(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function extractRaw(src) {
  const marker = "const raw: Gen[] = ";
  const start = src.indexOf(marker);
  if (start < 0) throw new Error("raw marker not found");
  const jsonStart = start + marker.length;
  const end = src.indexOf("\n];\n\nexport", jsonStart);
  if (end < 0) throw new Error("raw end not found");
  return {
    before: src.slice(0, jsonStart),
    json: src.slice(jsonStart, end + 2),
    after: src.slice(end + 2),
  };
}

function cleanWikiUrl(u) {
  if (!u || typeof u !== "string") return null;
  try {
    const url = new URL(u);
    url.search = "";
    return url.toString();
  } catch {
    return u.split("?")[0];
  }
}

function placeRelevant(url, city) {
  if (!url || !isScenic(url)) return false;
  const file = decodeURIComponent(url.split("/").pop() || "");
  const f = norm(file);
  const name = norm(city.name);
  const slug = norm(city.slug.replace(/-/g, " "));
  const country = norm(city.countryName || city.countrySlug);
  const tokens = [...new Set([...name.split(" "), ...slug.split(" ")])].filter((t) => t.length >= 3);
  if (tokens.some((t) => f.includes(t))) return true;
  if (country && country.length >= 4 && f.includes(country.split(" ")[0])) return true;
  if (/(skyline|city|view|panorama|street|harbour|harbor|beach|temple|mosque|church|castle|palace|square|plaza|market|river|lake|mountain|coast|bridge|tower|fort|old.?town|cathedral|monument)/i.test(file)) {
    return true;
  }
  if (/(hilton|portrait|painting|map|stamp|coa|flag|logo|diagram)/i.test(file)) return false;
  return isScenic(url);
}

async function wikiPageImages(title) {
  const url =
    "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages|images&piprop=original|thumbnail&pithumbsize=1280&imlimit=20&redirects=1&titles=" +
    encodeURIComponent(title);
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`wiki ${res.status}`);
  const j = await res.json();
  const page = Object.values(j.query?.pages || {})[0];
  if (!page || page.missing != null) return { hero: null, files: [], finalTitle: title };
  const hero = cleanWikiUrl(page.original?.source || page.thumbnail?.source || null);
  const files = (page.images || []).map((im) => im.title).filter(Boolean);
  return { hero, files, finalTitle: page.title || title };
}

async function fileUrl(fileTitle) {
  const url =
    "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url&titles=" +
    encodeURIComponent(fileTitle);
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;
  const j = await res.json();
  const page = Object.values(j.query?.pages || {})[0];
  return cleanWikiUrl(page?.imageinfo?.[0]?.url || null);
}

async function commonsSearch(query) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=" +
    encodeURIComponent(query) +
    "&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url&iiurlwidth=1280";
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return [];
  const j = await res.json();
  const pages = Object.values(j.query?.pages || {});
  return pages
    .map((p) => cleanWikiUrl(p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url || null))
    .filter(Boolean);
}

async function resolveGallery(fileTitles, city, max = 5) {
  const out = [];
  for (const ft of fileTitles) {
    if (out.length >= max) break;
    if (!/\.(jpe?g|png|webp)$/i.test(ft)) continue;
    if (!isScenic(ft)) continue;
    await sleep(120);
    const u = await fileUrl(ft);
    if (u && placeRelevant(u, city) && !out.includes(u)) out.push(u);
  }
  return out;
}

async function findImages(city, wikiTitle) {
  const tries = [
    wikiTitle,
    `${city.name}, ${city.countryName}`,
    `${city.name} (${city.countryName})`,
    city.name,
  ].filter(Boolean);

  let best = { hero: null, gallery: [], title: null };
  for (const t of tries) {
    await sleep(SLEEP_MS);
    try {
      const { hero, files, finalTitle } = await wikiPageImages(t);
      const gallery = await resolveGallery(files, city, 5);
      const candidates = [hero, ...gallery].filter((u) => u && placeRelevant(u, city));
      if (candidates.length) {
        best = {
          hero: candidates[0],
          gallery: Array.from(new Set(candidates)).slice(0, 6),
          title: finalTitle || t,
        };
        if (best.gallery.length >= 2 || (best.hero && placeRelevant(best.hero, city))) break;
      }
    } catch (e) {
      console.warn("wiki fail", t, e.message);
    }
  }

  if (!best.hero) {
    await sleep(SLEEP_MS);
    const commons = await commonsSearch(`${city.name} ${city.countryName}`);
    const ok = commons.filter((u) => placeRelevant(u, city));
    if (ok.length) best = { hero: ok[0], gallery: ok.slice(0, 6), title: "commons:" + city.name };
  }
  return best;
}

const targets = JSON.parse(fs.readFileSync(path.join(__dirname, "city-targets.json"), "utf8"));
const bySlug = new Map(targets.map((t) => [t.slug, t]));

let imagesMap = {};
try {
  imagesMap = JSON.parse(fs.readFileSync(path.join(__dirname, "images-map.json"), "utf8"));
} catch {}
let galleryMap = {};
try {
  galleryMap = JSON.parse(fs.readFileSync(path.join(__dirname, "gallery-map.json"), "utf8"));
} catch {}

const cityFile = path.join(root, "src", "data", "cities.generated.ts");
const src = fs.readFileSync(cityFile, "utf8");
const { before, json, after } = extractRaw(src);
const data = JSON.parse(json);
const dataBySlug = new Map(data.map((c) => [c.slug, c]));

const top = uniqueTop300();
const need = [];
for (const e of top) {
  if (CURATED_KEEP_STOCK.has(e.slug)) continue;
  const candidates = [e.slug, ...(e.alts || [])];
  let c = null;
  for (const s of candidates) {
    if (dataBySlug.has(s)) {
      c = dataBySlug.get(s);
      break;
    }
  }
  if (!c) continue;
  const has =
    c.realPhoto &&
    String(c.realPhoto).includes("upload.wikimedia.org") &&
    isScenic(c.realPhoto) &&
    placeRelevant(c.realPhoto, c);
  if (!has) need.push({ entry: e, city: c });
}

console.log("top300 needing real photos:", need.length);

let updated = 0;
let failed = 0;
const log = [];

for (const { entry, city: c } of need) {
  const t = bySlug.get(c.slug) || bySlug.get(entry.slug);
  const wikiTitle = t?.wikiTitle || entry.wikiTitle || c.name;
  process.stdout.write(`fetch ${c.slug} (${wikiTitle})... `);
  try {
    const found = await findImages(
      {
        slug: c.slug,
        name: c.name,
        countryName: c.countryName,
        countrySlug: c.countrySlug,
      },
      wikiTitle,
    );
    if (!found.hero) {
      console.log("NONE");
      failed++;
      log.push({ slug: c.slug, ok: false });
      continue;
    }
    c.realPhoto = found.hero;
    c.realGallery = found.gallery.length ? found.gallery : [found.hero];
    imagesMap[wikiTitle] = found.hero;
    if (found.title && found.title !== wikiTitle) imagesMap[found.title] = found.hero;
    galleryMap[wikiTitle] = c.realGallery;
    updated++;
    console.log("OK", found.hero.slice(0, 72));
    log.push({ slug: c.slug, ok: true, hero: found.hero });
  } catch (e) {
    console.log("ERR", e.message);
    failed++;
    log.push({ slug: c.slug, ok: false, err: e.message });
  }

  if (updated > 0 && updated % 20 === 0) {
    fs.writeFileSync(path.join(__dirname, "images-map.json"), JSON.stringify(imagesMap, null, 2));
    fs.writeFileSync(path.join(__dirname, "gallery-map.json"), JSON.stringify(galleryMap, null, 2));
    fs.writeFileSync(cityFile, before + JSON.stringify(data, null, 2) + after);
    console.log("checkpoint", updated);
  }
}

fs.writeFileSync(path.join(__dirname, "images-map.json"), JSON.stringify(imagesMap, null, 2));
fs.writeFileSync(path.join(__dirname, "gallery-map.json"), JSON.stringify(galleryMap, null, 2));
fs.writeFileSync(cityFile, before + JSON.stringify(data, null, 2) + after);
fs.writeFileSync(
  path.join(__dirname, "fetch-top300-images-log.json"),
  JSON.stringify({ updated, failed, need: need.length, log }, null, 2),
);
console.log("DONE updated", updated, "failed", failed, "of", need.length);
