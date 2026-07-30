import { Phone, Droplets, Plug, Car } from "lucide-react";
import { travelFacts } from "@/data/travel-facts.generated";

export function PracticalFacts({
  iso2,
  drivingSide,
  countryName,
}: {
  iso2: string;
  drivingSide?: "left" | "right";
  countryName: string;
}) {
  const f = travelFacts[(iso2 || "").toUpperCase()];
  if (!f && !drivingSide) return null;

  const rows: { icon: React.ElementType; label: string; value: React.ReactNode }[] = [];

  if (f?.emergency?.length) {
    rows.push({
      icon: Phone,
      label: "Emergency number",
      value: (
        <span>
          Dial <strong>{f.emergency.join(" / ")}</strong>
        </span>
      ),
    });
  }

  rows.push({
    icon: Droplets,
    label: "Tap water",
    value:
      f?.tapWater === "safe"
        ? "Generally safe to drink"
        : "Prefer bottled or filtered water",
  });

  if (f?.plugs?.types?.length) {
    rows.push({
      icon: Plug,
      label: "Power & plugs",
      value: (
        <span>
          Type {f.plugs.types.join(", ")} · {f.plugs.voltage} · {f.plugs.frequency}
        </span>
      ),
    });
  }

  if (drivingSide) {
    rows.push({
      icon: Car,
      label: "Driving",
      value: `Drives on the ${drivingSide}`,
    });
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <h3 className="font-display text-lg font-bold">Safety &amp; practical basics</h3>
      <dl className="mt-4 flex flex-col gap-4">
        {rows.map((r) => (
          <div key={r.label} className="flex gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <r.icon className="size-4" />
            </span>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {r.label}
              </dt>
              <dd className="text-sm font-medium">{r.value}</dd>
            </div>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs text-muted-foreground">
        General guidance for {countryName}, aligned to 2026 — always double-check locally.
      </p>
    </div>
  );
}
