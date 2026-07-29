"use client";

import * as React from "react";
import { CheckSquare, Square, ListChecks, Luggage } from "lucide-react";

type Group = { title: string; items: string[] };

function Checklist({
  storageId,
  groups,
  icon: Icon,
  title,
}: {
  storageId: string;
  groups: Group[];
  icon: React.ElementType;
  title: string;
}) {
  const key = `voyara:checklist:${storageId}`;
  const [checked, setChecked] = React.useState<Record<string, boolean>>({});
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) setChecked(JSON.parse(saved));
    } catch {}
    setReady(true);
  }, [key]);

  React.useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(key, JSON.stringify(checked));
    } catch {}
  }, [checked, key, ready]);

  const toggle = (item: string) => setChecked((c) => ({ ...c, [item]: !c[item] }));

  const total = groups.reduce((n, g) => n + g.items.length, 0);
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-4" />
          </span>
          <h3 className="font-display text-lg font-bold">{title}</h3>
        </div>
        <span className="text-sm font-semibold text-muted-foreground">
          {done}/{total}
        </span>
      </div>

      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: total ? `${(done / total) * 100}%` : "0%" }}
        />
      </div>

      <div className="mt-5 flex flex-col gap-5">
        {groups.map((g) => (
          <div key={g.title}>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {g.title}
            </p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {g.items.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => toggle(item)}
                    className="flex w-full items-start gap-2 rounded-lg px-1 py-1 text-left text-sm transition-colors hover:bg-muted/60"
                  >
                    {checked[item] ? (
                      <CheckSquare className="mt-0.5 size-4 shrink-0 text-primary" />
                    ) : (
                      <Square className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    )}
                    <span className={checked[item] ? "text-muted-foreground line-through" : ""}>
                      {item}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

const PACKING: Group[] = [
  { title: "Documents & money", items: ["Passport (valid 6+ months)", "Visa / entry permit", "Travel insurance", "Cards + some local cash", "Copies of key documents"] },
  { title: "Tech", items: ["Phone + charger", "Power adapter for the country", "Power bank", "Headphones"] },
  { title: "Health", items: ["Personal medication", "Basic first-aid kit", "Sunscreen", "Hand sanitiser"] },
  { title: "Clothing", items: ["Weather-appropriate layers", "Comfortable walking shoes", "Modest outfit for religious sites", "Reusable water bottle"] },
];

const PRETRIP: Group[] = [
  { title: "When booking", items: ["Check visa requirements for your passport", "Compare flights & book", "Book refundable accommodation", "Buy travel insurance"] },
  { title: "1 month before", items: ["Check vaccination / health advice", "Notify your bank of travel", "Arrange an eSIM or roaming", "Draft your day-by-day itinerary"] },
  { title: "1 week before", items: ["Check the weather forecast", "Download offline maps", "Save reservations & tickets", "Set out-of-office / arrange pet care"] },
  { title: "Day before", items: ["Check-in online", "Charge all devices", "Pack per the checklist", "Confirm airport transfer"] },
];

export function PackingChecklist() {
  return <Checklist storageId="packing" groups={PACKING} icon={Luggage} title="Packing checklist" />;
}

export function PreTripChecklist() {
  return <Checklist storageId="pretrip" groups={PRETRIP} icon={ListChecks} title="Pre-trip checklist" />;
}
