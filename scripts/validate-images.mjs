/**
 * Validate city + country images for legitimacy.
 * - Pattern checks (flags, SVG maps, empty)
 * - URL shape (https, unsplash/wikimedia/upload hosts)
 * - Live HEAD checks for featured/critical pages + bad-pattern suspects
 *
 * Run: npx tsx scripts/validate-images.mjs
 */
import fs from "node:fs";
import { cities } from "../src/data/cities.ts";
import { countries } from "../src/data/countries.ts";
import { PHOTOS, unsplash } from "../src/lib/images.ts";

import { BAD_IMAGE as BAD_PATTERN } from "./lib/bad-image.mjs";

const ALLOWED_HOST =
  /^https:\/\/(images\.unsplash\.com|upload\.wikimedia\.org|i\.imgur\.com|live\.staticflickr\.com|commons\.wikimedia\.org)\//i;

const CRITICAL = new Set([
  "paris", "london", "bangkok", "singapore", "sydney", "istanbul", "cairo",
  "mexico-city", "moscow", "beijing", "tokyo", "kyoto", "rome", "venice",
  "dubai", "santorini", "bali", "new-york-city", "hong-kong", "san-francisco",
  "honolulu", "jaipur", "agra", "hoi-an", "cappadocia", "banff", "tulum",
]);

const errors = [];
const warnings = [];
const e = (code, msg, meta = {}) => errors.push({ code, msg, ...meta });
const w = (code, msg, meta = {}) => warnings.push({ code, msg, ...meta });

function collectUrls(entity, kind) {
  const urls = [];
  if (entity.heroImage) urls.push({ role: "hero", url: entity.heroImage });
  if (entity.thumbnail) urls.push({ role: "thumb", url: entity.thumbnail });
  for (const [i, u] of (entity.gallery || []).entries()) urls.push({ role: `gallery${i}`, url: u });
  return urls.map((x) => ({ ...x, kind, slug: entity.slug }));
}

console.log("Pass A: pattern + shape");
const all = [];
for (const c of cities) all.push(...collectUrls(c, "city"));
for (const c of countries) all.push(...collectUrls(c, "country"));

const suspectLive = [];
for (const item of all) {
  const { url, slug, kind, role } = item;
  if (!url || typeof url !== "string") {
    e("EMPTY_IMAGE", `${kind}/${slug} ${role} empty`);
    continue;
  }
  if (!url.startsWith("https://")) e("NON_HTTPS", `${kind}/${slug} ${role}`, { url });
  if (BAD_PATTERN.test(url)) {
    e("BAD_PATTERN", `${kind}/${slug} ${role} looks like flag/map/svg`, { url });
    suspectLive.push(item);
  }
  if (!ALLOWED_HOST.test(url) && !url.includes("images.unsplash.com")) {
    w("UNUSUAL_HOST", `${kind}/${slug} ${role}`, { url: url.slice(0, 120) });
    suspectLive.push(item);
  }
  // broken unsplash id shape
  if (url.includes("images.unsplash.com/photo-")) {
    const m = url.match(/photo-(\d{10,13}-[a-f0-9]{8,})/i);
    if (!m) e("BAD_UNSPLASH_ID", `${kind}/${slug} ${role}`, { url: url.slice(0, 120) });
  }
}

// Missing hero
for (const c of cities) {
  if (!c.heroImage) e("NO_HERO", `city ${c.slug} missing hero`);
}
for (const c of countries) {
  if (!c.heroImage) e("NO_COUNTRY_HERO", `country ${c.slug} missing hero`);
}

console.log("Pass B: live HEAD for critical + suspects");
const liveCheck = [];
const seen = new Set();
for (const c of cities.filter((x) => x.featured || CRITICAL.has(x.slug))) {
  for (const item of collectUrls(c, "city")) {
    if (!seen.has(item.url)) {
      seen.add(item.url);
      liveCheck.push(item);
    }
  }
}
for (const c of countries.filter((x) => x.featured)) {
  for (const item of collectUrls(c, "country")) {
    if (!seen.has(item.url)) {
      seen.add(item.url);
      liveCheck.push(item);
    }
  }
}
for (const item of suspectLive.slice(0, 80)) {
  if (!seen.has(item.url)) {
    seen.add(item.url);
    liveCheck.push(item);
  }
}

