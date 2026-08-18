import { articles } from "@/data/content";
import { siteConfig } from "@/lib/config";

export const revalidate = 3600;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RSS feed for blog discovery (Google / Feedly / aggregators). */
export async function GET() {
  const items = [...articles]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 40)
    .map((a) => {
      const link = `${siteConfig.url}/blog/${a.slug}`;
      return `  <item>
    <title>${escapeXml(a.title)}</title>
    <link>${escapeXml(link)}</link>
    <guid>${escapeXml(link)}</guid>
    <pubDate>${new Date(a.date).toUTCString()}</pubDate>
    <description>${escapeXml(a.excerpt)}</description>
  </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)} Travel Guides</title>
    <link>${escapeXml(siteConfig.url)}/blog</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
