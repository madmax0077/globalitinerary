import { NextResponse } from "next/server";
import { buildPageSitemapEntries, entriesToUrlsetXml, sitemapXmlHeaders } from "@/lib/sitemap-data";

export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  return new NextResponse(entriesToUrlsetXml(buildPageSitemapEntries()), { headers: sitemapXmlHeaders });
}
