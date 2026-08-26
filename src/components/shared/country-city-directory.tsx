import Link from "next/link";
import type { City } from "@/lib/types";

function groupByLetter(cities: City[]): [string, City[]][] {
  const map = new Map<string, City[]>();
  for (const city of [...cities].sort((a, b) => a.name.localeCompare(b.name))) {
    const letter = (city.name.replace(/^[^\p{L}]+/u, "")[0] || "#").toUpperCase();
    const list = map.get(letter) ?? [];
    list.push(city);
    map.set(letter, list);
  }
  return [...map.entries()];
}

/** Crawlable city index: all links stay in HTML; extra groups sit in native details. */
export function CountryCityDirectory({
  countryName,
  cities,
}: {
  countryName: string;
  cities: City[];
}) {
  if (cities.length === 0) return null;
  const groups = groupByLetter(cities);

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <h3 className="font-display text-lg font-bold">
        All {countryName} city guides
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {cities.length} cities — grouped A–Z so you can scan without loading every photo.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {groups.map(([letter, list], i) => (
          <details key={letter} className="rounded-2xl border border-border bg-background px-4 py-3" open={i < 2}>
            <summary className="cursor-pointer list-none text-sm font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
              {letter} <span className="font-normal text-muted-foreground">({list.length})</span>
            </summary>
            <ul className="mt-3 columns-2 gap-x-4 text-sm">
              {list.map((city) => (
                <li key={city.slug} className="break-inside-avoid py-0.5">
                  <Link href={`/cities/${city.slug}`} className="text-primary hover:underline">
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </div>
  );
}
