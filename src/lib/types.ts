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
  rating?: number;
  reviews?: number;
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

export interface Stay {
  name: string;
  area?: string;
  priceLevel?: 1 | 2 | 3 | 4;
  note?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
}

/** Ground costs only — never includes long-haul flights. */
export interface TripCost {
  currency: string;
  budget: string;
  mid: string;
  luxury: string;
  note: string;
}

export interface StayArea {
  name: string;
  bestFor: string;
  note: string;
}

export interface City {
  id: string;
  slug: string;
  name: string;
  countrySlug: string;
  countryName: string;
  /** Derived from parent country — used for /cities filters & badges. */
  continent?: string;
  /** Derived from parent country (e.g. "Southeast Asia"). */
  region?: string;
  /** Editorial travel themes for discovery (tourist hubs). */
  categories?: string[];
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
  stays?: Stay[];
  shopping: string[];
  nightlife: string[];
  museums: string[];
  localFoods: string[];
  itinerary: ItineraryDay[];
  hiddenGems: string[];
  tips: string[];
  rating?: number;
  reviews?: number;
  coordinates: Coordinates;
  attractionSlugs: string[];
  faqs: FAQ[];
  featured?: boolean;
  tripCost?: TripCost;
  stayAreas?: StayArea[];
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
