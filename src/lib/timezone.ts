import { cityTimezones } from "@/data/city-timezones.generated";
import { countryTimezones } from "@/data/country-timezones.generated";

/** Resolve IANA timezone for a city (falls back to country primary zone). */
export function resolveCityTimezone(citySlug: string, countrySlug?: string): string | null {
  return cityTimezones[citySlug] || (countrySlug ? countryTimezones[countrySlug] : null) || null;
}

/** Resolve primary IANA timezone for a country. */
export function resolveCountryTimezone(countrySlug: string, fallback?: string): string {
  if (countryTimezones[countrySlug]) return countryTimezones[countrySlug];
  if (fallback && fallback.includes("/")) return fallback;
  return fallback || "UTC";
}

/** True if value looks like an IANA zone (Asia/Kolkata) rather than GMT+5. */
export function isIanaTimezone(tz: string): boolean {
  return typeof tz === "string" && tz.includes("/") && !/^GMT/i.test(tz);
}

/** Current UTC offset label for an IANA zone, e.g. "UTC+05:30". */
export function formatUtcOffset(timeZone: string, at: Date = new Date()): string {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      timeZoneName: "shortOffset",
    }).formatToParts(at);
    const raw = parts.find((p) => p.type === "timeZoneName")?.value || "UTC";
    // Normalize GMT+5:30 / GMT+5 → UTC+05:30 / UTC+05:00
    const m = /(?:GMT|UTC)\s*([+-])(\d{1,2})(?::?(\d{2}))?/i.exec(raw);
    if (!m) return raw.replace(/^GMT/i, "UTC");
    const sign = m[1];
    const hh = m[2].padStart(2, "0");
    const mm = (m[3] || "00").padStart(2, "0");
    return `UTC${sign}${hh}:${mm}`;
  } catch {
    return "UTC";
  }
}

/** Display label: "Asia/Kolkata · UTC+05:30" */
export function formatTimezoneLabel(timeZone: string, at: Date = new Date()): string {
  if (!timeZone) return "UTC";
  if (isIanaTimezone(timeZone)) {
    return `${timeZone.replace(/_/g, " ")} · ${formatUtcOffset(timeZone, at)}`;
  }
  // Legacy GMT strings — still show, but prefer parsing half-hours
  return timeZone.replace(/^GMT/i, "UTC");
}
