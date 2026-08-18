/**
 * Custom Next.js image loader (opt-in via USE_CUSTOM_IMAGE_LOADER=1).
 *
 * Used when the Node-side `/_next/image` optimizer cannot fetch remotes
 * (e.g. corporate SSL-inspecting proxies). Otherwise prefer the default
 * optimizer so Next can serve AVIF/WebP.
 *
 * Hands the browser a CDN URL directly, with on-the-fly resize where the CDN
 * supports it (Unsplash, Wikimedia Special:FilePath).
 */
import { wikimediaSizedUrl } from "@/lib/wikimedia";

export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (src.startsWith("/")) return src;

  try {
    const url = new URL(src);

    // Unsplash — auto negotiates WebP/AVIF via `auto=format`.
    if (url.hostname === "images.unsplash.com") {
      url.searchParams.set("auto", "format");
      url.searchParams.set("fit", "crop");
      url.searchParams.set("w", String(width));
      url.searchParams.set("q", String(quality ?? 75));
      return url.toString();
    }

    if (url.hostname === "i.pravatar.cc") {
      const img = url.searchParams.get("img");
      const size = Math.min(width, 512);
      return `https://i.pravatar.cc/${size}${img ? `?img=${img}` : ""}`;
    }

    // Wikimedia — Special:FilePath (or leave existing thumbs alone).
    if (url.hostname === "upload.wikimedia.org") {
      return wikimediaSizedUrl(url.toString(), width);
    }

    // Already a Special:FilePath URL — refresh width.
    if (
      (url.hostname === "commons.wikimedia.org" ||
        url.hostname.endsWith(".wikipedia.org")) &&
      url.pathname.includes("Special:FilePath")
    ) {
      url.searchParams.set("width", String(Math.min(width, 1920)));
      return url.toString();
    }

    return url.toString();
  } catch {
    return src;
  }
}
