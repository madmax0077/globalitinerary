"use client";

import * as React from "react";
import { DestinationCard, type DestinationCardProps } from "@/components/shared/destination-card";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export type ExplorerItem = DestinationCardProps & {
  id: string;
  filters: string[];
};

const PAGE_SIZE = 24;

export function Explorer({
  items,
  filters,
  aspect = "portrait",
  filterHint,
}: {
  items: ExplorerItem[];
  filters: string[];
  aspect?: "portrait" | "landscape" | "square";
  filterHint?: string;
}) {
  const [active, setActive] = React.useState("All");
  const [query, setQuery] = React.useState("");
  const [visible, setVisible] = React.useState(PAGE_SIZE);

  const q = query.trim().toLowerCase();
  const filtered = items.filter((i) => {
    const matchesFilter = active === "All" || i.filters.includes(active);
    const matchesQuery =
      !q ||
      i.title.toLowerCase().includes(q) ||
      (i.location ?? "").toLowerCase().includes(q) ||
      (i.badge ?? "").toLowerCase().includes(q) ||
      i.filters.some((f) => f.toLowerCase().includes(q));
    return matchesFilter && matchesQuery;
  });

  // Reset the visible window whenever the filter or query changes.
  React.useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [active, q]);

  const shown = filtered.slice(0, visible);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, country or category…"
          className="w-full rounded-full border border-border bg-card px-5 py-3 text-sm outline-none transition-colors focus:border-primary sm:max-w-sm"
        />
        {filterHint ? (
          <p className="text-xs text-muted-foreground">{filterHint}</p>
        ) : null}
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
          {["All", ...filters].map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                active === f
                  ? "border-primary bg-primary text-primary-foreground shadow-soft"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {filtered.length.toLocaleString()}{" "}
        {filtered.length === 1 ? "result" : "results"}
      </p>

      <Stagger
        key={`${active}-${q}`}
        className="mt-4 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
      >
        {shown.map((item) => (
          <StaggerItem key={item.id}>
            <DestinationCard {...item} aspect={aspect} />
          </StaggerItem>
        ))}
      </Stagger>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-muted-foreground">
          No destinations found for “{q || active}”.
        </p>
      )}

      {visible < filtered.length && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold shadow-soft transition-all hover:border-primary/50 hover:shadow-lift"
          >
            Load more ({(filtered.length - visible).toLocaleString()} left)
          </button>
        </div>
      )}
    </div>
  );
}
