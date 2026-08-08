"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { formatTimezoneLabel, isIanaTimezone } from "@/lib/timezone";

/**
 * Local time for a destination using a real IANA timezone (e.g. Asia/Kolkata).
 * Falls back to GMT/UTC offset strings when needed (supports half-hours like +5.5).
 */
function parseGmtOffsetHours(tz: string): number | null {
  const m = /(?:GMT|UTC)\s*([+-])\s*(\d{1,2})(?:[:.](\d{1,2}))?/i.exec(tz || "");
  if (!m) return null;
  const sign = m[1] === "-" ? -1 : 1;
  const hours = parseInt(m[2], 10);
  const mins = m[3] ? parseInt(m[3], 10) : 0;
  // Support "GMT+5.5" / "GMT+5:30"
  if (m[3] && m[0].includes(".")) {
    return sign * (hours + mins / 10); // unlikely; prefer colon
  }
  if (tz.includes(".") && !tz.includes(":")) {
    const f = /([+-]?\d+(?:\.\d+)?)/.exec(tz);
    return f ? parseFloat(f[1]) : sign * (hours + (mins >= 10 ? mins / 60 : mins / 10));
  }
  return sign * (hours + mins / 60);
}

function formatLegacyGmt(tz: string): string {
  const hours = parseGmtOffsetHours(tz);
  if (hours === null) return tz;
  const sign = hours >= 0 ? "+" : "-";
  const abs = Math.abs(hours);
  const h = Math.floor(abs);
  const m = Math.round((abs - h) * 60);
  return `UTC${sign}${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function LocalTime({ timezone, label }: { timezone: string; label?: string }) {
  const [now, setNow] = React.useState<Date>(() => new Date());
  const iana = isIanaTimezone(timezone);

  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  let time = "";
  let date = "";
  let zoneLabel = "";

  if (iana) {
    try {
      time = now.toLocaleTimeString(undefined, {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
      });
      date = now.toLocaleDateString(undefined, {
        timeZone: timezone,
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      zoneLabel = formatTimezoneLabel(timezone, now);
    } catch {
      return null;
    }
  } else {
    const offset = parseGmtOffsetHours(timezone);
    if (offset === null) return null;
    const localMs = now.getTime() + now.getTimezoneOffset() * 60000 + offset * 3600000;
    const local = new Date(localMs);
    time = local.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
    date = local.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
    zoneLabel = formatLegacyGmt(timezone);
  }

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
        {date} · {zoneLabel}
      </p>
    </div>
  );
}
