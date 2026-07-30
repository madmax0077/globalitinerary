"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightLeft, ArrowUpRight } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { currencySymbol } from "@/lib/currency";

export type CompareCountry = {
  slug: string;
  name: string;
  flag: string;
  capital: string;
  region: string;
  continent: string;
  currency: string;
  currencyCode: string;
  languages: string[];
  bestTime: string;
  weather: string;
  budgetPerDay: string;
  visa: string;
  safety: string;
  timezone: string;
  callingCode: string;
  drivingSide?: string;
  population: number;
  thumbnail: string;
  tagline: string;
};

const ROWS: { label: string; get: (c: CompareCountry) => string }[] = [
  { label: "Capital", get: (c) => c.capital },
  { label: "Region", get: (c) => c.region || c.continent },
  { label: "Best time to visit", get: (c) => c.bestTime },
  { label: "Budget / day", get: (c) => c.budgetPerDay },
  {
    label: "Currency",
    get: (c) =>
      c.currencyCode
        ? `${currencySymbol(c.currencyCode)} · ${c.currency} (${c.currencyCode})`
        : c.currency,
  },
  { label: "Languages", get: (c) => c.languages.join(", ") },
  { label: "Visa", get: (c) => c.visa },
  { label: "Safety", get: (c) => c.safety },
  { label: "Weather", get: (c) => c.weather },
  { label: "Time zone", get: (c) => c.timezone },
  { label: "Dialing code", get: (c) => c.callingCode },
  { label: "Driving side", get: (c) => (c.drivingSide ? `${c.drivingSide}-hand` : "—") },
  { label: "Population", get: (c) => formatNumber(c.population) },
];

function Picker({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: CompareCountry[];
  label: string;
}) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-semibold outline-none focus:border-primary"
    >
      {options.map((c) => (
        <option key={c.slug} value={c.slug}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

function CountryHead({ c }: { c: CompareCountry }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <div className="relative aspect-[16/9]">
        <Image src={c.thumbnail} alt={c.name} fill sizes="(max-width:640px) 50vw, 400px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{c.flag}</span>
            <h3 className="font-display text-xl font-bold">{c.name}</h3>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 p-4">
        <p className="line-clamp-1 text-xs text-muted-foreground">{c.tagline}</p>
        <Link
          href={`/countries/${c.slug}`}
          className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          Guide <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}

export function CompareTool({ countries }: { countries: CompareCountry[] }) {
  const bySlug = React.useMemo(
    () => new Map(countries.map((c) => [c.slug, c])),
    [countries]
  );
  const defaults = React.useMemo(() => {
    const has = (s: string) => bySlug.has(s);
    const a = has("japan") ? "japan" : countries[0]?.slug;
    const b = has("thailand") ? "thailand" : countries[1]?.slug ?? countries[0]?.slug;
    return { a, b };
  }, [bySlug, countries]);

  const [a, setA] = React.useState(defaults.a);
  const [b, setB] = React.useState(defaults.b);

  // Optional prefill from ?a=slug&b=slug (read once, no Suspense needed).
  React.useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const qa = p.get("a");
    const qb = p.get("b");
    if (qa && bySlug.has(qa)) setA(qa);
    if (qb && bySlug.has(qb)) setB(qb);
  }, [bySlug]);

  const ca = bySlug.get(a) ?? countries[0];
  const cb = bySlug.get(b) ?? countries[1] ?? countries[0];
  if (!ca || !cb) return null;

  const swap = () => {
    setA(b);
    setB(a);
  };

  return (
    <div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2 sm:gap-4">
        <Picker value={a} onChange={setA} options={countries} label="First country" />
        <button
          type="button"
          onClick={swap}
          aria-label="Swap countries"
          className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-card text-muted-foreground shadow-soft transition hover:text-primary"
        >
          <ArrowRightLeft className="size-4" />
        </button>
        <Picker value={b} onChange={setB} options={countries} label="Second country" />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2 sm:gap-4">
        <CountryHead c={ca} />
        <CountryHead c={cb} />
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
        {ROWS.map((row, i) => (
          <div
            key={row.label}
            className={i % 2 === 0 ? "bg-background-subtle/50" : ""}
          >
            <p className="px-4 pt-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {row.label}
            </p>
            <div className="grid grid-cols-2 gap-2 px-4 pb-3 pt-1 sm:gap-4">
              <p className="text-sm">{row.get(ca) || "—"}</p>
              <p className="text-sm">{row.get(cb) || "—"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
