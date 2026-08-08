/**
 * Loop 3: null bad/weak real photos, retry Wikipedia fetch for those + prior failures.
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
  const u = cleanWikiUrl(page.original?.source || page.thumbnail?.source || null);
  return u && isScenic(u) ? u : null;
}

async function commonsOk(query) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=" +
    encodeURIComponent(query) +
    "&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url&iiurlwidth=1280";
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  const j = await res.json();
  return Object.values(j.query?.pages || {})
    .map((p) => cleanWikiUrl(p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url))
    .filter((u) => u && isScenic(u));
}

const targets = JSON.parse(fs.readFileSync(path.join(__dirname, "city-targets.json"), "utf8"));
const bySlug = new Map(targets.map((t) => [t.slug, t]));

const cityFile = path.join(root, "src", "data", "cities.generated.ts");
const src = fs.readFileSync(cityFile, "utf8");
const { before, json, after } = extractRaw(src);
const data = JSON.parse(json);

let scrubbed = 0;
const retry = [];
for (const c of data) {
  const beforePhoto = c.realPhoto;
  if (c.realPhoto && !isScenic(c.realPhoto)) {
    c.realPhoto = null;
    scrubbed++;
  }
  const beforeG = (c.realGallery || []).length;
  c.realGallery = (c.realGallery || []).filter(isScenic);
  if (beforeG !== c.realGallery.length) scrubbed++;
  if (!c.realPhoto && c.realGallery[0]) c.realPhoto = c.realGallery[0];
  if (!c.realPhoto || !isScenic(c.realPhoto)) retry.push(c);
  else if (beforePhoto && beforePhoto !== c.realPhoto) {
    // kept
  }
}

console.log("scrubbed items", scrubbed, "retry cities", retry.length);

let fixed = 0;
let failed = 0;
for (const c of retry) {
  const t = bySlug.get(c.slug);
  const titles = [
    t?.wikiTitle,
    `${c.name}, ${c.countryName}`,
    c.name,
  ].filter(Boolean);
  let hero = null;
  let gallery = [];
  for (const title of titles) {
    await sleep(350);
    hero = await wikiHero(title);
    if (hero) break;
  }
  if (!hero) {
    await sleep(350);
    gallery = await commonsOk(`${c.name} ${c.countryName}`);
    hero = gallery[0] || null;
  } else {
    await sleep(250);
    gallery = await commonsOk(`${c.name} ${c.countryName}`);
  }
  if (hero) {
    c.realPhoto = hero;
    c.realGallery = Array.from(new Set([hero, ...gallery])).filter(isScenic).slice(0, 6);
    fixed++;
    console.log("fixed", c.slug);
  } else {
    failed++;
    console.log("still none", c.slug);
  }
}

fs.writeFileSync(cityFile, before + JSON.stringify(data, null, 2) + after);
console.log("DONE fixed", fixed, "failed", failed);
