"use client";

import * as React from "react";
import Image from "next/image";
import { MoreHorizontal, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type AdminRow = {
  id: string;
  image?: string;
  title: string;
  subtitle: string;
  meta: string;
  status: string;
};

export function DataTable({
  rows,
  entity,
}: {
  rows: AdminRow[];
  entity: string;
}) {
  const [query, setQuery] = React.useState("");
  const filtered = rows.filter((r) =>
    `${r.title} ${r.subtitle} ${r.meta}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="rounded-2xl border border-border bg-card shadow-soft">
      <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm sm:max-w-xs">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent outline-none"
            placeholder={`Search ${entity}…`}
            aria-label={`Search ${entity}`}
          />
        </div>
        <Button variant="gradient" size="sm" className="ml-auto">
          <Plus className="size-4" /> New {entity.replace(/s$/, "")}
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="hidden px-4 py-3 font-medium sm:table-cell">Details</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr
                key={row.id}
                className="border-b border-border last:border-0 transition-colors hover:bg-muted/50"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {row.image && (
                      <span className="relative size-10 shrink-0 overflow-hidden rounded-lg">
                        <Image src={row.image} alt="" fill sizes="40px" className="object-cover" />
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate font-medium">{row.title}</p>
                      <p className="truncate text-xs text-muted-foreground">{row.subtitle}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                  {row.meta}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={row.status === "Published" ? "emerald" : "outline"}>
                    {row.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      aria-label="Edit"
                      className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      aria-label="Delete"
                      className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-sunset/10 hover:text-sunset"
                    >
                      <Trash2 className="size-4" />
                    </button>
                    <button
                      aria-label="More"
                      className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <MoreHorizontal className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">
            No {entity} found.
          </p>
        )}
      </div>
    </div>
  );
}
