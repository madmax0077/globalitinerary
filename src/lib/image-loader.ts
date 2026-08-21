/**
 * Custom Next.js image loader — browsers talk to CDNs directly.
 *
 * This avoids Vercel `/_next/image` (Image Optimization cache writes).
 *
 * Optional: set NEXT_PUBLIC_CLOUDFLARE_IMAGE_RESIZE=1 after the domain is
 * proxied through Cloudflare with Image Resizing enabled. Wikimedia/local
 * assets then get AVIF/WebP via `/cdn-cgi/image/...`.
 */
import { wikimediaSizedUrl } from "@/lib/wikimedia";

const useCloudflareResize =
  process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGE_RESIZE === "1";

function cloudflareResize(src: string, width: number, quality?: number): string {
  if (src.includes("/cdn-cgi/image/")) return src;
  const q = quality ?? 75;
  const options = `width=${width},quality=${q},format=auto,fit=scale-down`;
  const path = src.startsWith("/") ? src : src;
  return `/cdn-cgi/image/${options}/${path}`;
}

export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (src.startsWith("/")) {
    return useCloudflareResize ? cloudflareResize(src, width, quality) : src;
  }

  try {
    const url = new URL(src);

    // Unsplash already negotiates WebP/AVIF and resizes — do not proxy.
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

    if (url.hostname === "flagcdn.com") {
      return url.toString();
    }

    if (useCloudflareResize) {
      return cloudflareResize(url.toString(), width, quality);
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
