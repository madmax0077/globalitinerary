import type { Country } from "@/lib/types";
import { PHOTOS, unsplash } from "@/lib/images";
import { generatedCountries } from "@/data/countries.generated";
import { countryTimezones } from "@/data/country-timezones.generated";
import { normalizeRemoteImageUrl } from "@/lib/wikimedia";

function normalizeCountryImages(country: Country): Country {
  return {
    ...country,
    heroImage: normalizeRemoteImageUrl(country.heroImage, 1600),
    thumbnail: normalizeRemoteImageUrl(country.thumbnail, 900),
    gallery: (country.gallery || []).map((u) => normalizeRemoteImageUrl(u, 1400)),
  };
}

/**
 * Hand-curated countries with rich overviews, galleries, cities and
 * attractions. These override the auto-generated entries of the same slug.
 */
const curatedCountries: Country[] = [
  {
    id: "jp",
    slug: "japan",
    name: "Japan",
    officialName: "Nihon-koku",
    flag: "🇯🇵",
    continent: "Asia",
    region: "East Asia",
    capital: "Tokyo",
    population: 124_500_000,
    currency: "Japanese Yen",
    currencyCode: "JPY",
    languages: ["Japanese"],
    timezone: "GMT+9",
    callingCode: "+81",
    drivingSide: "left",
    visa: "Visa-free for 90 days for most Western passports",
    bestTime: "Late March–May (cherry blossom) & October–November (autumn foliage)",
    weather: "Four distinct seasons; humid summers, crisp snowy winters in the north",
    internet: "Ultra-fast, near-universal 5G; pocket Wi-Fi widely available",
    transportation: "The world's finest rail network — the Shinkansen bullet train and immaculate metros",
    safety: "One of the safest countries on earth, with extremely low crime",
    budgetPerDay: "$120–260",
    tagline: "Where ancient ritual meets neon-lit futurism",
    heroImage: unsplash(PHOTOS.fuji, 2400),
    thumbnail: unsplash(PHOTOS.fuji, 900),
    gallery: [PHOTOS.tokyo, PHOTOS.kyoto, PHOTOS.fujiLake, PHOTOS.tokyoStreet].map((p) => unsplash(p, 1400)),
    overview:
      "Japan is a spellbinding contrast of serenity and stimulation. Bullet trains glide past snow-dusted Mt. Fuji, centuries-old temples sit in the shadow of glowing skyscrapers, and a meal can be either a hushed kaiseki ritual or a riotous bowl of ramen at midnight. It rewards the curious traveler at every turn.",
    history:
      "From the imperial courts of Kyoto and the samurai era of the shogunate to the Meiji Restoration and postwar reinvention, Japan has woven tradition and innovation for over 1,500 years.",
    culture:
      "Harmony, craftsmanship and seasonal awareness define daily life — from the tea ceremony and calligraphy to anime, fashion and a legendary food culture.",
    rating: 4.9,
    reviews: 18420,
    coordinates: { lat: 36.2048, lng: 138.2529 },
    tags: ["Culture", "Food", "Cherry Blossom", "Temples", "Cities"],
    topCitySlugs: ["tokyo", "kyoto"],
    topAttractionSlugs: ["mount-fuji", "fushimi-inari-shrine", "senso-ji-temple"],
    faqs: [
      { question: "Do I need to speak Japanese to travel in Japan?", answer: "No. Major cities have English signage and translation apps work well, though learning a few phrases is appreciated." },
      { question: "Is Japan expensive?", answer: "It can be, but it's flexible — budget travelers thrive on convenience-store meals and hostels, while luxury seekers find world-class ryokan and dining." },
      { question: "Should I get a Japan Rail Pass?", answer: "If you're covering multiple cities by Shinkansen within 1–3 weeks, the JR Pass usually pays for itself." },
    ],
    featured: true,
    trending: true,
  },
  {
    id: "it",
    slug: "italy",
    name: "Italy",
    officialName: "Repubblica Italiana",
    flag: "🇮🇹",
    continent: "Europe",
    region: "Southern Europe",
    capital: "Rome",
    population: 58_900_000,
    currency: "Euro",
    currencyCode: "EUR",
    languages: ["Italian"],
    timezone: "GMT+1",
    callingCode: "+39",
    drivingSide: "right",
    visa: "Schengen area — 90 days visa-free for many nationalities",
    bestTime: "April–June & September–October for warm days and thinner crowds",
    weather: "Mediterranean — hot dry summers, mild wet winters",
    internet: "Good 4G/5G coverage in cities; patchier in remote hill towns",
    transportation: "Fast Frecciarossa trains connect cities; drive for the countryside",
    safety: "Very safe; watch for pickpockets in tourist hotspots",
    budgetPerDay: "$110–240",
    tagline: "La dolce vita — art, ruins and unforgettable food",
    heroImage: unsplash(PHOTOS.colosseum, 2400),
    thumbnail: unsplash(PHOTOS.colosseum, 900),
    gallery: [PHOTOS.rome, PHOTOS.venice, PHOTOS.food, PHOTOS.coast].map((p) => unsplash(p, 1400)),
    overview:
      "Italy is an open-air museum where every piazza tells a story. Wander Roman ruins, drift through Venetian canals, feast on regional pasta and sip espresso as scooters buzz past Renaissance facades. Few places pack this much beauty into a single country.",
    history:
      "Cradle of the Roman Empire and the Renaissance, Italy has shaped Western art, law, cuisine and architecture for millennia.",
    culture:
      "Family, food and craftsmanship are sacred. Regional identity runs deep — cuisine, dialect and tradition change dramatically from town to town.",
    rating: 4.8,
    reviews: 21050,
    coordinates: { lat: 41.8719, lng: 12.5674 },
    tags: ["History", "Food", "Art", "Coast", "Romance"],
    topCitySlugs: ["rome", "venice"],
    topAttractionSlugs: ["colosseum"],
    faqs: [
      { question: "When is the best time to visit Italy?", answer: "Shoulder seasons (spring and autumn) offer great weather without peak-summer crowds and heat." },
      { question: "Do I need to tip in Italy?", answer: "Tipping is not expected; a coperto (cover charge) is often included, though rounding up is appreciated." },
    ],
    featured: true,
    trending: true,
  },
  {
    id: "is",
    slug: "iceland",
    name: "Iceland",
    officialName: "Ísland",
    flag: "🇮🇸",
    continent: "Europe",
    region: "Northern Europe",
    capital: "Reykjavík",
    population: 390_000,
    currency: "Icelandic Króna",
    currencyCode: "ISK",
    languages: ["Icelandic"],
    timezone: "GMT+0",
    callingCode: "+354",
    drivingSide: "right",
    visa: "Schengen area — 90 days visa-free for many nationalities",
    bestTime: "June–August for midnight sun; September–March for the northern lights",
    weather: "Cool and famously changeable — pack layers year-round",
    internet: "Excellent connectivity even in remote areas",
    transportation: "Rent a car and drive the Ring Road for total freedom",
    safety: "Consistently ranked the most peaceful country in the world",
    budgetPerDay: "$180–350",
    tagline: "Fire, ice and otherworldly landscapes",
    heroImage: unsplash(PHOTOS.aurora, 2400),
    thumbnail: unsplash(PHOTOS.aurora, 900),
    gallery: [PHOTOS.icelandFalls, PHOTOS.mountains, PHOTOS.coast, PHOTOS.aurora].map((p) => unsplash(p, 1400)),
    overview:
      "Iceland feels like another planet: erupting geysers, thundering waterfalls, black-sand beaches, glaciers and geothermal lagoons. In winter the aurora dances overhead; in summer the sun never sets. It's raw nature at its most cinematic.",
    history:
      "Settled by Norse explorers in the 9th century, Iceland is home to the world's oldest surviving parliament, the Alþingi, founded in 930 AD.",
    culture:
      "A tiny, literary and creative population with deep ties to nature, saga storytelling and a thriving music scene.",
    rating: 4.9,
    reviews: 9860,
    coordinates: { lat: 64.9631, lng: -19.0208 },
    tags: ["Nature", "Adventure", "Northern Lights", "Waterfalls", "Road Trip"],
    topCitySlugs: [],
    topAttractionSlugs: [],
    faqs: [
      { question: "Can I see the northern lights any time of year?", answer: "No — you need darkness. Aim for September to March and clear skies away from city lights." },
      { question: "Is Iceland walkable or do I need a car?", answer: "Reykjavík is walkable, but a car (ideally 4x4 in winter) is essential to explore the countryside." },
    ],
    featured: true,
    trending: true,
  },
  {
    id: "gr",
    slug: "greece",
    name: "Greece",
    officialName: "Hellenic Republic",
    flag: "🇬🇷",
    continent: "Europe",
    region: "Southern Europe",
    capital: "Athens",
    population: 10_400_000,
    currency: "Euro",
    currencyCode: "EUR",
    languages: ["Greek"],
    timezone: "GMT+2",
    callingCode: "+30",
    drivingSide: "right",
    visa: "Schengen area — 90 days visa-free for many nationalities",
    bestTime: "May–June & September for warm seas and calmer islands",
    weather: "Classic Mediterranean — long hot summers, mild winters",
    internet: "Reliable 4G across the mainland and larger islands",
    transportation: "Ferries link the islands; rent a car or scooter to explore",
    safety: "Very safe and welcoming to travelers",
    budgetPerDay: "$90–210",
    tagline: "Whitewashed islands and the birthplace of democracy",
    heroImage: unsplash(PHOTOS.santoriniDomes, 2400),
    thumbnail: unsplash(PHOTOS.santoriniDomes, 900),
    gallery: [PHOTOS.santorini, PHOTOS.greeceSea, PHOTOS.coast, PHOTOS.beach].map((p) => unsplash(p, 1400)),
    overview:
      "Greece pairs ancient wonder with island paradise. Stand where philosophy was born beneath the Acropolis, then sail to Cycladic islands of blue-domed churches, cliffside sunsets and crystalline coves.",
    history:
      "The cradle of Western civilization — democracy, philosophy, theatre and the Olympic Games all trace their roots here.",
    culture:
      "Warm hospitality (philoxenia), long seaside meals, and a rhythm of life built around family and celebration.",
    rating: 4.8,
    reviews: 15230,
    coordinates: { lat: 39.0742, lng: 21.8243 },
    tags: ["Islands", "History", "Beaches", "Food", "Sunsets"],
    topCitySlugs: ["santorini"],
    topAttractionSlugs: [],
    faqs: [
      { question: "Which Greek island should I visit first?", answer: "Santorini for romance and views, Mykonos for nightlife, Naxos or Milos for a more relaxed, authentic feel." },
    ],
    featured: true,
    trending: false,
  },
  {
    id: "ae",
    slug: "united-arab-emirates",
    name: "United Arab Emirates",
    officialName: "United Arab Emirates",
    flag: "🇦🇪",
    continent: "Asia",
    region: "Middle East",
    capital: "Abu Dhabi",
    population: 9_500_000,
    currency: "UAE Dirham",
    currencyCode: "AED",
    languages: ["Arabic", "English"],
    timezone: "GMT+4",
    callingCode: "+971",
    drivingSide: "right",
    visa: "Visa on arrival or visa-free for many nationalities",
    bestTime: "November–March for pleasant, sunny weather",
    weather: "Desert climate — very hot summers, warm winters",
    internet: "World-class 5G and connectivity",
    transportation: "Sleek metros, taxis and ride-hailing everywhere",
    safety: "Extremely safe with very low crime",
    budgetPerDay: "$150–400",
    tagline: "Futuristic skylines rising from golden desert",
    heroImage: unsplash(PHOTOS.dubai, 2400),
    thumbnail: unsplash(PHOTOS.dubai, 900),
    gallery: [PHOTOS.dubai, PHOTOS.desertCamp, PHOTOS.sahara, PHOTOS.cityNight].map((p) => unsplash(p, 1400)),
    overview:
      "The UAE is superlative-obsessed and unforgettable: the world's tallest tower, palm-shaped islands, indoor ski slopes and desert safaris under starlit dunes — all wrapped in gleaming, ultramodern luxury.",
    history:
      "Once a string of pearl-diving and trading settlements, the seven emirates united in 1971 and transformed at breathtaking speed.",
    culture:
      "A cosmopolitan crossroads where Emirati heritage, Bedouin tradition and global influences blend seamlessly.",
    rating: 4.7,
    reviews: 12770,
    coordinates: { lat: 23.4241, lng: 53.8478 },
    tags: ["Luxury", "Desert", "Skylines", "Shopping", "Adventure"],
    topCitySlugs: ["dubai"],
    topAttractionSlugs: [],
    faqs: [
      { question: "What should I wear in the UAE?", answer: "Dress is relaxed in tourist areas, but modest clothing is respectful, especially at mosques and traditional districts." },
    ],
    featured: true,
    trending: true,
  },
  {
    id: "pe",
    slug: "peru",
    name: "Peru",
    officialName: "República del Perú",
    flag: "🇵🇪",
    continent: "South America",
    region: "Andes",
    capital: "Lima",
    population: 34_000_000,
    currency: "Peruvian Sol",
    currencyCode: "PEN",
    languages: ["Spanish", "Quechua"],
    timezone: "GMT-5",
    callingCode: "+51",
    drivingSide: "right",
    visa: "Visa-free for up to 90–183 days for many nationalities",
    bestTime: "May–September (dry season) for the Andes and Machu Picchu",
    weather: "Coastal desert, high-altitude Andes and Amazon rainforest all at once",
    internet: "Good in cities, limited on remote treks",
    transportation: "Domestic flights, scenic trains and long-distance buses",
    safety: "Generally safe; take normal precautions in big cities",
    budgetPerDay: "$60–160",
    tagline: "Lost cities, soaring Andes and ancient culture",
    heroImage: unsplash(PHOTOS.machuPicchu, 2400),
    thumbnail: unsplash(PHOTOS.machuPicchu, 900),
    gallery: [PHOTOS.machuPicchu, PHOTOS.mountains, PHOTOS.temple, PHOTOS.food].map((p) => unsplash(p, 1400)),
    overview:
      "Peru is a bucket-list titan: the mist-wrapped ruins of Machu Picchu, the Inca capital of Cusco, the Amazon jungle, Pacific surf towns and one of the world's most exciting food scenes in Lima.",
    history:
      "Home to the mighty Inca Empire and civilizations stretching back thousands of years before Spanish colonization.",
    culture:
      "A vibrant blend of Indigenous Andean and Spanish heritage, expressed in textiles, music, festivals and cuisine.",
    rating: 4.8,
    reviews: 8410,
    coordinates: { lat: -9.19, lng: -75.0152 },
    tags: ["Adventure", "History", "Mountains", "Food", "Trekking"],
    topCitySlugs: [],
    topAttractionSlugs: ["machu-picchu"],
    faqs: [
      { question: "How do I deal with altitude in Cusco?", answer: "Acclimatize for a day or two, hydrate, go easy on alcohol, and try coca tea as the locals do." },
    ],
    featured: false,
    trending: true,
  },
  {
    id: "th",
    slug: "thailand",
    name: "Thailand",
    officialName: "Kingdom of Thailand",
    flag: "🇹🇭",
    continent: "Asia",
    region: "Southeast Asia",
    capital: "Bangkok",
    population: 71_800_000,
    currency: "Thai Baht",
    currencyCode: "THB",
    languages: ["Thai"],
    timezone: "GMT+7",
    callingCode: "+66",
    drivingSide: "left",
    visa: "Visa exemption for 30–60 days for many nationalities",
    bestTime: "November–March for cooler, drier weather",
    weather: "Tropical — hot and humid with a monsoon season",
    internet: "Cheap, fast mobile data everywhere",
    transportation: "Cheap flights, trains, tuk-tuks and long-tail boats",
    safety: "Very traveler-friendly; use common sense",
    budgetPerDay: "$40–130",
    tagline: "Golden temples, street food and turquoise seas",
    heroImage: unsplash(PHOTOS.phiPhi, 2400),
    thumbnail: unsplash(PHOTOS.phiPhi, 900),
    gallery: [PHOTOS.longtail, PHOTOS.temple, PHOTOS.beach, PHOTOS.food].map((p) => unsplash(p, 1400)),
    overview:
      "Thailand is the ultimate crowd-pleaser: glittering temples and buzzing megacities, then limestone islands rising from warm turquoise water. Add legendary street food and famously warm hospitality and it's easy to see why travelers return again and again.",
    history:
      "The only Southeast Asian nation never colonized, with a proud monarchy and Buddhist heritage stretching back centuries.",
    culture:
      "Devoutly Buddhist, endlessly hospitable, and centered on food, family and festivals like Songkran and Loy Krathong.",
    rating: 4.7,
    reviews: 19980,
    coordinates: { lat: 15.87, lng: 100.9925 },
    tags: ["Beaches", "Food", "Temples", "Islands", "Budget"],
    topCitySlugs: [],
    topAttractionSlugs: [],
    faqs: [
      { question: "Is street food safe to eat in Thailand?", answer: "Yes — busy stalls with high turnover are your best bet and often the tastiest, freshest food around." },
    ],
    featured: false,
    trending: true,
  },
  {
    id: "fr",
    slug: "france",
    name: "France",
    officialName: "République française",
    flag: "🇫🇷",
    continent: "Europe",
    region: "Western Europe",
    capital: "Paris",
    population: 68_200_000,
    currency: "Euro",
    currencyCode: "EUR",
    languages: ["French"],
    timezone: "GMT+1",
    callingCode: "+33",
    drivingSide: "right",
    visa: "Schengen area — 90 days visa-free for many nationalities",
    bestTime: "April–June & September–October",
    weather: "Temperate; warm summers, cool winters, sunnier in the south",
    internet: "Excellent 4G/5G nationwide",
    transportation: "The high-speed TGV makes the country wonderfully compact",
    safety: "Very safe; be alert to pickpockets in busy areas",
    budgetPerDay: "$120–260",
    tagline: "Art, romance and world-defining cuisine",
    heroImage: unsplash(PHOTOS.eiffel, 2400),
    thumbnail: unsplash(PHOTOS.eiffel, 900),
    gallery: [PHOTOS.paris, PHOTOS.eiffel, PHOTOS.food, PHOTOS.coast].map((p) => unsplash(p, 1400)),
    overview:
      "France sets the global standard for art de vivre. Beyond Paris lie lavender fields of Provence, Champagne cellars, alpine peaks, Riviera beaches and a village-by-village feast of cheese, wine and pastry.",
    history:
      "From Gothic cathedrals and Versailles to the Revolution and the Enlightenment, France has shaped world culture and politics.",
    culture:
      "A deep reverence for food, fashion, cinema and intellectual life — savored slowly and stylishly.",
    rating: 4.8,
    reviews: 22300,
    coordinates: { lat: 46.2276, lng: 2.2137 },
    tags: ["Art", "Food", "Wine", "Romance", "Cities"],
    topCitySlugs: [],
    topAttractionSlugs: [],
    faqs: [
      { question: "Do people in France speak English?", answer: "In cities and tourist areas, widely. A polite 'Bonjour' before switching to English goes a long way." },
    ],
    featured: false,
    trending: false,
  },
  {
    id: "hk",
    slug: "hong-kong",
    name: "Hong Kong",
    officialName: "Hong Kong Special Administrative Region",
    flag: "🇭🇰",
    continent: "Asia",
    region: "East Asia",
    capital: "Hong Kong",
    population: 7_500_000,
    currency: "Hong Kong Dollar",
    currencyCode: "HKD",
    languages: ["Chinese", "English"],
    timezone: "GMT+8",
    callingCode: "+852",
    drivingSide: "left",
    visa: "Visa-free for many nationalities (typically 7–90 days); check latest HKSAR rules",
    bestTime: "October–April for cooler, clearer weather",
    weather: "Subtropical — humid summers, mild winters, occasional typhoons June–October",
    internet: "Excellent 4G/5G and ubiquitous Wi‑Fi",
    transportation: "MTR, trams, ferries, Star Ferry and Octopus card make the city effortless",
    safety: "Very safe; one of Asia's easiest cities for solo and first-time travellers",
    budgetPerDay: "$90–220",
    tagline: "Skyline, harbour and endless food",
    heroImage: unsplash(PHOTOS.cityNight, 2400),
    thumbnail: unsplash(PHOTOS.cityNight, 900),
    gallery: [PHOTOS.cityNight, PHOTOS.temple, PHOTOS.food, PHOTOS.coast].map((p) => unsplash(p, 1400)),
    overview:
      "Hong Kong packs harbour views, hiking trails, street food and world-class dining into a compact, bilingual city that rewards both short stopovers and longer stays.",
    history:
      "A former British colony returned to China in 1997 as a Special Administrative Region under 'one country, two systems'.",
    culture:
      "Cantonese traditions meet global finance and nightlife — dim sum, hiking and neon in one itinerary.",
    rating: 4.8,
    reviews: 18700,
    coordinates: { lat: 22.3193, lng: 114.1694 },
    tags: ["Asia", "City", "Food", "Skyline", "Shopping"],
    topCitySlugs: ["hong-kong"],
    topAttractionSlugs: [],
    faqs: [
      { question: "Is Hong Kong easy for English speakers?", answer: "Yes — English is widely used on signs, MTR and in tourist areas." },
    ],
    featured: true,
    trending: true,
  },
  {
    id: "tw",
    slug: "taiwan",
    name: "Taiwan",
    officialName: "Taiwan",
    flag: "🇹🇼",
    continent: "Asia",
    region: "East Asia",
    capital: "Taipei",
    population: 23_500_000,
    currency: "New Taiwan Dollar",
    currencyCode: "TWD",
    languages: ["Mandarin Chinese", "Taiwanese Hokkien"],
    timezone: "GMT+8",
    callingCode: "+886",
    drivingSide: "right",
    visa: "Visa-exempt entry for many nationalities (often 90 days); check BOCA for your passport",
    bestTime: "October–April for milder weather; avoid peak typhoon season when possible",
    weather: "Subtropical — hot humid summers, pleasant winters in the north, tropical south",
    internet: "Excellent 4G/5G; tourist eSIMs and EasyCard are simple",
    transportation: "HSR links major cities; Taipei MRT and TRA trains cover the rest",
    safety: "Very safe with warm hospitality and clear visitor infrastructure",
    budgetPerDay: "$60–150",
    tagline: "Night markets, mountains and night-skyline views",
    heroImage: unsplash(PHOTOS.cityNight, 2400),
    thumbnail: unsplash(PHOTOS.cityNight, 900),
    gallery: [PHOTOS.cityNight, PHOTOS.food, PHOTOS.temple, PHOTOS.lantern].map((p) => unsplash(p, 1400)),
    overview:
      "Taiwan blends night-market food culture, high-speed rail convenience, mountain scenery and a welcoming capital in Taipei — ideal for first-time East Asia trips.",
    history:
      "A complex history spanning indigenous cultures, colonial eras and modern democracy — today a tech-forward island with deep food traditions.",
    culture:
      "Night markets, temple festivals, bubble tea and hiking culture define daily life.",
    rating: 4.8,
    reviews: 9200,
    coordinates: { lat: 25.033, lng: 121.5654 },
    tags: ["Asia", "Food", "Cities", "Nature", "Culture"],
    topCitySlugs: ["taipei"],
    topAttractionSlugs: [],
    faqs: [
      { question: "Is Taiwan good for first-time Asia travellers?", answer: "Yes — English is workable in Taipei, transport is excellent and food is outstanding value." },
    ],
    featured: true,
    trending: true,
  },
  {
    id: "mo",
    slug: "macau",
    name: "Macau",
    officialName: "Macau Special Administrative Region",
    flag: "🇲🇴",
    continent: "Asia",
    region: "East Asia",
    capital: "Macau",
    population: 680_000,
    currency: "Macanese Pataca",
    currencyCode: "MOP",
    languages: ["Chinese", "Portuguese", "English"],
    timezone: "GMT+8",
    callingCode: "+853",
    drivingSide: "left",
    visa: "Visa-free for many nationalities for short stays; check MSAR immigration",
    bestTime: "October–April",
    weather: "Subtropical — humid summers, mild winters",
    internet: "Strong 4G/5G in tourist areas",
    transportation: "Walkable historic centre; buses and taxis between Cotai and the peninsula",
    safety: "Very safe; busy casino floors need normal crowd awareness",
    budgetPerDay: "$80–250",
    tagline: "Portuguese heritage meets Cotai spectacle",
    heroImage: unsplash(PHOTOS.cityNight, 2400),
    thumbnail: unsplash(PHOTOS.cityNight, 900),
    gallery: [PHOTOS.cityNight, PHOTOS.temple, PHOTOS.food, PHOTOS.coast].map((p) => unsplash(p, 1400)),
    overview:
      "Macau pairs UNESCO-listed Portuguese-Chinese heritage with Cotai resort gaming and some of Asia's most memorable egg tarts and dim sum.",
    history:
      "A former Portuguese territory returned to China in 1999 as a Special Administrative Region.",
    culture:
      "Catholic churches, Chinese temples, Portuguese egg tarts and mega-resorts sit blocks apart.",
    rating: 4.6,
    reviews: 5400,
    coordinates: { lat: 22.1987, lng: 113.5439 },
    tags: ["Asia", "Heritage", "Food", "Casino", "City"],
    topCitySlugs: ["macau"],
    topAttractionSlugs: [],
    faqs: [
      { question: "Can I day-trip from Hong Kong?", answer: "Yes — ferries and the Hong Kong–Zhuhai–Macau Bridge make day trips easy; overnight is better for Cotai and old town." },
    ],
    featured: false,
    trending: true,
  },
  {
    id: "pr",
    slug: "puerto-rico",
    name: "Puerto Rico",
    officialName: "Commonwealth of Puerto Rico",
    flag: "🇵🇷",
    continent: "North America",
    region: "Caribbean",
    capital: "San Juan",
    population: 3_200_000,
    currency: "United States Dollar",
    currencyCode: "USD",
    languages: ["Spanish", "English"],
    timezone: "GMT-4",
    callingCode: "+1",
    drivingSide: "right",
    visa: "US entry rules apply — US citizens need no passport for domestic travel; other nationalities follow US visa/ESTA rules",
    bestTime: "December–April for drier weather; June–November is hurricane season",
    weather: "Tropical — warm year-round with a wetter summer/autumn",
    internet: "Good 4G/5G in cities; US carriers often work",
    transportation: "Rental car for island exploration; Uber in San Juan; ferries to nearby islands",
    safety: "Tourist areas are generally fine with normal big-city caution; avoid isolated areas at night",
    budgetPerDay: "$80–200",
    tagline: "Old San Juan colour and Caribbean beaches",
    heroImage: unsplash(PHOTOS.coast, 2400),
    thumbnail: unsplash(PHOTOS.coast, 900),
    gallery: [PHOTOS.coast, PHOTOS.beach, PHOTOS.cityNight, PHOTOS.temple].map((p) => unsplash(p, 1400)),
    overview:
      "Puerto Rico blends Spanish colonial Old San Juan, Atlantic and Caribbean beaches, bioluminescent bays and easy logistics for US travellers — a compact island with city and nature in one trip.",
    history:
      "A Spanish colony for centuries and a US territory since 1898, Puerto Rico keeps a distinct Caribbean-Latino culture and Spanish as the everyday language.",
    culture:
      "Salsa, bomba, rum, coffee highlands and brightly painted Old San Juan streets define the visitor experience.",
    rating: 4.7,
    reviews: 6100,
    coordinates: { lat: 18.4655, lng: -66.1057 },
    tags: ["Caribbean", "Beach", "Heritage", "City", "Nature"],
    topCitySlugs: ["san-juan"],
    topAttractionSlugs: [],
    faqs: [
      { question: "Do I need a passport from the US?", answer: "US citizens generally travel as domestic; other nationalities follow US entry requirements. Always confirm current rules before flying." },
    ],
    featured: false,
    trending: true,
  },
  {
    id: "aw",
    slug: "aruba",
    name: "Aruba",
    officialName: "Aruba",
    flag: "🇦🇼",
    continent: "North America",
    region: "Caribbean",
    capital: "Oranjestad",
    population: 107_000,
    currency: "Aruban Florin",
    currencyCode: "AWG",
    languages: ["Papiamento", "Dutch", "English", "Spanish"],
    timezone: "GMT-4",
    callingCode: "+297",
    drivingSide: "right",
    visa: "Many nationalities enter visa-free for short stays; check Aruba immigration for your passport",
    bestTime: "Year-round; outside peak Christmas–April for lower rates",
    weather: "Dry Caribbean climate — sunny and breezy; outside the main hurricane belt",
    internet: "Good resort and town connectivity; local SIMs available",
    transportation: "Rental car or bus for beaches; taxis in Oranjestad",
    safety: "Very tourist-friendly with normal beach and valuables precautions",
    budgetPerDay: "$120–280",
    tagline: "One happy island — beaches and breezy Oranjestad",
    heroImage: unsplash(PHOTOS.beach, 2400),
    thumbnail: unsplash(PHOTOS.beach, 900),
    gallery: [PHOTOS.beach, PHOTOS.coast, PHOTOS.maldives, PHOTOS.cityNight].map((p) => unsplash(p, 1400)),
    overview:
      "Aruba is a dry, sunny Dutch Caribbean island known for Eagle Beach, Palm Beach resorts and colourful Oranjestad — easy English, reliable weather and classic beach holidays.",
    history:
      "Part of the Kingdom of the Netherlands, Aruba developed from colonial trade into one of the Caribbean's most visited leisure islands.",
    culture:
      "Papiamento greetings, Dutch architecture in Oranjestad and a strong beach-resort rhythm define daily life.",
    rating: 4.7,
    reviews: 4200,
    coordinates: { lat: 12.5092, lng: -70.0086 },
    tags: ["Caribbean", "Beach", "Resort", "Island"],
    topCitySlugs: ["oranjestad"],
    topAttractionSlugs: [],
    faqs: [
      { question: "Is Aruba good in summer?", answer: "Yes — it sits outside the main hurricane belt and stays relatively dry compared with many Caribbean islands." },
    ],
    featured: false,
    trending: false,
  },
];

