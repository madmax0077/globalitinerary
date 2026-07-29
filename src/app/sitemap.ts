import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import { attractions } from "@/data/attractions";
import { articles, collections } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/countries",
    "/cities",
    "/attractions",
    "/collections",
    "/blog",
    "/map",
    "/planner",
    "/compare",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
    "/disclaimer",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  // Only include absolute (https) image URLs so the image sitemap is valid.
  const imgs = (...urls: (string | undefined)[]) =>
    urls.filter((u): u is string => !!u && u.startsWith("http")).slice(0, 5);

  const countryRoutes = countries.map((c) => ({
    url: `${base}/countries/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
    images: imgs(c.heroImage, ...(c.gallery ?? [])),
  }));

  const cityRoutes = cities.map((c) => ({
    url: `${base}/cities/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    images: imgs(c.heroImage, ...(c.gallery ?? [])),
  }));

  const attractionRoutes = attractions.map((a) => ({
    url: `${base}/attractions/${a.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
    images: imgs(a.heroImage, ...(a.gallery ?? [])),
  }));

  const collectionRoutes = collections.map((c) => ({
    url: `${base}/collections/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const articleRoutes = articles.map((a) => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...countryRoutes,
    ...cityRoutes,
    ...attractionRoutes,
    ...collectionRoutes,
    ...articleRoutes,
  ];
}
