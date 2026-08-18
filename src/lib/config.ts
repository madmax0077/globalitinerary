export const siteConfig = {
  name: "Global Itinerary",
  tagline: "Plan Every Journey, Beautifully",
  description:
    "Free travel guides to countries and cities worldwide — itineraries, best time to visit, budgets, visas, maps and practical tips for planning your next trip.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://globalitinerary.in",
  domain: "globalitinerary.in",
  email: "globalitinerary0104@gmail.com",
  ogImage: "/opengraph-image",
  locale: "en_US",
  twitter: "@globalitinerary",
  /** Public profiles for Organization sameAs (add real URLs when accounts exist). */
  sameAs: [] as readonly string[],
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
    "country travel guide",
    "city travel guide",
  ],
};

export type SiteConfig = typeof siteConfig;

// Google AdSense publisher ID. Can be overridden per-environment via
// NEXT_PUBLIC_ADSENSE_CLIENT_ID; falls back to the account's default.
export const adsenseClientId =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-5084738834329206";

// Google Analytics 4 Measurement ID (e.g. "G-XXXXXXXXXX"). Set
// NEXT_PUBLIC_GA_ID or replace the fallback below. Empty = analytics off.
export const gaMeasurementId = process.env.NEXT_PUBLIC_GA_ID || "G-0BNGB35JZN";
