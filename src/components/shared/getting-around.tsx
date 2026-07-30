import { Car, Smartphone, ExternalLink, Wifi } from "lucide-react";
import {
  getGettingAround,
  RIDE_APPS,
  LOCAL_APPS,
  type LocalApp,
} from "@/data/getting-around";
import { SectionHeading } from "@/components/shared/section-heading";

function resolveApp(id: string): LocalApp | null {
  return RIDE_APPS[id] ?? LOCAL_APPS[id] ?? null;
}

export function GettingAround({
  iso2,
  continent,
  countryName,
}: {
  iso2: string;
  continent: string;
  countryName: string;
}) {
  const data = getGettingAround(iso2, continent);
  const apps = data.rides.map(resolveApp).filter((a): a is LocalApp => Boolean(a));

  return (
    <div>
      <SectionHeading
        eyebrow="Getting around & staying connected"
        title={`Cheapest ways to travel in ${countryName}`}
      />

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {/* Ride-hailing / transport */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <Car className="size-5" />
            </span>
            <h3 className="font-display text-xl font-bold">Ride apps &amp; transport</h3>
          </div>

          {apps.length > 0 ? (
            <ul className="mt-5 flex flex-col gap-3">
              {apps.map((app, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    {app.url ? (
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-foreground hover:text-primary"
                      >
                        {app.name}
                        <ExternalLink className="size-3.5 opacity-60" />
                      </a>
                    ) : (
                      <span className="font-semibold text-foreground">{app.name}</span>
                    )}
                    {app.blurb && (
                      <p className="text-sm leading-relaxed text-muted-foreground">{app.blurb}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Ride-hailing apps aren&apos;t widely available here.
            </p>
          )}

          {data.ridesNote && (
            <p className="mt-4 rounded-2xl bg-primary/5 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
              {data.ridesNote}
            </p>
          )}
        </div>

        {/* SIM / telecom */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Smartphone className="size-5" />
            </span>
            <h3 className="font-display text-xl font-bold">Cheapest SIM for foreigners</h3>
          </div>

          <ul className="mt-5 flex flex-col gap-3">
            {data.telecom.map((t, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-emerald-500" />
                <div className="min-w-0">
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t.note}</p>
                </div>
              </li>
            ))}
          </ul>

          {data.esimNote && (
            <p className="mt-4 flex items-start gap-2 rounded-2xl bg-emerald-500/5 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
              <Wifi className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>{data.esimNote}</span>
            </p>
          )}
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Prices and app coverage change often — figures are indicative for 2026, so confirm the
        current tourist plan in the app or at the airport kiosk.
      </p>
    </div>
  );
}
