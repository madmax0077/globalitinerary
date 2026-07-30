// ETIAS / EES logic for the Schengen area.
// EES (Entry/Exit System) and ETIAS (European Travel Information and
// Authorisation System) are the EU's new border schemes rolling out in 2025–2026.
// ETIAS is a pre-travel authorisation required of visa-EXEMPT non-EU nationals.

// Schengen area member states (ISO 3166-1 alpha-2), including the 2023–2024
// additions of Croatia, Bulgaria and Romania.
export const SCHENGEN_ISO2 = new Set([
  "AT", "BE", "BG", "HR", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IS",
  "IT", "LV", "LI", "LT", "LU", "MT", "NL", "NO", "PL", "PT", "RO", "SK", "SI",
  "ES", "SE", "CH",
]);

// Nationalities with EU/EEA/Swiss free movement — they do NOT need ETIAS.
// (ISO 3166-1 alpha-3, matching the passport-index dataset. Ireland is EU but
// not Schengen; Irish citizens are still ETIAS-exempt.)
export const ETIAS_EXEMPT_ISO3 = new Set([
  "AUT", "BEL", "BGR", "HRV", "CYP", "CZE", "DNK", "EST", "FIN", "FRA", "DEU",
  "GRC", "HUN", "IRL", "ITA", "LVA", "LTU", "LUX", "MLT", "NLD", "POL", "PRT",
  "ROU", "SVK", "SVN", "ESP", "SWE", "ISL", "LIE", "NOR", "CHE",
]);

export type EtiasStatus = "etias" | "free-movement" | "schengen-visa" | null;

/**
 * Given a Schengen destination, the traveller's passport (ISO3) and their
 * visa requirement code (from the visa matrix), returns the ETIAS situation.
 */
export function etiasStatus(
  destIso2: string,
  passportIso3: string,
  visaCode: string
): EtiasStatus {
  if (!SCHENGEN_ISO2.has(destIso2.toUpperCase())) return null;
  if (ETIAS_EXEMPT_ISO3.has(passportIso3.toUpperCase())) return "free-movement";
  // Visa-free / visa-exempt third-country nationals will need ETIAS.
  if (visaCode === "F" || visaCode.startsWith("F:") || visaCode === "ETA")
    return "etias";
  // Everyone else needs a full Schengen visa (ETIAS not applicable).
  return "schengen-visa";
}
