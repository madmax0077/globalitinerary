import fs from "node:fs";

const need = [
  "hong-kong",
  "miami",
  "orlando",
  "zurich",
  "edinburgh",
  "florence",
  "cusco",
  "las-vegas",
  "washington-dc",
  "boston",
  "vancouver",
  "queenstown",
  "phuket",
  "chiang-mai",
  "cebu",
  "taipei",
  "macau",
  "petra",
  "mykonos",
  "dubrovnik",
  "salzburg",
  "bruges",
  "antalya",
  "cancun",
];

const targets = JSON.parse(fs.readFileSync(new URL("./city-targets.json", import.meta.url), "utf8"));
const gen = fs.readFileSync(new URL("../src/data/cities.generated.ts", import.meta.url), "utf8");
const sights = fs.readFileSync(new URL("../src/data/city-sights.ts", import.meta.url), "utf8");
const picks = fs.readFileSync(new URL("../src/data/city-picks.ts", import.meta.url), "utf8");
const countries = fs.readFileSync(new URL("../src/data/countries.ts", import.meta.url), "utf8");

function keyMatches(src, slug) {
  const re = new RegExp(`(?:^|\\n)\\s+(?:\"${slug}\"|${slug}):\\s*[\\[{]`, "m");
  return re.test(src);
}

function countKeys(src, kind) {
  const re =
    kind === "sights"
      ? /^\s+(?:\"([^\"]+)\"|([a-z0-9-]+)):\s*\[/gm
      : /^\s+(?:\"([^\"]+)\"|([a-z0-9-]+)):\s*\{/gm;
  const counts = new Map();
  for (const m of src.matchAll(re)) {
    const k = m[1] || m[2];
    counts.set(k, (counts.get(k) || 0) + 1);
  }
  return [...counts.entries()].filter(([, n]) => n > 1);
}

const issues = [];
for (const slug of need) {
  const inTargets = targets.some((t) => t.slug === slug);
  const inGen = gen.includes(`slug: "${slug}"`) || gen.includes(`"slug": "${slug}"`);
  const hasSight = keyMatches(sights, slug);
  const hasPick = keyMatches(picks, slug);
  if (!inTargets) issues.push(`${slug}: missing from city-targets.json`);
  if (!inGen) issues.push(`${slug}: missing from cities.generated.ts`);
  if (!hasSight) issues.push(`${slug}: missing city-sights`);
  if (!hasPick) issues.push(`${slug}: missing city-picks`);
}

for (const [k, n] of countKeys(sights, "sights")) issues.push(`duplicate sight key ${k} x${n}`);
for (const [k, n] of countKeys(picks, "picks")) issues.push(`duplicate pick key ${k} x${n}`);

for (const c of ["hong-kong", "taiwan", "macau"]) {
  if (!countries.includes(`slug: "${c}"`)) issues.push(`country missing: ${c}`);
}

const nycOk = targets.some((t) => t.slug === "new-york-city");
if (!nycOk) issues.push("new-york-city not found in targets");

const enrichments = fs.readFileSync(new URL("../src/data/city-enrichments.ts", import.meta.url), "utf8");
for (const slug of need) {
  if (!enrichments.includes(`"${slug}"`) && !enrichments.includes(`  ${slug}:`)) {
    issues.push(`${slug}: missing city-enrichments entry`);
  }
}

console.log("Coverage check for 24 added cities:");
console.log(issues.length ? issues.join("\n") : "OK — all present with sights, picks and enrichments");
process.exit(issues.length ? 1 : 0);
