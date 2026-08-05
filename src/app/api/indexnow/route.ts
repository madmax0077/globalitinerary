import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";
import { articles } from "@/data/content";

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

  const urls = [
    siteConfig.url,
    `${siteConfig.url}/blog`,
    `${siteConfig.url}/countries`,
    `${siteConfig.url}/cities`,
    ...articles.slice(0, 40).map((a) => `${siteConfig.url}/blog/${a.slug}`),
  ];

  const body = {
    host,
    key: INDEXNOW_KEY,
    keyLocation,
    urlList: urls,
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
      submitted: urls.length,
      engineResponse: text.slice(0, 500),
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "IndexNow failed" },
      { status: 502 },
    );
  }
}
