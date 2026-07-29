export const siteConfig = {
  name: "Global Itinerary",
  tagline: "Plan Every Journey, Beautifully",
  description:
    "Global Itinerary is a free travel guide to every country, city and landmark on earth — real itineraries, know-before-you-go essentials, budgets, maps and insider tips for the modern explorer.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://globalitinerary.in",
  domain: "globalitinerary.in",
  email: "globalitinerary0104@gmail.com",
  ogImage: "/opengraph-image",
  locale: "en_US",
  twitter: "@globalitinerary",
  keywords: [
    "travel guide",
    "travel itinerary",
    "trip planner",
    "destinations",
    "countries",
    "cities",
    "tourist attractions",
    "itineraries",
    "travel tips",
    "budget travel",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
