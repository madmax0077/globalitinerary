"use client";

import * as React from "react";
import { Clock } from "lucide-react";

/**
 * Approximate local time for a destination, derived from its GMT offset
 * (e.g. "GMT+9"). Not DST-aware, so it is clearly labelled as approximate.
 */
function parseOffset(tz: string): number | null {
  const m = /GMT\s*([+-]?\d+(?:\.\d+)?)/i.exec(tz || "");
  if (!m) return null;
  return parseFloat(m[1]);
}

export function LocalTime({ timezone, label }: { timezone: string; label?: string }) {
  const offset = parseOffset(timezone);
  const [now, setNow] = React.useState<Date>(() => new Date());

  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (offset === null) return null;

  const localMs = now.getTime() + now.getTimezoneOffset() * 60000 + offset * 3600000;
  const local = new Date(localMs);
  const time = local.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  const date = local.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-xl bg-sky/10 text-sky">
          <Clock className="size-4" />
        </span>
        <h3 className="font-display text-lg font-bold">Local time{label ? ` in ${label}` : ""}</h3>
      </div>
      <p className="mt-4 font-display text-3xl font-extrabold tabular-nums">{time}</p>
      <p className="mt-1 text-sm text-muted-foreground">
        {date} · approx {timezone}
      </p>
    </div>
  );
}
