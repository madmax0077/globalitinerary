import { NextResponse } from "next/server";
import { searchDestinations, getSearchIndex } from "@/lib/search";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const limit = Number(searchParams.get("limit") ?? 12);

  const results = q.trim() ? searchDestinations(q, limit) : [];

  return NextResponse.json(
    { query: q, count: results.length, results, total: getSearchIndex().length },
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
  );
}
