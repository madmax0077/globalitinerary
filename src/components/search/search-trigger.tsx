"use client";

import { Search } from "lucide-react";
import { useSearch } from "@/components/search/search-provider";
import { cn } from "@/lib/utils";

export function SearchTrigger({ className }: { className?: string }) {
  const { setOpen } = useSearch();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cn(
        "group flex h-11 w-full items-center gap-3 rounded-full border border-border bg-background/70 px-4 text-left text-sm text-muted-foreground shadow-sm transition-all hover:border-primary/50 hover:shadow-soft",
        className
      )}
    >
      <Search className="size-4 shrink-0 transition-colors group-hover:text-primary" />
      <span className="flex-1 truncate">Search countries, cities, landmarks…</span>
      <kbd className="hidden items-center gap-0.5 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium sm:flex">
        ⌘K
      </kbd>
    </button>
  );
}

export function SearchIconButton({ className }: { className?: string }) {
  const { setOpen } = useSearch();
  return (
    <button
      type="button"
      aria-label="Open search"
      onClick={() => setOpen(true)}
      className={cn(
        "grid size-10 place-items-center rounded-full glass text-foreground transition-transform hover:scale-105 active:scale-95",
        className
      )}
    >
      <Search className="size-[18px]" />
    </button>
  );
}
