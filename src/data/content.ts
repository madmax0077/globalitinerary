import type { Article, Collection, Testimonial } from "@/lib/types";
import { PHOTOS, unsplash } from "@/lib/images";
import { destinationGuides } from "@/data/destination-guides";
import { top100CityGuides } from "@/data/top100-city-guides";
import { top200CityGuides } from "@/data/top200-city-guides";
import { authors } from "@/data/authors";

const legacyArticles: Article[] = [
  {
    id: "a1",
    slug: "48-hours-in-tokyo",
    title: "48 Hours in Tokyo: The Perfect First-Timer Itinerary",
    excerpt:
      "From dawn at Sensō-ji to midnight ramen in Shinjuku, here's how to experience the essence of Tokyo in a single unforgettable weekend.",
    cover: unsplash(PHOTOS.tokyo, 1600),
    category: "Itineraries",
    tags: ["Tokyo", "Japan", "City Break", "Food"],
    author: authors.amelia,
    date: "2026-06-18",
    readingTime: 9,
    featured: true,
    sections: [
      { body: "Tokyo can feel overwhelming, but with a smart plan you can taste its many worlds in just two days. This itinerary balances ancient temples, neon nights and the city's legendary food scene." },
      { heading: "Day 1 — East Tokyo & tradition", body: "Start early at Sensō-ji before the crowds, wander Nakamise-dori, then head to the teamLab digital art museum. Finish with lantern-lit yakitori in Omoide Yokocho." },
      { heading: "Day 2 — Neon & fashion", body: "Begin at the serene Meiji Shrine, explore Harajuku's street style, cross the famous Shibuya Scramble, and end with a nightcap in the tiny bars of Golden Gai." },
      { heading: "Where to eat", body: "Don't miss conveyor-belt sushi, a bowl of yuzu-shio ramen, and a late-night bowl of tonkotsu. In Tokyo, the cheapest meals are often the most memorable." },
    ],
  },
  {
    id: "a2",
    slug: "iceland-ring-road-guide",
    title: "Driving Iceland's Ring Road: A Complete Guide",
    excerpt:
      "Waterfalls, glaciers, black-sand beaches and the aurora — everything you need to plan the ultimate Icelandic road trip.",
    cover: unsplash(PHOTOS.icelandFalls, 1600),
    category: "Road Trips",
    tags: ["Iceland", "Adventure", "Nature", "Road Trip"],
    author: authors.sofia,
    date: "2026-05-30",
    readingTime: 12,
    featured: true,
    sections: [
      { body: "The Ring Road (Route 1) circles the entire island in roughly 1,300 km, stringing together Iceland's greatest hits. Give yourself 7–10 days to do it justice." },
      { heading: "When to go", body: "Summer brings the midnight sun and open highland roads; winter offers the northern lights but shorter days and tricky driving." },
      { heading: "Unmissable stops", body: "Seljalandsfoss and Skógafoss waterfalls, the Jökulsárlón glacier lagoon, Diamond Beach, and the geothermal wonders of Mývatn in the north." },
      { heading: "Driving tips", body: "Rent a 4x4 in winter, check road and weather conditions daily, and never underestimate Icelandic wind — hold your car door tight." },
    ],
  },
  {
    id: "a3",
    slug: "italy-food-cities",
    title: "Eat Your Way Across Italy: 6 Cities, 6 Signature Dishes",
    excerpt:
      "A delicious tour from Roman carbonara to Neapolitan pizza — the regional plates worth planning an entire trip around.",
    cover: unsplash(PHOTOS.food, 1600),
    category: "Food & Drink",
    tags: ["Italy", "Food", "Rome", "Culture"],
    author: authors.marco,
    date: "2026-06-02",
    readingTime: 8,
    featured: false,
    sections: [
      { body: "In Italy, food is geography. Each city guards its own beloved specialty, and eating local is the fastest route to understanding a place." },
      { heading: "Rome — Cacio e pepe", body: "Three ingredients, endless mastery: pecorino, black pepper and pasta water emulsified into silk." },
      { heading: "Naples — Pizza margherita", body: "The birthplace of pizza serves it blistered, soft and gloriously simple from wood-fired ovens." },
      { heading: "Bologna — Tagliatelle al ragù", body: "Forget 'spaghetti bolognese' — the real thing is slow-cooked ragù over fresh egg tagliatelle." },
    ],
  },
  {
    id: "a4",
    slug: "santorini-sunset-secrets",
    title: "Beyond Oia: Where to Watch Santorini's Sunset in Peace",
    excerpt:
      "Everyone crowds into Oia — here are the quieter caldera viewpoints that are just as spectacular.",
    cover: unsplash(PHOTOS.santorini, 1600),
    category: "Guides",
    tags: ["Greece", "Santorini", "Islands", "Sunsets"],
    author: authors.amelia,
    date: "2026-05-12",
    readingTime: 6,
    featured: false,
    sections: [
      { body: "Santorini's sunset is legendary, and so are the crowds in Oia. Fortunately, the whole west-facing caldera glows at golden hour." },
      { heading: "Imerovigli", body: "The highest village on the caldera rim offers the same jaw-dropping view with a fraction of the crowds." },
      { heading: "Ancient Thera & Pyrgos", body: "Climb to Pyrgos or the ruins of Ancient Thera for panoramic sunsets over the entire island." },
    ],
  },
  {
    id: "a5",
    slug: "dubai-desert-adventure",
    title: "The Ultimate Dubai Desert Safari Experience",
    excerpt:
      "Dune bashing, camel rides and dinner under the stars — how to do a desert safari the right way.",
    cover: unsplash(PHOTOS.desertCamp, 1600),
    category: "Adventure",
    tags: ["UAE", "Dubai", "Desert", "Luxury"],
    author: authors.sofia,
    date: "2026-04-22",
    readingTime: 7,
    featured: false,
    sections: [
      { body: "Just beyond Dubai's skyline lies a sea of golden dunes — and a desert safari is the best way to experience it." },
      { heading: "Choosing a safari", body: "Morning safaris are cooler and quieter; evening safaris include sunset, dinner and entertainment under the stars." },
      { heading: "What to bring", body: "Sunglasses, light layers, a scarf for blowing sand, and a camera for that golden-hour dune shot." },
    ],
  },
  {
    id: "a6",
    slug: "peru-altitude-tips",
    title: "How to Beat Altitude Sickness in the Peruvian Andes",
    excerpt:
      "Cusco sits at 3,400m. Here's how to acclimatize so you can enjoy Machu Picchu without the headache.",
    cover: unsplash(PHOTOS.mountains, 1600),
    category: "Travel Tips",
    tags: ["Peru", "Health", "Adventure", "Mountains"],
    author: authors.marco,
    date: "2026-03-15",
    readingTime: 5,
    featured: false,
    sections: [
      { body: "Altitude sickness can derail an Andean adventure, but a few simple habits make a huge difference." },
      { heading: "Acclimatize slowly", body: "Spend a day or two in Cusco or the lower Sacred Valley before tackling higher passes or treks." },
      { heading: "Local remedies", body: "Coca tea, plenty of water and light meals are the time-tested Andean approach to feeling your best." },
    ],
  },
];

