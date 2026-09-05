import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { CitiesBrowser, CITIES_PAGE_SIZE, type CityCardItem } from "@/components/shared/cities-browser";
import { AdSlot } from "@/components/shared/ad-slot";
import { cities } from "@/data/cities";
import {
  CITY_CATEGORY_FILTERS,
  CITY_CONTINENT_FILTERS,
} from "@/lib/city-taxonomy";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import { REVALIDATE_GUIDE_SECONDS } from "@/lib/isr";

export const revalidate = REVALIDATE_GUIDE_SECONDS;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const sp = await searchParams;
  const filter = first(sp.filter);
  const q = first(sp.q).trim();
  const page = first(sp.page);
  const isFiltered = Boolean(filter || q || (page && page !== "1"));

  const base = buildMetadata({
    title: filter
      ? `${filter} Cities — Travel Guides & Things to Do`
      : q
        ? `Cities matching “${q}” — Global Itinerary`
        : "Popular Cities",
    description: filter
      ? `Browse ${filter} city travel guides — things to do, budgets, itineraries and planning tips.`
      : "Browse cities by continent and travel style — city breaks, beaches, food, history and more — with guides for things to do, budgets and itineraries.",
    path: "/cities",
  });

  // Keep equity on the clean /cities URL; don't index every filter/page combo.
  return {
    ...base,
    alternates: { canonical: `${siteConfig.url}/cities` },
    robots: isFiltered ? { index: false, follow: true } : { index: true, follow: true },
  };
}

export default async function CitiesPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const filter = first(sp.filter) || "All";
  const query = first(sp.q).trim().toLowerCase();
  const page = Math.max(1, Number(first(sp.page)) || 1);

  const filters = [...CITY_CONTINENT_FILTERS, ...CITY_CATEGORY_FILTERS];
  const featuredSlugs = new Set(cities.filter((c) => c.featured).map((c) => c.slug));

  const cards: CityCardItem[] = cities.map((c) => ({
    id: c.slug,
    href: `/cities/${c.slug}`,
    image: c.thumbnail,
    title: c.name,
    location: c.countryName,
    subtitle: c.tagline,
    badge: c.continent || c.categories?.[0],
    rating: c.rating,
    reviews: c.reviews,
    bookmarkId: `city:${c.slug}`,
    filters: [c.continent, ...(c.categories ?? [])].filter(Boolean) as string[],
  }));

  const ranked =
    filter === "All" && !query
      ? [...cards].sort((a, b) => {
          const af = featuredSlugs.has(a.id) || a.filters.length > 1 ? 1 : 0;
          const bf = featuredSlugs.has(b.id) || b.filters.length > 1 ? 1 : 0;
          if (af !== bf) return bf - af;
          return a.title.localeCompare(b.title);
        })
      : cards;

  const filtered = ranked.filter((item) => {
    const matchesFilter = filter === "All" || item.filters.includes(filter);
    const matchesQuery =
      !query ||
      item.title.toLowerCase().includes(query) ||
      (item.location ?? "").toLowerCase().includes(query) ||
      (item.badge ?? "").toLowerCase().includes(query) ||
      item.filters.some((f) => f.toLowerCase().includes(query));
    return matchesFilter && matchesQuery;
  });

  const total = filtered.length;
  const start = (page - 1) * CITIES_PAGE_SIZE;
  const pageItems = filtered.slice(start, start + CITIES_PAGE_SIZE);

  return (
    <>
      <PageHero
        eyebrow="Cities"
        title="Iconic cities await"
        description="Filter by continent or travel style — neon megacities, beach towns, food capitals and historic hubs."
        breadcrumbs={[{ name: "Cities", href: "/cities" }]}
      />
      <div className="container-lux py-12">
        <Suspense fallback={<p className="text-sm text-muted-foreground">Loading cities…</p>}>
          <CitiesBrowser
            items={pageItems}
            total={total}
            filters={filters}
            activeFilter={filter}
            query={first(sp.q).trim()}
            page={page}
            filterHint="Continents first, then travel styles (Food, Beach, History…). Use search for a city or country name."
          />
        </Suspense>
        <AdSlot slot="cities-list" className="mt-12 min-h-[140px]" />
      </div>
    </>
  );
}
