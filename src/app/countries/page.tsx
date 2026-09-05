import { PageHero } from "@/components/shared/page-hero";
import { Explorer, type ExplorerItem } from "@/components/shared/explorer";
import { AdSlot } from "@/components/shared/ad-slot";
import { countries } from "@/data/countries";
import { continents } from "@/lib/navigation";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 604800;

export const metadata = buildMetadata({
  title: "All Countries",
  description:
    "Browse in-depth travel guides to every country on earth — culture, visas, best times to visit, top cities and unmissable attractions.",
  path: "/countries",
});

export default function CountriesPage() {
  const items: ExplorerItem[] = countries.map((c) => ({
    id: c.slug,
    href: `/countries/${c.slug}`,
    image: c.thumbnail,
    title: `${c.flag} ${c.name}`,
    subtitle: c.tagline,
    badge: c.continent,
    rating: c.rating,
    reviews: c.reviews,
    bookmarkId: `country:${c.slug}`,
    filters: [c.continent],
  }));

  return (
    <>
      <PageHero
        eyebrow="Destinations"
        title="Explore every country"
        description="From the fjords of the north to tropical archipelagos — detailed, beautiful guides to the whole world."
        breadcrumbs={[{ name: "Countries", href: "/countries" }]}
      />
      <div className="container-lux py-12">
        <Explorer items={items} filters={[...continents]} />
        <AdSlot slot="countries-list" className="mt-12 min-h-[140px]" />
      </div>
    </>
  );
}
