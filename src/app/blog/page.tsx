import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { ArticleCard } from "@/components/shared/article-card";
import { AdSlot } from "@/components/shared/ad-slot";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { articles, top100CityGuides, top200CityGuides } from "@/data/content";
import { getTop100GuideLink } from "@/data/top100-city-guides";
import { TOP_100_CITIES } from "@/data/top-100-cities";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import { REVALIDATE_FEED_SECONDS } from "@/lib/isr";

export const revalidate = REVALIDATE_FEED_SECONDS;

export const metadata = {
  ...buildMetadata({
    title: "Travel Guides & Stories",
    description:
      "Inspiration, itineraries, tips and deep dives from the Global Itinerary editorial team — everything you need to plan your next journey.",
    path: "/blog",
  }),
  alternates: {
    canonical: `${siteConfig.url}/blog`,
    types: {
      "application/rss+xml": `${siteConfig.url}/blog/rss.xml`,
    },
  },
};

export default function BlogPage() {
  const cityGuideSlugs = new Set([
    ...top100CityGuides.map((a) => a.slug),
    ...top200CityGuides.map((a) => a.slug),
  ]);
  const editorial = articles.filter(
    (a) => !cityGuideSlugs.has(a.slug) && a.slug !== "top-200-cities-to-visit-2026",
  );
  const [featured, ...rest] = editorial;

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

        <Stagger className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <StaggerItem key={a.slug} className="h-full">
              <ArticleCard article={a} />
            </StaggerItem>
          ))}
        </Stagger>

        <section className="mt-16">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            Top 100 city itineraries
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            A separate 5–15 day plan and trip-cost guide for each city on our{" "}
            <Link href="/blog/top-100-cities-to-visit-2026" className="font-semibold text-primary hover:underline">
              2026 Top 100 ranking
            </Link>{" "}
            — the same format as our Bali, Dubai, London and Paris itineraries.
          </p>
          <ul className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {TOP_100_CITIES.map((c) => {
              const link = getTop100GuideLink(c.slug);
              if (!link) return null;
              return (
                <li key={c.slug}>
                  <Link
                    href={`/blog/${link.articleSlug}`}
                    className="flex items-baseline justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm shadow-soft hover:border-primary/40"
                  >
                    <span>
                      <span className="font-semibold">{c.name}</span>
                      <span className="text-muted-foreground"> · {c.country}</span>
                    </span>
                    <span className="shrink-0 text-xs font-semibold text-primary">
                      {link.days} days
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            101–200 city blogs
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            A separate post for each city — same format as Bali, Dubai and the Top 100 city guides.
            Click a card to open that city’s day-by-day itinerary.
          </p>
          <Stagger className="mt-8 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {top200CityGuides.map((article) => (
              <StaggerItem key={article.slug} className="h-full">
                <ArticleCard article={article} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        <AdSlot slot="blog-list" className="mt-12 min-h-[140px]" />
      </div>
    </>
  );
}
