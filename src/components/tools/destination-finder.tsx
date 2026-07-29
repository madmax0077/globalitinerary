"use client";

import * as React from "react";
import { SlidersHorizontal } from "lucide-react";
import { DestinationCard } from "@/components/shared/destination-card";

export type FinderCountry = {
  slug: string;
  name: string;
  flag: string;
  thumbnail: string;
  continent: string;
  region: string;
  budgetPerDay: string;
  bestTime: string;
  tags: string[];
  tagline: string;
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Returns the set of month indices a free-text "best time" string covers. */
function bestMonths(text: string): Set<number> {
  const set = new Set<number>();
  if (!text) return set;
  const rangeRe = new RegExp(
    `(${MONTHS.join("|")})\\s*(?:[–—-]|to)\\s*(${MONTHS.join("|")})`,
    "gi"
  );
  let m: RegExpExecArray | null;
  while ((m = rangeRe.exec(text))) {
    const a = MONTHS.findIndex((x) => x.toLowerCase() === m![1].toLowerCase());
    const b = MONTHS.findIndex((x) => x.toLowerCase() === m![2].toLowerCase());
    if (a === -1 || b === -1) continue;
    if (a <= b) for (let i = a; i <= b; i++) set.add(i);
    else {
      for (let i = a; i < 12; i++) set.add(i);
      for (let i = 0; i <= b; i++) set.add(i);
    }
  }
  MONTHS.forEach((mm, i) => {
    if (new RegExp(`\\b${mm}\\b`, "i").test(text)) set.add(i);
  });
  return set;
}

/** Lower bound of a "$40–130" style budget string, in USD. */
function budgetLow(s: string): number {
  const m = s.match(/\d+/);
  return m ? parseInt(m[0], 10) : 0;
}

export function DestinationFinder({ countries }: { countries: FinderCountry[] }) {
  const [continent, setContinent] = React.useState("Any");
  const [budget, setBudget] = React.useState("Any");
  const [month, setMonth] = React.useState("Any");
  const [interest, setInterest] = React.useState("Any");
  const [limit, setLimit] = React.useState(12);

  const continents = React.useMemo(
    () => Array.from(new Set(countries.map((c) => c.continent).filter(Boolean))).sort(),
    [countries]
  );
  const interests = React.useMemo(() => {
    const counts = new Map<string, number>();
    for (const c of countries) for (const t of c.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    return Array.from(counts.entries())
      .filter(([, n]) => n >= 3)
      .sort((a, b) => b[1] - a[1])
      .map(([t]) => t)
      .slice(0, 24);
  }, [countries]);

  const results = React.useMemo(() => {
    const mi = MONTHS.indexOf(month);
    return countries.filter((c) => {
      if (continent !== "Any" && c.continent !== continent) return false;
      if (interest !== "Any" && !c.tags.includes(interest)) return false;
      if (budget !== "Any") {
        const low = budgetLow(c.budgetPerDay);
        if (budget === "Budget" && !(low > 0 && low < 75)) return false;
        if (budget === "Mid-range" && !(low >= 75 && low <= 150)) return false;
        if (budget === "Luxury" && !(low > 150)) return false;
      }
      if (mi >= 0) {
        const months = bestMonths(c.bestTime);
        if (months.size > 0 && !months.has(mi)) return false;
      }
      return true;
    });
  }, [countries, continent, budget, month, interest]);

  React.useEffect(() => setLimit(12), [continent, budget, month, interest]);

  const selectCls =
    "rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary";

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
          <SlidersHorizontal className="size-4" />
        </span>
        <h3 className="font-display text-lg font-bold">Find your destination</h3>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground">
          Region
          <select value={continent} onChange={(e) => setContinent(e.target.value)} className={selectCls}>
            <option>Any</option>
            {continents.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground">
          Budget / day
          <select value={budget} onChange={(e) => setBudget(e.target.value)} className={selectCls}>
            <option>Any</option>
            <option value="Budget">Budget (under $75)</option>
            <option value="Mid-range">Mid-range ($75–150)</option>
            <option value="Luxury">Luxury ($150+)</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground">
          Travel month
          <select value={month} onChange={(e) => setMonth(e.target.value)} className={selectCls}>
            <option>Any</option>
            {MONTHS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground">
          Interest
          <select value={interest} onChange={(e) => setInterest(e.target.value)} className={selectCls}>
            <option>Any</option>
            {interests.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {results.length} {results.length === 1 ? "destination matches" : "destinations match"} your filters
      </p>

      {results.length > 0 ? (
        <>
          <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {results.slice(0, limit).map((c) => (
              <DestinationCard
                key={c.slug}
                href={`/countries/${c.slug}`}
                image={c.thumbnail}
                title={c.name}
                subtitle={c.tagline}
                badge={c.flag}
                location={c.continent}
                bookmarkId={`country:${c.slug}`}
                aspect="portrait"
              />
            ))}
          </div>
          {limit < results.length && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setLimit((l) => l + 12)}
                className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold shadow-soft transition hover:border-primary/50 hover:shadow-lift"
              >
                Show more
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="mt-5 rounded-2xl bg-muted/50 p-6 text-center text-sm text-muted-foreground">
          No destinations match all of those filters. Try loosening one — for example a
          different month or a wider budget.
        </p>
      )}
    </div>
  );
}
