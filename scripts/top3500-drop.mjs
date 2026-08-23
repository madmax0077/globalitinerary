import { TOP3000_DROP } from "./top3000-drop.mjs";

/** Parks, districts, aliases — do not add as cities. */
export const TOP3500_DROP = new Set([
  ...TOP3000_DROP,
  "joke",
  "san-francisco-nayarit",
  "si-satchanalai",
  "wadi-rum-village",
  "ketapang-banyuwangi",
]);
