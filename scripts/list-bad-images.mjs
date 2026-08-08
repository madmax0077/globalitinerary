import { cities } from "../src/data/cities.ts";
import { countries } from "../src/data/countries.ts";
import { BAD_IMAGE as BAD } from "./lib/bad-image.mjs";

const hits = [];
function scan(ent, kind) {
  const pairs = [
    ["hero", ent.heroImage],
    ["thumb", ent.thumbnail],
    ...((ent.gallery || []).map((g, i) => [`g${i}`, g])),
  ];
  for (const [role, u] of pairs) {
    if (u && BAD.test(u)) hits.push({ kind, slug: ent.slug, role, u });
  }
}
for (const c of cities) scan(c, "city");
for (const c of countries) scan(c, "country");
console.log("hits", hits.length);
for (const h of hits) console.log(`${h.kind}\t${h.slug}\t${h.role}\t${h.u}`);
