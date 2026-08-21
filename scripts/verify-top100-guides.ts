import { TOP_100_CITIES } from "../src/data/top-100-cities";
import {
  EXISTING_TOP100_ITINERARY_SLUGS,
  getTop100GuideLink,
  itineraryDaysForCity,
  top100CityGuides,
} from "../src/data/top100-city-guides";
import { getAllArticleSlugs, getArticle } from "../src/data/content";

const missing: string[] = [];
const days: number[] = [];

for (const city of TOP_100_CITIES) {
  const link = getTop100GuideLink(city.slug);
  if (!link) {
    missing.push(city.slug);
    continue;
  }
  days.push(link.days);
  if (!getArticle(link.articleSlug)) {
    missing.push(`article:${city.slug}->${link.articleSlug}`);
  }
}

const slugs = getAllArticleSlugs();
const duplicates = slugs.filter((slug, i) => slugs.indexOf(slug) !== i);
const outOfRange = days.filter((d) => d < 5 || d > 15);

console.log(
  JSON.stringify(
    {
      top100: TOP_100_CITIES.length,
      generatedGuides: top100CityGuides.length,
      existingHandwritten: Object.keys(EXISTING_TOP100_ITINERARY_SLUGS).length,
      totalLinked: TOP_100_CITIES.length - missing.filter((m) => !m.startsWith("article:")).length,
      missing,
      duplicates,
      dayMin: Math.min(...days),
      dayMax: Math.max(...days),
      outOfRange,
      sample: top100CityGuides.slice(0, 5).map((a) => ({
        slug: a.slug,
        title: a.title,
        sections: a.sections.length,
        days: a.sections.filter((s) => s.heading?.startsWith("Day ")).length,
      })),
      hashCheck: TOP_100_CITIES.slice(0, 8).map((c) => ({
        slug: c.slug,
        days: EXISTING_TOP100_ITINERARY_SLUGS[c.slug]?.days ?? itineraryDaysForCity(c.slug),
      })),
    },
    null,
    2,
  ),
);
