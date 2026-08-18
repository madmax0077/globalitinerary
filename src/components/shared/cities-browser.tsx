"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DestinationCard, type DestinationCardProps } from "@/components/shared/destination-card";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export type CityCardItem = DestinationCardProps & {
  id: string;
  filters: string[];
};

const PAGE_SIZE = 48;

/**
 * Cities browser with URL-driven filters so the server only serializes
 * one page of cards (~48) instead of every city in the catalog.
 */
export function CitiesBrowser({
  items,
  total,
  filters,
  activeFilter,
  query,
  page,
  filterHint,
}: {
  items: CityCardItem[];
  total: number;
  filters: string[];
  activeFilter: string;
  query: string;
  page: number;
  filterHint?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [draft, setDraft] = React.useState(query);

  React.useEffect(() => {
    setDraft(query);
  }, [query]);

  const pushParams = React.useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(patch)) {
        if (!value) next.delete(key);
        else next.set(key, value);
      }
      const qs = next.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname);
    },
    [pathname, router, searchParams],
  );

  const setFilter = (f: string) => {
    pushParams({
      filter: f === "All" ? null : f,
      page: null,
    });
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = draft.trim();
    pushParams({ q: q || null, page: null });
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div>
      <div className="flex flex-col gap-4">
        <form onSubmit={submitSearch} className="flex flex-wrap gap-2 sm:max-w-md">
          <input
            type="search"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Search by name, country or category…"
            className="min-w-0 flex-1 rounded-full border border-border bg-card px-5 py-3 text-sm outline-none transition-colors focus:border-primary"
          />
          <button
            type="submit"
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-primary/50"
          >
            Search
          </button>
        </form>
        {filterHint ? <p className="text-xs text-muted-foreground">{filterHint}</p> : null}
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
          {["All", ...filters].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                activeFilter === f
                  ? "border-primary bg-primary text-primary-foreground shadow-soft"
                  : "border-border bg-card hover:border-primary/50",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {total.toLocaleString()} {total === 1 ? "result" : "results"}
        {totalPages > 1 ? ` · page ${page} of ${totalPages}` : ""}
      </p>

      <Stagger
        key={`${activeFilter}-${query}-${page}`}
        className="mt-4 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
      >
        {items.map((item, i) => (
          <StaggerItem key={item.id}>
            <DestinationCard {...item} aspect="landscape" priority={page === 1 && i < 4} />
          </StaggerItem>
        ))}
      </Stagger>

      {items.length === 0 && (
        <p className="py-16 text-center text-muted-foreground">
          No destinations found for “{query || activeFilter}”.
        </p>
      )}

      {totalPages > 1 && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => pushParams({ page: page <= 2 ? null : String(page - 1) })}
            className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold disabled:opacity-40"
          >
            Previous
          </button>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => pushParams({ page: String(page + 1) })}
            className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export { PAGE_SIZE as CITIES_PAGE_SIZE };
