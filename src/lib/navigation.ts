/**
 * Static mega-menu + nav config.
 * IMPORTANT: Keep this free of `@/data/cities` / `@/data/countries` imports.
 * Navbar and MobileNav are client components — importing the full city
 * dataset here would ship ~4MB of JSON into the JS bundle on every page.
 */
export const continents = [
  "Europe",
  "Asia",
  "Africa",
  "North America",
  "South America",
  "Oceania",
] as const;

export const megaMenu = {
  countries: [
    { name: "Japan", flag: "🇯🇵", href: "/countries/japan", caption: "Tokyo" },
    { name: "Italy", flag: "🇮🇹", href: "/countries/italy", caption: "Rome" },
    { name: "France", flag: "🇫🇷", href: "/countries/france", caption: "Paris" },
    { name: "Thailand", flag: "🇹🇭", href: "/countries/thailand", caption: "Bangkok" },
    { name: "United Arab Emirates", flag: "🇦🇪", href: "/countries/united-arab-emirates", caption: "Abu Dhabi" },
    { name: "Greece", flag: "🇬🇷", href: "/countries/greece", caption: "Athens" },
  ],
  cities: [
    {
      name: "Tokyo",
      href: "/cities/tokyo",
      caption: "Japan",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=400&q=70",
    },
    {
      name: "Paris",
      href: "/cities/paris",
      caption: "France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=70",
    },
    {
      name: "Rome",
      href: "/cities/rome",
      caption: "Italy",
      image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=400&q=70",
    },
    {
      name: "Dubai",
      href: "/cities/dubai",
      caption: "United Arab Emirates",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=70",
    },
    {
      name: "Bali",
      href: "/cities/bali",
      caption: "Indonesia",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=70",
    },
    {
      name: "New York City",
      href: "/cities/new-york-city",
      caption: "United States",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=400&q=70",
    },
  ],
  collections: [
    { name: "Luxury Escapes", href: "/collections/luxury-escapes", caption: "42 places" },
    { name: "Beach Paradise", href: "/collections/beach-paradise", caption: "58 places" },
    { name: "Mountain Adventures", href: "/collections/mountain-adventures", caption: "35 places" },
    { name: "Cultural Journeys", href: "/collections/cultural-journeys", caption: "47 places" },
  ],
};

export const primaryNav = [
  { label: "Destinations", href: "/countries", hasMega: true },
  { label: "Cities", href: "/cities" },
  { label: "Compare", href: "/compare" },
  { label: "Collections", href: "/collections" },
  { label: "Guides", href: "/blog" },
  { label: "Map", href: "/map" },
] as const;

export const footerNav = {
  Explore: [
    { label: "All Countries", href: "/countries" },
    { label: "Popular Cities", href: "/cities" },
    { label: "Top Attractions", href: "/attractions" },
    { label: "Collections", href: "/collections" },
    { label: "Interactive Map", href: "/map" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Authors", href: "/authors" },
    { label: "Travel Guides", href: "/blog" },
    { label: "Sitemap", href: "/sitemap" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Trip Planner", href: "/planner" },
    { label: "Multi-City Route Planner", href: "/route-planner" },
    { label: "Trip Cost Estimator", href: "/trip-cost" },
    { label: "Packing List", href: "/packing-list" },
    { label: "Compare Destinations", href: "/compare" },
    { label: "ETIAS & EES Guide", href: "/etias-ees" },
    { label: "Saved Places", href: "/favorites" },
    { label: "Interactive Map", href: "/map" },
    { label: "Newsletter", href: "/#newsletter" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};
