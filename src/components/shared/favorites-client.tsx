"use client";

import * as React from "react";
import Link from "next/link";
import { Heart, Compass } from "lucide-react";
import { DestinationCard } from "@/components/shared/destination-card";
import { Button } from "@/components/ui/button";

export type FavoriteItem = {
  bookmarkId: string;
  href: string;
  image: string;
  title: string;
  subtitle?: string;
  badge?: string;
  location?: string;
};

const STORAGE_KEY = "voyara:bookmarks";

export function FavoritesClient({ lookup }: { lookup: Record<string, FavoriteItem> }) {
  const [ids, setIds] = React.useState<string[] | null>(null);

  const read = React.useCallback(() => {
    try {
      const store = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      setIds(Array.isArray(store) ? store : []);
    } catch {
      setIds([]);
    }
  }, []);

  React.useEffect(() => {
    read();
    // Keep in sync if bookmarks change in another tab or elsewhere.
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) read();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [read]);

  const items = React.useMemo(
    () => (ids ?? []).map((id) => lookup[id]).filter(Boolean) as FavoriteItem[],
    [ids, lookup]
  );

  const clearAll = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "[]");
    } catch {
      /* ignore */
    }
    setIds([]);
  };

  // Initial (pre-hydration) render: nothing to avoid flicker.
  if (ids === null) {
    return <div className="min-h-[40vh]" aria-hidden />;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center py-16 text-center">
        <span className="grid size-16 place-items-center rounded-3xl bg-primary/10 text-primary">
          <Heart className="size-7" />
        </span>
        <h2 className="mt-6 font-display text-2xl font-bold">No saved places yet</h2>
        <p className="mt-2 text-muted-foreground">
          Tap the bookmark icon on any country, city or attraction to save it here for
          your next trip. Your list stays on this device — no account needed.
        </p>
        <Button asChild variant="gradient" className="mt-6">
          <Link href="/countries">
            <Compass className="size-4" /> Explore destinations
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {items.length} saved {items.length === 1 ? "place" : "places"}
        </p>
        <button
          type="button"
          onClick={clearAll}
          className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          Clear all
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {items.map((item) => (
          <DestinationCard
            key={item.bookmarkId}
            href={item.href}
            image={item.image}
            title={item.title}
            subtitle={item.subtitle}
            badge={item.badge}
            location={item.location}
            bookmarkId={item.bookmarkId}
            aspect="portrait"
          />
        ))}
      </div>
    </div>
  );
}
