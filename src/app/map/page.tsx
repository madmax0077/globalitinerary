import { PageHero } from "@/components/shared/page-hero";
import { WorldMap } from "@/components/home/world-map";
import { DestinationCard } from "@/components/shared/destination-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { countries } from "@/data/countries";
import { buildMetadata } from "@/lib/seo";
import { REVALIDATE_GUIDE_SECONDS } from "@/lib/isr";

export const revalidate = REVALIDATE_GUIDE_SECONDS;

export const metadata = buildMetadata({
  title: "Explore the World Map",
  description:
    "Explore destinations across the globe on our interactive travel map. Tap any pin for detailed guides and itineraries.",
  path: "/map",
});

export default function MapPage() {
  return (
    <>
      <PageHero
        eyebrow="Interactive map"
        title="Explore the world"
        description="Tap any destination to dive into detailed guides, itineraries and insider tips."
        breadcrumbs={[{ name: "Map", href: "/map" }]}
      />
      <div className="container-lux py-12">
        <WorldMap
          scrollZoom
          markers={countries.map((c) => ({
            lat: c.coordinates.lat,
            lng: c.coordinates.lng,
            label: c.name,
            href: `/countries/${c.slug}`,
            flag: c.flag,
          }))}
        />

        <div className="mt-16">
          <SectionHeading eyebrow="Pinned" title="Featured destinations on the map" />
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {countries.map((c) => (
              <DestinationCard
                key={c.slug}
                href={`/countries/${c.slug}`}
                image={c.thumbnail}
                title={`${c.flag} ${c.name}`}
                subtitle={c.tagline}
                badge={c.continent}
                rating={c.rating}
                bookmarkId={`country:${c.slug}`}
                aspect="landscape"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
