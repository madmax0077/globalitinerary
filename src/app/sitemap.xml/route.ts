import { NextResponse } from "next/server";
import { buildSitemapIndexXml, sitemapXmlHeaders } from "@/lib/sitemap-data";

/**
 * Sitemap index at /sitemap.xml. Child sitemaps list pages, countries, and every city.
 */
export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  try {
    return new NextResponse(buildSitemapIndexXml(), { headers: sitemapXmlHeaders });
  } catch (error) {
    console.error("[sitemap] generation failed", error);
    return new NextResponse("Sitemap temporarily unavailable", { status: 500 });
  }
}
