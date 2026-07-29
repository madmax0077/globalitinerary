"use client";

import * as React from "react";
import { ArrowRightLeft } from "lucide-react";

// All world currency codes supported by open.er-api.com (ISO 4217).
const CURRENCY_CODES = [
  "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN",
  "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL",
  "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY",
  "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP",
  "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS",
  "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF",
  "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD",
  "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT",
  "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD",
  "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN",
  "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK",
  "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR",
  "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD",
  "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY",
  "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VES",
  "VND", "VUV", "WST", "XAF", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR",
  "ZMW", "ZWL",
];

/** Builds `[code, "CODE — Currency Name"]` pairs, sorted by code. */
function useCurrencyOptions(extra?: string) {
  return React.useMemo(() => {
    let names: Intl.DisplayNames | null = null;
    try {
      names = new Intl.DisplayNames(["en"], { type: "currency" });
    } catch {
      names = null;
    }
    const codes = new Set(CURRENCY_CODES);
    if (extra) codes.add(extra.toUpperCase());
    return Array.from(codes)
      .sort()
      .map((code) => {
        let label = code;
        try {
          const name = names?.of(code);
          if (name && name !== code) label = `${code} — ${name}`;
        } catch {
          /* keep code as label */
        }
        return { code, label };
      });
  }, [extra]);
}

/**
 * Live currency converter using the free, no-key Open Exchange Rates API
 * (open.er-api.com). Rates are real and fetched client-side at runtime.
 */
export function CurrencyConverter({
  countryCurrency,
  countryCurrencyName,
}: {
  countryCurrency: string;
  countryCurrencyName?: string;
}) {
  const target = (countryCurrency || "EUR").toUpperCase();
  const options = useCurrencyOptions(target);
  const [base, setBase] = React.useState("USD");
  const [amount, setAmount] = React.useState("100");
  const [rate, setRate] = React.useState<number | null>(null);
  const [status, setStatus] = React.useState<"loading" | "ok" | "error">("loading");
  const [updated, setUpdated] = React.useState<string | null>(null);

  React.useEffect(() => {
    let active = true;
    setStatus("loading");
    fetch(`https://open.er-api.com/v6/latest/${base}`)
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        const r = data?.rates?.[target];
        if (typeof r === "number") {
          setRate(r);
          setStatus("ok");
          setUpdated(data?.time_last_update_utc ?? null);
        } else {
          setStatus("error");
        }
      })
      .catch(() => active && setStatus("error"));
    return () => {
      active = false;
    };
  }, [base, target]);

  const amt = parseFloat(amount) || 0;
  const converted = rate !== null ? amt * rate : null;

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
          <ArrowRightLeft className="size-4" />
        </span>
        <h3 className="font-display text-lg font-bold">Currency converter</h3>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <div className="flex gap-2">
          <input
            type="number"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            aria-label="Amount"
          />
          <select
            value={base}
            onChange={(e) => setBase(e.target.value)}
            className="max-w-[9rem] rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            aria-label="From currency"
          >
            {options.map((o) => (
              <option key={o.code} value={o.code}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-2xl bg-muted/50 p-4">
          {status === "loading" && (
            <p className="text-sm text-muted-foreground">Fetching live rate…</p>
          )}
          {status === "error" && (
            <p className="text-sm text-muted-foreground">
              Live rate unavailable right now. Please try again later.
            </p>
          )}
          {status === "ok" && converted !== null && (
            <>
              <p className="text-2xl font-bold">
                {converted.toLocaleString(undefined, { maximumFractionDigits: 2 })}{" "}
                <span className="text-base font-semibold text-muted-foreground">{target}</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                1 {base} = {rate?.toLocaleString(undefined, { maximumFractionDigits: 4 })} {target}
                {countryCurrencyName ? ` · ${countryCurrencyName}` : ""}
              </p>
            </>
          )}
        </div>
        {updated && status === "ok" && (
          <p className="text-[11px] text-muted-foreground">Rates: {updated}</p>
        )}
      </div>
    </div>
  );
}
