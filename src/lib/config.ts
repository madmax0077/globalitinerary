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
    "things to do",
    "best time to visit",
    "best places to travel",
    "travel destinations",
    "where to stay",
    "free things to do",
    "vacation ideas",
    "holiday destinations",
    "tourist attractions",
    "budget travel",
    "travel tips",
    "7 day itinerary",
  ],
} as const;

export type SiteConfig = typeof siteConfig;

// Google AdSense publisher ID. Can be overridden per-environment via
// NEXT_PUBLIC_ADSENSE_CLIENT_ID; falls back to the account's default.
export const adsenseClientId =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-5084738834329206";
