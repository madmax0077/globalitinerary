/**
 * Curated, stable Unsplash photo IDs used throughout the demo data.
 * Using direct image IDs keeps the gallery beautiful and dependency-free.
 */
export function unsplash(id: string, w = 1600, q = 80): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

export const PHOTOS = {
  fuji: "1490806843957-31f4c9a91c65",
  fujiLake: "1493976040374-85c8e12f0c0e",
  tokyo: "1540959733332-eab4deabeeaf",
  tokyoStreet: "1503899036084-c55cdd92da26",
  eiffel: "1502602898657-3e91760cbb34",
  paris: "1499856871958-5b9627545d1a",
  colosseum: "1552832230-c0197dd311b5",
  rome: "1531572753322-ad063cecc140",
  venice: "1514890547357-a9ee288728e0",
  santorini: "1570077188670-e3a8d69ac5ff",
  santoriniDomes: "1533105079780-92b9be482077",
  dubai: "1512453979798-5ea266f8880c",
  machuPicchu: "1526392060635-9d6019884377",
  aurora: "1504893524553-b855bce32c67",
  icelandFalls: "1476514525535-07fb3b4ae5f1",
  bali: "1537996194471-e657df975ab4",
  maldives: "1514282401047-d79a71a590e8",
  nyc: "1496442226666-8d4d0e62e6e9",
  london: "1513635269975-59663e0ac1ad",
  alps: "1531366936337-7c912a4589a7",
  beach: "1507525428034-b723cf961d3e",
  mountains: "1454496522488-7a8e488e8606",
  food: "1414235077428-338989a2e8c0",
  phiPhi: "1528181304800-259b08848526",
  longtail: "1552465011-b4e21bf6e79a",
  sahara: "1489749798305-4fea3ae63d43",
  greeceSea: "1613395877344-13d4a8e0d49e",
  norway: "1516905041604-7935af78f572",
  kyoto: "1545569341-9eb8b30979d9",
  cityNight: "1480714378408-67cf0d13bc1b",
  desertCamp: "1518623489648-a173ef7824f3",
  temple: "1528360983277-13d401cdc186",
  coast: "1505228395891-9a51e7e86bf6",
  // Warm night market / lantern atmosphere (not Mount Fuji — distinct from fujiLake)
  lantern: "1528127269322-53946bcb9f93",
} as const;
