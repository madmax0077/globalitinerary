import { PageHero } from "@/components/shared/page-hero";
import { Explorer, type ExplorerItem } from "@/components/shared/explorer";
import { AdSlot } from "@/components/shared/ad-slot";
import { cities } from "@/data/cities";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: "Popular Cities",
  description:
    "Discover the world's most iconic cities — things to do, where to eat, itineraries and insider tips for every urban escape.",
  path: "/cities",
});

export default function CitiesPage() {
  const countryNames = Array.from(new Set(cities.map((c) => c.countryName)));
  const items: ExplorerItem[] = cities.map((c) => ({
    id: c.slug,
    href: `/cities/${c.slug}`,
    image: c.thumbnail,
    title: c.name,
    location: c.countryName,
    subtitle: c.tagline,
    rating: c.rating,
    reviews: c.reviews,
    bookmarkId: `city:${c.slug}`,
    filters: [c.countryName],
  }));

  return (
    <>
      <PageHero
        eyebrow="Cities"
        title="Iconic cities await"
        description="Neon megacities, timeless old towns and cliffside villages — explored in beautiful detail."
        breadcrumbs={[{ name: "Cities", href: "/cities" }]}
      />
      <div className="container-lux py-12">
        <Explorer items={items} filters={countryNames} aspect="landscape" />
        <AdSlot slot="cities-list" className="mt-12 min-h-[140px]" />
      </div>
    </>
  );
}
