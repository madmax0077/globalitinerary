"use client";

import * as React from "react";
import { CloudSun } from "lucide-react";

/**
 * Current conditions from the free, no-key Open-Meteo API, by coordinates.
 */
const WEATHER_CODES: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Dense drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Rain showers",
  82: "Violent showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with hail",
};

export function WeatherNow({ lat, lng, label }: { lat: number; lng: number; label?: string }) {
  const [data, setData] = React.useState<{ temp: number; code: number; wind: number } | null>(null);
  const [status, setStatus] = React.useState<"loading" | "ok" | "error">("loading");

  React.useEffect(() => {
    let active = true;
    setStatus("loading");
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code,wind_speed_10m`
    )
      .then((r) => r.json())
      .then((d) => {
        if (!active) return;
        const c = d?.current;
        if (c && typeof c.temperature_2m === "number") {
          setData({ temp: c.temperature_2m, code: c.weather_code, wind: c.wind_speed_10m });
          setStatus("ok");
        } else setStatus("error");
      })
      .catch(() => active && setStatus("error"));
    return () => {
      active = false;
    };
  }, [lat, lng]);

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-xl bg-sunset/10 text-sunset">
          <CloudSun className="size-4" />
        </span>
        <h3 className="font-display text-lg font-bold">Weather now{label ? ` in ${label}` : ""}</h3>
      </div>
      {status === "loading" && <p className="mt-4 text-sm text-muted-foreground">Loading…</p>}
      {status === "error" && (
        <p className="mt-4 text-sm text-muted-foreground">Live weather unavailable right now.</p>
      )}
      {status === "ok" && data && (
        <>
          <p className="mt-4 font-display text-3xl font-extrabold">
            {Math.round(data.temp)}°C
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {WEATHER_CODES[data.code] ?? "—"} · wind {Math.round(data.wind)} km/h
          </p>
        </>
      )}
    </div>
  );
}
