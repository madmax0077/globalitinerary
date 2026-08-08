import fs from "node:fs";
import { cities } from "../src/data/cities.ts";
import { countries } from "../src/data/countries.ts";
import { isScenic } from "./lib/bad-image.mjs";

const stockCities = [];
const wikiCities = [];
const featuredStock = [];
const badWiki = [];
const weakWiki = [];

const WEAK =
  /montage|collage|map|chart|stamp|portrait|painting|logo|seal|coa|flag|diagram|screenshot|icon|banner|gif/i;

for (const c of cities) {
  const hero = c.heroImage || "";
  if (hero.includes("upload.wikimedia.org") || hero.includes("wikipedia.org")) {
    wikiCities.push(c.slug);
    if (!isScenic(hero)) badWiki.push({ slug: c.slug, hero: hero.slice(0, 160) });
    else if (WEAK.test(hero)) weakWiki.push({ slug: c.slug, hero: hero.slice(0, 160) });
  } else {
    stockCities.push({
      slug: c.slug,
      country: c.countrySlug,
      name: c.name,
      featured: !!c.featured,
    });
    if (c.featured) featuredStock.push(c.slug);
  }
}

const stockCountries = [];
for (const c of countries) {
  const hero = c.heroImage || "";
  if (!hero.includes("upload.wikimedia.org") && !hero.includes("wikipedia.org")) {
    stockCountries.push(c.slug);
  }
}

const report = {
  totals: {
    cities: cities.length,
    stockCities: stockCities.length,
    wikiCities: wikiCities.length,
    featuredStock: featuredStock.length,
    stockCountries: stockCountries.length,
    badWiki: badWiki.length,
    weakWiki: weakWiki.length,
  },
  featuredStock,
  stockCountries,
  badWiki: badWiki.slice(0, 50),
  weakWiki: weakWiki.slice(0, 50),
  stockCities,
};

fs.writeFileSync(new URL("./loop-audit-images-report.json", import.meta.url), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report.totals, null, 2));
