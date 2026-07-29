import { PageHero } from "@/components/shared/page-hero";
import { FavoritesClient, type FavoriteItem } from "@/components/shared/favorites-client";
import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import { attractions } from "@/data/attractions";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({
    title: "Your Saved Places",
    description:
      "Your bookmarked countries, cities and attractions — saved on this device for planning your next trip.",
    path: "/favorites",
  }),
  robots: { index: false, follow: true },
};

// Lightweight lookup so the client can resolve saved bookmark ids to cards.
function buildLookup(): Record<string, FavoriteItem> {
  const map: Record<string, FavoriteItem> = {};
  for (const c of countries) {
    map[`country:${c.slug}`] = {
      bookmarkId: `country:${c.slug}`,
      href: `/countries/${c.slug}`,
      image: c.thumbnail || c.heroImage,
      title: c.name,
      subtitle: c.tagline,
      badge: "Country",
      location: c.continent,
    };
  }
  for (const c of cities) {
    map[`city:${c.slug}`] = {
      bookmarkId: `city:${c.slug}`,
      href: `/cities/${c.slug}`,
      image: c.thumbnail || c.heroImage,
      title: c.name,
      subtitle: c.tagline,
      badge: "City",
      location: c.countryName,
    };
  }
  for (const a of attractions) {
    map[`attraction:${a.slug}`] = {
      bookmarkId: `attraction:${a.slug}`,
      href: `/attractions/${a.slug}`,
      image: a.thumbnail || a.heroImage,
      title: a.name,
      subtitle: a.tagline,
      badge: a.category,
      location: a.cityName,
    };
  }
  return map;
}

export default function FavoritesPage() {
  const lookup = buildLookup();
  return (
    <>
      <PageHero
        eyebrow="Your collection"
        title="Saved places"
        description="Everything you've bookmarked, in one place. Your list is stored on this device — no account required."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Saved", href: "/favorites" },
        ]}
      />
      <div className="container-lux py-12">
        <FavoritesClient lookup={lookup} />
      </div>
    </>
  );
}
