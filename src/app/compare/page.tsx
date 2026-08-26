import { PageHero } from "@/components/shared/page-hero";
import { CompareTool, type CompareCountry } from "@/components/tools/compare-tool";
import { countries } from "@/data/countries";
import { buildMetadata, breadcrumbJsonLd, webApplicationJsonLd, JsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Compare Destinations Side by Side",
  description:
    "Compare any two countries side by side — best time to visit, daily budget, currency, visa rules, safety, weather and more. Decide where to travel next.",
  path: "/compare",
  keywords: [
    "compare destinations",
    "compare countries to travel",
    "which country to visit",
    "travel comparison",
    "best time to visit comparison",
    "travel budget comparison",
  ],
});

export const revalidate = 3600;

export default function ComparePage() {
  const list: CompareCountry[] = countries.map((c) => ({
    slug: c.slug,
    name: c.name,
    flag: c.flag,
    capital: c.capital,
    region: c.region,
    continent: c.continent,
    currency: c.currency,
    currencyCode: c.currencyCode,
    languages: c.languages,
    bestTime: c.bestTime,
    weather: c.weather,
    budgetPerDay: c.budgetPerDay,
    visa: c.visa,
    safety: c.safety,
    timezone: c.timezone,
    callingCode: c.callingCode,
    drivingSide: c.drivingSide,
    population: c.population,
    thumbnail: c.thumbnail || c.heroImage,
    tagline: c.tagline,
  }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Compare", url: "/compare" },
          ]),
          webApplicationJsonLd({
            name: "Compare Destinations",
            url: "/compare",
            description:
              "Compare any two countries side by side — best time to visit, daily budget, currency, visa rules, safety and weather.",
          }),
        ]}
      />
      <PageHero
        eyebrow="Decide with confidence"
        title="Compare destinations"
        description="Not sure where to go? Put any two countries head-to-head on the things that matter — budget, best season, visas, safety and more."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Compare", href: "/compare" },
        ]}
      />
      <div className="container-lux py-12">
        <CompareTool countries={list} />
      </div>
    </>
  );
}
