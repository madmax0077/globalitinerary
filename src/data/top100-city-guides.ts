/**
 * One blog guide per Top 100 city: best time, a 5–15 day plan, trip cost, stays, FAQs.
 * Cities that already have a dedicated itinerary article are linked, not duplicated.
 */
import type { Article } from "@/lib/types";
import { TOP_100_CITIES } from "@/data/top-100-cities";
import { cities } from "@/data/cities";
import { EXISTING_TOP100_ITINERARY_SLUGS } from "@/data/top100-guide-meta";
import { buildCityItineraryArticle } from "@/data/city-itinerary-guides";

export {
  EXISTING_TOP100_ITINERARY_SLUGS,
  getTop100GuideLink,
  itineraryDaysForCity,
  top100GuideArticleSlug,
  type Top100GuideLink,
} from "@/data/top100-guide-meta";

const cityBySlug = new Map(cities.map((c) => [c.slug, c]));

export const top100CityGuides: Article[] = TOP_100_CITIES.flatMap((seed) => {
  if (EXISTING_TOP100_ITINERARY_SLUGS[seed.slug]) return [];
  const city = cityBySlug.get(seed.slug);
  if (!city) return [];
  return [buildCityItineraryArticle(city, seed.rank, seed.why, "top100")];
});
