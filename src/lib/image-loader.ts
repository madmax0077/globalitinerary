/**
 * Custom Next.js image loader — browsers fetch Unsplash / Wikimedia / flags
 * directly. This avoids Vercel `/_next/image` Image Optimization cache writes
 * (Hobby cap 100K/month).
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

    // Unsplash negotiates WebP/AVIF via auto=format and resizes with `w`.
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

    if (url.hostname === "upload.wikimedia.org") {
      return wikimediaSizedUrl(url.toString(), width);
    }

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
