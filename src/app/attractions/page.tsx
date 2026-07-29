import { PageHero } from "@/components/shared/page-hero";
import { Explorer, type ExplorerItem } from "@/components/shared/explorer";
import { AdSlot } from "@/components/shared/ad-slot";
import { attractions } from "@/data/attractions";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: "Top Attractions",
  description:
    "Explore the world's most breathtaking landmarks, museums, natural wonders and historic sites with detailed visitor guides.",
  path: "/attractions",
});

export default function AttractionsPage() {
  const categories = Array.from(new Set(attractions.map((a) => a.category)));
  const items: ExplorerItem[] = attractions.map((a) => ({
    id: a.slug,
    href: `/attractions/${a.slug}`,
    image: a.thumbnail,
    title: a.name,
    location: `${a.cityName}, ${a.countryName}`,
    subtitle: a.tagline,
    badge: a.category,
    rating: a.rating,
    reviews: a.reviews,
    bookmarkId: `attraction:${a.slug}`,
    filters: [a.category],
  }));

  return (
    <>
      <PageHero
        eyebrow="Attractions"
        title="The world's must-see sights"
        description="Ancient wonders, soaring peaks and architectural marvels — guided in vivid detail."
        breadcrumbs={[{ name: "Attractions", href: "/attractions" }]}
      />
      <div className="container-lux py-12">
        <Explorer items={items} filters={categories} aspect="landscape" />
        <AdSlot slot="attractions-list" className="mt-12 min-h-[140px]" />
      </div>
    </>
  );
}
