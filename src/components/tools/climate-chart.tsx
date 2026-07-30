"use client";

import * as React from "react";
import { CloudRain, Sun, Thermometer } from "lucide-react";
import { cn } from "@/lib/utils";

const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

type Monthly = { temp: number; precip: number };

const YEARS = 3; // 2022–2024 window

export function ClimateChart({
  lat,
  lng,
  label,
}: {
  lat: number;
  lng: number;
  label: string;
}) {
  const [data, setData] = React.useState<Monthly[] | null>(null);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    let active = true;
    const url =
      `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lng}` +
      `&start_date=2022-01-01&end_date=2024-12-31` +
      `&daily=temperature_2m_mean,precipitation_sum&timezone=auto`;
    fetch(url)
      .then((r) => r.json())
      .then((j) => {
        if (!active) return;
        const time: string[] = j?.daily?.time ?? [];
        const temps: number[] = j?.daily?.temperature_2m_mean ?? [];
        const precs: number[] = j?.daily?.precipitation_sum ?? [];
        if (!time.length) {
          setError(true);
          return;
        }
        const tSum = Array(12).fill(0);
        const tCount = Array(12).fill(0);
        const pSum = Array(12).fill(0);
        for (let i = 0; i < time.length; i++) {
          const m = parseInt(time[i].slice(5, 7), 10) - 1;
          if (Number.isFinite(temps[i])) {
            tSum[m] += temps[i];
            tCount[m] += 1;
          }
          if (Number.isFinite(precs[i])) pSum[m] += precs[i];
        }
        const monthly: Monthly[] = MONTHS.map((_, m) => ({
          temp: tCount[m] ? tSum[m] / tCount[m] : NaN,
          precip: pSum[m] / YEARS, // avg monthly total (mm)
        }));
        setData(monthly);
      })
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, [lat, lng]);

  if (error) return null;

  if (!data) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <div className="h-40 animate-pulse rounded-2xl bg-muted" />
      </div>
    );
  }

  const maxP = Math.max(...data.map((d) => d.precip), 1);
  const meanP = data.reduce((s, d) => s + d.precip, 0) / 12;
  const wet = (p: number) => p >= meanP * 1.4 && p >= 60;

  const driest = data
    .map((d, i) => ({ i, p: d.precip }))
    .sort((a, b) => a.p - b.p)
    .slice(0, 3)
    .map((x) => MONTH_NAMES[x.i]);
  const wettestIdx = data
    .map((d, i) => ({ i, p: d.precip }))
    .sort((a, b) => b.p - a.p)
    .filter((x) => wet(x.p))
    .map((x) => MONTH_NAMES[x.i]);

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-display text-lg font-bold">Weather by month</h3>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-sky-500" /> Rainfall
          </span>
          <span className="flex items-center gap-1.5">
            <Thermometer className="size-3.5" /> Avg temp
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-1.5">
        {data.map((d, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <span className="text-[10px] font-semibold tabular-nums text-muted-foreground">
              {Number.isFinite(d.temp) ? `${Math.round(d.temp)}°` : "–"}
            </span>
            <div className="relative flex h-28 w-full items-end justify-center">
              <div
                className={cn(
                  "w-full max-w-[18px] rounded-t-md transition-all",
                  wet(d.precip)
                    ? "bg-gradient-to-b from-sky-400 to-sky-600"
                    : "bg-gradient-to-b from-sky-200 to-sky-400 dark:from-sky-900 dark:to-sky-700"
                )}
                style={{ height: `${Math.max(4, (d.precip / maxP) * 100)}%` }}
                title={`${MONTH_NAMES[i]}: ~${Math.round(d.precip)} mm`}
              />
            </div>
            <span className="text-[10px] font-medium text-muted-foreground">{MONTHS[i]}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-2 text-sm">
        <p className="flex items-start gap-2">
          <Sun className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <span>
            <strong>Driest months:</strong> {driest.join(", ")} — usually the most reliable
            time to visit {label}.
          </span>
        </p>
        {wettestIdx.length > 0 && (
          <p className="flex items-start gap-2">
            <CloudRain className="mt-0.5 size-4 shrink-0 text-sky-500" />
            <span>
              <strong>Wettest / likely rainy:</strong> {wettestIdx.join(", ")} — expect the
              heaviest rain, and possible monsoon conditions.
            </span>
          </p>
        )}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Based on 2022–2024 climate records (Open-Meteo). Averages, not a forecast.
      </p>
    </div>
  );
}
