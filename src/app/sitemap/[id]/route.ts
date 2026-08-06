import { NextResponse } from "next/server";
import {
  buildSitemapChunk,
  entriesToUrlsetXml,
  sitemapChunkCount,
  sitemapXmlHeaders,
} from "@/lib/sitemap-data";

export const dynamic = "force-static";
export const revalidate = 3600;

type RouteContext = { params: Promise<{ id: string }> };

function parseChunkId(raw: string): number | null {
  const id = Number(raw.replace(/\.xml$/i, ""));
  if (!Number.isInteger(id) || id < 0 || id >= sitemapChunkCount()) return null;
  return id;
}

export function generateStaticParams() {
  return Array.from({ length: sitemapChunkCount() }, (_, id) => ({
    id: `${id}.xml`,
  }));
}

export async function GET(_request: Request, context: RouteContext) {
  const { id: raw } = await context.params;
  const id = parseChunkId(raw);
  if (id === null) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const xml = entriesToUrlsetXml(buildSitemapChunk(id));
  return new NextResponse(xml, { headers: sitemapXmlHeaders });
}