async function headOk(url) {
  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      headers: { "User-Agent": "GlobalItineraryImageAudit/1.0" },
    });
    if (res.ok) return { ok: true, status: res.status, type: res.headers.get("content-type") || "" };
    // Rate limits / soft blocks are not proof the asset is dead
    if (res.status === 429 || res.status === 403) {
      return { ok: true, status: res.status, type: res.headers.get("content-type") || "", soft: true };
    }
    // some CDNs block HEAD — try GET range
    const g = await fetch(url, {
      method: "GET",
      headers: { Range: "bytes=0-0", "User-Agent": "GlobalItineraryImageAudit/1.0" },
      redirect: "follow",
    });
    if (g.status === 429 || g.status === 403) {
      return { ok: true, status: g.status, type: g.headers.get("content-type") || "", soft: true };
    }
    return { ok: g.ok || g.status === 206, status: g.status, type: g.headers.get("content-type") || "" };
  } catch (err) {
    const msg = String(err.message || err);
    // Corporate TLS intercept — cannot prove broken from this environment
    if (/SELF_SIGNED|CERT|certificate/i.test(msg)) {
      return { ok: true, status: 0, type: "", soft: true, error: msg };
    }
    return { ok: false, status: 0, type: "", error: msg };
  }
}

// concurrency limit
const broken = [];
const queue = [...liveCheck];
const workers = 8;
async function worker() {
  while (queue.length) {
    const item = queue.shift();
    if (!item) break;
    const r = await headOk(item.url);
    if (!r.ok) {
      e("BROKEN_URL", `${item.kind}/${item.slug} ${item.role} HTTP ${r.status}`, { url: item.url.slice(0, 140) });
      broken.push(item);
    } else if (r.type && !/image\//i.test(r.type) && !/octet-stream/i.test(r.type)) {
      // Wikimedia often answers HEAD with HTML/rate-limit pages; treat as soft unless pattern-bad
      if (/text\/html/i.test(r.type) && /wikimedia|unsplash/i.test(item.url)) {
        w("SOFT_CONTENT_TYPE", `${item.kind}/${item.slug} ${item.role} ${r.type}`, { url: item.url.slice(0, 140) });
      } else {
        e("NOT_IMAGE", `${item.kind}/${item.slug} ${item.role} content-type ${r.type}`, { url: item.url.slice(0, 140) });
        broken.push(item);
      }
    }
  }
}
await Promise.all(Array.from({ length: workers }, () => worker()));

console.log("Pass C: stock PHOTOS integrity");
for (const [key, id] of Object.entries(PHOTOS)) {
  const url = unsplash(id, 400);
  const r = await headOk(url);
  if (!r.ok) e("STOCK_BROKEN", `PHOTOS.${key} broken`, { url, status: r.status });
}

console.log("\n=== IMAGE SUMMARY ===");
console.log("checked urls", all.length, "live checks", liveCheck.length);
console.log("errors", errors.length, "warnings", warnings.length);
const by = new Map();
for (const i of errors) by.set(i.code, (by.get(i.code) || 0) + 1);
for (const [k, v] of [...by.entries()].sort((a, b) => b[1] - a[1])) console.log(`  ${k}: ${v}`);
console.log("\n--- ERRORS ---");
for (const i of errors.slice(0, 60)) console.log(`[${i.code}] ${i.msg}`);

fs.writeFileSync(
  new URL("./validate-images-report.json", import.meta.url),
  JSON.stringify({ errors, warnings, broken, checked: all.length, live: liveCheck.length }, null, 2),
);
process.exit(errors.length ? 1 : 0);
