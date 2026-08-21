import { NextResponse } from "next/server";
import { buildFullSitemapXml, sitemapXmlHeaders } from "@/lib/sitemap-data";

/**
 * Full sitemap at /sitemap.xml so Search Console reports every city, country, and blog URL.
 * Child files /sitemap-cities.xml, /sitemap-countries.xml, /sitemap-pages.xml still exist.
 */
export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  try {
    return new NextResponse(buildFullSitemapXml(), { headers: sitemapXmlHeaders });
  } catch (error) {
    console.error("[sitemap] generation failed", error);
    return new NextResponse("Sitemap temporarily unavailable", { status: 500 });
  }
}
