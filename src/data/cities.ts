import type { City, Stay } from "@/lib/types";
import { PHOTOS, unsplash } from "@/lib/images";
import { sanitizeCityImages } from "@/lib/place-images";
import { generatedCities } from "@/data/cities.generated";
import { cityPicks } from "@/data/city-picks";
import { citySights } from "@/data/city-sights";
import { cityEnrichments } from "@/data/city-enrichments";

function hasWikimediaPhoto(city: City): boolean {
  const urls = [city.heroImage, city.thumbnail, ...(city.gallery || [])];
  return urls.some((u) => typeof u === "string" && u.includes("upload.wikimedia.org"));
}

/** Overlay richer travel copy — keep real place photos when enrichment only has stock. */
function applyCityEnrichment(city: City): City {
  const patch = cityEnrichments[city.slug];
  if (!patch) return city;
  if (hasWikimediaPhoto(city)) {
    const { heroImage: _h, thumbnail: _t, gallery: _g, ...copy } = patch;
    return { ...city, ...copy };
  }
  return { ...city, ...patch };
}

/** Prefer curated local-favourite eats + tourist-favourite stays when available. */
function applyCityPicks(city: City): City {
  const picks = cityPicks[city.slug];
  if (picks) {
    return {
      ...city,
      restaurants: picks.restaurants,
      stays: picks.stays,
      hotels: picks.stays.map((s) => s.name),
    };
  }
  const stays: Stay[] =
    city.stays && city.stays.length > 0
      ? city.stays
      : (city.hotels || []).map((name) => ({ name }));
  return { ...city, stays };
}

function itineraryFromSights(sights: string[]) {
  const titles = ["Icons & landmarks", "Culture & neighborhoods", "More highlights", "Day trips & more"];
  const days = Math.min(4, Math.ceil(sights.length / 3));
  return Array.from({ length: days }, (_, d) => ({
    day: d + 1,
    title: titles[d] || `Day ${d + 1}`,
    activities: sights.slice(d * 3, d * 3 + 3).map((s) => `Visit ${s}`),
  }));
}

/** Prefer curated famous landmarks over polluted Wikivoyage see/do lists. */
function applyCitySights(city: City): City {
  const sights = citySights[city.slug];
  if (!sights || sights.length === 0) return city;
  // Keep hand-written itineraries (Bali etc.); rebuild auto "Visit …" ones.
  const handWritten = city.itinerary?.some((d) =>
    d.activities?.some((a) => !/^Visit\s/i.test(a)),
  );
  return {
    ...city,
    thingsToDo: sights,
    itinerary: handWritten ? city.itinerary! : itineraryFromSights(sights),
  };
}

