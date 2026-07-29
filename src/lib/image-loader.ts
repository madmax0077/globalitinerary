/**
 * Custom Next.js image loader.
 *
 * Instead of proxying remote images through the Node-side optimizer
 * (`/_next/image`), we hand the browser a CDN URL directly. This keeps images
 * working behind corporate SSL-inspecting proxies (where the Node server can't
 * fetch remote hosts) while still leveraging each CDN's own on-the-fly
 * resizing for performance.
 */
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  // Local/static assets — serve as-is.
  if (src.startsWith("/")) return src;

  try {
    const url = new URL(src);

    // Unsplash supports on-the-fly resizing via query params.
    if (url.hostname === "images.unsplash.com") {
      url.searchParams.set("auto", "format");
      url.searchParams.set("fit", "crop");
      url.searchParams.set("w", String(width));
      url.searchParams.set("q", String(quality ?? 75));
      return url.toString();
    }

    // Pravatar encodes the size in the path (e.g. /160?img=45). Honor the
    // requested width so the loader is width-aware (avoids Next.js warnings).
    if (url.hostname === "i.pravatar.cc") {
      const img = url.searchParams.get("img");
      const size = Math.min(width, 512);
      return `https://i.pravatar.cc/${size}${img ? `?img=${img}` : ""}`;
    }

    // Other trusted CDNs (flags) are already small — serve directly.
    return url.toString();
  } catch {
    return src;
  }
}
