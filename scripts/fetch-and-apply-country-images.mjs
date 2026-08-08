/**
 * Fetch Wikipedia images for countries still on Unsplash stock / thin realImages.
 * Run: npx tsx scripts/fetch-and-apply-country-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isScenic } from "./lib/bad-image.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const UA = "GlobalItinerary/1.0 (mailto:globalitinerary0104@gmail.com)";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
function cleanWikiUrl(u) {
  if (!u) return null;
  try {
    const url = new URL(u);
    url.search = "";
    return url.toString();
  } catch {
    return String(u).split("?")[0];
  }
}
function extractRaw(src) {
  const marker = "const raw: Gen[] = ";
  const start = src.indexOf(marker);
  const jsonStart = start + marker.length;
  const end = src.indexOf("\n];\n\nexport", jsonStart);
  return { before: src.slice(0, jsonStart), json: src.slice(jsonStart, end + 2), after: src.slice(end + 2) };
}

async function wikiHero(title) {
  const url =
    "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=original|thumbnail&pithumbsize=1280&redirects=1&titles=" +
    encodeURIComponent(title);
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  const j = await res.json();
  const page = Object.values(j.query?.pages || {})[0];
  if (!page || page.missing != null) return null;
  return cleanWikiUrl(page.original?.source || page.thumbnail?.source || null);
}

async function commonsSearch(query) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=" +
    encodeURIComponent(query) +
    "&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url&iiurlwidth=1280";
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  const j = await res.json();
  return Object.values(j.query?.pages || {})
    .map((p) => cleanWikiUrl(p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url))
    .filter((u) => u && isScenic(u));
}

let imagesMap = {};
try {
  imagesMap = JSON.parse(fs.readFileSync(path.join(__dirname, "images-map.json"), "utf8"));
} catch {}

const file = path.join(root, "src", "data", "countries.generated.ts");
const src = fs.readFileSync(file, "utf8");
const { before, json, after } = extractRaw(src);
const data = JSON.parse(json);

let updated = 0;
for (const c of data) {
  const scenic = (c.realImages || []).filter(isScenic);
  if (scenic.length >= 2) {
    c.realImages = scenic.slice(0, 6);
    continue;
  }
  process.stdout.write(`country ${c.slug}... `);
  await sleep(400);
  let hero = isScenic(imagesMap[c.name]) ? cleanWikiUrl(imagesMap[c.name]) : null;
  if (!hero) hero = await wikiHero(c.name);
  await sleep(300);
  let gallery = await commonsSearch(`${c.name} landscape OR skyline OR tourism`);
  gallery = gallery.filter(isScenic);
  const merged = Array.from(new Set([hero, ...scenic, ...gallery].filter(Boolean))).slice(0, 6);
  if (merged.length) {
    c.realImages = merged;
    if (hero) imagesMap[c.name] = hero;
    updated++;
    console.log("OK", merged.length);
  } else {
    console.log("NONE");
  }
}

fs.writeFileSync(path.join(__dirname, "images-map.json"), JSON.stringify(imagesMap, null, 2));
fs.writeFileSync(file, before + JSON.stringify(data, null, 2) + after);
console.log("countries updated", updated);
