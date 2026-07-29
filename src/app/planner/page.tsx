import Link from "next/link";
import { Compass, MapPinned, Sparkles, Wallet } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { SearchTrigger } from "@/components/search/search-trigger";
import { DestinationCard } from "@/components/shared/destination-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { BudgetCalculator } from "@/components/tools/budget-calculator";
import { PackingChecklist, PreTripChecklist } from "@/components/tools/checklist";
import { countries } from "@/data/countries";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Plan Your Trip",
  description:
    "Start planning your next adventure with Global Itinerary. Search destinations, build itineraries and get inspired.",
  path: "/planner",
});

const steps = [
  { icon: Compass, title: "Pick a destination", body: "Browse 195 countries and thousands of cities to find your perfect match." },
  { icon: MapPinned, title: "Build your route", body: "Add attractions and cities to craft a day-by-day itinerary." },
  { icon: Wallet, title: "Set your budget", body: "See daily budget estimates and travel essentials for every destination." },
  { icon: Sparkles, title: "Go explore", body: "Save your favorites and take your guide with you on the road." },
];

export default function PlannerPage() {
  return (
    <>
      <PageHero
        eyebrow="Trip planner"
        title="Plan your perfect journey"
        description="Everything you need to design an unforgettable trip — in one beautiful place."
        breadcrumbs={[{ name: "Trip Planner", href: "/planner" }]}
      />
      <div className="container-lux py-12">
        <Reveal className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-soft">
          <p className="mb-3 text-sm font-semibold">Where do you want to go?</p>
          <SearchTrigger />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 0.06}
              className="rounded-3xl border border-border bg-card p-6 shadow-soft"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <s.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <SectionHeading eyebrow="Trip tools" title="Plan the practical details" />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <BudgetCalculator />
            <PreTripChecklist />
            <PackingChecklist />
          </div>
        </div>

        <div className="mt-16">
          <SectionHeading eyebrow="Get inspired" title="Popular starting points" />
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {countries.slice(0, 4).map((c) => (
              <DestinationCard
                key={c.slug}
                href={`/countries/${c.slug}`}
                image={c.thumbnail}
                title={`${c.flag} ${c.name}`}
                subtitle={c.tagline}
                rating={c.rating}
                bookmarkId={`country:${c.slug}`}
                aspect="landscape"
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="gradient" size="lg">
              <Link href="/countries">Browse all destinations</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
