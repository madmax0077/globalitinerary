import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import { attractions } from "@/data/attractions";
import { articles, collections } from "@/data/content";
import type { SearchItem } from "@/lib/types";

let cachedIndex: SearchItem[] | null = null;

export function getSearchIndex(): SearchItem[] {
  if (cachedIndex) return cachedIndex;

  const items: SearchItem[] = [
    ...countries.map<SearchItem>((c) => ({
      kind: "country",
      slug: c.slug,
      title: c.name,
      subtitle: `${c.continent} • ${c.capital}`,
      image: c.thumbnail,
      href: `/countries/${c.slug}`,
      keywords: `${c.name} ${c.capital} ${c.continent} ${c.region} ${c.tags.join(" ")}`.toLowerCase(),
    })),
    ...cities.map<SearchItem>((c) => ({
      kind: "city",
      slug: c.slug,
      title: c.name,
      subtitle: `City • ${c.countryName}${c.continent ? ` • ${c.continent}` : ""}`,
      image: c.thumbnail,
      href: `/cities/${c.slug}`,
      keywords: `${c.name} ${c.countryName} city ${c.tagline} ${c.continent ?? ""} ${c.region ?? ""} ${(c.categories ?? []).join(" ")}`.toLowerCase(),
    })),
    ...attractions.map<SearchItem>((a) => ({
      kind: "attraction",
      slug: a.slug,
      title: a.name,
      subtitle: `${a.category} • ${a.cityName}, ${a.countryName}`,
      image: a.thumbnail,
      href: `/attractions/${a.slug}`,
      keywords: `${a.name} ${a.category} ${a.cityName} ${a.countryName} landmark attraction`.toLowerCase(),
    })),
    ...collections.map<SearchItem>((c) => ({
      kind: "collection",
      slug: c.slug,
      title: c.title,
      subtitle: `Collection • ${c.count} places`,
      image: c.image,
      href: `/collections/${c.slug}`,
      keywords: `${c.title} ${c.description} collection`.toLowerCase(),
    })),
    ...articles.map<SearchItem>((a) => ({
      kind: "article",
      slug: a.slug,
      title: a.title,
      subtitle: `Article • ${a.category}`,
      image: a.cover,
      href: `/blog/${a.slug}`,
      keywords: `${a.title} ${a.category} ${a.tags.join(" ")} article guide`.toLowerCase(),
    })),
  ];

  cachedIndex = items;
  return items;
}

export function searchDestinations(query: string, limit = 12): SearchItem[] {
  const q = query.trim().toLowerCase();
  const index = getSearchIndex();
  if (!q) return [];

  const scored = index
    .map((item) => {
      const title = item.title.toLowerCase();
      let score = 0;
      if (title === q) score += 100;
      else if (title.startsWith(q)) score += 60;
      else if (title.includes(q)) score += 40;
      if (item.keywords.includes(q)) score += 20;
      // token match
      for (const token of q.split(/\s+/)) {
        if (token && item.keywords.includes(token)) score += 5;
      }
      return { item, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((s) => s.item);
}