const curatedCities: City[] = [
  {
    id: "tokyo",
    slug: "tokyo",
    name: "Tokyo",
    countrySlug: "japan",
    countryName: "Japan",
    tagline: "The world's most exhilarating megacity",
    heroImage: unsplash(PHOTOS.tokyo, 2400),
    thumbnail: unsplash(PHOTOS.tokyo, 900),
    gallery: [PHOTOS.tokyoStreet, PHOTOS.cityNight, PHOTOS.temple, PHOTOS.food].map((p) => unsplash(p, 1400)),
    overview:
      "Tokyo is 23 wards of relentless invention, each with its own personality — from the neon canyons of Shinjuku to the hushed temples of Asakusa and the fashion labs of Harajuku. It is a city where a Michelin-starred meal and a $6 bowl of ramen are equally sacred.",
    bestTime: "March–April (blossoms) and October–November (autumn)",
    weather: "Humid summers, mild sunny winters, brief rainy season in June",
    airport: "Haneda (HND) & Narita (NRT)",
    metro: "13 subway lines plus the JR Yamanote loop — punctual to the second",
    transport: "Get a Suica/PASMO IC card and tap through everything",
    thingsToDo: [
      "Cross the iconic Shibuya Scramble at night",
      "Watch the sunrise over Senso-ji before the crowds",
      "Explore the teamLab digital art museum",
      "Bar-hop the lantern-lit alleys of Omoide Yokocho",
      "Day-trip to Mt. Fuji and Hakone",
    ],
    restaurants: [
      { name: "Sukiyabashi Jiro", cuisine: "Sushi", priceLevel: 4, note: "Legendary omakase" },
      { name: "Afuri", cuisine: "Ramen", priceLevel: 1, note: "Yuzu shio ramen" },
      { name: "Gonpachi", cuisine: "Izakaya", priceLevel: 2, note: "The 'Kill Bill' restaurant" },
    ],
    hotels: ["Aman Tokyo", "Park Hyatt Tokyo", "Hoshinoya Tokyo"],
    shopping: ["Ginza", "Shibuya 109", "Nakamise-dori", "Akihabara"],
    nightlife: ["Golden Gai", "Shinjuku", "Roppongi", "Shibuya"],
    museums: ["teamLab Borderless", "Ghibli Museum", "Tokyo National Museum"],
    localFoods: ["Sushi", "Ramen", "Monjayaki", "Tempura", "Wagyu"],
    itinerary: [
      { day: 1, title: "East Tokyo classics", activities: ["Senso-ji Temple", "Nakamise shopping street", "Tokyo Skytree", "Sumida River stroll"] },
      { day: 2, title: "Neon & fashion", activities: ["Meiji Shrine", "Harajuku & Omotesando", "Shibuya Scramble", "Golden Gai at night"] },
      { day: 3, title: "Day trip", activities: ["Mt. Fuji viewpoints", "Hakone hot springs", "Lake Ashi cruise"] },
    ],
    hiddenGems: ["Yanaka's old-town lanes", "Shimokitazawa vintage shops", "Todoroki Valley walk"],
    tips: [
      "Carry cash — many small shops are cash-only",
      "Stand left on Tokyo escalators (right in Osaka)",
      "Trains stop around midnight; plan your last ride",
    ],
    rating: 4.9,
    reviews: 14210,
    coordinates: { lat: 35.6762, lng: 139.6503 },
    attractionSlugs: ["senso-ji-temple"],
    faqs: [
      { question: "How many days do I need in Tokyo?", answer: "Four to five days lets you see the highlights and take a day trip without rushing." },
    ],
    featured: true,
  },
  {
    id: "kyoto",
    slug: "kyoto",
    name: "Kyoto",
    countrySlug: "japan",
    countryName: "Japan",
    tagline: "A thousand years of temples and tea",
    heroImage: unsplash(PHOTOS.kyoto, 2400),
    thumbnail: unsplash(PHOTOS.kyoto, 900),
    gallery: [PHOTOS.temple, PHOTOS.fujiLake, PHOTOS.food, PHOTOS.lantern].map((p) => unsplash(p, 1400)),
    overview:
      "Japan's ancient capital is a living museum of 1,600 temples, imperial gardens and geisha districts. Slow mornings among moss and lantern-lit evenings in Gion make Kyoto the soul of traditional Japan.",
    bestTime: "Late March–April & November for foliage",
    weather: "Hot humid summers, cold crisp winters",
    airport: "Kansai (KIX), ~75 min away",
    metro: "Compact subway plus buses; bicycles are ideal",
    transport: "Buses and bikes beat the limited subway for temples",
    thingsToDo: [
      "Walk the thousands of torii at Fushimi Inari",
      "See golden Kinkaku-ji reflected in its pond",
      "Wander the Arashiyama bamboo grove at dawn",
      "Spot geiko in the Gion district",
      "Join a traditional tea ceremony",
    ],
    restaurants: [
      { name: "Kikunoi", cuisine: "Kaiseki", priceLevel: 4, note: "Three-Michelin-star seasonal dining" },
      { name: "Nishiki Market", cuisine: "Street food", priceLevel: 1, note: "'Kyoto's kitchen'" },
    ],
    hotels: ["The Ritz-Carlton Kyoto", "Hoshinoya Kyoto", "Tawaraya Ryokan"],
    shopping: ["Nishiki Market", "Teramachi", "Gion boutiques"],
    nightlife: ["Pontocho Alley", "Kiyamachi riverside bars"],
    museums: ["Kyoto National Museum", "Samurai & Ninja Museum"],
    localFoods: ["Kaiseki", "Yudofu", "Matcha sweets", "Yatsuhashi"],
    itinerary: [
      { day: 1, title: "Eastern temples", activities: ["Fushimi Inari", "Kiyomizu-dera", "Gion evening walk"] },
      { day: 2, title: "West & north", activities: ["Arashiyama bamboo grove", "Kinkaku-ji", "Ryoan-ji rock garden"] },
    ],
    hiddenGems: ["Philosopher's Path", "Okochi Sanso villa", "Kurama-dera mountain temple"],
    tips: ["Visit temples at opening time to beat crowds", "Respect geiko — never chase them for photos"],
    rating: 4.9,
    reviews: 11890,
    coordinates: { lat: 35.0116, lng: 135.7681 },
    attractionSlugs: ["fushimi-inari-shrine"],
    faqs: [
      { question: "Is Kyoto a good day trip from Tokyo?", answer: "It's 2h15 by Shinkansen, but Kyoto deserves at least two nights to appreciate fully." },
    ],
    featured: true,
  },
  {
    id: "rome",
    slug: "rome",
    name: "Rome",
    countrySlug: "italy",
    countryName: "Italy",
    tagline: "The Eternal City, layered in millennia",
    heroImage: unsplash(PHOTOS.rome, 2400),
    thumbnail: unsplash(PHOTOS.rome, 900),
    gallery: [PHOTOS.colosseum, PHOTOS.venice, PHOTOS.food, PHOTOS.coast].map((p) => unsplash(p, 1400)),
    overview:
      "Rome is history you can touch. Toss a coin in the Trevi Fountain, stand in the 2,000-year-old Pantheon, wander the Forum where Caesar walked, and end the day with cacio e pepe in a candlelit trattoria.",
    bestTime: "April–June & September–October",
    weather: "Hot dry summers, mild winters",
    airport: "Fiumicino (FCO) & Ciampino (CIA)",
    metro: "3 metro lines plus buses and trams",
    transport: "The historic center is best explored on foot",
    thingsToDo: [
      "Tour the Colosseum and Roman Forum",
      "Marvel at the Sistine Chapel in the Vatican",
      "Throw a coin into the Trevi Fountain",
      "Climb the Spanish Steps at golden hour",
      "Eat your way through Trastevere",
    ],
    restaurants: [
      { name: "Roscioli", cuisine: "Roman", priceLevel: 3, note: "Famous carbonara" },
      { name: "Da Enzo al 29", cuisine: "Trattoria", priceLevel: 2, note: "Trastevere classic" },
    ],
    hotels: ["Hotel de Russie", "Hotel Eden", "Palazzo Manfredi"],
    shopping: ["Via del Corso", "Via Condotti", "Campo de' Fiori market"],
    nightlife: ["Trastevere", "Monti", "Testaccio"],
    museums: ["Vatican Museums", "Galleria Borghese", "Capitoline Museums"],
    localFoods: ["Carbonara", "Cacio e pepe", "Supplì", "Maritozzi"],
    itinerary: [
      { day: 1, title: "Ancient Rome", activities: ["Colosseum", "Roman Forum", "Palatine Hill", "Trastevere dinner"] },
      { day: 2, title: "Vatican & baroque", activities: ["Vatican Museums", "St. Peter's Basilica", "Trevi Fountain", "Pantheon"] },
    ],
    hiddenGems: ["Aventine Keyhole", "Quartiere Coppedè", "Appian Way at sunset"],
    tips: ["Book Vatican & Colosseum tickets in advance", "Carry water — public fountains (nasoni) are free and safe"],
    rating: 4.8,
    reviews: 17640,
    coordinates: { lat: 41.9028, lng: 12.4964 },
    attractionSlugs: ["colosseum"],
    faqs: [
      { question: "How many days should I spend in Rome?", answer: "Three days covers the essentials; add more for the Vatican and day trips." },
    ],
    featured: true,
  },
  {
    id: "venice",
    slug: "venice",
    name: "Venice",
    countrySlug: "italy",
    countryName: "Italy",
    tagline: "A floating masterpiece of canals and light",
    heroImage: unsplash(PHOTOS.venice, 2400),
    thumbnail: unsplash(PHOTOS.venice, 900),
    gallery: [PHOTOS.venice, PHOTOS.rome, PHOTOS.coast, PHOTOS.food].map((p) => unsplash(p, 1400)),
    overview:
      "Venice is unlike anywhere on earth — 118 islands laced by canals, with no cars, just boats and footbridges. Get lost in silent back-lanes, glide beneath the Rialto by gondola, and watch the light turn the lagoon to gold.",
    bestTime: "April–May & September–October",
    weather: "Warm summers, cool damp winters with occasional acqua alta",
    airport: "Marco Polo (VCE)",
    metro: "No cars — vaporetto water buses and walking",
    transport: "Vaporetto passes for the Grand Canal; the rest on foot",
    thingsToDo: [
      "Admire St. Mark's Basilica and Square",
      "Ride a gondola through quiet side canals",
      "Cross the Rialto Bridge over the Grand Canal",
      "Island-hop to colorful Burano and glass-blowing Murano",
      "Sip a spritz at a canal-side bacaro",
    ],
    restaurants: [
      { name: "Osteria alle Testiere", cuisine: "Seafood", priceLevel: 3 },
      { name: "Cantine del Vino già Schiavi", cuisine: "Cicchetti", priceLevel: 1, note: "Venetian tapas" },
    ],
    hotels: ["The Gritti Palace", "Aman Venice", "Belmond Cipriani"],
    shopping: ["Murano glass", "Rialto Market", "Le Mercerie"],
    nightlife: ["Campo Santa Margherita", "Canal-side bacari"],
    museums: ["Doge's Palace", "Peggy Guggenheim Collection", "Gallerie dell'Accademia"],
    localFoods: ["Cicchetti", "Sarde in saor", "Risotto al nero", "Fritto misto"],
    itinerary: [
      { day: 1, title: "The classics", activities: ["St. Mark's Basilica", "Doge's Palace", "Rialto Bridge", "Sunset gondola"] },
      { day: 2, title: "The islands", activities: ["Burano", "Murano glass demo", "Torcello", "Cicchetti crawl"] },
    ],
    hiddenGems: ["Libreria Acqua Alta", "Scala Contarini del Bovolo", "Dorsoduro at dawn"],
    tips: ["Validate vaporetto tickets before boarding", "Explore early or late — day-trippers thin out by evening"],
    rating: 4.8,
    reviews: 13020,
    coordinates: { lat: 45.4408, lng: 12.3155 },
    attractionSlugs: [],
    faqs: [
      { question: "Is Venice too crowded to enjoy?", answer: "The main sights are busy midday, but early mornings and back-street neighborhoods stay magical and quiet." },
    ],
    featured: false,
  },
  {
    id: "dubai",
    slug: "dubai",
    name: "Dubai",
    countrySlug: "united-arab-emirates",
    countryName: "United Arab Emirates",
    tagline: "Where the future is built in gold and glass",
    heroImage: unsplash(PHOTOS.dubai, 2400),
    thumbnail: unsplash(PHOTOS.dubai, 900),
    gallery: [PHOTOS.dubai, PHOTOS.cityNight, PHOTOS.desertCamp, PHOTOS.sahara].map((p) => unsplash(p, 1400)),
    overview:
      "Dubai turns fantasy into skyline. Ascend the world's tallest building, ski indoors while it's 40°C outside, dine on a submerged terrace, then ride 4x4s over golden dunes into a desert sunset.",
    bestTime: "November–March",
    weather: "Hot desert climate; scorching summers, warm winters",
    airport: "Dubai International (DXB)",
    metro: "Driverless metro plus cheap taxis and ride-hailing",
    transport: "Get a Nol card for the metro, tram and buses",
    thingsToDo: [
      "Ascend the Burj Khalifa's observation decks",
      "Watch the Dubai Fountain show",
      "Take a desert safari with dune bashing",
      "Wander the old Al Fahidi district and gold souk",
      "Relax on Jumeirah Beach with a skyline view",
    ],
    restaurants: [
      { name: "Ossiano", cuisine: "Seafood", priceLevel: 4, note: "Underwater dining" },
      { name: "Al Ustad Special Kabab", cuisine: "Persian", priceLevel: 2, note: "Local institution" },
    ],
    hotels: ["Burj Al Arab", "Atlantis The Royal", "One&Only The Palm"],
    shopping: ["Dubai Mall", "Mall of the Emirates", "Gold & Spice Souks"],
    nightlife: ["Downtown rooftop bars", "Marina lounges", "Palm Jumeirah beach clubs"],
    museums: ["Museum of the Future", "Dubai Frame", "Etihad Museum"],
    localFoods: ["Shawarma", "Machboos", "Luqaimat", "Karak chai"],
    itinerary: [
      { day: 1, title: "Modern Dubai", activities: ["Burj Khalifa", "Dubai Mall & Fountain", "Marina walk"] },
      { day: 2, title: "Old & desert", activities: ["Al Fahidi", "Gold Souk", "Abra ride", "Desert safari at sunset"] },
    ],
    hiddenGems: ["Alserkal Avenue art district", "Al Qudra desert lakes", "Ripe Market"],
    tips: ["Dress modestly in traditional areas", "Fridays follow the weekend rhythm — plan around prayer times"],
    rating: 4.7,
    reviews: 15980,
    coordinates: { lat: 25.2048, lng: 55.2708 },
    attractionSlugs: [],
    faqs: [
      { question: "Is Dubai family-friendly?", answer: "Extremely — theme parks, aquariums, beaches and malls make it one of the world's best family destinations." },
    ],
    featured: true,
  },
  {
    id: "santorini",
    slug: "santorini",
    name: "Santorini",
    countrySlug: "greece",
    countryName: "Greece",
    tagline: "Cliffside villages above a sunken volcano",
    heroImage: unsplash(PHOTOS.santoriniDomes, 2400),
    thumbnail: unsplash(PHOTOS.santoriniDomes, 900),
    gallery: [PHOTOS.santorini, PHOTOS.greeceSea, PHOTOS.beach, PHOTOS.coast].map((p) => unsplash(p, 1400)),
    overview:
      "Santorini is the postcard of the Aegean — whitewashed villages cascading down volcanic cliffs, blue-domed churches, and the most celebrated sunset in the world over the caldera at Oia.",
    bestTime: "May–June & September for warm seas and fewer crowds",
    weather: "Sunny and dry most of the year; hot midsummer",
    airport: "Santorini (JTR) or ferry from Athens",
    metro: "No metro — buses, ATVs and taxis",
    transport: "Rent an ATV or car; buses hub through Fira",
    thingsToDo: [
      "Watch the legendary sunset in Oia",
      "Swim at the Red and Black volcanic beaches",
      "Sail the caldera to the hot springs",
      "Tour a cliffside winery with Assyrtiko tastings",
      "Walk the Fira-to-Oia caldera trail",
    ],
    restaurants: [
      { name: "Metaxi Mas", cuisine: "Greek", priceLevel: 3, note: "Local favorite with a view" },
      { name: "Lucky's Souvlakis", cuisine: "Street food", priceLevel: 1 },
    ],
    hotels: ["Grace Hotel Santorini", "Katikies", "Mystique"],
    shopping: ["Oia boutiques", "Fira jewelry shops"],
    nightlife: ["Fira bars", "Oia sunset lounges"],
    museums: ["Museum of Prehistoric Thera", "Akrotiri archaeological site"],
    localFoods: ["Fava", "Tomatokeftedes", "Fresh seafood", "Assyrtiko wine"],
    itinerary: [
      { day: 1, title: "Caldera villages", activities: ["Fira", "Caldera walk", "Oia sunset"] },
      { day: 2, title: "Sea & wine", activities: ["Catamaran cruise", "Red Beach", "Winery tour"] },
    ],
    hiddenGems: ["Ancient Thera ruins", "Pyrgos village", "Amoudi Bay seafood"],
    tips: ["Book Oia sunset dinners well ahead", "ATVs are fun but drive carefully on cliff roads"],
    rating: 4.8,
    reviews: 12440,
    coordinates: { lat: 36.3932, lng: 25.4615 },
    attractionSlugs: [],
    faqs: [
      { question: "When is the Santorini sunset best?", answer: "Arrive in Oia at least an hour early in summer to claim a good viewpoint before the crowds." },
    ],
    featured: false,
  },
  {
    id: "bali",
    slug: "bali",
    name: "Bali",
    countrySlug: "indonesia",
    countryName: "Indonesia",
    tagline: "Temples, rice terraces and island rhythm",
    heroImage: unsplash(PHOTOS.bali, 2400),
    thumbnail: unsplash(PHOTOS.bali, 900),
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Pura_Luhur_Uluwatu_2017-08-17_%2834%29.jpg/1280px-Pura_Luhur_Uluwatu_2017-08-17_%2834%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Pura_Ulun_Danu_Bratan%2C_2022.jpg/1280px-Pura_Ulun_Danu_Bratan%2C_2022.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Ubud_%2849818456887%29.jpg/1280px-Ubud_%2849818456887%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/TanahLot_2014.JPG/1280px-TanahLot_2014.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Broken_Bay%2C_Nusa_Penida.jpg/1280px-Broken_Bay%2C_Nusa_Penida.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/d/d5/Seminyak%2C_Bali.jpg",
    ],
    overview:
      "Bali is Indonesia's most visited island for good reason — Hindu temples cling to cliffs, emerald rice terraces cascade through Ubud's hills, and surf breaks line the Bukit Peninsula. From quiet village ceremonies to Seminyak sunsets, it mixes deep culture with easy beach days.",
    bestTime: "April–October (dry season); May–June and September are sweet spots with fewer crowds",
    weather: "Tropical — warm year-round; wet season roughly November–March with short heavy showers",
    airport: "Ngurah Rai International (DPS), near Denpasar / Kuta",
    metro: "No metro — scooters, private drivers, Grab/Gojek and tourist shuttles",
    transport: "Rent a scooter if confident, or hire a driver by the day for temples and day trips",
    thingsToDo: [
      "Gates of Heaven at Pura Lempuyang (Mount Agung backdrop)",
      "Watch the kecak fire dance at Uluwatu Temple at sunset",
      "Walk the Tegallalang rice terraces near Ubud",
      "Sacred Monkey Forest Sanctuary in Ubud",
      "Tirta Empul holy spring temple",
      "Visit cliffside Tanah Lot at golden hour",
      "Day-trip to Nusa Penida's cliffs and snorkel spots",
      "Mount Batur sunrise trek",
      "Surf or swim along Seminyak and Canggu beaches",
      "See Pura Ulun Danu Bratan on Lake Bratan in the highlands",
      "Jatiluwih UNESCO rice terraces",
      "Tirta Gangga water palace",
    ],
    restaurants: [
      { name: "Nasi Ayam Kedewatan Ibu Mangku", cuisine: "Balinese", priceLevel: 1, note: "Ubud legend for spicy chicken rice since the 1960s" },
      { name: "Pak Malen", cuisine: "Babi guling", priceLevel: 1, note: "Seminyak roast suckling pig — locals' pick" },
      { name: "Made's Warung", cuisine: "Indonesian", priceLevel: 2, note: "Island institution since 1969 (Kuta / Seminyak)" },
      { name: "Sun Sun Warung", cuisine: "Balinese", priceLevel: 1, note: "Family-compound warung in central Ubud" },
    ],
    hotels: ["Four Seasons Resort Bali at Sayan", "COMO Shambhala Estate", "The Mulia", "Potato Head Suites"],
    stays: [
      { name: "Four Seasons Resort Bali at Sayan", area: "Ubud", priceLevel: 4, note: "Iconic riverside resort above the Ayung Valley" },
      { name: "COMO Shambhala Estate", area: "Ubud", priceLevel: 4, note: "Top-rated wellness retreat in the jungle" },
      { name: "The Mulia", area: "Nusa Dua", priceLevel: 4, note: "Beachfront luxury favourite for first-timers" },
      { name: "Potato Head Suites", area: "Seminyak", priceLevel: 3, note: "Design beach club hotel — tourist favourite" },
    ],
    shopping: ["Ubud Art Market", "Seminyak boutiques (Kayu Aya)", "Sukawati Art Market", "Beachwalk Shopping Center"],
    nightlife: ["Seminyak beach clubs", "Canggu sunset bars", "Ubud live music cafés"],
    museums: ["Agung Rai Museum of Art (ARMA)", "Museum Puri Lukisan", "Blanco Renaissance Museum"],
    localFoods: ["Babi guling", "Nasi campur", "Bebek betutu", "Lawar", "Sate lilit", "Kopi luwak (taste carefully)"],
    itinerary: [
      {
        day: 1,
        title: "South coast temples & beach",
        activities: ["Uluwatu Temple & kecak dance", "Padang Padang or Bingin beach", "Seminyak sunset"],
      },
      {
        day: 2,
        title: "Ubud culture",
        activities: ["Tegallalang rice terraces", "Sacred Monkey Forest", "Tirta Empul", "Warung dinner"],
      },
      {
        day: 3,
        title: "East Bali icons",
        activities: ["Gates of Heaven at Pura Lempuyang", "Tirta Gangga water palace", "Optional Mount Batur sunrise"],
      },
      {
        day: 4,
        title: "Highlands or island day",
        activities: ["Pura Ulun Danu Bratan / Jatiluwih terraces", "or Nusa Penida boat day trip"],
      },
    ],
    hiddenGems: ["Sidemen valley rice walks", "Amed black-sand snorkeling", "Munduk waterfall loop", "West Bali National Park"],
    tips: [
      "Dress modestly at temples — sash and sarong are usually provided at major sites",
      "Respect Nyepi (Day of Silence) — the island shuts down for 24 hours each year",
      "Scooter insurance and a helmet are essential; traffic is chaotic near Kuta",
      "Dry season is busiest — book popular restaurants and drivers ahead",
    ],
    rating: 4.8,
    reviews: 22140,
    coordinates: { lat: -8.4095, lng: 115.1889 },
    attractionSlugs: [],
    faqs: [
      {
        question: "How many days do I need in Bali?",
        answer: "Five to seven days covers Ubud, the south beaches and one day trip (Nusa Penida or the highlands). Ten days lets you add Amed, Sidemen or the Gili islands.",
      },
      {
        question: "Is Bali good for first-time visitors to Indonesia?",
        answer: "Yes — English is widely spoken in tourist areas, tourism infrastructure is strong, and you can mix temples, beaches and wellness easily.",
      },
      {
        question: "Where should I stay in Bali?",
        answer: "Seminyak/Canggu for beaches and nightlife, Ubud for culture and rice terraces, Nusa Dua for resort comfort, and Uluwatu for surf and clifftop views.",
      },
    ],
    featured: true,
  },
];

const curatedSlugs = new Set(curatedCities.map((c) => c.slug));

// Merge hand-curated cities (which win on slug conflicts) with the generated set,
// then overlay curated eat/stay picks (local favourites / tourist favourites).
export const cities: City[] = [
  ...curatedCities,
  ...generatedCities.filter((c) => !curatedSlugs.has(c.slug)),
]
  .map(applyCityEnrichment)
  .map((c) => sanitizeCityImages(c))
  .map(applyCityPicks)
  .map(applyCitySights)
  .sort((a, b) => a.name.localeCompare(b.name));

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}

export function getCitiesByCountry(countrySlug: string) {
  return cities.filter((c) => c.countrySlug === countrySlug);
}

export function getAllCitySlugs() {
  return cities.map((c) => c.slug);
}

// Only the richly-detailed curated cities are prerendered at build time; the
// rest are generated on-demand and cached via ISR to keep builds fast.
export function getPrerenderedCitySlugs() {
  return curatedCities.map((c) => c.slug);
}
