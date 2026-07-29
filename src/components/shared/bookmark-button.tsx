"use client";

import * as React from "react";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

export function BookmarkButton({
  id,
  className,
  label = "Save",
}: {
  id: string;
  className?: string;
  label?: string;
}) {
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    try {
      const store = JSON.parse(localStorage.getItem("voyara:bookmarks") ?? "[]");
      setSaved(Array.isArray(store) && store.includes(id));
    } catch {
      /* ignore */
    }
  }, [id]);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const store: string[] = JSON.parse(
        localStorage.getItem("voyara:bookmarks") ?? "[]"
      );
      const next = store.includes(id)
        ? store.filter((s) => s !== id)
        : [...store, id];
      localStorage.setItem("voyara:bookmarks", JSON.stringify(next));
      setSaved(next.includes(id));
    } catch {
      setSaved((s) => !s);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      aria-label={saved ? "Remove bookmark" : label}
      className={cn(
        "grid size-9 place-items-center rounded-full glass text-foreground transition-all hover:scale-110 active:scale-95",
        className
      )}
    >
      <Bookmark
        className={cn("size-4 transition-colors", saved && "fill-primary text-primary")}
      />
    </button>
  );
}
