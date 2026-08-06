import { NextResponse } from "next/server";
import {
  buildSitemapIndexXml,
  sitemapXmlHeaders,
} from "@/lib/sitemap-data";

/**
 * Manual sitemap index — Next.js 16's generateSitemaps() does not serve
 * /sitemap.xml (known bug). next.config rewrites /sitemap.xml → here.
 */
export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  return new NextResponse(buildSitemapIndexXml(), {
    headers: sitemapXmlHeaders,
  });
}
