import { NextResponse } from "next/server";
import { buildPageSitemapEntries, entriesToUrlsetXml, sitemapXmlHeaders } from "@/lib/sitemap-data";
import { REVALIDATE_FEED_SECONDS } from "@/lib/isr";

export const dynamic = "force-static";
export const revalidate = REVALIDATE_FEED_SECONDS;

export function GET() {
  return new NextResponse(entriesToUrlsetXml(buildPageSitemapEntries()), { headers: sitemapXmlHeaders });
}
