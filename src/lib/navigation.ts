import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import { collections } from "@/data/content";

export const continents = [
  "Europe",
  "Asia",
  "Africa",
  "North America",
  "South America",
  "Oceania",
] as const;

export const megaMenu = {
  countries: countries.slice(0, 6).map((c) => ({
    name: c.name,
    flag: c.flag,
    href: `/countries/${c.slug}`,
    caption: c.capital,
  })),
  cities: cities.slice(0, 6).map((c) => ({
    name: c.name,
    href: `/cities/${c.slug}`,
    caption: c.countryName,
    image: c.thumbnail,
  })),
  collections: collections.slice(0, 4).map((c) => ({
    name: c.title,
    href: `/collections/${c.slug}`,
    caption: `${c.count} places`,
  })),
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
    { label: "Travel Guides", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Trip Planner", href: "/planner" },
    { label: "Compare Destinations", href: "/compare" },
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
