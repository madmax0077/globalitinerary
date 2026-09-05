import { NextResponse } from "next/server";
import { buildCountrySitemapEntries, entriesToUrlsetXml, sitemapXmlHeaders } from "@/lib/sitemap-data";

export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  return new NextResponse(entriesToUrlsetXml(buildCountrySitemapEntries()), { headers: sitemapXmlHeaders });
}
