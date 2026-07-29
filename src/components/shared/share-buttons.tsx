"use client";

import * as React from "react";
import { Check, Link2, Send, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ShareButtons({
  title,
  className,
  onDark,
}: {
  title: string;
  className?: string;
  onDark?: boolean;
}) {
  const [copied, setCopied] = React.useState(false);

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* user cancelled */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const base = cn(
    "grid size-10 place-items-center rounded-full transition-all hover:scale-105",
    onDark ? "glass text-white" : "border border-border bg-card hover:border-primary hover:text-primary"
  );

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button onClick={share} aria-label="Share" className={base}>
        <Share2 className="size-4" />
      </button>
      <button onClick={copy} aria-label="Copy link" className={base}>
        {copied ? <Check className="size-4 text-emerald" /> : <Link2 className="size-4" />}
      </button>
      <a
        href="mailto:?subject=Check this out"
        aria-label="Share by email"
        className={base}
      >
        <Send className="size-4" />
      </a>
    </div>
  );
}