/** Destination guides first, then legacy stories, then Top 100 and ranks 101–200 itineraries. */
export const articles: Article[] = [
  ...destinationGuides,
  ...legacyArticles,
  ...top100CityGuides,
  ...top200CityGuides,
];

export { top100CityGuides, top200CityGuides };

export const collections: Collection[] = [
  { slug: "luxury-escapes", title: "Luxury Escapes", description: "Five-star stays and once-in-a-lifetime experiences", image: unsplash(PHOTOS.maldives, 1200), count: 42, accent: "primary" },
  { slug: "beach-paradise", title: "Beach Paradise", description: "The world's most beautiful shores and hidden coves", image: unsplash(PHOTOS.beach, 1200), count: 68, accent: "sky" },
  { slug: "mountain-adventures", title: "Mountain Adventures", description: "Soaring peaks, epic trails and alpine air", image: unsplash(PHOTOS.alps, 1200), count: 55, accent: "emerald" },
  { slug: "food-journeys", title: "Food Journeys", description: "Eat your way around the globe, one city at a time", image: unsplash(PHOTOS.food, 1200), count: 39, accent: "sunset" },
  { slug: "ancient-wonders", title: "Ancient Wonders", description: "Ruins, temples and lost cities steeped in history", image: unsplash(PHOTOS.machuPicchu, 1200), count: 47, accent: "primary" },
  { slug: "island-hopping", title: "Island Hopping", description: "Turquoise waters and sun-drenched archipelagos", image: unsplash(PHOTOS.phiPhi, 1200), count: 61, accent: "sky" },
];

export const testimonials: Testimonial[] = [
  { name: "Emma Laurent", location: "Paris, France", avatar: "https://i.pravatar.cc/160?img=45", rating: 5, quote: "Voyara planned our honeymoon across Japan flawlessly. Every recommendation felt hand-picked — it's the only travel site I trust now." },
  { name: "James Okafor", location: "London, UK", avatar: "https://i.pravatar.cc/160?img=59", rating: 5, quote: "The city guides are unreal. I followed the Rome itinerary to the letter and it was the best trip of my life." },
  { name: "Yuki Tanaka", location: "Osaka, Japan", avatar: "https://i.pravatar.cc/160?img=25", rating: 5, quote: "Gorgeous design and genuinely useful. The photography alone makes me want to book a flight immediately." },
  { name: "Isabella Rossi", location: "Milan, Italy", avatar: "https://i.pravatar.cc/160?img=20", rating: 5, quote: "I've used every travel app out there. Nothing comes close to how beautiful and practical Voyara is." },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function getAllArticleSlugs() {
  return articles.map((a) => a.slug);
}
