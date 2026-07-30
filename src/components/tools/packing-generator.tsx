"use client";

import * as React from "react";
import { Check, Luggage, Plug } from "lucide-react";
import { cn } from "@/lib/utils";

export type PackCountry = {
  slug: string;
  name: string;
  iso2: string;
  plugs?: { types: string[]; voltage: string; frequency: string };
};

type TripType = "city" | "beach" | "outdoors" | "business" | "backpacking" | "winter";
type Weather = "hot" | "warm" | "cool" | "cold" | "rainy";

const TRIP_TYPES: { id: TripType; label: string }[] = [
  { id: "city", label: "City break" },
  { id: "beach", label: "Beach / island" },
  { id: "outdoors", label: "Outdoors / hiking" },
  { id: "business", label: "Business" },
  { id: "backpacking", label: "Backpacking" },
  { id: "winter", label: "Winter / ski" },
];

const WEATHER: { id: Weather; label: string }[] = [
  { id: "hot", label: "Hot" },
  { id: "warm", label: "Warm" },
  { id: "cool", label: "Cool" },
  { id: "cold", label: "Cold" },
  { id: "rainy", label: "Rainy" },
];

const ESSENTIALS = [
  "Passport (valid 6+ months) + printed copies",
  "Visa / ETIAS or entry documents (if needed)",
  "Travel insurance details",
  "Debit/credit cards + some local cash",
  "Phone, charger & power bank",
  "Any prescription medication (in original packaging)",
  "Reusable water bottle",
  "Basic toiletries & hand sanitiser",
];

const BY_TYPE: Record<TripType, string[]> = {
  city: ["Comfortable walking shoes", "Small day bag", "One smart-casual outfit", "Compact umbrella"],
  beach: ["Swimwear", "SPF 50 sunscreen", "Sunglasses & hat", "Flip-flops", "Quick-dry beach towel", "After-sun lotion"],
  outdoors: ["Hiking boots", "Moisture-wicking layers", "Rain shell", "Daypack", "Blister plasters", "Headlamp"],
  business: ["Formal outfits", "Dress shoes", "Laptop & charger", "Business cards", "Garment folder"],
  backpacking: ["Backpack + rain cover", "Quick-dry clothing", "Padlock", "Microfibre towel", "Travel laundry soap", "Earplugs & eye mask"],
  winter: ["Insulated jacket", "Thermal base layers", "Gloves, beanie & scarf", "Warm waterproof boots", "Lip balm & moisturiser"],
};

const BY_WEATHER: Record<Weather, string[]> = {
  hot: ["Light, breathable clothing", "Extra sunscreen", "Sun hat & sunglasses"],
  warm: ["Light layers", "A light jacket for evenings"],
  cool: ["Sweater or fleece", "Long trousers", "Light jacket"],
  cold: ["Warm coat", "Thermal layers", "Gloves & hat"],
  rainy: ["Waterproof jacket", "Umbrella", "Dry bag for electronics", "Quick-dry footwear"],
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-semibold">
      <span className="text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

const selectCls =
  "rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-semibold outline-none focus:border-primary";

export function PackingGenerator({ countries }: { countries: PackCountry[] }) {
  const [dest, setDest] = React.useState("");
  const [nights, setNights] = React.useState(7);
  const [type, setType] = React.useState<TripType>("city");
  const [weather, setWeather] = React.useState<Weather>("warm");
  const [checked, setChecked] = React.useState<Record<string, boolean>>({});

  const country = countries.find((c) => c.slug === dest);

  const groups = React.useMemo(() => {
    const g: { title: string; items: string[] }[] = [
      { title: "Travel essentials", items: ESSENTIALS },
      { title: `For a ${TRIP_TYPES.find((t) => t.id === type)!.label.toLowerCase()}`, items: BY_TYPE[type] },
      { title: `For ${weather} weather`, items: BY_WEATHER[weather] },
    ];
    // Clothing quantity hint based on trip length.
    const days = Math.max(1, nights);
    g.push({
      title: "Clothing",
      items: [
        `Tops: about ${Math.min(days + 1, 10)}`,
        `Underwear & socks: about ${Math.min(days + 2, 12)}`,
        days > 7 ? "Plan to do laundry mid-trip" : "Enough for the whole trip",
        "One outfit for a nicer evening out",
      ],
    });
    if (country?.plugs?.types?.length) {
      g.push({
        title: "Electronics & adapter",
        items: [
          `${country.name} uses Type ${country.plugs.types.join("/")} sockets`,
          `Voltage ${country.plugs.voltage} · ${country.plugs.frequency}`,
          "Universal travel adapter (if your plugs differ)",
          country.plugs.voltage.startsWith("1")
            ? "Check dual-voltage on hair tools (100–120V region)"
            : "Check dual-voltage on hair tools (220–240V region)",
        ],
      });
    }
    return g;
  }, [type, weather, nights, country]);

  const toggle = (item: string) =>
    setChecked((c) => ({ ...c, [item]: !c[item] }));

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Destination">
          <select value={dest} onChange={(e) => setDest(e.target.value)} className={selectCls}>
            <option value="">Any / not sure</option>
            {countries.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Nights">
          <input
            type="number"
            min={1}
            max={90}
            value={nights}
            onChange={(e) => setNights(Math.max(1, Math.min(90, Number(e.target.value) || 1)))}
            className={selectCls}
          />
        </Field>
        <Field label="Trip type">
          <select value={type} onChange={(e) => setType(e.target.value as TripType)} className={selectCls}>
            {TRIP_TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Expected weather">
          <select value={weather} onChange={(e) => setWeather(e.target.value as Weather)} className={selectCls}>
            {WEATHER.map((w) => (
              <option key={w.id} value={w.id}>
                {w.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="flex items-center gap-2 font-display text-base font-bold">
              {group.title === "Electronics & adapter" ? (
                <Plug className="size-4 text-primary" />
              ) : (
                <Luggage className="size-4 text-primary" />
              )}
              {group.title}
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              {group.items.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => toggle(item)}
                    className="flex w-full items-start gap-2.5 rounded-xl border border-border bg-background-subtle/40 p-2.5 text-left text-sm transition hover:border-primary/40"
                  >
                    <span
                      className={cn(
                        "mt-0.5 grid size-4 shrink-0 place-items-center rounded border",
                        checked[item]
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-muted-foreground/40"
                      )}
                    >
                      {checked[item] && <Check className="size-3" />}
                    </span>
                    <span className={cn(checked[item] && "text-muted-foreground line-through")}>
                      {item}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        A starting point — tailor it to your own needs, airline baggage rules and any
        activities you have planned.
      </p>
    </div>
  );
}
