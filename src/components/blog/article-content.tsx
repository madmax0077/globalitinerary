import type { ReactNode } from "react";
import {
  CalendarRange,
  CircleDollarSign,
  HelpCircle,
  MapPin,
  Sun,
  Train,
  Lightbulb,
} from "lucide-react";
import { FaqSection } from "@/components/shared/faq-section";
import type { ArticleSection } from "@/lib/types";

type SectionKind = "lead" | "day" | "stat" | "cost" | "stay" | "tips" | "faq" | "default";

function headingId(heading: string, index: number): string {
  const base = heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
  return base || `section-${index}`;
}

function classifySection(section: ArticleSection, index: number): SectionKind {
  if (!section.heading) return index === 0 ? "lead" : "default";
  const h = section.heading;
  if (/^days?\s+\d+/i.test(h)) return "day";
  if (/best time/i.test(h) || /how many days/i.test(h)) return "stat";
  if (/trip cost/i.test(h)) return "cost";
  if (/where to stay/i.test(h)) return "stay";
  if (/getting around/i.test(h)) return "tips";
  if (/practical tips/i.test(h)) return "tips";
  if (/faq/i.test(h)) return "faq";
  return "default";
}

function parseDayNumber(heading: string): string {
  const m = heading.match(/^days?\s+([\d–—-]+)/i);
  return m?.[1] ?? "";
}

function dayTitle(heading: string): string {
  return heading.replace(/^days?\s+[\d–—-]+\s*[—–-]\s*/i, "").trim() || heading;
}

function tocLabel(heading: string, kind: SectionKind): string {
  if (kind === "day") {
    const num = parseDayNumber(heading);
    return num ? `Day ${num}` : heading;
  }
  return heading;
}

function parseCostPills(body: string): { label: string; value: string }[] {
  const pills: { label: string; value: string }[] = [];
  const budget = body.match(/Budget\s+([^;.]+)/i);
  const mid = body.match(/Mid-range\s+([^;.]+)/i);
  const lux = body.match(/Luxury\s+([^;.]+)/i);
  if (budget) pills.push({ label: "Budget", value: budget[1].trim() });
  if (mid) pills.push({ label: "Mid-range", value: mid[1].trim() });
  if (lux) pills.push({ label: "Luxury", value: lux[1].trim() });
  return pills.length === 3 ? pills : [];
}

function parseFaqPairs(body: string): { question: string; answer: string }[] {
  const dashed = body
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .flatMap((chunk) => {
      const parts = chunk.split(/\n?-----+\n?/).map((s) => s.trim());
      if (parts.length >= 2 && parts[0] && parts[1]) {
        return [{ question: parts[0], answer: parts.slice(1).join(" ").trim() }];
      }
      return [];
    });
  if (dashed.length >= 2) return dashed;

  const matches = [...body.matchAll(/([A-Z][^?]{6,140}\?)\s*/g)];
  if (matches.length < 2) return [];
  const pairs: { question: string; answer: string }[] = [];
  for (let i = 0; i < matches.length; i++) {
    const question = matches[i][1].trim();
    const start = (matches[i].index ?? 0) + matches[i][0].length;
    const end = i + 1 < matches.length ? (matches[i + 1].index ?? body.length) : body.length;
    const answer = body.slice(start, end).trim();
    if (answer.length > 8) pairs.push({ question, answer });
  }
  return pairs.length >= 2 ? pairs : [];
}

function Body({ text, className }: { text: string; className?: string }) {
  return (
    <p className={className ?? "text-base leading-7 text-muted-foreground sm:text-[1.05rem] sm:leading-8"}>
      {text}
    </p>
  );
}

