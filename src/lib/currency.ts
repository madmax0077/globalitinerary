// Currency formatting helpers. We rely on the built-in Intl API, which knows
// the correct symbol (₹, ¥, €, £, kr, zł …) and decimal rules for every ISO 4217
// currency — no hand-maintained symbol table to drift out of date.

/** Returns the narrow symbol for a currency code (e.g. "USD" → "$", "JPY" → "¥"). */
export function currencySymbol(code: string): string {
  const c = (code || "").toUpperCase();
  if (!c) return "";
  try {
    const parts = new Intl.NumberFormat("en", {
      style: "currency",
      currency: c,
      currencyDisplay: "narrowSymbol",
    }).formatToParts(0);
    return parts.find((p) => p.type === "currency")?.value ?? c;
  } catch {
    return c;
  }
}

/** Formats an amount with its currency symbol, e.g. formatMoney(1234, "JPY") → "¥1,234". */
export function formatMoney(
  amount: number,
  code: string,
  opts: { maximumFractionDigits?: number } = {}
): string {
  const c = (code || "USD").toUpperCase();
  const maximumFractionDigits = opts.maximumFractionDigits ?? 0;
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: c,
      currencyDisplay: "narrowSymbol",
      maximumFractionDigits,
    }).format(amount);
  } catch {
    try {
      return new Intl.NumberFormat("en", {
        style: "currency",
        currency: c,
        maximumFractionDigits,
      }).format(amount);
    } catch {
      return `${amount.toLocaleString("en", { maximumFractionDigits })} ${c}`;
    }
  }
}
