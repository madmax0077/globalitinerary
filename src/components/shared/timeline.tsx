import { Reveal } from "@/components/ui/reveal";
import type { ItineraryDay } from "@/lib/types";

export function Timeline({ days }: { days: ItineraryDay[] }) {
  return (
    <ol className="relative flex flex-col gap-6 border-l border-border pl-6">
      {days.map((day, i) => (
        <Reveal key={day.day} delay={i * 0.06}>
          <li className="relative">
            <span className="absolute -left-[31px] top-1 grid size-6 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground shadow-glow">
              {day.day}
            </span>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Day {day.day}
              </p>
              <h4 className="mt-1 font-display text-lg font-bold">{day.title}</h4>
              <ul className="mt-3 flex flex-col gap-1.5">
                {day.activities.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
