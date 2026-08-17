/**
 * Realistic mid-range daily ground budgets (USD per person).
 * Keep in sync with scripts/lib/travel-budgets.mjs (used by generate scripts).
 */

export type MidBand = readonly [number, number];

export const COUNTRY_MID_USD: Record<string, MidBand> = {
  switzerland: [180, 350],
  norway: [160, 320],
  iceland: [170, 340],
  denmark: [140, 280],
  sweden: [130, 260],
  finland: [120, 240],
  luxembourg: [140, 280],
  netherlands: [120, 250],
  belgium: [110, 230],
  ireland: [120, 250],
  "united-kingdom": [120, 260],
  france: [110, 240],
  germany: [100, 220],
  austria: [110, 230],
  italy: [100, 220],
  spain: [80, 180],
  portugal: [70, 160],
  greece: [70, 160],
  malta: [80, 170],
  cyprus: [75, 160],
  monaco: [250, 500],
  liechtenstein: [160, 320],
  andorra: [100, 200],
  "san-marino": [100, 200],
  "united-states": [120, 280],
  canada: [110, 240],
  australia: [120, 260],
  "new-zealand": [110, 240],
  singapore: [100, 220],
  "hong-kong": [100, 220],
  japan: [100, 220],
  "south-korea": [80, 180],
  israel: [110, 230],
  "united-arab-emirates": [120, 280],
  qatar: [110, 250],
  bahrain: [90, 200],
  kuwait: [100, 220],
  oman: [80, 180],
  "saudi-arabia": [80, 180],
  slovenia: [70, 150],
  croatia: [70, 160],
  "czech-republic": [60, 140],
  czechia: [60, 140],
  poland: [55, 130],
  hungary: [55, 130],
  slovakia: [55, 120],
  estonia: [65, 140],
  latvia: [55, 120],
  lithuania: [55, 120],
  romania: [45, 110],
  bulgaria: [40, 100],
  serbia: [40, 100],
  "bosnia-and-herzegovina": [40, 95],
  montenegro: [50, 120],
  albania: [40, 95],
  "north-macedonia": [35, 90],
  moldova: [35, 85],
  ukraine: [35, 90],
  belarus: [40, 95],
  russia: [50, 130],
  turkey: [45, 110],
  turkiye: [45, 110],
  georgia: [40, 100],
  armenia: [35, 90],
  azerbaijan: [40, 100],
  taiwan: [60, 140],
  china: [50, 130],
  macau: [90, 200],
  thailand: [35, 100],
  vietnam: [30, 90],
  cambodia: [25, 80],
  laos: [25, 75],
  malaysia: [35, 100],
  indonesia: [30, 95],
  philippines: [30, 90],
  myanmar: [25, 70],
  india: [25, 80],
  nepal: [20, 60],
  "sri-lanka": [25, 80],
  bangladesh: [20, 60],
  pakistan: [25, 70],
  maldives: [150, 400],
  bhutan: [80, 200],
  mexico: [45, 120],
  "costa-rica": [60, 150],
  panama: [55, 140],
  guatemala: [35, 90],
  belize: [55, 140],
  honduras: [35, 90],
  nicaragua: [30, 85],
  "el-salvador": [35, 90],
  cuba: [50, 130],
  "dominican-republic": [50, 130],
  jamaica: [60, 150],
  bahamas: [140, 300],
  barbados: [120, 260],
  aruba: [120, 260],
  curacao: [110, 240],
  "puerto-rico": [100, 220],
  colombia: [35, 100],
  peru: [35, 100],
  ecuador: [35, 95],
  bolivia: [30, 80],
  chile: [55, 140],
  argentina: [40, 110],
  uruguay: [55, 140],
  paraguay: [35, 90],
  brazil: [45, 120],
  venezuela: [30, 80],
  morocco: [35, 100],
  egypt: [30, 90],
  tunisia: [35, 95],
  "south-africa": [45, 120],
  namibia: [50, 130],
  botswana: [55, 140],
  kenya: [40, 120],
  tanzania: [40, 120],
  uganda: [30, 90],
  rwanda: [40, 110],
  ethiopia: [25, 80],
  ghana: [35, 95],
  senegal: [40, 100],
  mauritius: [80, 180],
  seychelles: [150, 350],
  madagascar: [30, 85],
  jordan: [55, 140],
  lebanon: [50, 140],
  iran: [30, 85],
  fiji: [80, 180],
  "papua-new-guinea": [60, 150],
  vanuatu: [90, 200],
  samoa: [70, 160],
  tonga: [70, 160],
  palau: [120, 260],
  guam: [110, 240],
  "french-polynesia": [180, 400],
  "new-caledonia": [140, 300],
  reunion: [90, 200],
  martinique: [100, 220],
  guadeloupe: [100, 220],
  greenland: [140, 280],
  "faroe-islands": [130, 260],
  bermuda: [180, 350],
  "sint-maarten": [130, 280],
  "cayman-islands": [90, 200],
  jersey: [120, 250],
  guernsey: [120, 250],
  "isle-of-man": [110, 230],
};

