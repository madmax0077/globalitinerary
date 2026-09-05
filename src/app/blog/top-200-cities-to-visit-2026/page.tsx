import { PageHero } from "@/components/shared/page-hero";
import { ArticleCard } from "@/components/shared/article-card";
import { AdSlot } from "@/components/shared/ad-slot";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { top200CityGuides } from "@/data/content";
import { TOP_101_200_CITIES } from "@/data/top-200-cities";
import { getTop100GuideLink } from "@/data/top100-city-guides";
import { buildMetadata, breadcrumbJsonLd, itemListJsonLd, JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import Link from "next/link";
import { REVALIDATE_FEED_SECONDS } from "@/lib/isr";

const SLUG = "top-200-cities-to-visit-2026";
const TITLE = "101–200 City Itineraries: Separate Guides for Each City";
const EXCERPT =
  "One standalone blog post per city — a 5–15 day plan, best time to visit and trip cost, the same way we published the Top 100 city guides.";

export const revalidate = REVALIDATE_FEED_SECONDS;

export const metadata = buildMetadata({
  title: TITLE,
  description: EXCERPT,
  path: `/blog/${SLUG}`,
  type: "article",
  keywords: [
    "city itineraries",
    "cities 101 to 200",
    "travel blog",
    "5 day itinerary",
    "trip cost",
    "Global Itinerary",
  ],
});

export default function Top200CityGuidesBlogPage() {
  const bySlug = new Map(top200CityGuides.map((a) => [a.slug, a]));
  const guides = TOP_101_200_CITIES.flatMap((city) => {
    const link = getTop100GuideLink(city.slug);
    const article = link ? bySlug.get(link.articleSlug) : undefined;
    return article ? [{ city, article }] : [];
  });

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Blog", url: "/blog" },
            { name: TITLE, url: `/blog/${SLUG}` },
          ]),
          itemListJsonLd(
            guides.map(({ article }) => ({
              name: article.title,
              url: `/blog/${article.slug}`,
            })),
            TITLE,
          ),
        ]}
      />

      <PageHero
        eyebrow="Separate city blogs"
        title="101–200 city itineraries"
        description="Each city is its own blog post — not one combined ranking. Open any card for that city’s day-by-day plan, best time and trip cost."
        breadcrumbs={[
          { name: "Blog", href: "/blog" },
          { name: "101–200 city guides", href: `/blog/${SLUG}` },
        ]}
      />

      <div className="container-lux py-12">
        <p className="max-w-2xl text-muted-foreground">
          {guides.length} individual guides. The Top 100 set stays on the{" "}
          <Link href="/blog/top-100-cities-to-visit-2026" className="font-semibold text-primary hover:underline">
            Top 100 ranking
          </Link>{" "}
          and in its own list on the{" "}
          <Link href="/blog" className="font-semibold text-primary hover:underline">
            main blog
          </Link>
          .
        </p>

        <Stagger className="mt-10 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map(({ city, article }) => (
            <StaggerItem key={article.slug} className="h-full">
              <ArticleCard article={article} kicker={`#${city.rank} · ${city.country}`} />
            </StaggerItem>
          ))}
        </Stagger>

        <AdSlot slot="blog-list" className="mt-12 min-h-[140px]" />
      </div>
    </>
  );
}
