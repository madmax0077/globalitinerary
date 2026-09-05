import { PageHero } from "@/components/shared/page-hero";
import { CollectionsGrid } from "@/components/home/collections-grid";
import { collections } from "@/data/content";
import { buildMetadata, breadcrumbJsonLd, collectionPageJsonLd, JsonLd } from "@/lib/seo";
import { REVALIDATE_GUIDE_SECONDS } from "@/lib/isr";

export const revalidate = REVALIDATE_GUIDE_SECONDS;

export const metadata = buildMetadata({
  title: "Travel Collections",
  description:
    "Curated travel collections — luxury escapes, beach paradises, mountain adventures, food journeys and more. Travel by mood.",
  path: "/collections",
});

export default function CollectionsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Collections", url: "/collections" }]),
          collectionPageJsonLd({
            name: "Travel Collections",
            description:
              "Curated travel collections — luxury escapes, beach paradises, mountain adventures, food journeys and more.",
            url: "/collections",
            items: collections.map((c) => ({
              name: c.title,
              url: `/collections/${c.slug}`,
            })),
          }),
        ]}
      />
      <PageHero
        eyebrow="Collections"
        title="Travel by mood, not just map"
        description="Hand-picked themes that match exactly how you want to explore the world."
        breadcrumbs={[{ name: "Collections", href: "/collections" }]}
      />
      <div className="container-lux py-12">
        <CollectionsGrid />
      </div>
    </>
  );
}
