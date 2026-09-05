import { PageHero } from "@/components/shared/page-hero";
import { PackingGenerator, type PackCountry } from "@/components/tools/packing-generator";
import { countries } from "@/data/countries";
import { travelFacts } from "@/data/travel-facts.generated";
import { buildMetadata, breadcrumbJsonLd, webApplicationJsonLd, JsonLd } from "@/lib/seo";
import { REVALIDATE_GUIDE_SECONDS } from "@/lib/isr";

export const metadata = buildMetadata({
  title: "Packing List Generator — What to Pack for Any Trip (2026)",
  description:
    "Build a personalised travel packing list in seconds. Choose your destination, trip length, trip type and weather to get a tailored checklist — including the right power adapter for your country.",
  path: "/packing-list",
  keywords: [
    "packing list",
    "travel packing list",
    "what to pack",
    "packing checklist",
    "holiday packing list",
    "travel adapter by country",
    "what adapter do I need",
  ],
});

export const revalidate = REVALIDATE_GUIDE_SECONDS;

export default function PackingListPage() {
  const list: PackCountry[] = countries.map((c) => ({
    slug: c.slug,
    name: c.name,
    iso2: (c.id || "").toUpperCase(),
    plugs: travelFacts[(c.id || "").toUpperCase()]?.plugs,
  }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Packing list", url: "/packing-list" },
          ]),
          webApplicationJsonLd({
            name: "Packing List Generator",
            url: "/packing-list",
            description:
              "Build a personalised travel packing list from destination, trip length, trip type and weather — including the right power adapter.",
          }),
        ]}
      />
      <PageHero
        eyebrow="Pack smart"
        title="Packing list generator"
        description="Tell us where you're going and what kind of trip it is, and we'll build a tailored packing checklist — right down to the plug adapter you'll need."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Packing list", href: "/packing-list" },
        ]}
      />
      <div className="container-lux py-12">
        <PackingGenerator countries={list} />
      </div>
    </>
  );
}
