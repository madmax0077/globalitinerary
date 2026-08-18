import { PageHero } from "@/components/shared/page-hero";
import { RoutePlanner, type RouteCity } from "@/components/tools/route-planner";
import { cities } from "@/data/cities";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Multi-City Route Planner — Plan a Multi-Stop Trip (2026)",
  description:
    "Planning a multi-city trip? Add the cities you want to visit and get the best order to travel them, plus distances and rough flight times between each stop.",
  path: "/route-planner",
  keywords: [
    "multi city trip planner",
    "multi stop route planner",
    "trip route order",
    "distance between cities",
    "flight time between cities",
    "how to plan a multi city trip",
  ],
});

export const revalidate = 86400;

export default function RoutePlannerPage() {
  // Cap client payload — full catalog is ~8k cities and freezes the page.
  const list: RouteCity[] = cities
    .filter((c) => c.featured || (c.categories && c.categories.length > 0))
    .slice(0, 400)
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      country: c.countryName,
      lat: c.coordinates.lat,
      lng: c.coordinates.lng,
    }));

  return (
    <>
      <PageHero
        eyebrow="Stitch your trip together"
        title="Multi-city route planner"
        description="Visiting more than one city? Add your stops and we'll suggest the smartest order to visit them — with the distance and rough flight time for every leg."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Route planner", href: "/route-planner" },
        ]}
      />
      <div className="container-lux py-12">
        <RoutePlanner cities={list} />
      </div>
    </>
  );
}
