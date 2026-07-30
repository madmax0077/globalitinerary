"use client";

import * as React from "react";
import { Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatMoney } from "@/lib/currency";

export type CostCountry = {
  slug: string;
  name: string;
  currencyCode: string;
  cost?: "budget" | "mid" | "high";
};

type Style = "budget" | "mid" | "luxury";

const STYLES: { id: Style; label: string }[] = [
  { id: "budget", label: "Budget" },
  { id: "mid", label: "Mid-range" },
  { id: "luxury", label: "Luxury" },
];

// Transparent per-person USD/day baselines by destination price tier × style.
// These are general estimates (accommodation + food + local transport + activities),
// not live prices — the UI says so.
const DAILY_USD: Record<"budget" | "mid" | "high", Record<Style, number>> = {
  budget: { budget: 25, mid: 60, luxury: 150 },
  mid: { budget: 40, mid: 95, luxury: 230 },
  high: { budget: 70, mid: 150, luxury: 360 },
};

const TIER_VERDICT: Record<"budget" | "mid" | "high", string> = {
  budget: "generally budget-friendly — your money goes a long way here.",
  mid: "moderately priced for most travellers.",
  high: "one of the pricier destinations — budget a little extra.",
};

const BREAKDOWN: { label: string; pct: number }[] = [
  { label: "Accommodation", pct: 0.45 },
  { label: "Food & drink", pct: 0.25 },
  { label: "Local transport", pct: 0.12 },
  { label: "Activities", pct: 0.18 },
];

const selectCls =
  "rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-semibold outline-none focus:border-primary";

export function TripCostEstimator({ countries }: { countries: CostCountry[] }) {
  const [slug, setSlug] = React.useState(countries[0]?.slug ?? "");
  const [style, setStyle] = React.useState<Style>("mid");
  const [nights, setNights] = React.useState(7);
  const [people, setPeople] = React.useState(2);
  const [rate, setRate] = React.useState<number | null>(null);

  const country = countries.find((c) => c.slug === slug);
  const tier = country?.cost ?? "mid";
  const daily = DAILY_USD[tier][style];
  const totalUsd = daily * Math.max(1, nights) * Math.max(1, people);

  React.useEffect(() => {
    if (!country?.currencyCode || country.currencyCode === "USD") {
      setRate(country?.currencyCode === "USD" ? 1 : null);
      return;
    }
    let active = true;
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((r) => r.json())
      .then((j) => {
        if (active) setRate(j?.rates?.[country.currencyCode] ?? null);
      })
      .catch(() => active && setRate(null));
    return () => {
      active = false;
    };
  }, [country?.currencyCode]);

  const fmtUsd = (n: number) => formatMoney(n, "USD");
  const local =
    rate && country && country.currencyCode !== "USD"
      ? formatMoney(totalUsd * rate, country.currencyCode)
      : null;

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          <span className="text-muted-foreground">Destination</span>
          <select value={slug} onChange={(e) => setSlug(e.target.value)} className={selectCls}>
            {countries.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          <span className="text-muted-foreground">Travel style</span>
          <select value={style} onChange={(e) => setStyle(e.target.value as Style)} className={selectCls}>
            {STYLES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          <span className="text-muted-foreground">Nights</span>
          <input
            type="number"
            min={1}
            max={90}
            value={nights}
            onChange={(e) => setNights(Math.max(1, Math.min(90, Number(e.target.value) || 1)))}
            className={selectCls}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          <span className="text-muted-foreground">Travellers</span>
          <input
            type="number"
            min={1}
            max={20}
            value={people}
            onChange={(e) => setPeople(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
            className={selectCls}
          />
        </label>
      </div>

      <div className="mt-6 rounded-2xl bg-gradient-to-br from-primary/10 to-sky/10 p-6 text-center">
        <p className="text-sm font-medium text-muted-foreground">Estimated trip cost</p>
        <p className="mt-1 font-display text-4xl font-extrabold">{fmtUsd(totalUsd)}</p>
        {local && (
          <p className="mt-1 text-sm text-muted-foreground">
            ≈ {local} {country!.currencyCode}
          </p>
        )}
        <p className="mt-2 text-sm text-muted-foreground">
          {fmtUsd(daily)} / person / day · {nights} nights · {people}{" "}
          {people > 1 ? "travellers" : "traveller"}
        </p>
      </div>

      {country && (
        <p className="mt-4 text-sm">
          <strong>{country.name}</strong> is {TIER_VERDICT[tier]}
        </p>
      )}

      <div className="mt-5 space-y-2.5">
        {BREAKDOWN.map((b) => {
          const amt = totalUsd * b.pct;
          return (
            <div key={b.label}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{b.label}</span>
                <span className="tabular-nums text-muted-foreground">{fmtUsd(amt)}</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn("h-full rounded-full bg-gradient-to-r from-primary to-sky")}
                  style={{ width: `${b.pct * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
        <Wallet className="mt-0.5 size-3.5 shrink-0" />
        General estimate based on destination price level (World Bank income tiers) and
        typical daily spend. Excludes international flights. Real costs vary by season,
        city and personal style.
      </p>
    </div>
  );
}
