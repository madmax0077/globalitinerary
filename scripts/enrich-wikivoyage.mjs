// Re-enrich wikivoyage-map.json with description + price tier for eat/sleep.
// Sources: en.wikivoyage.org listing templates (CC-BY-SA).
// Run: node scripts/enrich-wikivoyage.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mapPath = path.join(__dirname, "wikivoyage-map.json");
const cities = JSON.parse(fs.readFileSync(path.join(__dirname, "city-targets.json"), "utf8"));

let map = {};
try {
  map = JSON.parse(fs.readFileSync(mapPath, "utf8").replace(/^\uFEFF/, ""));
} catch {
  map = {};
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function clean(s) {
  if (!s) return "";
  return s
    .replace(/\[\[[^\]|]*\|([^\]]*)\]\]/g, "$1")
    .replace(/\[\[([^\]]*)\]\]/g, "$1")
    .replace(/\[https?:[^\s\]]+\s+([^\]]+)\]/g, "$1")
    .replace(/\[https?:[^\]]*\]/g, "")
    .replace(/'{2,}/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\{\{[^}]*\}\}/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function priceLevel(price) {
  if (!price) return undefined;
  const p = String(price).toLowerCase();
  const dollars = (p.match(/\$/g) || []).length;
  if (dollars >= 1 && dollars <= 4) return dollars;
  if (/budget|cheap|inexpensive|under\s*\$?\d{1,2}\b|€\s*[1-9]\d?\b/.test(p)) return 1;
  if (/mid-?range|moderate|average/.test(p)) return 2;
  if (/splurge|expensive|upscale|luxury|fine\s*dining/.test(p)) return 4;
  if (/\$\$\$\$|€€€€/.test(p)) return 4;
  if (/\$\$\$|€€€/.test(p)) return 3;
  if (/\$\$|€€/.test(p)) return 2;
  if (/\$|€/.test(p)) return 1;
  return undefined;
}

function parseListings(wt) {
  const result = { eat: [], see: [], do: [], drink: [], buy: [], sleep: [] };
  if (!wt) return result;
  const matches = wt.matchAll(/\{\{\s*(eat|see|do|drink|buy|sleep|listing)\b([\s\S]*?)\}\}/gi);
  for (const mm of matches) {
    let cat = mm[1].toLowerCase();
    const body = mm[2];
    if (cat === "listing") {
      const tm = body.match(/\|\s*type\s*=\s*([a-z]+)/i);
      if (!tm) continue;
      cat = tm[1].toLowerCase();
    }
    if (!result[cat]) continue;
    const nm = body.match(/\|\s*name\s*=\s*([^|}\n]+)/i);
    if (!nm) continue;
    const name = clean(nm[1]);
    if (name.length < 2 || name.length > 80) continue;
    if (result[cat].some((x) => (x.name || x).toLowerCase?.() === name.toLowerCase() || x === name)) continue;

    const contentM = body.match(/\|\s*(?:content|description)\s*=\s*([^|}\n]+)/i);
    const priceM = body.match(/\|\s*price\s*=\s*([^|}\n]+)/i);
    const note = clean(contentM?.[1] || "").slice(0, 140);
    const pl = priceLevel(priceM?.[1] || "");

    if (cat === "eat" || cat === "sleep") {
      const obj = { name };
      if (note) obj.note = note;
      if (pl) obj.priceLevel = pl;
      if (result[cat].length < 10) result[cat].push(obj);
    } else {
      if (result[cat].length < 8) result[cat].push(name);
    }
  }
  return result;
}

const titles = [...new Set(cities.map((c) => c.wikiTitle))];
// Re-enrich titles that already have eat/sleep OR have any data (and a sample of empties later).
const todo = titles.filter((t) => {
  const e = map[t];
  if (!e) return true;
  // Re-fetch if eat/sleep are still bare strings (not enriched objects)
  const eat = e.eat || [];
  if (eat.length && typeof eat[0] === "string") return true;
  const sleep = e.sleep || [];
  if (sleep.length && typeof sleep[0] === "string") return true;
  return false;
});

console.log(`todo: ${todo.length} (map has ${Object.keys(map).length})`);

async function fetchPage(title) {
  const url = `https://en.wikivoyage.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&prop=wikitext&format=json&redirects=1`;
  const res = await fetch(url, {
    headers: { "User-Agent": "GlobalItinerary/1.0 (travel guide; contact globalitinerary0104@gmail.com)" },
  });
  if (res.status === 404) return "";
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data?.parse?.wikitext?.["*"] || "";
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

let done = 0;
for (const t of todo) {
  let ok = false;
  for (let attempt = 1; attempt <= 4 && !ok; attempt++) {
    try {
      const wt = await fetchPage(t);
      const parsed = parseListings(wt);
      const store = {};
      for (const [k, v] of Object.entries(parsed)) if (v.length) store[k] = v;
      map[t] = store;
      ok = true;
    } catch (e) {
      if (String(e.message).includes("429")) await sleep(2000 * attempt);
      else await sleep(500);
    }
  }
  done++;
  if (done % 50 === 0) {
    fs.writeFileSync(mapPath, JSON.stringify(map));
    console.log(`...${done}/${todo.length}`);
  }
  await sleep(220);
}

fs.writeFileSync(mapPath, JSON.stringify(map));
const withEat = Object.values(map).filter((v) => v.eat?.length).length;
console.log(`done. cities with eat: ${withEat} / ${Object.keys(map).length}`);
