import { NextResponse } from "next/server";
import { buildFullSitemapXml, sitemapXmlHeaders } from "@/lib/sitemap-data";

/**
 * Single flat sitemap at /sitemap.xml.
 * A sitemap *index* was processing in GSC with 0 child sitemaps discovered;
 * with ~1.5k URLs a urlset is simpler and more reliable for Google.
 */
export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  return new NextResponse(buildFullSitemapXml(), {
    headers: sitemapXmlHeaders,
  });
}
