// Cleans raw Wikivoyage/Wikipedia text: fixes mojibake (double-encoded UTF-8),
// strips wiki markup and splits into readable sub-sections.

const MOJIBAKE: [string, string][] = [
  // Order matters: multi-char sequences before the bare "â€".
  ["â€™", "\u2019"],
  ["â€˜", "\u2018"],
  ["â€œ", "\u201C"],
  ["â€\u009d", "\u201D"],
  ["â€”", "\u2014"],
  ["â€“", "\u2013"],
  ["â€¢", "\u2022"],
  ["â€¦", "\u2026"],
  ['â€"', "\u2014"],
  ["â€", "\u201D"],
  ["Â«", "\u00AB"],
  ["Â»", "\u00BB"],
  ["Â ", " "],
  ["Ã©", "é"],
  ["Ã¨", "è"],
  ["Ã¡", "á"],
  ["Ã ", "à"],
  ["Ã­", "í"],
  ["Ã³", "ó"],
  ["Ãº", "ú"],
  ["Ã±", "ñ"],
  ["Ã¼", "ü"],
  ["Ã¶", "ö"],
  ["Ã¤", "ä"],
  ["Ã§", "ç"],
  ["Ã¢", "â"],
  ["Ãª", "ê"],
  ["Ã®", "î"],
  ["Ã´", "ô"],
  ["Ã»", "û"],
  ["Ã‰", "É"],
  ["Ã¥", "å"],
  ["Ã¸", "ø"],
  ["Â", ""],
];

/** Cleans inline text: mojibake + leftover wiki markup. */
export function cleanWikiText(input: string): string {
  let s = input;
  for (const [bad, good] of MOJIBAKE) s = s.split(bad).join(good);
  s = s
    .replace(/\{\{[^}]*\}\}/g, "") // templates
    .replace(/\[\[(?:File|Image|Category):[^\]]*\]\]/gi, "") // media/category links
    .replace(/\[\[[^\]|]*\|([^\]]*)\]\]/g, "$1") // [[target|label]] -> label
    .replace(/\[\[([^\]]*)\]\]/g, "$1") // [[target]] -> target
    .replace(/'''''([^']+)'''''/g, "$1") // bold+italic
    .replace(/'''([^']+)'''/g, "$1") // bold
    .replace(/''([^']+)''/g, "$1") // italic
    .replace(/<\/?[^>]+>/g, "") // stray html
    .replace(/[ \t]{2,}/g, " ")
    .trim();
  return s;
}

export type WikiSection = { heading?: string; body: string };

/**
 * Splits text on wiki headings (==Heading==, ===Heading===) into readable
 * sections, cleaning each part. Text before the first heading has no heading.
 */
export function parseWikiSections(input: string): WikiSection[] {
  const cleanedForSplit = (() => {
    let s = input;
    for (const [bad, good] of MOJIBAKE) s = s.split(bad).join(good);
    return s;
  })();

  const parts = cleanedForSplit.split(/\s*={2,}\s*([^=]+?)\s*={2,}\s*/g);
  const sections: WikiSection[] = [];

  // parts = [leadBody, heading1, body1, heading2, body2, ...]
  const lead = cleanWikiText(parts[0] ?? "");
  if (lead) sections.push({ body: lead });

  for (let i = 1; i < parts.length; i += 2) {
    const heading = cleanWikiText(parts[i] ?? "");
    const body = cleanWikiText(parts[i + 1] ?? "");
    if (heading || body) sections.push({ heading: heading || undefined, body });
  }

  return sections.filter((s) => s.body || s.heading);
}

export type PhoneEntry = { number: string; label: string };

/**
 * Detects a run-on list of emergency/phone numbers like
 *   "For emergencies, call 113 (State Police), 112 (Gendarmerie), 115 (Fire)…"
 * and returns the intro plus each number as its own entry, so it can be rendered
 * one-per-line. Returns null when the text isn't such a list (< 2 entries).
 */
export function extractPhoneList(
  text: string
): { intro: string; items: PhoneEntry[] } | null {
  const re = /(\d[\d\s]{1,7}\d|\d{2,4})\s*\(([^)]+)\)/g;
  const items: PhoneEntry[] = [];
  let firstIdx = -1;
  let lastIdx = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (firstIdx === -1) firstIdx = m.index;
    lastIdx = m.index + m[0].length;
    items.push({ number: m[1].trim(), label: m[2].trim() });
  }
  if (items.length < 2) return null;

  // Only treat as a phone list when the entries make up the bulk of the text,
  // otherwise we'd wrongly reformat a normal paragraph that happens to have
  // a couple of parenthetical numbers.
  const trailing = text.slice(lastIdx).replace(/[.\s]+$/, "").trim();
  if (trailing.length > 60) return null;

  const intro = text
    .slice(0, firstIdx)
    .replace(/[,:\-\s]+$/, "")
    .trim();
  return { intro, items };
}
