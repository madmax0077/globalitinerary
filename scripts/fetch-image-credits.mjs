/**
 * Builds src/data/image-credits.generated.json.
 *
 * Every photo on the site is a Wikimedia Commons file, and most are CC BY-SA,
 * which requires naming the photographer. The image URLs in src/data carry no
 * attribution, so this pulls Artist + license from the Commons API and stores a
 * lookup keyed by Commons file name.
 *
 * Usage: node scripts/fetch-image-credits.mjs [--limit N] [--retry-missing]
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const OUT = "src/data/image-credits.generated.json";
const API = "https://commons.wikimedia.org/w/api.php";
const BATCH = 50;
const UA =
  "globalitinerary.in image-attribution bot (https://globalitinerary.in; contact via site)";

const args = process.argv.slice(2);
const limitArg = args.indexOf("--limit");
const LIMIT = limitArg > -1 ? Number(args[limitArg + 1]) : Infinity;

/* ---------- 1. collect unique Commons file names from src/data ---------- */

function collectFileNames() {
  const names = new Set();
  const urlRe = /https:\/\/upload\.wikimedia\.org\/[^"'\s\\)]+/g;

  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (/\.(ts|tsx|json)$/.test(entry.name)) {
        const text = readFileSync(p, "utf8");
        for (const match of text.matchAll(urlRe)) {
          const name = commonsFileName(match[0].replace(/[",]+$/, ""));
          if (name) names.add(name);
        }
      }
    }
  };
  walk("src/data");
  return [...names];
}

/** .../commons/thumb/a/ab/Name.jpg/800px-Name.jpg -> Name.jpg */
export function commonsFileName(url) {
  const m = url.match(/\/commons\/(?:thumb\/)?[0-9a-f]\/[0-9a-f]{2}\/([^/?#]+)/);
  if (!m) return null;
  try {
    return decodeURIComponent(m[1]);
  } catch {
    return m[1];
  }
}

/* ---------- 2. Commons API ---------- */

const stripHtml = (html) =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Commons Artist fields are free-form HTML and often carry contact details or
 * copyright boilerplate that must not be rendered as a byline.
 */
function cleanArtist(raw) {
  let s = raw;
  s = s.replace(/\[(?:user|mail)[^\]]*\]/gi, " ");
  s = s.replace(/[\w.+-]+@[\w.-]+\.\w+/g, " ");
  s = s.replace(/\b[\w.+-]+\s+at\s+[\w.-]+\s+dot\s+\w+\b/gi, " ");
  s = s.replace(/^\s*(?:©|\(c\)|copyright)\s*/i, "");
  s = s.replace(/^\s*\d{4}\s+by\s+/i, "");
  s = s.replace(/^\s*(?:photo(?:graph)?|image|picture)\s+(?:by|:)\s*/i, "");
  s = s.replace(/\s*[,/;|]\s*$/, "");
  s = s.replace(/\s{2,}/g, " ").trim();
  // Placeholders that carry no attribution value
  if (/^(unknown|anonymous|n\/?a|\?|-{1,})$/i.test(s)) return "";
  return s;
}

async function fetchBatch(titles, attempt = 0) {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    formatversion: "2",
    prop: "imageinfo",
    iiprop: "extmetadata|url",
    iiextmetadatafilter: "Artist|Credit|LicenseShortName|LicenseUrl|UsageTerms",
    iiextmetadatalanguage: "en",
    titles: titles.map((t) => `File:${t}`).join("|"),
  });

  try {
    const res = await fetch(`${API}?${params}`, {
      headers: { "User-Agent": UA, "Accept-Encoding": "gzip" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    if (attempt >= 4) throw err;
    const wait = 1000 * 2 ** attempt;
    console.warn(`  retry in ${wait}ms (${err.message})`);
    await new Promise((r) => setTimeout(r, wait));
    return fetchBatch(titles, attempt + 1);
  }
}

/* ---------- 3. run ---------- */

const all = collectFileNames();
console.log(`unique Commons files in src/data: ${all.length}`);

// Resume support: keep anything already fetched.
const prev = existsSync(OUT)
  ? JSON.parse(readFileSync(OUT, "utf8"))
  : { licenses: [], files: {} };
const licenses = prev.licenses ?? [];
const files = prev.files ?? {};

const licenseIndex = new Map(licenses.map((l, i) => [`${l[0]}|${l[1]}`, i]));
const internLicense = (name, url) => {
  if (!name && !url) return -1;
  const key = `${name || ""}|${url || ""}`;
  if (!licenseIndex.has(key)) {
    licenseIndex.set(key, licenses.push([name || "", url || ""]) - 1);
  }
  return licenseIndex.get(key);
};

const pending = all.filter((n) => !(n in files));
const todo = pending.slice(0, LIMIT);
console.log(
  `cached: ${all.length - pending.length}, pending: ${pending.length}, fetching now: ${todo.length}`
);

let done = 0;
let withArtist = 0;
for (let i = 0; i < todo.length; i += BATCH) {
  const batch = todo.slice(i, i + BATCH);
  const json = await fetchBatch(batch);
  const pages = json?.query?.pages ?? [];

  const seen = new Set();
  for (const page of pages) {
    // Commons reports titles with spaces; URLs (and our keys) use underscores.
    const name = String(page.title || "")
      .replace(/^File:/, "")
      .replace(/ /g, "_");
    seen.add(name);
    const meta = page?.imageinfo?.[0]?.extmetadata;
    if (!meta) {
      files[name] = null; // missing / deleted file — do not retry every run
      continue;
    }
    const artist = meta.Artist?.value ? cleanArtist(stripHtml(meta.Artist.value)) : "";
    const credit = meta.Credit?.value ? stripHtml(meta.Credit.value) : "";
    const licName = meta.LicenseShortName?.value
      ? stripHtml(meta.LicenseShortName.value)
      : "";
    const licUrl = meta.LicenseUrl?.value ? stripHtml(meta.LicenseUrl.value) : "";
    if (artist) withArtist++;
    files[name] = [
      artist.slice(0, 160),
      internLicense(licName, licUrl),
      credit && credit !== artist ? credit.slice(0, 120) : "",
    ];
  }
  // Titles Commons normalized away or never returned
  for (const name of batch) if (!seen.has(name) && !(name in files)) files[name] = null;

  done += batch.length;
  if (done % 500 < BATCH || done >= todo.length) {
    console.log(`  ${done}/${todo.length} (${withArtist} with artist)`);
    writeFileSync(OUT, JSON.stringify({ licenses, files }));
  }
  await new Promise((r) => setTimeout(r, 120));
}

writeFileSync(OUT, JSON.stringify({ licenses, files }));

const total = Object.keys(files).length;
const resolved = Object.values(files).filter((v) => v && v[0]).length;
console.log(`\nwrote ${OUT}`);
console.log(`  entries: ${total}`);
console.log(`  with artist: ${resolved} (${((resolved / total) * 100).toFixed(1)}%)`);
console.log(`  licenses: ${licenses.length}`);
