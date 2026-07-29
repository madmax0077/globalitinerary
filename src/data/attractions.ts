import type { Attraction } from "@/lib/types";
import { PHOTOS, unsplash } from "@/lib/images";

export const attractions: Attraction[] = [
  {
    id: "mount-fuji",
    slug: "mount-fuji",
    name: "Mount Fuji",
    citySlug: "tokyo",
    cityName: "Tokyo",
    countrySlug: "japan",
    countryName: "Japan",
    category: "Mountain",
    tagline: "Japan's sacred, perfectly symmetrical peak",
    heroImage: unsplash(PHOTOS.fuji, 2400),
    thumbnail: unsplash(PHOTOS.fuji, 900),
    gallery: [PHOTOS.fujiLake, PHOTOS.mountains, PHOTOS.kyoto, PHOTOS.temple].map((p) => unsplash(p, 1400)),
    description:
      "At 3,776 meters, Mt. Fuji is Japan's highest and most revered mountain — a near-perfect volcanic cone that has inspired artists and pilgrims for centuries. Snow-capped and mirrored in the Fuji Five Lakes, it's the country's most iconic sight.",
    history:
      "A sacred site in Shinto belief and a UNESCO World Heritage Site, Fuji has been a place of pilgrimage since ancient times and immortalized in Hokusai's woodblock prints.",
    ticketPrice: "Free to view; ~¥2,000 climbing fee in season",
    openingHours: "Official climbing season: early July–early September",
    address: "Fujinomiya, Shizuoka / Fuji Five Lakes, Yamanashi",
    duration: "Half-day viewing or 2-day climb",
    bestTime: "Dawn on a clear autumn or winter day for the sharpest views",
    photographyTips: [
      "Shoot from Lake Kawaguchi for the classic reflection",
      "Chureito Pagoda offers the postcard pagoda-and-Fuji frame",
      "Winter mornings have the clearest skies",
    ],
    visitorGuide: [
      "Only climb during the official season with proper gear",
      "Base yourself at Kawaguchiko for the best viewpoints",
      "Check live webcams — Fuji is often shrouded in cloud",
    ],
    rating: 4.9,
    reviews: 9210,
    coordinates: { lat: 35.3606, lng: 138.7274 },
    faqs: [
      { question: "Can beginners climb Mt. Fuji?", answer: "Yes, the Yoshida Trail is non-technical, but it's a strenuous overnight hike — pace yourself for altitude." },
    ],
    nearbySlugs: ["senso-ji-temple"],
    featured: true,
  },
  {
    id: "fushimi-inari-shrine",
    slug: "fushimi-inari-shrine",
    name: "Fushimi Inari Shrine",
    citySlug: "kyoto",
    cityName: "Kyoto",
    countrySlug: "japan",
    countryName: "Japan",
    category: "Religious",
    tagline: "Ten thousand vermilion torii gates",
    heroImage: unsplash(PHOTOS.temple, 2400),
    thumbnail: unsplash(PHOTOS.temple, 900),
    gallery: [PHOTOS.kyoto, PHOTOS.lantern, PHOTOS.fujiLake, PHOTOS.food].map((p) => unsplash(p, 1400)),
    description:
      "Fushimi Inari is Kyoto's most mesmerizing shrine, famous for thousands of vermilion torii gates snaking up the wooded slopes of Mount Inari. It is dedicated to Inari, the Shinto deity of rice and prosperity.",
    history:
      "Founded in 711 AD, it is the head shrine of over 30,000 Inari shrines across Japan. The gates are donated by individuals and businesses seeking good fortune.",
    ticketPrice: "Free",
    openingHours: "Open 24 hours",
    address: "68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto",
    duration: "1–3 hours (full summit hike ~2 hours round trip)",
    bestTime: "Just after sunrise or at night for empty, glowing gates",
    photographyTips: [
      "Arrive before 7am to shoot the gates without crowds",
      "Climb past the Yotsutsuji intersection — most visitors turn back",
      "Golden hour makes the vermilion glow",
    ],
    visitorGuide: [
      "Wear comfortable shoes for the uphill trail",
      "Bow once at the main gate as a sign of respect",
      "Fox statues represent Inari's messengers",
    ],
    rating: 4.9,
    reviews: 11040,
    coordinates: { lat: 34.9671, lng: 135.7727 },
    faqs: [
      { question: "How long does it take to hike to the top?", answer: "The full loop to the summit and back takes about two hours at a relaxed pace." },
    ],
    nearbySlugs: ["mount-fuji"],
    featured: true,
  },
  {
    id: "senso-ji-temple",
    slug: "senso-ji-temple",
    name: "Sensō-ji Temple",
    citySlug: "tokyo",
    cityName: "Tokyo",
    countrySlug: "japan",
    countryName: "Japan",
    category: "Religious",
    tagline: "Tokyo's oldest and liveliest temple",
    heroImage: unsplash(PHOTOS.lantern, 2400),
    thumbnail: unsplash(PHOTOS.lantern, 900),
    gallery: [PHOTOS.temple, PHOTOS.tokyoStreet, PHOTOS.cityNight, PHOTOS.food].map((p) => unsplash(p, 1400)),
    description:
      "Sensō-ji in Asakusa is Tokyo's oldest temple, founded in 645 AD. The approach through the giant Kaminarimon 'Thunder Gate' and the bustling Nakamise shopping street is one of the city's most atmospheric experiences.",
    history:
      "Legend says two fishermen found a golden statue of Kannon, the goddess of mercy, in the Sumida River — the temple was built to enshrine it.",
    ticketPrice: "Free",
    openingHours: "Main hall 6:00–17:00 (grounds always open)",
    address: "2-3-1 Asakusa, Taito City, Tokyo",
    duration: "1–2 hours",
    bestTime: "Early morning or evening when the lanterns are lit",
    photographyTips: [
      "Frame the five-story pagoda against the sky",
      "The illuminated Kaminarimon lantern shines at night",
      "Shoot down Nakamise-dori before shops open",
    ],
    visitorGuide: [
      "Cleanse at the purification fountain before entering",
      "Draw an omikuji fortune for ¥100",
      "Combine with nearby Tokyo Skytree",
    ],
    rating: 4.7,
    reviews: 8730,
    coordinates: { lat: 35.7148, lng: 139.7967 },
    faqs: [
      { question: "Is Sensō-ji free to visit?", answer: "Yes, entry is free. Only optional fortunes and incense cost a small amount." },
    ],
    nearbySlugs: ["mount-fuji"],
    featured: false,
  },
  {
    id: "colosseum",
    slug: "colosseum",
    name: "The Colosseum",
    citySlug: "rome",
    cityName: "Rome",
    countrySlug: "italy",
    countryName: "Italy",
    category: "Historic",
    tagline: "The mighty amphitheater of ancient Rome",
    heroImage: unsplash(PHOTOS.colosseum, 2400),
    thumbnail: unsplash(PHOTOS.colosseum, 900),
    gallery: [PHOTOS.rome, PHOTOS.venice, PHOTOS.coast, PHOTOS.food].map((p) => unsplash(p, 1400)),
    description:
      "The Colosseum is the largest amphitheater ever built and the enduring symbol of Imperial Rome. Once host to gladiatorial contests before 50,000 spectators, its arches have stood for nearly 2,000 years.",
    history:
      "Completed in 80 AD under Emperor Titus, it hosted games, mock sea battles and spectacles for centuries and is now a UNESCO World Heritage Site.",
    ticketPrice: "From €18 (combined with Forum & Palatine)",
    openingHours: "8:30 until roughly one hour before sunset",
    address: "Piazza del Colosseo 1, Rome",
    duration: "1.5–3 hours with the Forum",
    bestTime: "First entry slot or golden hour to avoid heat and crowds",
    photographyTips: [
      "Shoot from Via Nicola Salvi for the full facade",
      "Sunset light warms the travertine stone beautifully",
      "The Arch of Constantine makes a great foreground",
    ],
    visitorGuide: [
      "Buy timed-entry tickets online in advance",
      "Consider an underground/arena floor tour",
      "Bring water and sun protection in summer",
    ],
    rating: 4.8,
    reviews: 20110,
    coordinates: { lat: 41.8902, lng: 12.4922 },
    faqs: [
      { question: "Do I need to book Colosseum tickets ahead?", answer: "Absolutely — timed slots sell out, and advance booking skips the long ticket queue." },
    ],
    nearbySlugs: ["fushimi-inari-shrine"],
    featured: true,
  },
  {
    id: "machu-picchu",
    slug: "machu-picchu",
    name: "Machu Picchu",
    citySlug: "cusco",
    cityName: "Cusco",
    countrySlug: "peru",
    countryName: "Peru",
    category: "Historic",
    tagline: "The lost city of the Incas in the clouds",
    heroImage: unsplash(PHOTOS.machuPicchu, 2400),
    thumbnail: unsplash(PHOTOS.machuPicchu, 900),
    gallery: [PHOTOS.machuPicchu, PHOTOS.mountains, PHOTOS.temple, PHOTOS.coast].map((p) => unsplash(p, 1400)),
    description:
      "Perched on a ridge 2,430 meters above the Sacred Valley, Machu Picchu is the crown jewel of the Inca Empire — a 15th-century citadel of terraces, temples and mist that vanished from the world until 1911.",
    history:
      "Built around 1450 under the emperor Pachacuti and abandoned a century later, it was brought to global attention by explorer Hiram Bingham in 1911.",
    ticketPrice: "From $52 (timed entry by circuit)",
    openingHours: "6:00–17:00, entry by timed slot",
    address: "Machu Picchu, Cusco Region, Peru",
    duration: "Half to full day",
    bestTime: "Dry season (May–September); arrive at dawn for clear views",
    photographyTips: [
      "The classic view is from the Guardian's Hut terraces",
      "Early morning mist creates a dramatic, mystical scene",
      "Huayna Picchu offers a bird's-eye angle (permit needed)",
    ],
    visitorGuide: [
      "Book entry tickets and train seats far in advance",
      "Acclimatize in Cusco before visiting",
      "Follow the one-way circuits — guides are required",
    ],
    rating: 4.9,
    reviews: 16780,
    coordinates: { lat: -13.1631, lng: -72.545 },
    faqs: [
      { question: "How do I get to Machu Picchu?", answer: "Take a train from Cusco/Ollantaytambo to Aguas Calientes, then a bus or hike up to the entrance." },
    ],
    nearbySlugs: ["colosseum"],
    featured: true,
  },
];

export function getAttraction(slug: string) {
  return attractions.find((a) => a.slug === slug);
}

export function getAttractionsByCity(citySlug: string) {
  return attractions.filter((a) => a.citySlug === citySlug);
}

export function getAttractionsByCountry(countrySlug: string) {
  return attractions.filter((a) => a.countrySlug === countrySlug);
}

export function getAllAttractionSlugs() {
  return attractions.map((a) => a.slug);
}
