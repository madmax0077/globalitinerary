/**
 * Final scrub: replace known-bad heroes with verified scenic Wikimedia JPGs only.
 */
import fs from "node:fs";
import { isScenic } from "./lib/bad-image.mjs";

const UA = "GlobalItinerary/1.0 (mailto:globalitinerary0104@gmail.com)";
process.env.NODE_TLS_REJECT_UNAUTHORIZED ??= "0";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function clean(u) {
  if (!u) return null;
  try {
    const x = new URL(u);
    x.search = "";
    return x.toString();
  } catch {
    return u.split("?")[0];
  }
}

function isPhoto(u) {
  return /\.(jpe?g|png|webp)$/i.test(u || "") && isScenic(u) && !/(battle|painting|portrait|ceremony|opening|ogg|svg|bullfighter|anthropologisch|unsplash|balboa)/i.test(u);
}

async function commons(q) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=" +
    encodeURIComponent(q) +
    "&gsrnamespace=6&gsrlimit=15&prop=imageinfo&iiprop=url&iiurlwidth=1800";
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  const j = await res.json();
  return Object.values(j.query?.pages || {})
    .map((p) => clean(p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url))
    .filter(isPhoto);
}

const jobs = [
  {
    slug: "baku",
    queries: [
      "File:Baku skyline",
      "Baku Flame Towers night",
      "Baku Azerbaijan cityscape",
      "Baku Boulevard Caspian",
    ],
  },
  {
    slug: "gold-coast",
    queries: [
      "Surfers Paradise Gold Coast skyline",
      "Gold Coast Queensland beach skyline",
      "Surfers Paradise beach buildings",
    ],
  },
  {
    slug: "oranjestad",
    queries: [
      "Oranjestad Aruba waterfront",
      "Oranjestad harbour Aruba",
      "Oranjestad colorful buildings",
    ],
  },
  {
    slug: "puerto-vallarta",
    queries: [
      "Puerto Vallarta Malecon",
      "Puerto Vallarta bay Mexico",
      "Puerto Vallarta beach skyline",
    ],
  },
];

const cityFile = "src/data/cities.generated.ts";
const src = fs.readFileSync(cityFile, "utf8");
const marker = "const raw: Gen[] = ";
const start = src.indexOf(marker) + marker.length;
const end = src.indexOf("\n];\n\nexport", start);
const before = src.slice(0, start);
const after = src.slice(end + 2);
const data = JSON.parse(src.slice(start, end + 2));
const imagesMap = JSON.parse(fs.readFileSync("scripts/images-map.json", "utf8"));
const galleryMap = JSON.parse(fs.readFileSync("scripts/gallery-map.json", "utf8"));

for (const job of jobs) {
  const c = data.find((x) => x.slug === job.slug);
  if (!c) continue;
  console.log(job.slug, "was", (c.realPhoto || "").slice(0, 80));
  let found = [];
  for (const q of job.queries) {
    await sleep(350);
    found.push(...(await commons(q)));
  }
  found = [...new Set(found)];
  const tokens = job.slug.split("-").filter((t) => t.length > 2);
  found.sort((a, b) => {
    const fa = decodeURIComponent(a.split("/").pop() || "").toLowerCase();
    const fb = decodeURIComponent(b.split("/").pop() || "").toLowerCase();
    const sa = tokens.filter((t) => fa.includes(t)).length;
    const sb = tokens.filter((t) => fb.includes(t)).length;
    return sb - sa;
  });
  if (!found.length) {
    console.log("  NONE");
    continue;
  }
  c.realPhoto = found[0];
  c.realGallery = found.slice(0, 6);
  imagesMap[c.name] = found[0];
  galleryMap[c.name] = c.realGallery;
  console.log("  ->", found[0].slice(0, 100));
}

fs.writeFileSync(cityFile, before + JSON.stringify(data, null, 2) + after);
fs.writeFileSync("scripts/images-map.json", JSON.stringify(imagesMap, null, 2));
fs.writeFileSync("scripts/gallery-map.json", JSON.stringify(galleryMap, null, 2));
console.log("final scrub done");
