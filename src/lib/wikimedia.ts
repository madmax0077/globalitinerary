/**
 * Wikimedia Commons / Wikipedia image helpers.
 *
 * Constructing `/thumb/…/NpX-File.jpg` paths often returns HTTP 400 for widths
 * that were never generated. Prefer Special:FilePath (reliable resize) or leave
 * existing working thumb URLs untouched.
 */

const WIDTH_BUCKETS = [320, 640, 800, 1024, 1280, 1600, 1920] as const;

export function wikimediaWidthBucket(width: number): number {
  return WIDTH_BUCKETS.find((b) => b >= width) ?? 1920;
}

/** Extract the file title from an upload.wikimedia.org path. */
export function wikimediaFileName(pathname: string): string | null {
  // Thumb: /wikipedia/{project}/thumb/{a}/{ab}/{file}/{N}px-{file}
  // or PDF page: …/file.pdf/page1-960px-file.pdf.jpg — leave those alone upstream
  const thumb = pathname.match(
    /^\/wikipedia\/[^/]+\/thumb\/[0-9a-f]\/[0-9a-f]{2}\/([^/]+)\/\d+px-\1$/i,
  );
  if (thumb) return decodeURIComponent(thumb[1]);

  // Original: /wikipedia/{project}/{a}/{ab}/{file}
  const original = pathname.match(
    /^\/wikipedia\/[^/]+\/[0-9a-f]\/[0-9a-f]{2}\/([^/]+)$/i,
  );
  if (original) return decodeURIComponent(original[1]);

  return null;
}

function specialFilePathHost(project: string): string {
  if (project === "commons") return "https://commons.wikimedia.org";
  return `https://${project}.wikipedia.org`;
}

/**
 * Return a reliably sized Wikimedia URL.
 * - Existing `/thumb/…/NpX-…` URLs are returned unchanged (rewrites often 400).
 * - Originals become Special:FilePath?width=…
 */
export function wikimediaSizedUrl(src: string, width: number): string {
  try {
    const url = new URL(src);
    if (url.hostname !== "upload.wikimedia.org") return src;

    const path = url.pathname;
    if (/\.svg$/i.test(path)) return src;

    // Already a generated thumb — do not rewrite the pixel width.
    if (/\/thumb\//i.test(path) && /\d+px-/i.test(path)) {
      return src;
    }

    const projectMatch = path.match(/^\/wikipedia\/([^/]+)\//i);
    if (!projectMatch) return src;

    const file = wikimediaFileName(path);
    if (!file || file.includes("/")) return src;

    const target = wikimediaWidthBucket(width);
    const host = specialFilePathHost(projectMatch[1]);
    return `${host}/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${target}`;
  } catch {
    return src;
  }
}

/** Normalize remote image URLs used as next/image `src` values. */
export function normalizeRemoteImageUrl(src: string, width: number): string {
  if (!src || src.startsWith("/")) return src;
  try {
    const url = new URL(src);
    if (url.hostname === "images.unsplash.com") {
      url.searchParams.set("auto", "format");
      url.searchParams.set("fit", "crop");
      url.searchParams.set("w", String(width));
      if (!url.searchParams.has("q")) url.searchParams.set("q", "80");
      return url.toString();
    }
    if (url.hostname === "upload.wikimedia.org") {
      return wikimediaSizedUrl(src, width);
    }
    return src;
  } catch {
    return src;
  }
}
