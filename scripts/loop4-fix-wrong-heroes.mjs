/**
 * Fix known wrong Wikipedia heroes (homonyms / portraits / maps / animals).
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

async function pick(titles, commonsQuery) {
  for (const title of titles) {
    await sleep(400);
    const url =
      "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=original|thumbnail&pithumbsize=1280&redirects=1&titles=" +
      encodeURIComponent(title);
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    const j = await res.json();
    const page = Object.values(j.query?.pages || {})[0];
    const u = clean(page?.original?.source || page?.thumbnail?.source);
    if (u && isScenic(u) && !/Portrait|OpenStreetMap|Tragelaphus|Official_Portrait/i.test(u)) {
      return u;
    }
  }
  await sleep(400);
  const curl =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=" +
    encodeURIComponent(commonsQuery) +
    "&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url&iiurlwidth=1280";
  const res = await fetch(curl, { headers: { "User-Agent": UA } });
  const j = await res.json();
  for (const p of Object.values(j.query?.pages || {})) {
    const u = clean(p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url);
    if (u && isScenic(u) && !/Portrait|OpenStreetMap|Tragelaphus|Official_Portrait/i.test(u)) return u;
  }
  return null;
}

const WRONG = {
  kennedy: {
    titles: ["Kennedy, Liberia", "Kennedy (Liberia)"],
    commons: "Kennedy Liberia town OR street",
  },
  nyala: {
    titles: ["Nyala, Sudan", "Nyala"],
    commons: "Nyala Sudan city OR market OR street -Tragelaphus",
  },
  abobo: {
    titles: ["Abobo", "Abobo, Ivory Coast"],
    commons: "Abobo Abidjan street OR market OR city",
  },
};

// Also null any hero matching hard-wrong patterns sitewide
const HARD_WRONG =
  /Official_Portrait|John_F_Kennedy|OpenStreetMap|Tragelaphus|Portrait\.jpg|Portrait_/i;

const cityFile = path.join(root, "src", "data", "cities.generated.ts");
const src = fs.readFileSync(cityFile, "utf8");
const { before, json, after } = extractRaw(src);
const data = JSON.parse(json);

let fixed = 0;
for (const c of data) {
  const bad =
    (c.realPhoto && HARD_WRONG.test(c.realPhoto)) ||
    Object.prototype.hasOwnProperty.call(WRONG, c.slug);
  if (!bad) continue;

  // scrub bad gallery entries too
  c.realGallery = (c.realGallery || []).filter((u) => isScenic(u) && !HARD_WRONG.test(u));
  c.realPhoto = null;

  const spec = WRONG[c.slug];
  const titles = spec?.titles || [`${c.name}, ${c.countryName}`, c.name];
  const commons = spec?.commons || `${c.name} ${c.countryName}`;
  const hero = await pick(titles, commons);
  if (hero) {
    c.realPhoto = hero;
    c.realGallery = Array.from(new Set([hero, ...c.realGallery])).slice(0, 6);
    fixed++;
    console.log("fixed", c.slug, hero.slice(0, 80));
  } else {
    console.log("cleared (no replacement)", c.slug);
  }
}

fs.writeFileSync(cityFile, before + JSON.stringify(data, null, 2) + after);
console.log("DONE fixed", fixed);
