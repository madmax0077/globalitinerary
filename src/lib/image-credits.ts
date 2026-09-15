/**
 * Photographer + licence lookup for the Wikimedia Commons photos used across
 * the guides. Most are CC BY-SA, which requires naming the author, and Google
 * expects creator/copyrightNotice/acquireLicensePage on any ImageObject that
 * declares a licence.
 *
 * Data comes from scripts/fetch-image-credits.mjs. Keep this server-side: the
 * generated map covers ~19k files and must never reach the client bundle.
 */
import rawCredits from "@/data/image-credits.generated.json";

/**
 * Shapes match the generated file: each record is [artist, licenseIndex,
 * credit], and licenses is a deduplicated [name, url] table. TypeScript widens
 * JSON tuples to arrays, so values are narrowed at the point of use.
 */
type CreditsFile = {
  licenses: string[][];
  files: Record<string, (string | number)[] | null>;
};

const credits: CreditsFile = rawCredits;

export type ImageCredit = {
  artist: string;
  licenseName: string;
  licenseUrl: string;
  /** Commons file page — where the licence can be reviewed and reused. */
  filePage: string;
  /** Ready-to-render single line, e.g. "Jane Doe via Wikimedia Commons (CC BY-SA 4.0)". */
  creditText: string;
};

/**
 * Recovers the Commons file name from any of the URL shapes the site serves:
 * upload.wikimedia.org originals, generated `/thumb/…/800px-Name.jpg` paths,
 * and the `Special:FilePath` form that normalizeRemoteImageUrl produces.
 */
export function commonsFileName(url: string): string | null {
  const special = url.match(/\/wiki\/Special:FilePath\/([^?#]+)/i);
  const upload = url.match(
    /\/wikipedia\/[^/]+\/(?:thumb\/)?[0-9a-f]\/[0-9a-f]{2}\/([^/?#]+)/i
  );
  const raw = special?.[1] ?? upload?.[1];
  if (!raw) return null;

  let name = raw;
  try {
    name = decodeURIComponent(raw);
  } catch {
    // Malformed escapes — fall back to the raw segment.
  }
  return name.replace(/ /g, "_");
}

/**
 * Returns null when the photographer is unknown. Callers must then omit licence
 * metadata entirely rather than attribute the photo to a guess.
 */
export function getImageCredit(url?: string | null): ImageCredit | null {
  if (!url) return null;
  const name = commonsFileName(url);
  if (!name) return null;

  const record = credits.files[name];
  if (!record) return null;

  const artist = typeof record[0] === "string" ? record[0] : "";
  if (!artist) return null;

  const licenseIndex = typeof record[1] === "number" ? record[1] : -1;
  const [licenseName = "", licenseUrl = ""] = credits.licenses[licenseIndex] ?? [];

  return {
    artist,
    licenseName,
    licenseUrl,
    filePage: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(name)}`,
    creditText: licenseName
      ? `${artist} via Wikimedia Commons (${licenseName})`
      : `${artist} via Wikimedia Commons`,
  };
}