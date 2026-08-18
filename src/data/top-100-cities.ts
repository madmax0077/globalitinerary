/**
 * Editorial Top 100 tourism cities for Global Itinerary.
 * Ranking draws on widely cited destination-city visitor volumes
 * (Euromonitor / Mastercard-style city travel lists) plus major leisure hubs.
 * Every slug resolves to a live city guide on this site.
 *
 * `region` = trip-planning macro-region (see city-taxonomy).
 * `categories` = travel-style tags for discovery filters.
 */
import type { CityCategory, Top100Region } from "@/lib/city-taxonomy";
import { cityCategories } from "@/data/city-categories";

export type Top100City = {
  rank: number;
  slug: string;
  name: string;
  country: string;
  countrySlug: string;
  why: string;
  region: Top100Region;
  categories: CityCategory[];
};

type Top100Seed = Omit<Top100City, "categories" | "region"> & { region: Top100Region };

const SEED: Top100Seed[] = [
  { rank: 1, slug: "bangkok", name: "Bangkok", country: "Thailand", countrySlug: "thailand", region: "southeast-asia", why: "Street food, temples and night markets in one of Asia’s most visited capitals." },
  { rank: 2, slug: "paris", name: "Paris", country: "France", countrySlug: "france", region: "europe", why: "Museums, cafés and walkable neighbourhoods that still define European city travel." },
  { rank: 3, slug: "london", name: "London", country: "United Kingdom", countrySlug: "united-kingdom", region: "europe", why: "World-class free museums, theatre and a compact Tube network for first-timers." },
  { rank: 4, slug: "dubai", name: "Dubai", country: "United Arab Emirates", countrySlug: "united-arab-emirates", region: "mena", why: "Desert safaris, souks and modern skyline days — easy logistics for short city breaks." },
  { rank: 5, slug: "singapore", name: "Singapore", country: "Singapore", countrySlug: "singapore", region: "southeast-asia", why: "Hawker centres, gardens and neighbourhood walks in a safe, efficient city-state." },
  { rank: 6, slug: "new-york-city", name: "New York City", country: "United States", countrySlug: "united-states", region: "north-america", why: "Broadway, boroughs and museums — the classic North American megacity trip." },
  { rank: 7, slug: "kuala-lumpur", name: "Kuala Lumpur", country: "Malaysia", countrySlug: "malaysia", region: "southeast-asia", why: "Petronas Towers, Malay–Chinese–Indian food and a strong value mid-range base." },
  { rank: 8, slug: "tokyo", name: "Tokyo", country: "Japan", countrySlug: "japan", region: "east-asia", why: "Neighbourhood temples, rail precision and a food scene from sushi counters to izakayas." },
  { rank: 9, slug: "istanbul", name: "Istanbul", country: "Türkiye", countrySlug: "turkiye", region: "mena", why: "Bosphorus ferries, bazaars and Byzantine–Ottoman landmarks spanning two continents." },
  { rank: 10, slug: "seoul", name: "Seoul", country: "South Korea", countrySlug: "south-korea", region: "east-asia", why: "Palaces, nightlife districts and K-culture energy with excellent metro coverage." },
  { rank: 11, slug: "hong-kong", name: "Hong Kong", country: "Hong Kong", countrySlug: "hong-kong", region: "east-asia", why: "Harbour views, hiking trails and dense street-food culture in a compact footprint." },
  { rank: 12, slug: "barcelona", name: "Barcelona", country: "Spain", countrySlug: "spain", region: "europe", why: "Gaudí architecture, Mediterranean beaches and tapas streets in one Spanish hub." },
  { rank: 13, slug: "amsterdam", name: "Amsterdam", country: "Netherlands", countrySlug: "netherlands", region: "europe", why: "Canal rings, museums and bike-friendly day trips across the Randstad." },
  { rank: 14, slug: "milan", name: "Milan", country: "Italy", countrySlug: "italy", region: "europe", why: "Fashion, the Duomo and a gateway to Lake Como and northern Italy." },
  { rank: 15, slug: "rome", name: "Rome", country: "Italy", countrySlug: "italy", region: "europe", why: "Ancient forums, Vatican art and neighbourhood trattorias in the eternal city." },
  { rank: 16, slug: "osaka", name: "Osaka", country: "Japan", countrySlug: "japan", region: "east-asia", why: "Street food capital of Kansai with easy day trips to Kyoto and Nara." },
  { rank: 17, slug: "vienna", name: "Vienna", country: "Austria", countrySlug: "austria", region: "europe", why: "Imperial palaces, coffee houses and a walkable historic centre." },
  { rank: 18, slug: "prague", name: "Prague", country: "Czechia", countrySlug: "czechia", region: "europe", why: "Castle views, Charles Bridge and affordable Central European city energy." },
  { rank: 19, slug: "los-angeles", name: "Los Angeles", country: "United States", countrySlug: "united-states", region: "north-america", why: "Beaches, studios and sprawling neighbourhoods — plan by district, not downtown alone." },
  { rank: 20, slug: "madrid", name: "Madrid", country: "Spain", countrySlug: "spain", region: "europe", why: "Prado–Reina Sofía art triangle, plazas and late-night Spanish dining culture." },
  { rank: 21, slug: "shanghai", name: "Shanghai", country: "China", countrySlug: "china", region: "east-asia", why: "Bund skyline, French Concession walks and a modern Chinese megacity pulse." },
  { rank: 22, slug: "sydney", name: "Sydney", country: "Australia", countrySlug: "australia", region: "oceania", why: "Harbour icons, coastal walks and beach days within a short ferry or train ride." },
  { rank: 23, slug: "munich", name: "Munich", country: "Germany", countrySlug: "germany", region: "europe", why: "Beer gardens, Alpine day trips and a polished Bavarian city base." },
  { rank: 24, slug: "dublin", name: "Dublin", country: "Ireland", countrySlug: "ireland", region: "europe", why: "Literary pubs, Georgian streets and a springboard to the Irish countryside." },
  { rank: 25, slug: "berlin", name: "Berlin", country: "Germany", countrySlug: "germany", region: "europe", why: "History layers, museums and one of Europe’s most creative nightlife scenes." },
  { rank: 26, slug: "beijing", name: "Beijing", country: "China", countrySlug: "china", region: "east-asia", why: "Forbidden City, hutongs and the Great Wall as a classic China first stop." },
  { rank: 27, slug: "moscow", name: "Moscow", country: "Russia", countrySlug: "russia", region: "europe", why: "Red Square landmarks and metro art — check current entry rules before planning." },
  { rank: 28, slug: "toronto", name: "Toronto", country: "Canada", countrySlug: "canada", region: "north-america", why: "Lake Ontario waterfront, diverse food and a practical Canadian city hub." },
  { rank: 29, slug: "lisbon", name: "Lisbon", country: "Portugal", countrySlug: "portugal", region: "europe", why: "Hills, trams, Atlantic light and day trips to Sintra or Cascais." },
  { rank: 30, slug: "frankfurt", name: "Frankfurt", country: "Germany", countrySlug: "germany", region: "europe", why: "Riverfront museums and a major European transit gateway for multi-city trips." },
  { rank: 31, slug: "mexico-city", name: "Mexico City", country: "Mexico", countrySlug: "mexico", region: "latin-america", why: "Museums, markets and neighbourhoods from Coyoacán to Roma in a vast capital." },
  { rank: 32, slug: "miami", name: "Miami", country: "United States", countrySlug: "united-states", region: "north-america", why: "Art Deco Beach, Cuban food and a warm-weather US city break." },
  { rank: 33, slug: "venice", name: "Venice", country: "Italy", countrySlug: "italy", region: "europe", why: "Canal labyrinths and lagoon islands — go early mornings to dodge peak crowds." },
  { rank: 34, slug: "orlando", name: "Orlando", country: "United States", countrySlug: "united-states", region: "north-america", why: "Theme-park capital of the Americas for families and multi-day itineraries." },
  { rank: 35, slug: "delhi", name: "Delhi", country: "India", countrySlug: "india", region: "south-asia", why: "Mughal monuments, markets and the usual first landing pad for north India." },
  { rank: 36, slug: "mumbai", name: "Mumbai", country: "India", countrySlug: "india", region: "south-asia", why: "Bollywood energy, colonial waterfront and India’s financial megacity." },
  { rank: 37, slug: "cairo", name: "Cairo", country: "Egypt", countrySlug: "egypt", region: "mena", why: "Pyramids day trips, Egyptian Museum and Nile-side urban intensity." },
  { rank: 38, slug: "athens", name: "Athens", country: "Greece", countrySlug: "greece", region: "europe", why: "Acropolis core plus ferries to the islands for a Greece starter itinerary." },
  { rank: 39, slug: "budapest", name: "Budapest", country: "Hungary", countrySlug: "hungary", region: "europe", why: "Thermal baths, Danube views and strong value for a Central Europe city break." },
  { rank: 40, slug: "warsaw", name: "Warsaw", country: "Poland", countrySlug: "poland", region: "europe", why: "Rebuilt Old Town, museums and a modern Polish capital with easy rail links." },
  { rank: 41, slug: "stockholm", name: "Stockholm", country: "Sweden", countrySlug: "sweden", region: "europe", why: "Archipelago ferries, design museums and a walkable Scandinavian capital." },
  { rank: 42, slug: "copenhagen", name: "Copenhagen", country: "Denmark", countrySlug: "denmark", region: "europe", why: "Bike lanes, New Nordic food and compact hygge neighbourhoods." },
  { rank: 43, slug: "brussels", name: "Brussels", country: "Belgium", countrySlug: "belgium", region: "europe", why: "Grand Place, chocolate and a base for day trips to Bruges or Ghent." },
  { rank: 44, slug: "zurich", name: "Zurich", country: "Switzerland", countrySlug: "switzerland", region: "europe", why: "Lake promenades and Alpine day trips from a polished Swiss hub." },
  { rank: 45, slug: "geneva", name: "Geneva", country: "Switzerland", countrySlug: "switzerland", region: "europe", why: "Lake Geneva, Jet d’Eau and easy access to French Alpine towns." },
  { rank: 46, slug: "edinburgh", name: "Edinburgh", country: "United Kingdom", countrySlug: "united-kingdom", region: "europe", why: "Castle skyline, festival culture and a gateway to the Scottish Highlands." },
  { rank: 47, slug: "florence", name: "Florence", country: "Italy", countrySlug: "italy", region: "europe", why: "Renaissance art density unmatched for a city of this size." },
  { rank: 48, slug: "naples", name: "Naples", country: "Italy", countrySlug: "italy", region: "europe", why: "Pizza birthplace, Pompeii day trips and access to the Amalfi Coast." },
  { rank: 49, slug: "porto", name: "Porto", country: "Portugal", countrySlug: "portugal", region: "europe", why: "Port wine lodges, riverfront azulejos and a walkable Douro city." },
  { rank: 50, slug: "seville", name: "Seville", country: "Spain", countrySlug: "spain", region: "europe", why: "Alcázar, cathedral and Andalusian plazas in southern Spain’s cultural capital." },
  { rank: 51, slug: "valencia", name: "Valencia", country: "Spain", countrySlug: "spain", region: "europe", why: "City of Arts and Sciences, beaches and genuine paella country." },
  { rank: 52, slug: "nice", name: "Nice", country: "France", countrySlug: "france", region: "europe", why: "Promenade des Anglais and a base for the French Riviera." },
  { rank: 53, slug: "lyon", name: "Lyon", country: "France", countrySlug: "france", region: "europe", why: "France’s gastronomic powerhouse with Roman theatres and traboule alleys." },
  { rank: 54, slug: "marrakech", name: "Marrakech", country: "Morocco", countrySlug: "morocco", region: "mena", why: "Medina souks, riads and Atlas day trips from Morocco’s visitor magnet." },
  { rank: 55, slug: "cape-town", name: "Cape Town", country: "South Africa", countrySlug: "south-africa", region: "africa", why: "Table Mountain, Cape Peninsula drives and Winelands day trips." },
  { rank: 56, slug: "rio-de-janeiro", name: "Rio de Janeiro", country: "Brazil", countrySlug: "brazil", region: "latin-america", why: "Beaches, Christ the Redeemer views and carnival-city energy." },
  { rank: 57, slug: "buenos-aires", name: "Buenos Aires", country: "Argentina", countrySlug: "argentina", region: "latin-america", why: "Tango neighbourhoods, steakhouses and a European-tinged South American capital." },
  { rank: 58, slug: "lima", name: "Lima", country: "Peru", countrySlug: "peru", region: "latin-america", why: "Pacific coastal cuisine and the usual entry for Machu Picchu itineraries." },
  { rank: 59, slug: "cusco", name: "Cusco", country: "Peru", countrySlug: "peru", region: "latin-america", why: "Andean altitude base for Sacred Valley and Machu Picchu trips." },
  { rank: 60, slug: "san-francisco", name: "San Francisco", country: "United States", countrySlug: "united-states", region: "north-america", why: "Golden Gate views, neighbourhoods and Bay Area day trips." },
  { rank: 61, slug: "las-vegas", name: "Las Vegas", country: "United States", countrySlug: "united-states", region: "north-america", why: "Entertainment Strip plus canyon day trips into the desert Southwest." },
  { rank: 62, slug: "chicago", name: "Chicago", country: "United States", countrySlug: "united-states", region: "north-america", why: "Architecture river cruises, lakefront parks and a serious food city." },
  { rank: 63, slug: "washington-dc", name: "Washington, D.C.", country: "United States", countrySlug: "united-states", region: "north-america", why: "Free Smithsonian museums and monumental Mall walks." },
  { rank: 64, slug: "boston", name: "Boston", country: "United States", countrySlug: "united-states", region: "north-america", why: "Freedom Trail history, universities and a walkable East Coast classic." },
  { rank: 65, slug: "vancouver", name: "Vancouver", country: "Canada", countrySlug: "canada", region: "north-america", why: "Mountains-meet-ocean setting with Stanley Park and Pacific Rim access." },
  { rank: 66, slug: "montreal", name: "Montréal", country: "Canada", countrySlug: "canada", region: "north-america", why: "French–English culture, festivals and a distinct North American food scene." },
  { rank: 67, slug: "melbourne", name: "Melbourne", country: "Australia", countrySlug: "australia", region: "oceania", why: "Café laneways, sports and coastal day trips along Victoria’s coast." },
  { rank: 68, slug: "auckland", name: "Auckland", country: "New Zealand", countrySlug: "new-zealand", region: "oceania", why: "Harbour city gateway to North Island road trips and islands." },
  { rank: 69, slug: "queenstown", name: "Queenstown", country: "New Zealand", countrySlug: "new-zealand", region: "oceania", why: "Adventure capital for lakes, mountains and Southern Alps scenery." },
  { rank: 70, slug: "bali", name: "Bali", country: "Indonesia", countrySlug: "indonesia", region: "southeast-asia", why: "Temples, rice terraces and beaches — still Southeast Asia’s leisure island icon." },
  { rank: 71, slug: "jakarta", name: "Jakarta", country: "Indonesia", countrySlug: "indonesia", region: "southeast-asia", why: "Indonesia’s megacity hub for culture, food and onward island flights." },
  { rank: 72, slug: "ho-chi-minh-city", name: "Ho Chi Minh City", country: "Vietnam", countrySlug: "vietnam", region: "southeast-asia", why: "War museums, street food and a southern Vietnam travel hub." },
  { rank: 73, slug: "hanoi", name: "Hanoi", country: "Vietnam", countrySlug: "vietnam", region: "southeast-asia", why: "Old Quarter chaos, lakes and the classic start for Ha Long Bay trips." },
  { rank: 74, slug: "phuket", name: "Phuket", country: "Thailand", countrySlug: "thailand", region: "southeast-asia", why: "Andaman beaches and island-hopping day boats from Thailand’s largest island." },
  { rank: 75, slug: "chiang-mai", name: "Chiang Mai", country: "Thailand", countrySlug: "thailand", region: "southeast-asia", why: "Temples, night bazaars and northern Thai culture at a gentler pace." },
  { rank: 76, slug: "siem-reap", name: "Siem Reap", country: "Cambodia", countrySlug: "cambodia", region: "southeast-asia", why: "Gateway town to Angkor’s temple complex — sunrise tickets still define the trip." },
  { rank: 77, slug: "phnom-penh", name: "Phnom Penh", country: "Cambodia", countrySlug: "cambodia", region: "southeast-asia", why: "Mekong capital with museums that explain modern Cambodian history." },
  { rank: 78, slug: "manila", name: "Manila", country: "Philippines", countrySlug: "philippines", region: "southeast-asia", why: "Intramuros history and the main air hub for Philippine island hopping." },
  { rank: 79, slug: "cebu", name: "Cebu City", country: "Philippines", countrySlug: "philippines", region: "southeast-asia", why: "Central Visayas hub for beaches, diving and island connections." },
  { rank: 80, slug: "taipei", name: "Taipei", country: "Taiwan", countrySlug: "taiwan", region: "east-asia", why: "Night markets, Taipei 101 and easy day trips into Taiwan’s mountains." },
  { rank: 81, slug: "macau", name: "Macau", country: "Macau", countrySlug: "macau", region: "east-asia", why: "Portuguese colonial streets plus modern resort casinos in a compact SAR." },
  { rank: 82, slug: "doha", name: "Doha", country: "Qatar", countrySlug: "qatar", region: "mena", why: "Museum of Islamic Art, souq culture and a polished Gulf stopover city." },
  { rank: 83, slug: "abu-dhabi", name: "Abu Dhabi", country: "United Arab Emirates", countrySlug: "united-arab-emirates", region: "mena", why: "Grand Mosque, Louvre Abu Dhabi and a calmer UAE capital counterpart to Dubai." },
  { rank: 84, slug: "tel-aviv", name: "Tel Aviv", country: "Israel", countrySlug: "israel", region: "mena", why: "Bauhaus streets, beaches and a lively Mediterranean food scene." },
  { rank: 85, slug: "jerusalem", name: "Jerusalem", country: "Israel", countrySlug: "israel", region: "mena", why: "Old City faith sites that draw pilgrims and cultural travellers alike." },
  { rank: 86, slug: "amman", name: "Amman", country: "Jordan", countrySlug: "jordan", region: "mena", why: "Practical Jordan base for Petra, Wadi Rum and Dead Sea day trips." },
  { rank: 87, slug: "petra", name: "Petra / Wadi Musa", country: "Jordan", countrySlug: "jordan", region: "mena", why: "The rose-red Nabataean city — one of the world’s essential archaeological visits." },
  { rank: 88, slug: "kyoto", name: "Kyoto", country: "Japan", countrySlug: "japan", region: "east-asia", why: "Temples, geisha districts and seasonal foliage that define classic Japan." },
  { rank: 89, slug: "santorini", name: "Santorini", country: "Greece", countrySlug: "greece", region: "europe", why: "Caldera sunsets and cliff towns — book ahead and explore beyond Oia crowds." },
  { rank: 90, slug: "mykonos", name: "Mykonos", country: "Greece", countrySlug: "greece", region: "europe", why: "Cycladic beaches and nightlife with ferry links across the Aegean." },
  { rank: 91, slug: "reykjavik", name: "Reykjavík", country: "Iceland", countrySlug: "iceland", region: "europe", why: "Compact capital for Golden Circle, Blue Lagoon and Ring Road starts." },
  { rank: 92, slug: "helsinki", name: "Helsinki", country: "Finland", countrySlug: "finland", region: "europe", why: "Design districts, sauna culture and Baltic ferry day trips." },
  { rank: 93, slug: "oslo", name: "Oslo", country: "Norway", countrySlug: "norway", region: "europe", why: "Fjords within reach, museums and a clean Nordic capital base." },
  { rank: 94, slug: "krakow", name: "Kraków", country: "Poland", countrySlug: "poland", region: "europe", why: "Medieval square, Jewish Quarter and Auschwitz day-trip logistics." },
  { rank: 95, slug: "dubrovnik", name: "Dubrovnik", country: "Croatia", countrySlug: "croatia", region: "europe", why: "Walled Old Town and Adriatic island boats — go shoulder season if you can." },
  { rank: 96, slug: "split", name: "Split", country: "Croatia", countrySlug: "croatia", region: "europe", why: "Diocletian’s Palace and the ferry hub for Hvar and Dalmatian islands." },
  { rank: 97, slug: "salzburg", name: "Salzburg", country: "Austria", countrySlug: "austria", region: "europe", why: "Baroque old town, fortress views and Alpine day trips from Mozart’s city." },
  { rank: 98, slug: "bruges", name: "Bruges", country: "Belgium", countrySlug: "belgium", region: "europe", why: "Canal medieval core — best as an overnight to see it after day-trippers leave." },
  { rank: 99, slug: "antalya", name: "Antalya", country: "Türkiye", countrySlug: "turkiye", region: "mena", why: "Turkish Riviera beaches with Roman ruins and easy resort infrastructure." },
  { rank: 100, slug: "cancun", name: "Cancún", country: "Mexico", countrySlug: "mexico", region: "latin-america", why: "Caribbean beaches and a base for Tulum, Isla Mujeres and Yucatán ruins." },
];

export const TOP_100_CITIES: Top100City[] = SEED.map((c) => ({
  ...c,
  categories: cityCategories[c.slug] ?? ["City Break"],
}));

export function top100ByRegion(region: Top100Region): Top100City[] {
  return TOP_100_CITIES.filter((c) => c.region === region);
}
