import fs from "node:fs";
function extract(src, needle) {
  const i = src.indexOf(needle); const eq = src.indexOf("=", i);
  let start=-1; for (let p=eq+1;p<src.length;p++) if (src[p]==="["){start=p;break;}
  let d=0,s=false,e=false;
  for (let p=start;p<src.length;p++){
    const c=src[p];
    if(s){if(e)e=false;else if(c==="\\")e=true;else if(c==="\"")s=false;continue;}
    if(c==="\""){s=true;continue;}
    if(c==="[")d++; else if(c==="]"){d--; if(!d) return JSON.parse(src.slice(start,p+1));}
  }
}
const cities = extract(fs.readFileSync("src/data/cities.generated.ts","utf8"), "const raw: Gen[]");
// sample major cities thingsToDo quality
const majors = ["paris","london","bangkok","istanbul","barcelona","rome","tokyo","new-york-city","dubai","singapore","seoul","prague","amsterdam","lisbon","marrakesh","cairo","sydney","mexico-city","rio-de-janeiro","athens","vienna","berlin","hong-kong","kuala-lumpur","hanoi","ho-chi-minh-city","jakarta","bali"];
for (const slug of majors) {
  const c = cities.find(x => x.slug === slug);
  if (!c) { console.log(slug, "NOT IN GENERATED"); continue; }
  console.log("\n==", slug, "== todo:", (c.thingsToDo||[]).length);
  console.log((c.thingsToDo||[]).slice(0,8).join(" | "));
}
// Bali wikivoyage see
const wv = JSON.parse(fs.readFileSync("scripts/wikivoyage-map.json","utf8").replace(/^\uFEFF/, ""));
for (const t of ["Bali","Ubud","Denpasar","Seminyak"]) {
  const e = wv[t];
  console.log("\nWV", t, "see:", (e?.see||[]).slice(0,12));
}
