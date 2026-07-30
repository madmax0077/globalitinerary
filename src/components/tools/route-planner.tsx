"use client";

import * as React from "react";
import { MapPin, Plane, Plus, X, Route as RouteIcon } from "lucide-react";

export type RouteCity = {
  slug: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
};

function haversineKm(a: RouteCity, b: RouteCity) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function flightTime(km: number) {
  const hrs = km / 800 + 0.75; // cruise + taxi/climb
  const h = Math.floor(hrs);
  const m = Math.round((hrs - h) * 60);
  return `${h}h ${m.toString().padStart(2, "0")}m`;
}

/** Greedy nearest-neighbour ordering starting from the first selected city. */
function orderRoute(cities: RouteCity[]): RouteCity[] {
  if (cities.length < 2) return cities;
  const remaining = [...cities];
  const route = [remaining.shift()!];
  while (remaining.length) {
    const last = route[route.length - 1];
    let best = 0;
    let bestD = Infinity;
    for (let i = 0; i < remaining.length; i++) {
      const d = haversineKm(last, remaining[i]);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    route.push(remaining.splice(best, 1)[0]);
  }
  return route;
}

export function RoutePlanner({ cities }: { cities: RouteCity[] }) {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [query, setQuery] = React.useState("");

  const bySlug = React.useMemo(() => {
    const m: Record<string, RouteCity> = {};
    for (const c of cities) m[c.slug] = c;
    return m;
  }, [cities]);

  const matches = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return cities
      .filter(
        (c) =>
          !selected.includes(c.slug) &&
          (c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q))
      )
      .slice(0, 8);
  }, [query, cities, selected]);

  const add = (slug: string) => {
    setSelected((s) => (s.includes(slug) ? s : [...s, slug]));
    setQuery("");
  };
  const remove = (slug: string) => setSelected((s) => s.filter((x) => x !== slug));

  const route = React.useMemo(
    () => orderRoute(selected.map((s) => bySlug[s]).filter(Boolean)),
    [selected, bySlug]
  );

  const legs = route.slice(1).map((c, i) => {
    const km = haversineKm(route[i], c);
    return { from: route[i], to: c, km };
  });
  const totalKm = legs.reduce((s, l) => s + l.km, 0);

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
      {/* Add cities */}
      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        <span className="text-muted-foreground">Add the cities you want to visit</span>
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a city — e.g. Tokyo, Rome, Bangkok…"
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-medium outline-none focus:border-primary"
          />
          {matches.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-border bg-card shadow-lift">
              {matches.map((c) => (
                <li key={c.slug}>
                  <button
                    type="button"
                    onClick={() => add(c.slug)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted"
                  >
                    <Plus className="size-3.5 text-primary" />
                    <span className="font-medium">{c.name}</span>
                    <span className="text-muted-foreground">· {c.country}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </label>

      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selected.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary"
            >
              {bySlug[s]?.name}
              <button type="button" onClick={() => remove(s)} aria-label={`Remove ${bySlug[s]?.name}`}>
                <X className="size-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Route */}
      {route.length >= 2 ? (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-display text-base font-bold">
              <RouteIcon className="size-4 text-primary" /> Suggested order
            </h3>
            <span className="text-sm text-muted-foreground">
              {Math.round(totalKm).toLocaleString()} km total
            </span>
          </div>
          <ol className="mt-4 flex flex-col">
            {route.map((c, i) => (
              <li key={c.slug}>
                <div className="flex items-center gap-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="font-semibold">{c.name}</span>
                  <span className="text-sm text-muted-foreground">· {c.country}</span>
                </div>
                {i < legs.length && (
                  <div className="ml-3.5 flex items-center gap-2 border-l border-dashed border-border py-2 pl-5 text-xs text-muted-foreground">
                    <Plane className="size-3.5" />
                    {Math.round(legs[i].km).toLocaleString()} km · ~{flightTime(legs[i].km)} flight
                  </div>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-muted-foreground">
            Cities are ordered to minimise back-tracking (nearest-next). Distances are
            straight-line; flight times are rough non-stop estimates.
          </p>
        </div>
      ) : (
        <p className="mt-6 flex items-center gap-2 rounded-2xl bg-muted/50 p-6 text-sm text-muted-foreground">
          <MapPin className="size-4" /> Add two or more cities to see the best order and
          distances between them.
        </p>
      )}
    </div>
  );
}
