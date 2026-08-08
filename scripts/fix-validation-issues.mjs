/**
 * Fixes found by validate-global-*.mjs:
 * 1) Vietnam cities: Asia/Bangkok → Asia/Ho_Chi_Minh
 * 2) Sokhumi: Europe/Moscow → Asia/Tbilisi
 * Then regenerate cities.generated.ts
 */
import fs from "node:fs";
import { spawnSync } from "node:child_process";

const path = new URL("./city-targets.json", import.meta.url);
const targets = JSON.parse(fs.readFileSync(path, "utf8"));

let vn = 0;
let other = 0;
for (const t of targets) {
  if (t.countrySlug === "vietnam" && t.timezone === "Asia/Bangkok") {
    t.timezone = "Asia/Ho_Chi_Minh";
    vn++;
  }
  if (t.slug === "sokhumi" && t.timezone === "Europe/Moscow") {
    t.timezone = "Asia/Tbilisi";
    other++;
  }
}

fs.writeFileSync(path, JSON.stringify(targets, null, 2) + "\n");
console.log(`Fixed Vietnam timezones: ${vn}`);
console.log(`Fixed other timezones: ${other}`);

const gen = spawnSync("node", ["scripts/generate-cities.mjs"], {
  cwd: new URL("..", import.meta.url),
  stdio: "inherit",
  shell: true,
});
process.exit(gen.status ?? 1);