function DayTimeline({
  days,
}: {
  days: { heading: string; body: string; id: string }[];
}) {
  return (
    <ol className="flex flex-col">
      {days.map((day, index) => {
        const num = parseDayNumber(day.heading);
        const last = index === days.length - 1;
        return (
          <li key={day.id} id={day.id} className="grid scroll-mt-28 grid-cols-[2.75rem_minmax(0,1fr)] gap-3 sm:gap-4">
            <div className="relative flex flex-col items-center">
              {!last && (
                <span className="absolute top-9 bottom-0 w-px bg-primary/25" aria-hidden />
              )}
              <span className="relative z-10 mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-primary text-[11px] font-bold leading-none text-primary-foreground shadow-glow sm:size-9 sm:text-xs">
                {num || "•"}
              </span>
            </div>
            <div className={last ? "min-w-0 pb-0" : "min-w-0 pb-5"}>
              <div className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:rounded-3xl sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                  {num ? `Day ${num}` : "Itinerary"}
                </p>
                <h2 className="mt-1 font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl">
                  {dayTitle(day.heading)}
                </h2>
                <Body text={day.body} className="mt-3 text-base leading-7 text-muted-foreground" />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function HighlightCard({
  id,
  kind,
  heading,
  body,
}: {
  id: string;
  kind: "stat" | "cost" | "stay" | "tips";
  heading: string;
  body: string;
}) {
  const meta = {
    stat: { icon: Sun, tone: "from-sky/15 to-primary/8", iconTone: "text-sky" },
    cost: { icon: CircleDollarSign, tone: "from-gold/15 to-sunset/8", iconTone: "text-gold" },
    stay: { icon: MapPin, tone: "from-emerald/15 to-sky/8", iconTone: "text-emerald" },
    tips: { icon: Lightbulb, tone: "from-primary/8 to-muted", iconTone: "text-primary" },
  }[kind];
  const Icon = /getting around/i.test(heading) ? Train : meta.icon;
  const pills = kind === "cost" ? parseCostPills(body) : [];

  return (
    <section
      id={id}
      className={`scroll-mt-28 h-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${meta.tone} p-5 shadow-soft sm:rounded-3xl sm:p-6`}
    >
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-card shadow-soft">
          <Icon className={`size-5 ${meta.iconTone}`} />
        </span>
        <h2 className="min-w-0 font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl">
          {heading}
        </h2>
      </div>
      {pills.length > 0 && (
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {pills.map((p) => (
            <div key={p.label} className="min-w-0 rounded-2xl border border-border/70 bg-card/90 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{p.label}</p>
              <p className="mt-1 break-words font-display text-base font-bold sm:text-lg">{p.value}</p>
            </div>
          ))}
        </div>
      )}
      <Body text={body} className="mt-4 text-base leading-7 text-foreground/80" />
    </section>
  );
}

function ArticleToc({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  return (
    <nav aria-label="On this page">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">On this page</p>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar lg:flex-col lg:overflow-visible lg:pb-0">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="shrink-0 truncate rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-soft transition-colors hover:border-primary/40 hover:text-foreground lg:max-w-full lg:rounded-xl lg:px-3 lg:py-2"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export function ArticleContent({
  sections,
  header,
  footer,
}: {
  sections: ArticleSection[];
  header?: ReactNode;
  footer?: ReactNode;
}) {
  const classified = sections.map((section, i) => ({
    section,
    kind: classifySection(section, i),
    id: section.heading ? headingId(section.heading, i) : `intro-${i}`,
  }));

  const toc = classified
    .filter((s) => s.section.heading)
    .map((s) => ({
      id: s.id,
      label: tocLabel(s.section.heading!, s.kind),
    }));

  const blocks: ReactNode[] = [];
  let i = 0;
  while (i < classified.length) {
    const current = classified[i];
    if (current.kind === "day") {
      const days: { heading: string; body: string; id: string }[] = [];
      while (i < classified.length && classified[i].kind === "day") {
        days.push({
          heading: classified[i].section.heading!,
          body: classified[i].section.body,
          id: classified[i].id,
        });
        i += 1;
      }
      blocks.push(
        <div key={days[0].id} className="space-y-5">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-2xl bg-primary/10">
              <CalendarRange className="size-4 text-primary" />
            </span>
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight">Day-by-day plan</h2>
              <p className="text-sm text-muted-foreground">Follow the numbered days in order — or skip a slack day if you are short on time.</p>
            </div>
          </div>
          <DayTimeline days={days} />
        </div>,
      );
      continue;
    }

    if (current.kind === "lead") {
      blocks.push(
        <p
          key={current.id}
          className="text-lg leading-8 text-foreground/85 sm:text-xl sm:leading-9"
        >
          {current.section.body}
        </p>,
      );
      i += 1;
      continue;
    }

    if (current.kind === "stat" && classified[i + 1]?.kind === "stat") {
      const next = classified[i + 1];
      blocks.push(
        <div key={current.id} className="grid gap-4 sm:grid-cols-2 sm:items-stretch">
          <HighlightCard id={current.id} kind="stat" heading={current.section.heading!} body={current.section.body} />
          <HighlightCard id={next.id} kind="stat" heading={next.section.heading!} body={next.section.body} />
        </div>,
      );
      i += 2;
      continue;
    }

    if (current.kind === "faq") {
      const pairs = parseFaqPairs(current.section.body);
      blocks.push(
        <section key={current.id} id={current.id} className="scroll-mt-28">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-2xl bg-primary/10">
              <HelpCircle className="size-4 text-primary" />
            </span>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              {current.section.heading}
            </h2>
          </div>
          {pairs.length >= 2 ? (
            <FaqSection faqs={pairs} />
          ) : (
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:rounded-3xl sm:p-6">
              <Body text={current.section.body} />
            </div>
          )}
        </section>,
      );
      i += 1;
      continue;
    }

    if (current.kind === "stat" || current.kind === "cost" || current.kind === "stay" || current.kind === "tips") {
      blocks.push(
        <HighlightCard
          key={current.id}
          id={current.id}
          kind={current.kind}
          heading={current.section.heading!}
          body={current.section.body}
        />,
      );
      i += 1;
      continue;
    }

    blocks.push(
      <section key={current.id} id={current.id} className="scroll-mt-28">
        {current.section.heading && (
          <h2 className="font-display text-2xl font-bold tracking-tight">{current.section.heading}</h2>
        )}
        <Body text={current.section.body} className="mt-3 text-lg leading-8 text-muted-foreground" />
      </section>,
    );
    i += 1;
  }

  const showToc = toc.length > 2;

  return (
    <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start lg:gap-12">
      {showToc && (
        <aside className="mb-8 lg:sticky lg:top-28 lg:mb-0 lg:self-start">
          <ArticleToc items={toc} />
        </aside>
      )}
      <div className={`min-w-0 ${showToc ? "" : "lg:col-span-2"}`}>
        {header}
        <div className="mt-10 flex flex-col gap-8">{blocks}</div>
        {footer}
      </div>
    </div>
  );
}
