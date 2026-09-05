import { NextResponse } from "next/server";
import { buildFullSitemapXml, sitemapXmlHeaders } from "@/lib/sitemap-data";
import { REVALIDATE_FEED_SECONDS } from "@/lib/isr";

/**
 * Full sitemap at /sitemap.xml so Search Console reports every city, country, and blog URL.
 * Child files /sitemap-cities.xml, /sitemap-countries.xml, /sitemap-pages.xml still exist.
 */
export const dynamic = "force-static";
export const revalidate = REVALIDATE_FEED_SECONDS;

export function GET() {
  try {
    return new NextResponse(buildFullSitemapXml(), { headers: sitemapXmlHeaders });
  } catch (error) {
    console.error("[sitemap] generation failed", error);
    return new NextResponse("Sitemap temporarily unavailable", { status: 500 });
  }
}
