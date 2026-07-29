"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  Search,
  Globe2,
  Building2,
  Landmark,
  Layers,
  Newspaper,
  ArrowRight,
  Loader2,
  CornerDownLeft,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { SearchItem, SearchKind } from "@/lib/types";

const kindIcon: Record<SearchKind, React.ElementType> = {
  country: Globe2,
  city: Building2,
  attraction: Landmark,
  collection: Layers,
  article: Newspaper,
};

const kindLabel: Record<SearchKind, string> = {
  country: "Countries",
  city: "Cities",
  attraction: "Attractions",
  collection: "Collections",
  article: "Articles",
};

const suggestions = ["Japan", "Rome", "Beaches", "Machu Picchu", "Dubai", "Food"];

export function SearchCommand({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchItem[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results ?? []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 160);
    return () => clearTimeout(t);
  }, [query]);

  const go = (href: string) => {
    onOpenChange(false);
    setQuery("");
    router.push(href);
  };

  const grouped = React.useMemo(() => {
    const map = new Map<SearchKind, SearchItem[]>();
    for (const item of results) {
      const arr = map.get(item.kind) ?? [];
      arr.push(item);
      map.set(item.kind, arr);
    }
    return map;
  }, [results]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent hideClose className="p-0">
        <DialogTitle className="sr-only">Search Global Itinerary</DialogTitle>
        <DialogDescription className="sr-only">
          Search countries, cities, attractions and articles
        </DialogDescription>
        <Command shouldFilter={false} className="w-full">
          <div className="flex items-center gap-3 border-b border-border/60 px-5">
            <Search className="size-5 shrink-0 text-muted-foreground" />
            <Command.Input
              autoFocus
              value={query}
              onValueChange={setQuery}
              placeholder="Search destinations, cities, landmarks…"
              className="h-16 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
            />
            {loading && <Loader2 className="size-4 animate-spin text-muted-foreground" />}
            <kbd className="hidden rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:block">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[60vh] overflow-y-auto p-3">
            {!query.trim() && (
              <div className="p-3">
                <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Popular searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-sm transition-colors hover:border-primary hover:text-primary"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {query.trim() && !loading && results.length === 0 && (
              <Command.Empty className="py-12 text-center text-sm text-muted-foreground">
                No results for “{query}”. Try another destination.
              </Command.Empty>
            )}

            {[...grouped.entries()].map(([kind, items]) => {
              const Icon = kindIcon[kind];
              return (
                <Command.Group
                  key={kind}
                  heading={kindLabel[kind]}
                  className="mb-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-muted-foreground"
                >
                  {items.map((item) => (
                    <Command.Item
                      key={`${item.kind}-${item.slug}`}
                      value={`${item.kind}-${item.slug}-${item.title}`}
                      onSelect={() => go(item.href)}
                      className="group flex cursor-pointer items-center gap-3 rounded-2xl px-2 py-2 text-sm data-[selected=true]:bg-muted"
                    >
                      <span className="relative size-11 shrink-0 overflow-hidden rounded-xl bg-muted">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        ) : (
                          <Icon className="absolute inset-0 m-auto size-5 text-muted-foreground" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold">{item.title}</span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {item.subtitle}
                        </span>
                      </span>
                      <ArrowRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition group-data-[selected=true]:opacity-100" />
                    </Command.Item>
                  ))}
                </Command.Group>
              );
            })}
          </Command.List>

          <div className="flex items-center gap-4 border-t border-border/60 px-5 py-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CornerDownLeft className="size-3.5" /> to select
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="rounded border border-border bg-muted px-1">↑</kbd>
              <kbd className="rounded border border-border bg-muted px-1">↓</kbd>
              to navigate
            </span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
