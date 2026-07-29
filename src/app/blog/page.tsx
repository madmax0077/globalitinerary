import { PageHero } from "@/components/shared/page-hero";
import { ArticleCard } from "@/components/shared/article-card";
import { AdSlot } from "@/components/shared/ad-slot";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { articles } from "@/data/content";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Travel Guides & Stories",
  description:
    "Inspiration, itineraries, tips and deep dives from the Global Itinerary editorial team — everything you need to plan your next journey.",
  path: "/blog",
});

export default function BlogPage() {
  const [featured, ...rest] = articles;

  return (
    <>
      <PageHero
        eyebrow="Travel journal"
        title="Guides, stories & inspiration"
        description="Long reads, itineraries and insider tips from our editors and photographers."
        breadcrumbs={[{ name: "Blog", href: "/blog" }]}
      />
      <div className="container-lux py-12">
        {featured && (
          <div className="mb-12">
            <ArticleCard article={featured} horizontal />
          </div>
        )}

        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <StaggerItem key={a.slug}>
              <ArticleCard article={a} />
            </StaggerItem>
          ))}
        </Stagger>

        <AdSlot slot="blog-list" className="mt-12 min-h-[140px]" />
      </div>
    </>
  );
}
