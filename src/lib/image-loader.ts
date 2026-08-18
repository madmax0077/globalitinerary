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

    // Wikimedia Commons — request a thumb width so city heroes are not 5–15MB originals.
    if (url.hostname === "upload.wikimedia.org") {
      return wikimediaThumb(url, width);
    }

    // Other trusted CDNs (flags) are already small — serve directly.
    return url.toString();
  } catch {
    return src;
  }
}

/** Pick a Commons thumb size bucket (must be a known thumbnail width). */
function wikimediaThumb(url: URL, width: number): string {
  const buckets = [320, 640, 800, 1024, 1280, 1600, 1920];
  const target = buckets.find((b) => b >= width) ?? 1920;
  const path = url.pathname;

  // Already a thumb URL: …/thumb/.../1280px-File.jpg → swap width
  const thumbMatch = path.match(/^(.*\/thumb\/.+\/)\d+px-(.+)$/);
  if (thumbMatch) {
    url.pathname = `${thumbMatch[1]}${target}px-${thumbMatch[2]}`;
    return url.toString();
  }

  // Original file URL: /wikipedia/commons/a/ab/File.jpg → thumb path
  const original = path.match(/^(\/wikipedia\/commons\/)([0-9a-f])\/([0-9a-f]{2})\/(.+)$/i);
  if (original) {
    const [, prefix, a, ab, file] = original;
    // Skip non-raster (SVG etc.) — thumbs for SVG use png conversion; leave as-is.
    if (/\.svg$/i.test(file)) return url.toString();
    url.pathname = `${prefix}thumb/${a}/${ab}/${file}/${target}px-${file}`;
    return url.toString();
  }

  return url.toString();
}
