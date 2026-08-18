import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";
import { articles } from "@/data/content";
import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import { isCityIndexable } from "@/lib/content-legitimacy";

const INDEXNOW_KEY = "7f3c9e2a1b8d4f06a5e9c2d1b0a84736";

/**
 * Ping IndexNow (Bing / Yandex / compatible engines) with priority URLs.
 * Call once after deploy: GET /api/indexnow
 * Optional secret: ?token=INDEXNOW_TOKEN if INDEXNOW_TOKEN env is set.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const expected = process.env.INDEXNOW_TOKEN;
  if (expected && url.searchParams.get("token") !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const host = new URL(siteConfig.url).host;
  const keyLocation = `${siteConfig.url}/${INDEXNOW_KEY}.txt`;

  const featuredCities = cities.filter((c) => c.featured || isCityIndexable(c)).slice(0, 120);

  const urls = [
    siteConfig.url,
    `${siteConfig.url}/blog`,
    `${siteConfig.url}/countries`,
    `${siteConfig.url}/cities`,
    `${siteConfig.url}/blog/top-100-cities-to-visit-2026`,
    ...articles.slice(0, 40).map((a) => `${siteConfig.url}/blog/${a.slug}`),
    ...countries
      .filter((c) => c.featured || c.trending)
      .slice(0, 40)
      .map((c) => `${siteConfig.url}/countries/${c.slug}`),
    ...featuredCities.map((c) => `${siteConfig.url}/cities/${c.slug}`),
  ];

  // IndexNow accepts up to 10,000 URLs; keep a practical batch under 500.
  const urlList = Array.from(new Set(urls)).slice(0, 400);

  const body = {
    host,
    key: INDEXNOW_KEY,
    keyLocation,
    urlList,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      submitted: urlList.length,
      engineResponse: text.slice(0, 500),
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "IndexNow failed" },
      { status: 502 },
    );
  }
}
