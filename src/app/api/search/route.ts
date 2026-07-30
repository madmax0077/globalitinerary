import { NextResponse } from "next/server";
import { searchDestinations, getSearchIndex } from "@/lib/search";

// Must run per-request: the response depends on the ?q= query parameter, so
// it can't be statically prerendered/cached (that returned the same results
// for every search).
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const limit = Number(searchParams.get("limit") ?? 12);

  const results = q.trim() ? searchDestinations(q, limit) : [];

  return NextResponse.json({
    query: q,
    count: results.length,
    results,
    total: getSearchIndex().length,
  });
}
