// Serves /ads.txt for Google AdSense. Set NEXT_PUBLIC_ADSENSE_CLIENT_ID
// (e.g. "ca-pub-1234567890123456") and this exposes the matching pub id.
export const dynamic = "force-static";

export function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "";
  const pub = client.replace(/^ca-/, "") || "pub-0000000000000000";
  const body = `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`;
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
