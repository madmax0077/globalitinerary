/**
 * Fetch Wikivoyage "Understand" intro for top-300 cities with thin/generic overviews.
 * Writes short sourced blurbs into city-enrichments.ts (never invents landmarks).
 *
 * Run: $env:NODE_TLS_REJECT_UNAUTHORIZED=0; node scripts/enrich-top300-overviews.mjs
 */
import fs from "node:fs";
import { uniqueTop300 } from "./top300-tourism-cities.mjs";

process.env.NODE_TLS_REJECT_UNAUTHORIZED ??= "0";

const ROOT = new URL("../src/data/", import.meta.url);
const targets = JSON.parse(fs.readFileSync(new URL("./city-targets.json", import.meta.url), "utf8"));
let enrichSrc = fs.readFileSync(new URL("city-enrichments.ts", ROOT), "utf8");
const genSrc = fs.readFileSync(new URL("cities.generated.ts", ROOT), "utf8");

const UA = "GlobalItinerary/1.0 (mailto:globalitinerary0104@gmail.com)";

function countryMatch(a, b) {
  const norm = (s) => (s === "turkey" ? "turkiye" : s === "czech-republic" ? "czechia" : s);
  return norm(a) === norm(b);
}

function resolve(entry) {
  for (const s of [entry.slug, ...(entry.alts || [])]) {
    const t = targets.find((x) => x.slug === s && countryMatch(x.countrySlug, entry.countrySlug));
    if (t) return t;
  }
  return targets.find(
    (x) => countryMatch(x.countrySlug, entry.countrySlug) && x.name.toLowerCase() === entry.name.toLowerCase(),
  );
}

function hasEnrichKey(slug) {
  return new RegExp(`(?:^|\\n)\\s+(?:\"${slug}\"|${slug}):\\s*\\{`, "m").test(enrichSrc);
}

function genericOverview(slug) {
  const re = new RegExp(`"slug": "${slug}"[\\s\\S]*?"overview": "([^"]*)"`, "m");
  const m = genSrc.match(re);
  if (!m) return true;
  return / is (one of .+?'s major cities|the capital of )/i.test(m[1]);
}

function clean(s) {
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

function extractUnderstand(wt) {
  if (!wt) return "";
  const m = wt.match(/==\s*Understand\s*==([\s\S]*?)(?=\n==[^=]|\n\{\{|$)/i);
  const body = m ? m[1] : wt.slice(0, 1200);
  const paras = body
    .split(/\n\n+/)
    .map(clean)
    .filter((p) => p.length > 60 && !/^[=*]/.test(p) && !/^\{\{/.test(p));
  const text = paras.slice(0, 2).join(" ");
  if (text.length < 80) return "";
  return text.slice(0, 520).replace(/\s+\S*$/, "") + (text.length > 520 ? "…" : "");
}

async function fetchWikitext(title) {
  const url = `https://en.wikivoyage.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&prop=wikitext&format=json&redirects=1`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return "";
  const j = await res.json();
  return j?.parse?.wikitext?.["*"] || "";
}

function esc(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function keyLiteral(slug) {
  return /^[a-z][a-z0-9]*$/.test(slug) ? slug : `"${slug}"`;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const need = [];
for (const e of uniqueTop300()) {
  const t = resolve(e);
  if (!t) continue;
  if (hasEnrichKey(t.slug)) continue;
  if (!genericOverview(t.slug) && !genericOverview(e.slug)) continue;
  need.push({ slug: t.slug, title: t.wikiTitle || t.name, name: t.name });
}

console.log("top300 needing overview enrichment:", need.length);

const blocks = [];
let ok = 0;
let fail = 0;

for (const row of need.slice(0, 120)) {
  process.stdout.write(`fetch ${row.slug}... `);
  try {
    await sleep(280);
    const wt = await fetchWikitext(row.title);
    const overview = extractUnderstand(wt);
    if (!overview) {
      console.log("NONE");
      fail++;
      continue;
    }
    blocks.push(`  ${keyLiteral(row.slug)}: {
    tagline: "${esc(`Explore ${row.name}`)}",
    overview: "${esc(overview)} (Source: Wikivoyage, CC BY-SA.)",
  }`);
    ok++;
    console.log("OK", overview.slice(0, 60));
  } catch (e) {
    console.log("ERR", e.message);
    fail++;
  }
}

if (blocks.length) {
  const idx = enrichSrc.lastIndexOf("\n};");
  if (idx < 0) throw new Error("city-enrichments closing not found");
  let head = enrichSrc.slice(0, idx).replace(/\s*$/, "");
  if (!head.endsWith(",")) head += ",";
  enrichSrc = `${head}\n${blocks.join(",\n")}\n};\n`;
  fs.writeFileSync(new URL("city-enrichments.ts", ROOT), enrichSrc);
}

console.log("DONE added", ok, "failed", fail);