const curatedBySlug = new Map(curatedCountries.map((c) => [c.slug, c]));

/** Light factual patches for generated countries (without full re-curation). */
const countryPatches: Partial<Record<string, Partial<Country>>> = {
  indonesia: {
    timezone: "Asia/Jakarta",
    bestTime: "April–October dry season; May–June and September are ideal shoulder months",
    weather: "Tropical — hot and humid year-round, with a clearer dry season from April to October",
    drivingSide: "left",
    internet: "4G/5G strong in Jakarta, Bali and major cities; Gojek/Grab eSIMs and tourist SIMs are easy",
    transportation: "Domestic flights link the islands; in Bali use drivers, scooters and Grab/Gojek",
    topCitySlugs: ["jakarta", "bali", "surabaya", "bandung", "medan"],
    tags: ["Asia", "Islands", "Beaches", "Temples", "Culture", "Food"],
  },
  "united-states": {
    topCitySlugs: [
      "new-york-city",
      "los-angeles",
      "san-francisco",
      "miami",
      "orlando",
      "las-vegas",
      "washington-dc",
      "boston",
      "chicago",
      "honolulu",
      "san-diego",
      "seattle",
      "new-orleans",
    ],
  },
  "united-kingdom": {
    topCitySlugs: ["london", "edinburgh", "manchester", "birmingham", "glasgow"],
  },
  switzerland: {
    topCitySlugs: ["zurich", "geneva", "basel", "bern", "lausanne"],
  },
  thailand: {
    topCitySlugs: ["bangkok", "phuket", "chiang-mai"],
  },
  philippines: {
    topCitySlugs: ["manila", "cebu", "davao"],
  },
  "new-zealand": {
    topCitySlugs: ["auckland", "wellington", "christchurch", "queenstown"],
  },
  peru: {
    topCitySlugs: ["lima", "cusco", "arequipa", "trujillo"],
  },
  italy: {
    topCitySlugs: ["rome", "milan", "florence", "venice", "naples"],
  },
  jordan: {
    topCitySlugs: ["amman", "petra", "zarqa", "irbid"],
  },
  greece: {
    topCitySlugs: ["athens", "thessaloniki", "mykonos", "santorini"],
  },
  croatia: {
    topCitySlugs: ["zagreb", "split", "dubrovnik", "rijeka"],
  },
  austria: {
    topCitySlugs: ["vienna", "graz", "linz", "salzburg"],
  },
  belgium: {
    topCitySlugs: ["brussels", "antwerp", "charleroi", "bruges"],
  },
  turkiye: {
    topCitySlugs: ["istanbul", "ankara", "izmir", "bursa", "antalya"],
  },
  mexico: {
    topCitySlugs: ["mexico-city", "cancun", "puebla"],
  },
  canada: {
    topCitySlugs: ["toronto", "montreal", "vancouver", "calgary", "ottawa"],
  },

  // --- GSC priority destinations (high impressions, weak position) ---
  namibia: {
    tagline: "Desert dunes, wildlife and Atlantic coast road trips",
    overview:
      "Visit Namibia for some of Africa's most dramatic landscapes — Sossusvlei's red dunes, Etosha wildlife, Skeleton Coast fog and Swakopmund's adventure scene. This Namibia travel guide helps you plan travel to Namibia with realistic routes from Windhoek, best seasons and safari-friendly budgets.",
    bestTime: "May–October dry season for wildlife and cooler desert nights; July–September peak for Etosha",
    weather: "Arid to semi-arid — hot days, cool nights; sparse rainfall mainly November–March",
    transportation: "Self-drive is the classic way to travel Namibia; domestic flights link Windhoek, Swakopmund and safari lodges",
    safety: "Generally safe for tourism on main routes — plan fuel stops in remote areas and avoid driving at night outside towns",
    budgetPerDay: "$80–220",
    topCitySlugs: ["windhoek", "swakopmund", "walvis-bay"],
    tags: ["Africa", "Safari", "Desert", "Road trip", "Wildlife"],
  },
  romania: {
    tagline: "Carpathian castles, Saxon towns and lively Bucharest",
    overview:
      "Romania travel blends mountain scenery, medieval towns like Brașov and Sighișoara, Black Sea beaches and Bucharest's cafe culture. Use this Romania travel guide to visit Romania with a clear itinerary — Transylvania loop, Bucharest base and seasonal tips for hiking or Christmas markets.",
    bestTime: "May–June and September–October for mild weather; December for festive markets",
    weather: "Continental — warm summers, cold snowy winters in the mountains",
    transportation: "Trains and buses link major cities; hire a car for Transylvania villages and mountain roads",
    safety: "Generally safe for tourists in cities and resorts — use normal city precautions with valuables",
    budgetPerDay: "$50–140",
    topCitySlugs: ["bucharest", "iasi", "constanta"],
    tags: ["Europe", "Castles", "Mountains", "Culture", "Budget"],
  },
  moldova: {
    tagline: "Wine cellars, Chisinau cafés and quiet countryside",
    overview:
      "Travel to Moldova for underground wine cities, Orthodox monasteries and a compact capital that is easy to explore on foot. This Moldova travel guide covers visiting Moldova safely, when to go for wine harvests and how to combine Chisinau with day trips.",
    bestTime: "May–June and September–October for wine country and mild weather",
    weather: "Temperate continental — warm summers, cold winters",
    transportation: "Marshrutkas and taxis cover Chisinau; hire a car or join tours for Orheiul Vechi and wine cellars",
    safety: "Mainstream tourist areas are generally calm — check current advice for the Transnistria region before any side trip",
    budgetPerDay: "$40–110",
    topCitySlugs: ["chisinau", "balti", "tiraspol"],
    tags: ["Europe", "Wine", "Culture", "Off the beaten path"],
  },
  serbia: {
    tagline: "Belgrade nightlife, fortress towns and Danube scenery",
    overview:
      "A Serbia travel guide for visitors who want Belgrade energy, Novi Sad festivals and historic fortress towns along the Danube. Plan visiting Serbia with this overview of seasons, budgets and easy city-to-city routes.",
    bestTime: "May–June and September–October; July for EXIT Festival in Novi Sad",
    weather: "Continental — hot summers, cold winters",
    transportation: "Buses are reliable between cities; Belgrade has trams, buses and affordable taxis/apps",
    safety: "Generally safe for travellers in major cities — use normal nightlife precautions",
    budgetPerDay: "$45–130",
    topCitySlugs: ["belgrade", "novi-sad", "nis"],
    tags: ["Europe", "Cities", "Nightlife", "Culture"],
  },
  haiti: {
    tagline: "Caribbean mountains, Citadelle history and Creole culture",
    overview:
      "Visit Haiti for Citadelle Laferrière, Cap-Haïtien heritage and Caribbean coastline — with careful trip planning. This Haiti travel guide outlines best seasons, practical tips and why many travellers combine Haiti with the Dominican Republic.",
    bestTime: "November–March for drier weather; avoid peak hurricane months when possible",
    weather: "Tropical — hot and humid year-round with a wetter season roughly April–October",
    transportation: "Domestic flights and private drivers are common; road conditions vary widely",
    safety: "Security conditions can change quickly — check official travel advisories and use trusted local operators",
    budgetPerDay: "$70–180",
    topCitySlugs: ["port-au-prince", "petionville", "saint-marc"],
    tags: ["Caribbean", "History", "Culture", "Beaches"],
  },
  bangladesh: {
    tagline: "River deltas, tea hills and vibrant Dhaka",
    overview:
      "Bangladesh travel rewards curious travellers with Sundarbans wildlife, Sylhet tea gardens and dense urban energy in Dhaka. This Bangladesh travel guide covers best time to visit, regional highlights and practical tips for travelling in Bangladesh.",
    bestTime: "November–March for cooler, drier weather and easier road travel",
    weather: "Tropical monsoon — hot humid summers; heavy rains roughly June–October",
    transportation: "Domestic flights, trains and launches connect major regions; traffic in Dhaka is intense",
    safety: "Exercise normal urban precautions; monitor weather and flood advisories in monsoon season",
    budgetPerDay: "$35–100",
    topCitySlugs: ["dhaka", "chattogram", "khulna", "rajshahi"],
    tags: ["Asia", "Rivers", "Culture", "Wildlife"],
  },
  bahrain: {
    tagline: "Gulf island culture, pearling history and Manama nights",
    overview:
      "Visit Bahrain for Manama's skyline, Bahrain Fort, desert drives and weekend energy from the Gulf region. This Bahrain travel guide helps with best months, what to see and how to plan a short trip.",
    bestTime: "November–March for cooler evenings; summers are extremely hot",
    weather: "Desert climate — mild winters, very hot humid summers",
    transportation: "Taxis and ride apps are easy in Manama; the island is compact for day trips",
    safety: "Generally safe for tourists — dress modestly outside nightlife areas and respect local customs",
    budgetPerDay: "$90–220",
    topCitySlugs: ["manama"],
    tags: ["Middle East", "Gulf", "City break", "Culture"],
  },
  netherlands: {
    tagline: "Canals, cycling cities and easy Schengen travel",
    overview:
      "Travel to the Netherlands for Amsterdam canals, Rotterdam design, Utrecht's compact centre and tulip season day trips. This Netherlands travel guide covers when to visit, city bases and Schengen visa / entry basics for your trip.",
    bestTime: "April–May for tulips; May–June and September for milder crowds",
    weather: "Maritime — mild, changeable and often breezy; pack layers and rain protection",
    transportation: "Trains are excellent between cities; cycling is everyday transport in town centres",
    safety: "Very safe for tourists — watch for bike lanes and pickpockets in busy stations",
    budgetPerDay: "$100–250",
    topCitySlugs: ["amsterdam", "rotterdam", "the-hague", "utrecht"],
    tags: ["Europe", "Cities", "Cycling", "Museums"],
  },
  spain: {
    tagline: "Cities, coast and food-first road trips",
    overview:
      "Spain travel spans Madrid and Barcelona, Andalusian cities, Basque food and Mediterranean beaches. Use this Spain travel guide to plan travelling around Spain with seasonal tips and multi-city routes.",
    bestTime: "April–June and September–October; July–August is peak on the coast",
    weather: "Varied — Atlantic north is greener and cooler; Mediterranean south is hotter and drier",
    transportation: "High-speed AVE trains link major cities; regional buses and rental cars fill the gaps",
    safety: "Generally safe — be alert for pickpockets in tourist hubs and on metro lines",
    budgetPerDay: "$70–200",
    topCitySlugs: ["madrid", "barcelona", "seville", "valencia", "bilbao"],
    tags: ["Europe", "Food", "Beaches", "Cities", "Culture"],
  },
  armenia: {
    tagline: "Ancient monasteries, Yerevan cafés and mountain roads",
    overview:
      "Visiting Armenia means monastery day trips, Lake Sevan weekends and a walkable capital full of cafés. This Armenia travel guide covers best seasons and how to travel in Armenia without overcomplicating logistics.",
    bestTime: "May–June and September–October for hiking and mild weather",
    weather: "Continental highland — hot summers, cold snowy winters",
    transportation: "Yerevan marshrutkas and taxis; hire a driver or join tours for remote monasteries",
    safety: "Generally welcoming for tourists — check current advice near border areas",
    budgetPerDay: "$40–120",
    topCitySlugs: ["yerevan"],
    tags: ["Europe", "Asia", "Mountains", "History", "Culture"],
  },
  uganda: {
    tagline: "Gorillas, the Nile and Kampala as a launchpad",
    overview:
      "Travel to Uganda for gorilla trekking, Murchison Falls and a growing coffee-and-city scene in Kampala. This Uganda travel guide outlines seasons, safari logistics and practical tips for an Uganda visit.",
    bestTime: "June–September and December–February drier windows for parks and trekking",
    weather: "Equatorial highland — pleasant temperatures; rainfall varies by region",
    transportation: "Domestic flights and private safari vehicles are common between parks",
    safety: "Follow park rules and current advisories; use registered gorilla-permit operators",
    budgetPerDay: "$80–250",
    topCitySlugs: ["kampala", "mbarara"],
    tags: ["Africa", "Safari", "Wildlife", "Adventure"],
  },
};

