import { cn } from "@/lib/utils";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Highlights recommended months parsed from a free-text "best time" string. */
export function BestMonths({ bestTime }: { bestTime: string }) {
  const text = bestTime || "";
  const highlighted = new Set<number>();

  // Ranges like "May–June" or "September to October".
  const rangeRe = new RegExp(
    `(${MONTHS.join("|")})\\s*(?:[–—-]|to)\\s*(${MONTHS.join("|")})`,
    "gi"
  );
  let m: RegExpExecArray | null;
  while ((m = rangeRe.exec(text))) {
    const a = MONTHS.findIndex((mm) => mm.toLowerCase() === m![1].toLowerCase());
    const b = MONTHS.findIndex((mm) => mm.toLowerCase() === m![2].toLowerCase());
    if (a === -1 || b === -1) continue;
    if (a <= b) for (let i = a; i <= b; i++) highlighted.add(i);
    else {
      for (let i = a; i < 12; i++) highlighted.add(i);
      for (let i = 0; i <= b; i++) highlighted.add(i);
    }
  }
  // Individual month mentions.
  MONTHS.forEach((mm, i) => {
    if (new RegExp(`\\b${mm}\\b`, "i").test(text)) highlighted.add(i);
  });

  if (highlighted.size === 0 || highlighted.size === 12) return null;

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-display text-lg font-bold">Best time to visit</h3>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <span className="size-2.5 rounded-full bg-gradient-to-r from-primary to-sky" />
          Ideal months
        </span>
      </div>

      <div className="mt-5 flex gap-1">
        {SHORT.map((s, i) => {
          const hi = highlighted.has(i);
          return (
            <div key={s} className="flex flex-1 flex-col items-center gap-2">
              <div
                className={cn(
                  "h-9 w-full rounded-lg transition-colors",
                  hi
                    ? "bg-gradient-to-b from-primary to-sky shadow-glow"
                    : "bg-muted"
                )}
              />
              <span
                className={cn(
                  "text-[11px] font-semibold",
                  hi ? "text-foreground" : "text-muted-foreground"
                )}
              >
                <span className="sm:hidden">{s.charAt(0)}</span>
                <span className="hidden sm:inline">{s}</span>
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">{bestTime}</p>
    </div>
  );
}
