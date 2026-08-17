"use client";

import * as React from "react";
import { Wallet } from "lucide-react";

export type BudgetDefaults = {
  accommodation?: number;
  food?: number;
  transport?: number;
  activities?: number;
  flights?: number;
  days?: number;
  travelers?: number;
};

type Props = {
  /** Destination label shown above the estimate */
  destinationLabel?: string;
  /** Pre-fill from real place budgets (country/city mid-range split) */
  defaults?: BudgetDefaults;
  /** Optional note under the total (e.g. source of the defaults) */
  sourceNote?: string;
};

/**
 * Trip-cost estimator. When destination defaults are passed, inputs start from
 * that place's typical mid-range ground costs — users can still edit freely.
 */
export function BudgetCalculator({ destinationLabel, defaults, sourceNote }: Props = {}) {
  const [days, setDays] = React.useState(defaults?.days ?? 7);
  const [travelers, setTravelers] = React.useState(defaults?.travelers ?? 2);
  const [accommodation, setAccommodation] = React.useState(defaults?.accommodation ?? 120);
  const [food, setFood] = React.useState(defaults?.food ?? 40);
  const [transport, setTransport] = React.useState(defaults?.transport ?? 15);
  const [activities, setActivities] = React.useState(defaults?.activities ?? 25);
  const [flights, setFlights] = React.useState(defaults?.flights ?? 600);

  // When navigating between country/city pages, refresh defaults.
  React.useEffect(() => {
    if (!defaults) return;
    if (defaults.accommodation != null) setAccommodation(defaults.accommodation);
    if (defaults.food != null) setFood(defaults.food);
    if (defaults.transport != null) setTransport(defaults.transport);
    if (defaults.activities != null) setActivities(defaults.activities);
    if (defaults.flights != null) setFlights(defaults.flights);
    if (defaults.days != null) setDays(defaults.days);
    if (defaults.travelers != null) setTravelers(defaults.travelers);
  }, [
    defaults?.accommodation,
    defaults?.food,
    defaults?.transport,
    defaults?.activities,
    defaults?.flights,
    defaults?.days,
    defaults?.travelers,
  ]);

  const dailyPerPerson = food + transport + activities;
  const lodgingTotal = accommodation * days;
  const perPersonOnGround = dailyPerPerson * days;
  const flightsTotal = flights * travelers;
  const total = flightsTotal + lodgingTotal + perPersonOnGround * travelers;
  const groundDaily = accommodation + dailyPerPerson;

  const rows: [string, string, (v: number) => void, number][] = [
    ["Flights (per person, round trip)", "flights", setFlights, flights],
    ["Accommodation (per night)", "acc", setAccommodation, accommodation],
    ["Food (per person / day)", "food", setFood, food],
    ["Local transport (per person / day)", "trans", setTransport, transport],
    ["Activities (per person / day)", "act", setActivities, activities],
  ];

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-xl bg-emerald/10 text-emerald">
          <Wallet className="size-4" />
        </span>
        <div>
          <h3 className="font-display text-lg font-bold">Trip budget estimator</h3>
          {destinationLabel && (
            <p className="text-xs text-muted-foreground">Typical mid-range for {destinationLabel}</p>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <label className="text-sm">
          <span className="text-muted-foreground">Days</span>
          <input
            type="number"
            min={1}
            value={days}
            onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-primary"
          />
        </label>
        <label className="text-sm">
          <span className="text-muted-foreground">Travelers</span>
          <input
            type="number"
            min={1}
            value={travelers}
            onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value) || 1))}
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-primary"
          />
        </label>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {rows.map(([label, key, setter, value]) => (
          <label key={key} className="flex items-center justify-between gap-3 text-sm">
            <span className="text-muted-foreground">{label}</span>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">$</span>
              <input
                type="number"
                min={0}
                value={value}
                onChange={(e) => setter(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-24 rounded-xl border border-border bg-background px-3 py-1.5 text-right outline-none focus:border-primary"
              />
            </div>
          </label>
        ))}
      </div>

      <div className="mt-4 rounded-2xl bg-muted/50 p-4">
        <p className="text-sm text-muted-foreground">Estimated total (USD)</p>
        <p className="font-display text-3xl font-extrabold">
          ${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          ≈ ${Math.round(total / travelers).toLocaleString()} per person · $
          {Math.round(total / days).toLocaleString()} per day group total
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Ground costs ≈ ${groundDaily}/person/day (lodging + food + transport + activities)
        </p>
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">
        {sourceNote ||
          "Defaults reflect typical mid-range ground costs for this destination. Edit any figure — flights are a separate estimate and vary by origin."}
      </p>
    </div>
  );
}
