import { continents } from "@/lib/navigation";

/** Geographic continents used for city browsing (same set as countries). */
export type CityContinent = (typeof continents)[number];

/**
 * Travel-style categories for city discovery.
 * A city can belong to several; keep the list short and filterable.
 */
export const CITY_CATEGORIES = [
  "City Break",
  "Beach & Island",
  "Food & Markets",
  "History & Culture",
  "Nature & Adventure",
  "Family",
  "Nightlife",
  "Luxury",
] as const;

export type CityCategory = (typeof CITY_CATEGORIES)[number];

/** Macro-regions for editorial Top 100 grouping (trip-planning oriented). */
export const TOP_100_REGIONS = [
  "east-asia",
  "southeast-asia",
  "south-asia",
  "europe",
  "mena",
  "north-america",
  "latin-america",
  "oceania",
  "africa",
] as const;

export type Top100Region = (typeof TOP_100_REGIONS)[number];

export const TOP_100_REGION_META: Record<
  Top100Region,
  { title: string; body: string }
> = {
  "east-asia": {
    title: "East Asia",
    body: "Tokyo, Seoul, Hong Kong, Shanghai and neighbours reward dense itineraries — temples, neighbourhoods and night food within excellent metro systems. Pair a megacity with a second stop (Kyoto after Tokyo, Taipei after Hong Kong) rather than racing the whole region in one week.",
  },
  "southeast-asia": {
    title: "Southeast Asia",
    body: "Bangkok, Singapore, Kuala Lumpur and Vietnam’s hubs combine strong air links with street-food culture. Island and temple add-ons (Bali, Phuket, Chiang Mai, Siem Reap) work best as focused second stops, not as a rushed loop.",
  },
  "south-asia": {
    title: "South Asia",
    body: "Delhi and Mumbai remain the practical gateways for first-time India trips — monuments, markets and onward domestic flights. Build buffer days for traffic and heat; treat these as bases, not one-night stopovers.",
  },
  europe: {
    title: "Europe",
    body: "Classic city breaks still shine: Paris, London, Rome, Barcelona and Amsterdam pack 3–5 days easily. Southern and Central Europe (Lisbon, Prague, Athens, Dubrovnik) favour shoulder seasons. Prefer rail when it beats short-haul flying.",
  },
  mena: {
    title: "Middle East & North Africa",
    body: "Dubai, Abu Dhabi and Doha suit polished short breaks; Istanbul and Antalya mix culture with leisure; Cairo, Marrakech, Amman and Petra reward deeper history trips. Confirm visas and summer heat before locking dates.",
  },
  "north-america": {
    title: "North America",
    body: "New York, Los Angeles, Chicago and Toronto anchor multi-day city trips. Plan US destinations by neighbourhood or district — distances are larger than European city breaks suggest.",
  },
  "latin-america": {
    title: "Latin America & Caribbean",
    body: "Mexico City, Rio, Buenos Aires and Lima reward neighbourhood wandering and food. Cusco needs altitude planning; Cancún remains the mass-market Yucatán beach-and-ruins gateway.",
  },
  oceania: {
    title: "Oceania",
    body: "Sydney and Melbourne bookend Australia’s east coast; Auckland and Queenstown open New Zealand. Allow real travel days — hops here are longer than a London–Paris weekend.",
  },
  africa: {
    title: "Africa",
    body: "Cape Town pairs Table Mountain scenery with peninsula and Winelands day trips. Treat it as a destination in its own right, not a quick add-on to another continent.",
  },
};

/** Continent filter order for /cities (matches navigation). */
export const CITY_CONTINENT_FILTERS: CityContinent[] = [...continents];

/** Category filter order for /cities explorer pills. */
export const CITY_CATEGORY_FILTERS: CityCategory[] = [...CITY_CATEGORIES];
