"use client";

import * as React from "react";
import { Plane, ArrowRightLeft } from "lucide-react";

export type DistanceCity = {
  slug: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
};

function haversineKm(a: DistanceCity, b: DistanceCity): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

function fmtFlight(km: number): string {
  // ~800 km/h cruising + ~45 min for taxi/climb/descent.
  const hours = km / 800 + 0.75;
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (km < 400) return "under 1h 30m";
  return `${h}h ${m.toString().padStart(2, "0")}m`;
}

function Picker({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: DistanceCity[];
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
          {c.name}, {c.country}
        </option>
      ))}
    </select>
  );
}

export function DistanceCalculator({ cities }: { cities: DistanceCity[] }) {
  const bySlug = React.useMemo(() => new Map(cities.map((c) => [c.slug, c])), [cities]);
  const [from, setFrom] = React.useState(cities[0]?.slug);
  const [to, setTo] = React.useState(cities[1]?.slug ?? cities[0]?.slug);

  const a = bySlug.get(from);
  const b = bySlug.get(to);
  if (!a || !b) return null;

  const km = haversineKm(a, b);
  const miles = km * 0.621371;
  const same = a.slug === b.slug;

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-xl bg-sky/10 text-sky">
          <Plane className="size-4" />
        </span>
        <h3 className="font-display text-lg font-bold">Distance & flight time</h3>
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <Picker value={from} onChange={setFrom} options={cities} label="From city" />
        <button
          type="button"
          onClick={() => {
            setFrom(to);
            setTo(from);
          }}
          aria-label="Swap cities"
          className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-card text-muted-foreground shadow-soft transition hover:text-primary"
        >
          <ArrowRightLeft className="size-4" />
        </button>
        <Picker value={to} onChange={setTo} options={cities} label="To city" />
      </div>

      <div className="mt-5 rounded-2xl bg-muted/50 p-5 text-center">
        {same ? (
          <p className="text-sm text-muted-foreground">Pick two different cities.</p>
        ) : (
          <>
            <p className="text-3xl font-bold">
              {Math.round(km).toLocaleString()}{" "}
              <span className="text-base font-semibold text-muted-foreground">km</span>
              <span className="mx-2 text-muted-foreground/40">·</span>
              {Math.round(miles).toLocaleString()}{" "}
              <span className="text-base font-semibold text-muted-foreground">mi</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Approx non-stop flight: <span className="font-semibold text-foreground">{fmtFlight(km)}</span>
            </p>
          </>
        )}
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">
        Straight-line (&ldquo;as the crow flies&rdquo;) distance. Actual flight routes and
        times vary with layovers and winds.
      </p>
    </div>
  );
}
