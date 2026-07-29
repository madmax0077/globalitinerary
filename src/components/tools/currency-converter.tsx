"use client";

import * as React from "react";
import { ArrowRightLeft } from "lucide-react";

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
            className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            aria-label="From currency"
          >
            {["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR"].map((c) => (
              <option key={c} value={c}>
                {c}
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
