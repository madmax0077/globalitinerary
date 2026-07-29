"use client";

import * as React from "react";
import type { ItineraryDay } from "@/lib/types";
import { Timeline } from "@/components/shared/timeline";
import { cn } from "@/lib/utils";

/** Lets visitors pick how long their trip is; slices the real itinerary to fit. */
export function ItineraryPlanner({ days }: { days: ItineraryDay[] }) {
  const max = days.length;
  const options = [3, 5, 7].filter((n) => n <= max);
  if (!options.includes(max)) options.push(max);
  const sorted = Array.from(new Set(options)).sort((a, b) => a - b);

  const [len, setLen] = React.useState(sorted.includes(3) ? 3 : max);

  return (
    <div>
      {sorted.length > 1 && (
        <div className="mb-6 inline-flex flex-wrap gap-2 rounded-full border border-border bg-card p-1 shadow-soft">
          {sorted.map((n) => (
            <button
              key={n}
              onClick={() => setLen(n)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                len === n
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {n} {n === 1 ? "day" : "days"}
            </button>
          ))}
        </div>
      )}
      <Timeline days={days.slice(0, len)} />
    </div>
  );
}
