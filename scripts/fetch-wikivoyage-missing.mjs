/**
 * Fetch Wikivoyage listings only for wiki titles missing from wikivoyage-map.json.
 * Safer incremental alternative to full fetch-wikivoyage.ps1.
 *
 * Run: $env:NODE_TLS_REJECT_UNAUTHORIZED=0; node scripts/fetch-wikivoyage-missing.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.NODE_TLS_REJECT_UNAUTHORIZED ??= "0";

const UA = "GlobalItinerary/1.0 (mailto:globalitinerary0104@gmail.com)";
const SLEEP_MS = 350;
const mapPath = path.join(__dirname, "wikivoyage-map.json");
const targets = JSON.parse(fs.readFileSync(path.join(__dirname, "city-targets.json"), "utf8"));

let map = {};
try {
  map = JSON.parse(fs.readFileSync(mapPath, "utf8").replace(/^\uFEFF/, ""));
} catch {
  map = {};
}

function cleanName(s) {
  if (!s) return "";
  return s
    .replace(/\[\[[^\]|]*\|/g, "")
    .replace(/\[\[/g, "")
    .replace(/\]\]/g, "")
    .replace(/\[https?:[^\s\]]+\s+([^\]]+)\]/g, "$1")
    .replace(/\[https?:[^\]]*\]/g, "")
    .replace(/'''/g, "")
    .replace(/''/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\{\{[^}]*\}\}/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchPage(title) {
  const url = `https://en.wikivoyage.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&prop=wikitext&format=json&redirects=1`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const wt = data?.parse?.wikitext?.["*"] || "";
  const result = { eat: [], see: [], do: [], drink: [], buy: [], sleep: [] };
  const matches = [...wt.matchAll(/\{\{\s*(eat|see|do|drink|buy|sleep|listing)\b(.*?)\}\}/gis)];
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
    const name = cleanName(nm[1]);
    if (name.length < 2 || name.length > 60) continue;
    if (result[cat].some((x) => x.toLowerCase() === name.toLowerCase())) continue;
    if (result[cat].length < 8) result[cat].push(name);
  }
  const store = {};
  for (const [k, v] of Object.entries(result)) if (v.length) store[k] = v;
  return store;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const titles = [...new Set(targets.map((t) => t.wikiTitle || t.name))];
const todo = titles.filter((t) => !(t in map));
console.log(`todo: ${todo.length} (already have ${Object.keys(map).length})`);

let ok = 0;
let empty = 0;
for (let i = 0; i < todo.length; i++) {
  const t = todo[i];
  process.stdout.write(`[${i + 1}/${todo.length}] ${t}... `);
  try {
    const store = await fetchPage(t);
    map[t] = store;
    const n = Object.values(store).reduce((a, b) => a + b.length, 0);
    if (n) {
      ok++;
      console.log(`OK ${n}`);
    } else {
      empty++;
      console.log("empty");
    }
  } catch (e) {
    map[t] = {};
    empty++;
    console.log("ERR", e.message);
  }
  await sleep(SLEEP_MS);
  if ((i + 1) % 25 === 0) {
    fs.writeFileSync(mapPath, JSON.stringify(map));
    console.log("checkpoint", i + 1);
  }
}

fs.writeFileSync(mapPath, JSON.stringify(map));
console.log(`done ok=${ok} empty=${empty} map=${Object.keys(map).length}`);
