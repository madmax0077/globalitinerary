import Link from "next/link";
import { ArrowRight, Globe2, Sparkles } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { CollectionsGrid } from "@/components/home/collections-grid";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { WorldMap } from "@/components/home/world-map";
import { SectionHeading } from "@/components/shared/section-heading";
import { DestinationCard } from "@/components/shared/destination-card";
import { ArticleCard } from "@/components/shared/article-card";
import { Newsletter } from "@/components/shared/newsletter";
import { Carousel } from "@/components/shared/carousel";
import { AdSlot } from "@/components/shared/ad-slot";
import { StatCounter } from "@/components/shared/stat-counter";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import { attractions } from "@/data/attractions";
import { articles } from "@/data/content";
import { citySitemapSlugs } from "@/data/city-sitemap-slugs.generated";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Travel Guides, Itineraries & Things to Do Worldwide",
  description:
    "Free travel guides for countries and cities: things to do, best time to visit, day-by-day itineraries, budgets, visas and trip-planning tools.",
  path: "/",
});

export const revalidate = 3600;

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`container-lux py-16 sm:py-20 ${className}`}>
      {children}
    </section>
  );
}

export default function Home() {
  const cityGuideCount = citySitemapSlugs.length;
  const worldStats = [
    { value: 195, suffix: "", label: "Countries covered" },
    { value: cityGuideCount, suffix: "+", label: "City guides" },
    { value: 20, suffix: "+", label: "Travel guides & itineraries" },
    { value: 6, suffix: "", label: "Continents" },
  ];
  const trendingCountries = countries.filter((c) => c.trending);
  const featuredCities = cities.filter((c) => c.featured).slice(0, 8);
  const featuredAttractions = attractions.filter((a) => a.featured);
  const latestArticles = articles.slice(0, 3);

  return (
    <>
      <Hero cityCount={cityGuideCount} />

      {/* Trending countries */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Trending now"
            title="Countries everyone's talking about"
            description="The destinations capturing travelers' hearts this season."
          />
          <Button asChild variant="outline" size="sm">
            <Link href="/countries">
              View all countries <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <Carousel className="mt-10" itemClassName="w-[78%] sm:w-[46%] lg:w-[23%]">
          {trendingCountries.map((c, i) => (
            <DestinationCard
              key={c.slug}
              href={`/countries/${c.slug}`}
              image={c.thumbnail}
              title={`${c.flag} ${c.name}`}
              subtitle={c.tagline}
              badge={c.continent}
              rating={c.rating}
              reviews={c.reviews}
              bookmarkId={`country:${c.slug}`}
              priority={i < 2}
            />
          ))}
        </Carousel>
      </Section>

      {/* Popular cities */}
      <Section className="!pt-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Top cities"
            title="Iconic cities to explore"
            description="From neon megacities to timeless old towns."
          />
          <Button asChild variant="outline" size="sm">
            <Link href="/cities">
              All cities <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {featuredCities.map((c) => (
            <StaggerItem key={c.slug}>
              <DestinationCard
                href={`/cities/${c.slug}`}
                image={c.thumbnail}
                title={c.name}
                location={c.countryName}
                subtitle={c.tagline}
                rating={c.rating}
                reviews={c.reviews}
                bookmarkId={`city:${c.slug}`}
                aspect="landscape"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Collections */}
      <Section id="collections" className="!pt-0">
        <SectionHeading
          eyebrow="Curated collections"
          title="Travel by mood, not just map"
          description="Hand-picked themes to match exactly how you want to travel."
          align="center"
        />
        <div className="mt-12">
          <CollectionsGrid />
        </div>
      </Section>

      {/* Featured attractions */}
      <Section className="!pt-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Must-see landmarks"
            title="Featured attractions"
            description="The world's most breathtaking sights, guided in detail."
          />
          <Button asChild variant="outline" size="sm">
            <Link href="/attractions">
              Explore attractions <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <Carousel className="mt-10" itemClassName="w-[78%] sm:w-[46%] lg:w-[31%]">
          {featuredAttractions.map((a) => (
            <DestinationCard
              key={a.slug}
              href={`/attractions/${a.slug}`}
              image={a.thumbnail}
              title={a.name}
              location={`${a.cityName}, ${a.countryName}`}
              subtitle={a.tagline}
              badge={a.category}
              rating={a.rating}
              reviews={a.reviews}
              bookmarkId={`attraction:${a.slug}`}
              aspect="landscape"
            />
          ))}
        </Carousel>
      </Section>

      {/* Ad slot */}
      <Section className="!py-8">
        <AdSlot slot="home-mid" className="min-h-[140px]" />
      </Section>

      {/* Categories */}
      <Section className="!pt-4">
        <SectionHeading
          eyebrow="Ways to wander"
          title="Find your kind of adventure"
          align="center"
        />
        <div className="mt-12">
          <CategoryShowcase />
        </div>
      </Section>

      {/* World map */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <SectionHeading
            eyebrow="Interactive map"
            title="The whole world, at your fingertips"
            description="Tap any destination to dive into detailed guides, itineraries and insider tips. New places are added every week."
          />
          <WorldMap
            markers={countries.map((c) => ({
              lat: c.coordinates.lat,
              lng: c.coordinates.lng,
              label: c.name,
              href: `/countries/${c.slug}`,
              flag: c.flag,
            }))}
          />
        </div>
      </Section>

      {/* Stats band */}
      <Section className="!py-0">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(120deg,var(--primary),var(--sky))] p-10 text-white sm:p-14">
            <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-2xl" />
            <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {worldStats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-4xl font-extrabold sm:text-5xl">
                    <StatCounter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-sm text-white/80">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Latest articles */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Travel journal"
            title="Latest stories & guides"
            description="Inspiration, tips and deep dives from our editors."
          />
          <Button asChild variant="outline" size="sm">
            <Link href="/blog">
              Read the blog <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
          {latestArticles.map((a) => (
            <StaggerItem key={a.slug}>
              <ArticleCard article={a} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Newsletter CTA */}
      <Section id="newsletter">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-10 text-center shadow-soft sm:p-16">
            <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" />
            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                <Sparkles className="size-4" /> Join 200,000+ explorers
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Your next adventure starts here
              </h2>
              <p className="mt-4 text-muted-foreground">
                Get handpicked destinations, itineraries and travel deals delivered
                to your inbox every week. No spam, just wanderlust.
              </p>
              <div className="mt-8">
                <Newsletter />
              </div>
              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <Globe2 className="size-3.5" /> Trusted by travelers in 190+ countries
              </p>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
