import { PageHero } from "@/components/shared/page-hero";
import { TripCostEstimator, type CostCountry } from "@/components/tools/trip-cost";
import { countries } from "@/data/countries";
import { travelFacts } from "@/data/travel-facts.generated";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Trip Cost Estimator — How Much Does a Trip Cost? (2026)",
  description:
    "Estimate the cost of your next trip. Pick a destination, travel style, length and group size to see a daily and total budget — and find out whether a country is expensive or budget-friendly.",
  path: "/trip-cost",
  keywords: [
    "trip cost calculator",
    "how much does a trip cost",
    "travel budget calculator",
    "is it expensive to visit",
    "daily travel budget",
    "cost of travel by country",
  ],
});

export const revalidate = 86400;

export default function TripCostPage() {
  const list: CostCountry[] = countries
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      currencyCode: c.currencyCode,
      cost: travelFacts[(c.id || "").toUpperCase()]?.cost,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <PageHero
        eyebrow="Budget with confidence"
        title="Trip cost estimator"
        description="Money is the #1 travel worry. Get a realistic budget for any destination — daily and total — and see at a glance whether it's a pricey or budget-friendly place to visit."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Trip cost", href: "/trip-cost" },
        ]}
      />
      <div className="container-lux py-12">
        <TripCostEstimator countries={list} />
      </div>
    </>
  );
}