/**
 * Full list of countries: every generated country, with curated entries
 * overriding their auto-generated counterparts. Sorted alphabetically.
 */
function withStandardTimezone(country: Country): Country {
  const iana = countryTimezones[country.slug];
  // Prefer standard IANA zones (Asia/Kolkata → UTC+05:30) over approximate GMT+N.
  return iana ? { ...country, timezone: iana } : country;
}

function withHonestCountryCopy(country: Country): Country {
  const tagline = /^Discover the wonders of /i.test(country.tagline || "")
    ? `Visit ${country.name} — practical travel planning`
    : country.tagline;
  const overview = /distinctive slice of the world to explore/i.test(country.overview || "")
    ? `${country.name} is in ${country.region}, ${country.continent}, with ${country.capital} as its capital. Use this guide for trip planning — best time, budget ranges, cities and practical tips.`
    : country.overview;
  const visa = /entry requirements vary by nationality/i.test(country.visa || "")
    ? `Visa rules for ${country.name} depend on your passport — use the visa checker on this site for a nationality-specific answer.`
    : country.visa;
  const safety = /exercise normal precautions/i.test(country.safety || "")
    ? `Check current travel advice for ${country.name} before you go.`
    : country.safety;
  return { ...country, tagline, overview, visa, safety };
}

export const countries: Country[] = [
  ...curatedCountries
    .filter((c) => !generatedCountries.some((g) => g.slug === c.slug))
    .map(withStandardTimezone)
    .map(withHonestCountryCopy)
    .map(normalizeCountryImages),
  ...generatedCountries.map((g) => {
    const curated = curatedBySlug.get(g.slug);
    const base = curated ?? g;
    const patch = countryPatches[g.slug];
    const merged = patch ? { ...base, ...patch } : base;
    return normalizeCountryImages(withHonestCountryCopy(withStandardTimezone(merged)));
  }),
].sort((a, b) => a.name.localeCompare(b.name));

export function getCountry(slug: string) {
  return countries.find((c) => c.slug === slug);
}

export function getAllCountrySlugs() {
  return countries.map((c) => c.slug);
}

/**
 * Slugs to statically prerender at build time. The rest are generated
 * on-demand via ISR (dynamicParams), keeping builds fast while remaining
 * scalable to every country.
 */
export function getPrerenderedCountrySlugs() {
  return countries
    .filter((c) => c.featured || c.trending || c.topCitySlugs.length > 0)
    .map((c) => c.slug);
}
