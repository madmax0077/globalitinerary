import fs from "node:fs";

const targets = JSON.parse(fs.readFileSync(new URL("./city-targets.json", import.meta.url), "utf8"));
const countries = fs.readFileSync(new URL("../src/data/countries.generated.ts", import.meta.url), "utf8");
const countrySlugs = [...countries.matchAll(/"slug":\s*"([^"]+)"/g)].map((m) => m[1]);
// also curated countries
const curated = fs.readFileSync(new URL("../src/data/countries.ts", import.meta.url), "utf8");
for (const m of curated.matchAll(/slug:\s*"([^"]+)"/g)) countrySlugs.push(m[1]);
const countrySet = new Set(countrySlugs);

const needles = [
  "hong", "miami", "orlando", "zurich", "edinburgh", "florence", "firenze",
  "cusco", "cuzco", "vegas", "washington", "boston", "vancouver", "queenstown",
  "phuket", "chiang", "cebu", "taipei", "macau", "macao", "petra", "wadi",
  "mykonos", "dubrovnik", "salzburg", "bruges", "brugge", "antalya", "cancun", "cancún",
];

for (const n of needles) {
  const hits = targets.filter(
    (t) => t.slug.includes(n) || t.name.toLowerCase().includes(n) || (t.wikiTitle || "").toLowerCase().includes(n),
  );
  if (hits.length) {
    console.log(`\n[${n}]`);
    for (const h of hits.slice(0, 8)) {
      console.log(`  ${h.slug} | ${h.name} | ${h.countrySlug} | ${h.countryCode} | pop ${h.population}`);
    }
  } else {
    console.log(`\n[${n}] NONE`);
  }
}

const neededCountries = [
  "hong-kong", "united-states", "switzerland", "united-kingdom", "italy", "peru",
  "canada", "new-zealand", "thailand", "philippines", "taiwan", "macau", "jordan",
  "greece", "croatia", "austria", "belgium", "turkey", "mexico", "china",
];
console.log("\n--- country slug check ---");
for (const c of neededCountries) {
  console.log(c, countrySet.has(c) ? "OK" : "MISSING");
}
// find US/UK/HK variants
console.log("\nUS-like:", [...countrySet].filter((s) => /united|america|states|usa/.test(s)).join(", "));
console.log("UK-like:", [...countrySet].filter((s) => /kingdom|britain|uk/.test(s)).join(", "));
console.log("HK-like:", [...countrySet].filter((s) => /hong|kong/.test(s)).join(", "));
console.log("TW-like:", [...countrySet].filter((s) => /taiwan|chinese-taipei/.test(s)).join(", "));
console.log("MO-like:", [...countrySet].filter((s) => /macau|macao/.test(s)).join(", "));
