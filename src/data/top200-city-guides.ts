/**
 * One blog guide per rank 101–200 city — same 5–15 day format as the Top 100 set.
 */
import type { Article } from "@/lib/types";
import { TOP_101_200_CITIES } from "@/data/top-200-cities";
import { cities } from "@/data/cities";
import { EXISTING_TOP100_ITINERARY_SLUGS } from "@/data/top100-guide-meta";
import { buildCityItineraryArticle } from "@/data/city-itinerary-guides";

const cityBySlug = new Map(cities.map((c) => [c.slug, c]));

export const top200CityGuides: Article[] = TOP_101_200_CITIES.flatMap((seed) => {
  if (EXISTING_TOP100_ITINERARY_SLUGS[seed.slug]) return [];
  const city = cityBySlug.get(seed.slug);
  if (!city) return [];
  return [buildCityItineraryArticle(city, seed.rank, seed.why, "top200")];
});
