import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";
import { DAILY_SUBMIT_LIMIT, dailyUrlBatch, listIndexableUrls } from "@/lib/index-url-queue";

const INDEXNOW_KEY = "7f3c9e2a1b8d4f06a5e9c2d1b0a84736";

function authorized(request: Request): boolean {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const expectedToken = process.env.INDEXNOW_TOKEN;
  const cronSecret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");

  if (request.headers.get("x-vercel-cron") === "1") return true;
  if (cronSecret && auth === `Bearer ${cronSecret}`) return true;
  if (expectedToken) return token === expectedToken;
  // Local preview only — production needs a token or cron header.
  if (process.env.VERCEL_ENV === "production") return false;
  return !expectedToken && !cronSecret;
}

async function submitIndexNow(urlList: string[]) {
  const host = new URL(siteConfig.url).host;
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation: `${siteConfig.url}/${INDEXNOW_KEY}.txt`,
      urlList,
    }),
  });
  const text = await res.text();
  return { ok: res.ok, status: res.status, body: text.slice(0, 400) };
}

async function submitBingWebmaster(urlList: string[]) {
  const apiKey = process.env.BING_WEBMASTER_API_KEY;
  if (!apiKey) return { skipped: true as const, reason: "BING_WEBMASTER_API_KEY not set" };

  const quotaUrl = `https://ssl.bing.com/webmaster/api.svc/json/GetUrlSubmissionQuota?apikey=${encodeURIComponent(apiKey)}&siteUrl=${encodeURIComponent(siteConfig.url)}`;
  const submitUrl = `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=${encodeURIComponent(apiKey)}`;

  const quotaRes = await fetch(quotaUrl);
  const quotaText = await quotaRes.text();
  let quota: unknown = quotaText;
  try {
    quota = JSON.parse(quotaText);
  } catch {
    /* keep raw */
  }

  const res = await fetch(submitUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      siteUrl: siteConfig.url,
      urlList,
    }),
  });
  const text = await res.text();
  return {
    skipped: false as const,
    ok: res.ok,
    status: res.status,
    quota,
    body: text.slice(0, 400),
  };
}

/**
 * Daily IndexNow + Bing URL Submission (100 URLs / day, rotating).
 * Cron: GET /api/indexnow
 * Preview: GET /api/indexnow?preview=1
 * Manual batch: GET /api/indexnow?day=0
 */
export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const preview = url.searchParams.get("preview") === "1";
  const size = Math.min(
    500,
    Math.max(1, Number(url.searchParams.get("limit") || DAILY_SUBMIT_LIMIT) || DAILY_SUBMIT_LIMIT),
  );
  const dayParam = url.searchParams.get("day");
  const dayOffset = dayParam === null || dayParam === "" ? undefined : Number(dayParam);

  const all = listIndexableUrls();
  const { urls, batch, totalBatches, offset } = dailyUrlBatch(all, size, dayOffset);

  if (preview) {
    return NextResponse.json({
      preview: true,
      submitted: 0,
      count: urls.length,
      batch,
      totalBatches,
      offset,
      pool: all.length,
      urls,
    });
  }

  try {
    const [indexNow, bing] = await Promise.all([
      submitIndexNow(urls),
      submitBingWebmaster(urls),
    ]);

    return NextResponse.json({
      ok: indexNow.ok && (bing.skipped || bing.ok),
      submitted: urls.length,
      batch,
      totalBatches,
      offset,
      pool: all.length,
      indexNow,
      bing,
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Submission failed" },
      { status: 502 },
    );
  }
}
