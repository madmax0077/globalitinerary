import fs from "node:fs";
import { uniqueTop150 } from "./top150-tourism-cities.mjs";

const targets = JSON.parse(fs.readFileSync(new URL("./city-targets.json", import.meta.url), "utf8"));
const gen = fs.readFileSync(new URL("../src/data/cities.generated.ts", import.meta.url), "utf8");
const curated = fs.readFileSync(new URL("../src/data/cities.ts", import.meta.url), "utf8");
const sights = fs.readFileSync(new URL("../src/data/city-sights.ts", import.meta.url), "utf8");
const picks = fs.readFileSync(new URL("../src/data/city-picks.ts", import.meta.url), "utf8");
const enrich = fs.readFileSync(new URL("../src/data/city-enrichments.ts", import.meta.url), "utf8");

function countryMatch(a, b) {
  const norm = (s) => (s === "czech-republic" ? "czechia" : s === "turkey" ? "turkiye" : s);
  return norm(a) === norm(b);
}

function hasKey(src, slug) {
  return new RegExp(`(?:^|\\n)\\s+(?:\"${slug}\"|${slug}):\\s*[\\[{]`, "m").test(src);
}

const issues = [];
const list = uniqueTop150().filter((c) => c.slug !== "san-juan");

let present = 0;
for (const c of list) {
  const countrySlug = c.countrySlug === "czech-republic" ? "czechia" : c.countrySlug;
  const inTargets = targets.some((t) => t.slug === c.slug && countryMatch(t.countrySlug, countrySlug));
  const inCurated = curated.includes(`slug: "${c.slug}"`);
  const inGen = gen.includes(`slug: "${c.slug}"`) || gen.includes(`"slug": "${c.slug}"`);
  if (!inTargets && !inCurated) issues.push(`${c.slug}: missing from targets/curated`);
  else if (!inCurated && !inGen) issues.push(`${c.slug}: missing from generated`);
  else present++;

  if (!hasKey(sights, c.slug) && !inCurated) issues.push(`${c.slug}: missing sights`);
  if (!hasKey(picks, c.slug) && !inCurated) issues.push(`${c.slug}: missing picks`);
  if (!hasKey(enrich, c.slug) && !inCurated) issues.push(`${c.slug}: missing enrichments`);
}

const sf = targets.find((t) => t.slug === "san-francisco");
if (!sf || sf.countrySlug !== "united-states") issues.push("san-francisco is not US");
const cr = targets.find((t) => t.slug === "san-francisco-costa-rica");
if (!cr) issues.push("san-francisco-costa-rica rename missing");

console.log(`Top150 checked: ${list.length}`);
console.log(`Present with data files: ${present}`);
console.log(`Issues: ${issues.length}`);
for (const i of issues.slice(0, 40)) console.log(" -", i);
if (issues.length > 40) console.log(` ... +${issues.length - 40} more`);
process.exit(issues.length ? 1 : 0);
