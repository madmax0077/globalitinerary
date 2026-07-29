// Serves /ads.txt for Google AdSense using the account's publisher ID.
import { adsenseClientId } from "@/lib/config";

export const dynamic = "force-static";

export function GET() {
  const pub = adsenseClientId.replace(/^ca-/, "") || "pub-0000000000000000";
  const body = `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`;
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
