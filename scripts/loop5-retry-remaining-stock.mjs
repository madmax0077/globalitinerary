/**
 * Final pass: try better wiki titles for remaining stock cities (not curated).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isScenic } from "./lib/bad-image.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const UA = "GlobalItinerary/1.0 (mailto:globalitinerary0104@gmail.com)";
const KEEP = new Set(["tokyo", "kyoto", "rome", "venice", "dubai", "santorini", "bali"]);

const ALIASES = {
  "al-basrah-al-qadimah": ["Basra", "Old Basra"],
  "al-matar-al-atiq": ["Doha", "Old Airport (Doha)"],
  "al-mawsil-al-jadidah": ["Mosul", "New Mosul"],
  "az-za-ayin": ["Al Daayen", "Al-Daayen"],
  contumo: ["Contumazá", "Contumaza"],
  "dalap-uliga-dorrit": ["Majuro", "Delap-Uliga-Djarrit"],
  dayrah: ["Deira", "Deira, Dubai"],
  "hayy-khilda": ["Amman", "Khalda"],
  "kola-a": ["Kolasin", "Kolašin"],
  nggosi: ["Nggosi", "Bandung"],
  "reino-de-bandim": ["Bissau", "Bandim"],
  "saint-john-s": ["St. John's, Antigua and Barbuda", "Saint John's, Antigua and Barbuda"],
  winejok: ["Wau, South Sudan", "Winejok"],
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
function clean(u) {
  if (!u) return null;
  try {
    const x = new URL(u);
    x.search = "";
    return x.toString();
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

async function heroFrom(title) {
  const url =
    "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=original|thumbnail&pithumbsize=1280&redirects=1&titles=" +
    encodeURIComponent(title);
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  const j = await res.json();
  const page = Object.values(j.query?.pages || {})[0];
  const u = clean(page?.original?.source || page?.thumbnail?.source);
  return u && isScenic(u) ? u : null;
}

async function commons(q) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=" +
    encodeURIComponent(q) +
    "&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url&iiurlwidth=1280";
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  const j = await res.json();
  return Object.values(j.query?.pages || {})
    .map((p) => clean(p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url))
    .filter((u) => u && isScenic(u));
}

const cityFile = path.join(root, "src", "data", "cities.generated.ts");
const src = fs.readFileSync(cityFile, "utf8");
const { before, json, after } = extractRaw(src);
const data = JSON.parse(json);

let fixed = 0;
for (const c of data) {
  if (KEEP.has(c.slug)) continue;
  if (c.realPhoto && isScenic(c.realPhoto)) continue;
  const titles = ALIASES[c.slug] || [`${c.name}, ${c.countryName}`, c.name];
  let hero = null;
  for (const t of titles) {
    await sleep(400);
    hero = await heroFrom(t);
    if (hero) break;
  }
  if (!hero) {
    await sleep(350);
    const g = await commons(`${titles[0]} ${c.countryName}`);
    hero = g[0] || null;
    if (hero) c.realGallery = g.slice(0, 6);
  }
  if (hero) {
    c.realPhoto = hero;
    if (!c.realGallery?.length) c.realGallery = [hero];
    fixed++;
    console.log("fixed", c.slug, hero.slice(0, 90));
  } else {
    console.log("still stock", c.slug);
  }
}

// Also replace kennedy History_of_Liberia if still map-like
for (const c of data) {
  if (c.slug !== "kennedy") continue;
  if (c.realPhoto && /History_of_/i.test(c.realPhoto)) {
    await sleep(400);
    const g = await commons("Monrovia Liberia street OR city -map -flag");
    if (g[0]) {
      c.realPhoto = g[0];
      c.realGallery = g.slice(0, 6);
      console.log("kennedy replaced", g[0].slice(0, 90));
    }
  }
}

fs.writeFileSync(cityFile, before + JSON.stringify(data, null, 2) + after);
console.log("DONE fixed", fixed);
