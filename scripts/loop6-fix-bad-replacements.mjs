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

async function commons(q) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=" +
    encodeURIComponent(q) +
    "&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url&iiurlwidth=1280";
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  const j = await res.json();
  return Object.values(j.query?.pages || {})
    .map((p) => clean(p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url))
    .filter((u) => u && isScenic(u));
}

async function wiki(title) {
  const url =
    "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=original|thumbnail&pithumbsize=1280&redirects=1&titles=" +
    encodeURIComponent(title);
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  const j = await res.json();
  const page = Object.values(j.query?.pages || {})[0];
  const u = clean(page?.original?.source || page?.thumbnail?.source);
  return u && isScenic(u) ? u : null;
}

const FIX = {
  dayrah: {
    titles: ["Deira (Dubai)", "Deira, Dubai"],
    commons: "Deira Dubai creek OR souk OR street",
  },
  kennedy: {
    titles: ["Monrovia", "Kennedy, Liberia"],
    commons: "Monrovia Liberia waterfront OR street OR cityscape",
  },
  "az-za-ayin": {
    titles: ["Al Daayen", "Lusail"],
    commons: "Lusail Qatar skyline OR marina OR city",
  },
};

const cityFile = path.join(root, "src", "data", "cities.generated.ts");
const src = fs.readFileSync(cityFile, "utf8");
const { before, json, after } = extractRaw(src);
const data = JSON.parse(json);

// Global scrub of non-scenic + obvious wrong patterns
let scrubbed = 0;
for (const c of data) {
  if (c.realPhoto && !isScenic(c.realPhoto)) {
    c.realPhoto = null;
    scrubbed++;
  }
  c.realGallery = (c.realGallery || []).filter(isScenic);
  if (!c.realPhoto && c.realGallery[0]) c.realPhoto = c.realGallery[0];
}
console.log("scrubbed", scrubbed);

for (const [slug, spec] of Object.entries(FIX)) {
  const c = data.find((x) => x.slug === slug);
  if (!c) continue;
  c.realPhoto = null;
  c.realGallery = [];
  let hero = null;
  for (const t of spec.titles) {
    await sleep(400);
    hero = await wiki(t);
    if (hero) break;
  }
  if (!hero) {
    await sleep(400);
    const g = await commons(spec.commons);
    hero = g[0] || null;
    if (g.length) c.realGallery = g.slice(0, 6);
  } else {
    await sleep(300);
    const g = await commons(spec.commons);
    c.realGallery = Array.from(new Set([hero, ...g])).slice(0, 6);
  }
  if (hero) {
    c.realPhoto = hero;
    if (!c.realGallery.length) c.realGallery = [hero];
    console.log("fixed", slug, hero.slice(0, 100));
  } else {
    console.log("cleared", slug);
  }
}

fs.writeFileSync(cityFile, before + JSON.stringify(data, null, 2) + after);
console.log("done");
