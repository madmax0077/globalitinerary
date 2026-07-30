import {
  Plane,
  Banknote,
  Bus,
  Languages,
  ShieldCheck,
  HeartPulse,
  Wifi,
  Users,
  CalendarDays,
} from "lucide-react";
import type { CountryInfo } from "@/data/country-info.generated";
import { SectionHeading } from "@/components/shared/section-heading";
import { parseWikiSections, extractPhoneList } from "@/lib/wikitext";

const FIELDS: { key: keyof CountryInfo; label: string; icon: React.ElementType }[] = [
  { key: "getIn", label: "Getting in & visas", icon: Plane },
  { key: "buy", label: "Money & costs", icon: Banknote },
  { key: "getAround", label: "Getting around", icon: Bus },
  { key: "talk", label: "Language", icon: Languages },
  { key: "staySafe", label: "Staying safe", icon: ShieldCheck },
  { key: "stayHealthy", label: "Health", icon: HeartPulse },
  { key: "connect", label: "Staying connected", icon: Wifi },
  { key: "respect", label: "Local etiquette", icon: Users },
  { key: "festivals", label: "Holidays & festivals", icon: CalendarDays },
];

export function KnowBeforeYouGo({
  info,
  countryName,
}: {
  info: CountryInfo;
  countryName: string;
}) {
  const cards = FIELDS.filter((f) => info[f.key]);
  if (cards.length === 0) return null;

  return (
    <div>
      <SectionHeading eyebrow="Plan with confidence" title={`Know before you go`} />
      <div className="mt-8 columns-1 gap-4 sm:columns-2 [&>*]:mb-4">
        {cards.map((f) => (
          <div
            key={f.key}
            className="break-inside-avoid rounded-3xl border border-border bg-card p-6 shadow-soft"
          >
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="size-4" />
              </span>
              <h3 className="font-display text-base font-bold">{f.label}</h3>
            </div>
            <div className="mt-3 flex flex-col gap-2.5">
              {parseWikiSections(String(info[f.key])).map((sec, i) => {
                const phones = sec.body ? extractPhoneList(sec.body) : null;
                return (
                  <div key={i}>
                    {sec.heading && (
                      <p className="text-sm font-semibold text-foreground">{sec.heading}</p>
                    )}
                    {phones ? (
                      <div className="flex flex-col gap-1.5">
                        {phones.intro && (
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {phones.intro}:
                          </p>
                        )}
                        <ul className="flex flex-col gap-1.5">
                          {phones.items.map((p, j) => (
                            <li key={j} className="flex items-baseline gap-2.5 text-sm">
                              <span className="min-w-[3.25rem] shrink-0 rounded-md bg-primary/10 px-2 py-0.5 text-center font-semibold tabular-nums text-primary">
                                {p.number}
                              </span>
                              <span className="text-muted-foreground">{p.label}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      sec.body && (
                        <p className="text-sm leading-relaxed text-muted-foreground">{sec.body}</p>
                      )
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Practical guidance for {countryName} is summarised from{" "}
        <a
          href={`https://en.wikivoyage.org/wiki/${encodeURIComponent(countryName)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          Wikivoyage
        </a>{" "}
        (CC BY-SA). Always confirm official visa, health and safety requirements before you travel.
      </p>
    </div>
  );
}
