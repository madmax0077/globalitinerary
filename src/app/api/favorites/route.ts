import { NextResponse } from "next/server";
import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import { attractions } from "@/data/attractions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type FavoriteItem = {
  bookmarkId: string;
  href: string;
  image: string;
  title: string;
  subtitle?: string;
  badge?: string;
  location?: string;
};

/**
 * Resolve bookmark ids → card payloads.
 * Keeps the favorites page from shipping the entire city catalog to the browser.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("ids") ?? "";
  const ids = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 80);

  if (!ids.length) {
    return NextResponse.json({ items: [] as FavoriteItem[] });
  }

  const items: FavoriteItem[] = [];

  for (const id of ids) {
    const [kind, slug] = id.split(":");
    if (!kind || !slug) continue;

    if (kind === "country") {
      const c = countries.find((x) => x.slug === slug);
      if (!c) continue;
      items.push({
        bookmarkId: id,
        href: `/countries/${c.slug}`,
        image: c.thumbnail || c.heroImage,
        title: c.name,
        subtitle: c.tagline,
        badge: "Country",
        location: c.continent,
      });
      continue;
    }

    if (kind === "city") {
      const c = cities.find((x) => x.slug === slug);
      if (!c) continue;
      items.push({
        bookmarkId: id,
        href: `/cities/${c.slug}`,
        image: c.thumbnail || c.heroImage,
        title: c.name,
        subtitle: c.tagline,
        badge: "City",
        location: c.countryName,
      });
      continue;
    }

    if (kind === "attraction") {
      const a = attractions.find((x) => x.slug === slug);
      if (!a) continue;
      items.push({
        bookmarkId: id,
        href: `/attractions/${a.slug}`,
        image: a.thumbnail || a.heroImage,
        title: a.name,
        subtitle: a.tagline,
        badge: a.category,
        location: a.cityName,
      });
    }
  }

  return NextResponse.json({ items });
}
