import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCountry, getPrerenderedCountrySlugs } from "@/data/countries";
import { iso2ToIso3, visaColumn } from "@/data/visa.generated";
import { PageHero } from "@/components/shared/page-hero";
import { VisaChecker } from "@/components/tools/visa-checker";
import { buildMetadata, breadcrumbJsonLd, JsonLd } from "@/lib/seo";

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return getPrerenderedCountrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = getCountry(slug);
  if (!country) return {};
  return buildMetadata({
    title: `${country.name} Visa Requirements 2026`,
    description: `Check ${country.name} visa requirements by nationality: find out if you need a visa, if it's visa-free or visa-on-arrival, and the documents you'll need for a tourist, business, student or work visa.`,
    path: `/countries/${country.slug}/visa`,
    image: country.heroImage,
    keywords: [
      `${country.name} visa requirements`,
      `do I need a visa for ${country.name}`,
      `${country.name} visa free countries`,
      `${country.name} tourist visa documents`,
      `${country.name} visa on arrival`,
      `${country.name} e-visa`,
      `${country.name} travel visa`,
      `visa requirements for ${country.name}`,
      // Common search aliases
      ...(country.slug === "netherlands"
        ? [
            "netherland visa requirements",
            "netherlands visit visa requirements",
            "visa requirements holland",
            "what visa do you need for netherlands",
          ]
        : []),
    ],
  });
}

export default async function CountryVisaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = getCountry(slug);
  if (!country) notFound();

  const iso3 = iso2ToIso3[(country.id || "").toUpperCase()];
  const column = iso3 ? visaColumn(iso3) : [];

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/countries" },
    { name: country.name, href: `/countries/${country.slug}` },
    { name: "Visa", href: `/countries/${country.slug}/visa` },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          breadcrumbs.map((b) => ({ name: b.name, url: b.href }))
        )}
      />
      <PageHero
        eyebrow="Entry requirements"
        title={`${country.name} visa requirements`}
        description={`Select your home country to instantly see whether you need a visa to visit ${country.name}, whether it's visa-free or visa-on-arrival, and the documents you'll typically need to prepare.`}
        breadcrumbs={breadcrumbs}
      />

      <div className="container-lux py-12">
        {column.length > 0 ? (
          <div className="mx-auto max-w-3xl">
            <VisaChecker
              destinationName={country.name}
              destIso2={(country.id || "").toUpperCase()}
              column={column}
            />
          </div>
        ) : (
          <p className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-8 text-center text-muted-foreground shadow-soft">
            Visa data for {country.name} isn&apos;t available yet. Please check the
            official government portal for entry requirements.
          </p>
        )}

        <div className="mx-auto mt-8 max-w-3xl">
          <Link
            href={`/countries/${country.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="size-4" /> Back to the {country.name} travel guide
          </Link>
        </div>
      </div>
    </>
  );
}
