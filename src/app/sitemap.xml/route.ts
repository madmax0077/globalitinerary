import { NextResponse } from "next/server";
import { buildFullSitemapXml, sitemapXmlHeaders } from "@/lib/sitemap-data";

/**
 * Single flat sitemap at /sitemap.xml.
 * Only indexable URLs are included (thin city stubs excluded).
 */
export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  try {
    const xml = buildFullSitemapXml();
    return new NextResponse(xml, { headers: sitemapXmlHeaders });
  } catch (error) {
    console.error("[sitemap] generation failed", error);
    return new NextResponse("Sitemap temporarily unavailable", { status: 500 });
  }
}