export const REGION_MID_USD: Record<string, MidBand> = {
  "Northern Europe": [130, 280],
  "Western Europe": [110, 240],
  "Southern Europe": [75, 170],
  "Eastern Europe": [45, 110],
  "Central Europe": [70, 160],
  "South-Eastern Europe": [45, 120],
  "Southeast Europe": [45, 120],
  "Northern America": [120, 280],
  Caribbean: [90, 220],
  "Central America": [45, 120],
  "South America": [40, 110],
  "Eastern Asia": [70, 170],
  "South-Eastern Asia": [30, 95],
  "Southern Asia": [25, 80],
  "Western Asia": [55, 150],
  "Central Asia": [35, 95],
  "Northern Africa": [35, 100],
  "Western Africa": [35, 95],
  "Eastern Africa": [35, 110],
  "Southern Africa": [45, 120],
  "Middle Africa": [40, 100],
  Melanesia: [70, 170],
  Micronesia: [90, 210],
  Polynesia: [120, 280],
  "Australia and New Zealand": [115, 250],
};

export const CONTINENT_MID_USD: Record<string, MidBand> = {
  Europe: [80, 180],
  Asia: [40, 120],
  Africa: [35, 100],
  "North America": [100, 240],
  "South America": [40, 110],
  Oceania: [100, 230],
};

export const CITY_MID_USD: Record<string, MidBand> = {
  dubai: [130, 300],
  "abu-dhabi": [120, 280],
  tokyo: [110, 240],
  kyoto: [100, 220],
  osaka: [95, 210],
  singapore: [110, 240],
  "hong-kong": [110, 240],
  london: [130, 280],
  paris: [120, 260],
  rome: [100, 220],
  venice: [120, 260],
  milan: [110, 240],
  florence: [105, 230],
  barcelona: [90, 200],
  madrid: [85, 190],
  amsterdam: [120, 250],
  zurich: [180, 350],
  geneva: [180, 350],
  lucerne: [170, 330],
  zermatt: [200, 400],
  "st-moritz": [220, 420],
  reykjavik: [160, 320],
  "new-york": [150, 320],
  "san-francisco": [150, 320],
  "los-angeles": [130, 280],
  miami: [130, 280],
  honolulu: [140, 300],
  aspen: [200, 400],
  "jackson-hole": [180, 360],
  "park-city": [160, 320],
  bali: [40, 120],
  ubud: [40, 120],
  bangkok: [35, 100],
  "chiang-mai": [30, 90],
  "phuket-town": [40, 120],
  "ho-chi-minh-city": [30, 90],
  hanoi: [30, 90],
  "da-nang": [30, 90],
  "siem-reap": [25, 80],
  "luang-prabang": [25, 80],
  "kuala-lumpur": [35, 100],
  penang: [35, 95],
  langkawi: [40, 110],
  manila: [35, 100],
  cebu: [35, 100],
  boracay: [45, 130],
  "el-nido": [40, 120],
  delhi: [25, 80],
  mumbai: [30, 95],
  goa: [30, 100],
  jaipur: [25, 80],
  agra: [25, 80],
  varanasi: [20, 70],
  kathmandu: [20, 60],
  colombo: [30, 90],
  galle: [35, 100],
  "maldives-male": [80, 200],
  "maldives-maafushi": [60, 150],
  sydney: [130, 280],
  melbourne: [120, 260],
  "queenstown-nz": [130, 280],
  auckland: [110, 240],
  cairo: [30, 90],
  luxor: [30, 90],
  marrakech: [40, 110],
  "cape-town": [50, 140],
  "victoria-falls-town": [55, 150],
  "zanzibar-stone-town": [50, 140],
  "machu-picchu-pueblo": [50, 140],
  cusco: [40, 110],
  "cartagena-colombia": [45, 120],
  "rio-de-janeiro": [50, 140],
  "buenos-aires": [40, 110],
  "san-pedro-de-atacama": [55, 140],
  santorini: [110, 240],
  mykonos: [120, 260],
  "ia-oia": [120, 260],
  ibiza: [110, 250],
  "ibiza-town": [110, 250],
  positano: [140, 280],
  amalfi: [130, 270],
  "capri-town": [150, 300],
  "cinque-terre": [110, 240],
  hallstatt: [120, 250],
  interlaken: [140, 280],
  chamonix: [130, 270],
  "banff-town": [130, 270],
  banff: [130, 270],
  whistler: [140, 280],
  "niagara-falls": [100, 220],
  "las-vegas": [110, 250],
  orlando: [110, 240],
  "key-west": [130, 270],
  napa: [150, 300],
  "santa-barbara": [140, 280],
  "palm-springs": [120, 250],
  "bora-bora-vaitape": [250, 500],
  "tahiti-papeete": [180, 380],
  "seychelles-victoria": [160, 350],
  "mauritius-port-louis": [80, 180],
  "petra-wadi-musa": [60, 150],
  "dead-sea-jordan": [70, 160],
};

