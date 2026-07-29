export type Coordinates = { lat: number; lng: number };

export type FAQ = { question: string; answer: string };

export type Fact = { label: string; value: string; icon?: string };

export interface Country {
  id: string;
  slug: string;
  name: string;
  officialName?: string;
  flag: string; // emoji
  continent: string;
  region: string;
  capital: string;
  population: number;
  currency: string;
  currencyCode: string;
  languages: string[];
  timezone: string;
  callingCode: string;
  drivingSide?: "left" | "right";
  visa: string;
  bestTime: string;
  weather: string;
  internet: string;
  transportation: string;
  safety: string;
  budgetPerDay: string;
  tagline: string;
  heroImage: string;
  thumbnail: string;
  gallery: string[];
  overview: string;
  history: string;
  culture: string;
  rating: number;
  reviews: number;
  coordinates: Coordinates;
  tags: string[];
  topCitySlugs: string[];
  topAttractionSlugs: string[];
  faqs: FAQ[];
  featured?: boolean;
  trending?: boolean;
}

export interface Restaurant {
  name: string;
  cuisine?: string;
  priceLevel?: 1 | 2 | 3 | 4;
  note?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
}

export interface City {
  id: string;
  slug: string;
  name: string;
  countrySlug: string;
  countryName: string;
  tagline: string;
  heroImage: string;
  thumbnail: string;
  gallery: string[];
  overview: string;
  bestTime: string;
  weather: string;
  airport: string;
  metro: string;
  transport: string;
  thingsToDo: string[];
  restaurants: Restaurant[];
  hotels: string[];
  shopping: string[];
  nightlife: string[];
  museums: string[];
  localFoods: string[];
  itinerary: ItineraryDay[];
  hiddenGems: string[];
  tips: string[];
  rating: number;
  reviews: number;
  coordinates: Coordinates;
  attractionSlugs: string[];
  faqs: FAQ[];
  featured?: boolean;
}

export type AttractionCategory =
  | "Landmark"
  | "Museum"
  | "Nature"
  | "Beach"
  | "Mountain"
  | "Religious"
  | "Historic"
  | "Park"
  | "Adventure";

export interface Attraction {
  id: string;
  slug: string;
  name: string;
  citySlug: string;
  cityName: string;
  countrySlug: string;
  countryName: string;
  category: AttractionCategory;
  tagline: string;
  heroImage: string;
  thumbnail: string;
  gallery: string[];
  description: string;
  history: string;
  ticketPrice: string;
  openingHours: string;
  address: string;
  duration: string;
  bestTime: string;
  photographyTips: string[];
  visitorGuide: string[];
  rating: number;
  reviews: number;
  coordinates: Coordinates;
  faqs: FAQ[];
  nearbySlugs: string[];
  featured?: boolean;
}

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface ArticleSection {
  heading?: string;
  body: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  category: string;
  tags: string[];
  author: Author;
  date: string; // ISO
  readingTime: number; // minutes
  sections: ArticleSection[];
  featured?: boolean;
}

export interface Collection {
  slug: string;
  title: string;
  description: string;
  image: string;
  count: number;
  accent: "primary" | "sunset" | "emerald" | "sky";
}

export interface Testimonial {
  name: string;
  location: string;
  avatar: string;
  quote: string;
  rating: number;
}

export type SearchKind =
  | "country"
  | "city"
  | "attraction"
  | "article"
  | "collection";

export interface SearchItem {
  kind: SearchKind;
  slug: string;
  title: string;
  subtitle: string;
  image?: string;
  href: string;
  keywords: string;
}
