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
import { DestinationFinder, type FinderCountry } from "@/components/tools/destination-finder";
import { DistanceCalculator, type DistanceCity } from "@/components/tools/distance-calculator";
import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import { buildMetadata, breadcrumbJsonLd, webApplicationJsonLd, JsonLd } from "@/lib/seo";
import { calculatorDefaultsForCountry } from "@/lib/travel-budgets";

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
  const finderCountries: FinderCountry[] = countries.map((c) => ({
    slug: c.slug,
    name: c.name,
    flag: c.flag,
    thumbnail: c.thumbnail || c.heroImage,
    continent: c.continent,
    region: c.region,
    budgetPerDay: c.budgetPerDay,
    bestTime: c.bestTime,
    tags: c.tags,
    tagline: c.tagline,
  }));

  // Keep distance tool light — full catalog would ship thousands of coords to the client.
  const distanceCities: DistanceCity[] = cities
    .filter((c) => c.featured || (c.categories && c.categories.length > 0))
    .slice(0, 250)
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      country: c.countryName,
      lat: c.coordinates.lat,
      lng: c.coordinates.lng,
    }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Trip Planner", url: "/planner" }]),
          webApplicationJsonLd({
            name: "Trip Planner",
            url: "/planner",
            description:
              "Search destinations, estimate a budget, build a packing list and plan a multi-city route in one place.",
          }),
        ]}
      />
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
          <SectionHeading
            eyebrow="Not sure where to go?"
            title="Find your next destination"
            description="Filter every country by region, budget, the month you want to travel and what you love to do."
          />
          <div className="mt-8">
            <DestinationFinder countries={finderCountries} />
          </div>
        </div>

        <div className="mt-16">
          <SectionHeading eyebrow="Trip tools" title="Plan the practical details" />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <BudgetCalculator
              destinationLabel="a typical mid-range trip"
              defaults={calculatorDefaultsForCountry({ slug: "portugal", continent: "Europe", region: "Southern Europe" })}
              sourceNote="Starts from a mid-range Southern Europe baseline — open any country or city page for that place’s real budget defaults."
            />
            <PreTripChecklist />
            <PackingChecklist />
          </div>
          <div className="mt-6">
            <DistanceCalculator cities={distanceCities} />
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