function clampBand(low: number, high: number): MidBand {
  const a = Math.max(15, Math.round(low / 5) * 5);
  const b = Math.max(a + 20, Math.round(high / 5) * 5);
  return [a, b];
}

export function midRangeForCountry(meta: {
  slug?: string;
  continent?: string;
  region?: string;
} = {}): MidBand {
  const slug = meta.slug || "";
  if (COUNTRY_MID_USD[slug]) return clampBand(...COUNTRY_MID_USD[slug]);
  const region = meta.region || "";
  if (REGION_MID_USD[region]) return clampBand(...REGION_MID_USD[region]);
  const continent = meta.continent || "";
  if (CONTINENT_MID_USD[continent]) return clampBand(...CONTINENT_MID_USD[continent]);
  return [60, 160];
}

export function formatRange(mid: MidBand): string {
  return `$${mid[0]}–${mid[1]}`;
}

export function formatTierRange(mid: MidBand): string {
  return `${mid[0]}–${mid[1]}`;
}

export function budgetPerDayForCountry(meta: {
  slug?: string;
  continent?: string;
  region?: string;
} = {}): string {
  return formatRange(midRangeForCountry(meta));
}

export function tripCostForPlace(meta: {
  slug?: string;
  name?: string;
  countrySlug?: string;
  continent?: string;
  region?: string;
  countryName?: string;
} = {}) {
  const mid =
    meta.slug && CITY_MID_USD[meta.slug]
      ? clampBand(...CITY_MID_USD[meta.slug])
      : midRangeForCountry({
          slug: meta.countrySlug,
          continent: meta.continent,
          region: meta.region,
        });

  const [lo, hi] = mid;
  const budget = clampBand(lo * 0.45, lo * 0.75);
  const luxury = clampBand(hi * 1.15, hi * 1.9);
  const place = meta.name || "this destination";

  return {
    currency: "USD",
    budget: formatTierRange(budget),
    mid: formatTierRange(mid),
    luxury: `${formatTierRange(luxury)}+`,
    note: `Typical on-the-ground spend in ${place}${meta.countryName ? `, ${meta.countryName}` : ""}. Hostel/guesthouse + local meals ≈ budget; comfortable hotels + mix of dining ≈ mid-range; luxury hotels and fine dining ≈ luxury.`,
  };
}

export function calculatorDefaultsFromMid(mid: MidBand) {
  const daily = Math.round((mid[0] + mid[1]) / 2);
  return {
    accommodation: Math.max(25, Math.round((daily * 0.5) / 5) * 5),
    food: Math.max(10, Math.round((daily * 0.28) / 5) * 5),
    transport: Math.max(5, Math.round((daily * 0.1) / 5) * 5),
    activities: Math.max(5, Math.round((daily * 0.12) / 5) * 5),
    flights: 600,
  };
}

export function calculatorDefaultsForCountry(meta: {
  slug?: string;
  continent?: string;
  region?: string;
}) {
  return calculatorDefaultsFromMid(midRangeForCountry(meta));
}

export function calculatorDefaultsForCity(meta: {
  slug?: string;
  countrySlug?: string;
  continent?: string;
  region?: string;
}) {
  const mid =
    meta.slug && CITY_MID_USD[meta.slug]
      ? clampBand(...CITY_MID_USD[meta.slug])
      : midRangeForCountry({
          slug: meta.countrySlug,
          continent: meta.continent,
          region: meta.region,
        });
  return calculatorDefaultsFromMid(mid);
}

export function parseBudgetPerDay(str?: string | null): MidBand | null {
  if (!str) return null;
  const m = String(str).replace(/,/g, "").match(/(\d+)\s*[–—-]\s*(\d+)/);
  if (!m) return null;
  return [Number(m[1]), Number(m[2])];
}
