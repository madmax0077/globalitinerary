import type { City, Attraction } from "@/lib/types";

// Activities that are typically free to enjoy (entry/access at no cost).
const FREE_KEYWORDS = [
  "free",
  "park",
  "garden",
  "beach",
  "market",
  "bazaar",
  "viewpoint",
  "lookout",
  "view over",
  "views of",
  "temple",
  "shrine",
  "church",
  "cathedral",
  "mosque",
  "square",
  "plaza",
  "piazza",
  "promenade",
  "waterfront",
  "harbour",
  "harbor",
  "bridge",
  "old town",
  "old city",
  "stroll",
  "walk",
  "wander",
  "hike",
  "trail",
  "sunset",
  "sunrise",
  "monument",
  "memorial",
  "mural",
  "street art",
  "riverside",
  "lake",
  "waterfall",
  "fountain",
  "gate",
  "cemetery",
  "boulevard",
  "quarter",
  "district",
  "canal",
  "beachfront",
  "seafront",
];

function looksFree(text: string) {
  const t = text.toLowerCase();
  // Exclude things that usually cost money even if they match a keyword.
  if (/\b(ticket|entry fee|admission|paid|cruise|tour price|\$)\b/.test(t)) return false;
  return FREE_KEYWORDS.some((k) => t.includes(k));
}

function priceIsFree(price?: string) {
  if (!price) return false;
  return /\bfree\b|no charge|no cost|0\b/i.test(price);
}

/**
 * Derives a list of typically-free things to do in a city from its existing
 * activities, hidden gems and free-entry attractions. Best-effort heuristic.
 */
export function getFreeThings(city: City, cityAttractions: Attraction[] = []): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  const add = (s?: string) => {
    if (!s) return;
    const key = s.trim().toLowerCase();
    if (!key || seen.has(key)) return;
    seen.add(key);
    out.push(s.trim());
  };

  // Free-entry attractions in this city.
  for (const a of cityAttractions) {
    if (priceIsFree(a.ticketPrice)) add(`Visit ${a.name} (free entry)`);
  }

  const pools = [
    ...(city.thingsToDo ?? []),
    ...(city.hiddenGems ?? []),
    ...(city.museums ?? []),
  ];
  for (const item of pools) {
    if (looksFree(item)) add(item);
  }

  return out.slice(0, 8);
}
