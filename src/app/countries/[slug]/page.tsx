import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Banknote,
  CalendarDays,
  Clock3,
  Globe,
  Languages,
  MapPin,
  Plane,
  Shield,
  Sparkles,
  TramFront,
  Users,
  Wallet,
  Wifi,
} from "lucide-react";
import { getCountry, getPrerenderedCountrySlugs, countries } from "@/data/countries";
import { getCitiesByCountry } from "@/data/cities";
import { getAttractionsByCountry } from "@/data/attractions";
import { getCountryInfo } from "@/data/country-info.generated";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { DestinationCard } from "@/components/shared/destination-card";
import { Gallery } from "@/components/shared/gallery";
import { FaqSection } from "@/components/shared/faq-section";
import { ShareButtons } from "@/components/shared/share-buttons";
import { MapPlaceholder } from "@/components/shared/map-placeholder";
import { AdSlot } from "@/components/shared/ad-slot";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { KnowBeforeYouGo } from "@/components/shared/know-before";
import { BestMonths } from "@/components/shared/best-months";
import { CurrencyConverter } from "@/components/tools/currency-converter";
import { LocalTime } from "@/components/tools/local-time";
import { WeatherNow } from "@/components/tools/weather-now";
import { BudgetCalculator } from "@/components/tools/budget-calculator";
import {
  buildMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
  touristDestinationJsonLd,
  JsonLd,
} from "@/lib/seo";
import { formatNumber } from "@/lib/utils";
import type { City } from "@/lib/types";

function haversine(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Greedy nearest-neighbour route through a country's cities from the capital. */
function buildRoute(cities: City[], capital: string): City[] {
  if (cities.length < 2) return [];
  const remaining = [...cities];
  let startIdx = remaining.findIndex(
    (c) => c.name.toLowerCase() === (capital || "").toLowerCase()
  );
  if (startIdx === -1) startIdx = 0;
  const route: City[] = [remaining.splice(startIdx, 1)[0]];
  while (remaining.length > 0 && route.length < 6) {
    const last = route[route.length - 1];
    let best = 0;
    let bestD = Infinity;
    for (let i = 0; i < remaining.length; i++) {
      const d = haversine(last.coordinates, remaining[i].coordinates);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    route.push(remaining.splice(best, 1)[0]);
  }
  return route;
}

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
    title: `${country.name} Travel Guide — Things to Do & Best Time to Visit`,
    description: `Plan your trip to ${country.name}: top things to do, the best time to visit, sample itineraries, where to stay, visa & entry rules, budget and local travel tips.`,
    path: `/countries/${country.slug}`,
    image: country.heroImage,
    keywords: [
      `${country.name} travel guide`,
      `things to do in ${country.name}`,
      `best time to visit ${country.name}`,
      `${country.name} itinerary`,
      `${country.name} travel tips`,
      `visit ${country.name}`,
      ...country.tags,
    ],
  });
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = getCountry(slug);
  if (!country) notFound();

  const cities = getCitiesByCountry(country.slug);
  const attractionsList = getAttractionsByCountry(country.slug);
  const info = getCountryInfo(country.slug);

  // Suggested route: greedy nearest-neighbour path through the country's cities,
  // starting from the capital (or the first city), using real coordinates.
  const route = buildRoute(cities, country.capital);
  const related = countries
    .filter((c) => c.slug !== country.slug && c.continent === country.continent)
    .slice(0, 4);
  const relatedFallback = related.length
    ? related
    : countries.filter((c) => c.slug !== country.slug).slice(0, 4);

  const facts = [
    { icon: MapPin, label: "Capital", value: country.capital },
    { icon: Users, label: "Population", value: formatNumber(country.population) },
    { icon: Banknote, label: "Currency", value: `${country.currency} (${country.currencyCode})` },
    { icon: Languages, label: "Languages", value: country.languages.join(", ") },
    { icon: Clock3, label: "Timezone", value: country.timezone },
    { icon: Globe, label: "Calling code", value: country.callingCode },
  ];

  const guide = [
    { icon: Plane, label: "Visa", value: country.visa },
    { icon: CalendarDays, label: "Best time to visit", value: country.bestTime },
    { icon: Sparkles, label: "Weather", value: country.weather },
    { icon: TramFront, label: "Transportation", value: country.transportation },
    { icon: Wifi, label: "Internet", value: country.internet },
    { icon: Shield, label: "Safety", value: country.safety },
    { icon: Wallet, label: "Budget / day", value: country.budgetPerDay },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Countries", url: "/countries" },
            { name: country.name, url: `/countries/${country.slug}` },
          ]),
          touristDestinationJsonLd({
            name: country.name,
            description: country.overview,
            image: country.heroImage,
            lat: country.coordinates.lat,
            lng: country.coordinates.lng,
          }),
          faqJsonLd(country.faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative flex min-h-[72vh] items-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={country.heroImage}
            alt={country.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
        </div>
        <div className="container-lux w-full pb-12 pt-32 text-white">
          <Breadcrumbs
            onDark
            items={[
              { name: "Countries", href: "/countries" },
              { name: country.name, href: `/countries/${country.slug}` },
            ]}
          />
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="text-5xl">{country.flag}</span>
                <Badge variant="glass" className="text-white">
                  {country.continent} • {country.region}
                </Badge>
              </div>
              <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
                {country.name}
              </h1>
              <p className="mt-3 max-w-xl text-lg text-white/85">{country.tagline}</p>
            </div>
            <ShareButtons title={`${country.name} Travel Guide`} onDark />
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="container-lux grid gap-12 py-16 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-14">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight">Overview</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {country.overview}
            </p>
          </Reveal>

          {/* Quick facts */}
          <Reveal>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="rounded-2xl border border-border bg-card p-4 shadow-soft"
                >
                  <f.icon className="size-5 text-primary" />
                  <p className="mt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {f.label}
                  </p>
                  <p className="mt-0.5 font-semibold">{f.value}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* History & culture */}
          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-display text-xl font-bold">History</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{country.history}</p>
            </Reveal>
            <Reveal
              delay={0.08}
              className="rounded-3xl border border-border bg-card p-6 shadow-soft"
            >
              <h3 className="font-display text-xl font-bold">Culture</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{country.culture}</p>
            </Reveal>
          </div>

          {/* Best months */}
          <BestMonths bestTime={country.bestTime} />

          {/* Know before you go (real Wikivoyage guidance) */}
          {info && <KnowBeforeYouGo info={info} countryName={country.name} />}

          {/* Suggested route */}
          {route.length >= 2 && (
            <div>
              <SectionHeading eyebrow="Plan your trip" title={`A route through ${country.name}`} />
              <div className="mt-8 flex flex-wrap items-center gap-2">
                {route.map((c, i) => (
                  <div key={c.slug} className="flex items-center gap-2">
                    <Link
                      href={`/cities/${c.slug}`}
                      className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold shadow-soft transition hover:border-primary/50 hover:shadow-lift"
                    >
                      <span className="mr-1.5 text-primary">{i + 1}</span>
                      {c.name}
                    </Link>
                    {i < route.length - 1 && <span className="text-muted-foreground">→</span>}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                A suggested loop connecting {country.name}&apos;s major cities by proximity — a
                practical order for a multi-city trip.
              </p>
            </div>
          )}

          {/* Top cities */}
          {cities.length > 0 && (
            <div>
              <SectionHeading eyebrow="Where to go" title="Top cities" />
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {cities.map((c) => (
                  <DestinationCard
                    key={c.slug}
                    href={`/cities/${c.slug}`}
                    image={c.thumbnail}
                    title={c.name}
                    subtitle={c.tagline}
                    rating={c.rating}
                    reviews={c.reviews}
                    bookmarkId={`city:${c.slug}`}
                    aspect="landscape"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Top attractions */}
          {attractionsList.length > 0 && (
            <div>
              <SectionHeading eyebrow="Don't miss" title="Top attractions" />
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {attractionsList.map((a) => (
                  <DestinationCard
                    key={a.slug}
                    href={`/attractions/${a.slug}`}
                    image={a.thumbnail}
                    title={a.name}
                    location={a.cityName}
                    badge={a.category}
                    rating={a.rating}
                    reviews={a.reviews}
                    bookmarkId={`attraction:${a.slug}`}
                    aspect="landscape"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          <div>
            <SectionHeading eyebrow="In pictures" title={`${country.name} gallery`} />
            <div className="mt-8">
              <Gallery images={country.gallery} title={country.name} />
            </div>
          </div>

          {/* Map */}
          <div>
            <SectionHeading eyebrow="Location" title="Find it on the map" />
            <div className="mt-8">
              <MapPlaceholder coordinates={country.coordinates} label={country.name} />
            </div>
          </div>

          {/* Budget planner */}
          <div>
            <SectionHeading eyebrow="Plan your trip" title="Estimate your budget" />
            <div className="mt-8">
              <BudgetCalculator />
            </div>
          </div>

          {/* FAQ */}
          {country.faqs.length > 0 && (
            <div>
              <SectionHeading eyebrow="Good to know" title="Frequently asked questions" />
              <div className="mt-8">
                <FaqSection faqs={country.faqs} />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold">Travel essentials</h3>
            <dl className="mt-4 flex flex-col gap-4">
              {guide.map((g) => (
                <div key={g.label} className="flex gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <g.icon className="size-4" />
                  </span>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {g.label}
                    </dt>
                    <dd className="text-sm font-medium">{g.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <Link
              href={`/countries/${country.slug}/visa`}
              className="mt-5 flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90"
            >
              <Plane className="size-4" /> Check visa requirements
            </Link>
          </div>

          <LocalTime timezone={country.timezone} label={country.capital} />
          <WeatherNow
            lat={country.coordinates.lat}
            lng={country.coordinates.lng}
            label={country.capital}
          />
          <CurrencyConverter
            countryCurrency={country.currencyCode}
            countryCurrencyName={country.currency}
          />

          <div className="rounded-3xl bg-mesh p-6">
            <p className="text-sm font-semibold">Tags</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {country.tags.map((t) => (
                <Badge key={t} variant="glass">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          <AdSlot slot="country-sidebar" className="min-h-[280px]" />
        </aside>
      </div>

      {/* Related */}
      <section className="container-lux pb-20">
        <SectionHeading eyebrow="Keep exploring" title="Related countries" />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {relatedFallback.map((c) => (
            <DestinationCard
              key={c.slug}
              href={`/countries/${c.slug}`}
              image={c.thumbnail}
              title={`${c.flag} ${c.name}`}
              subtitle={c.tagline}
              badge={c.continent}
              rating={c.rating}
              bookmarkId={`country:${c.slug}`}
              aspect="landscape"
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/countries"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Browse all countries
          </Link>
        </div>
      </section>
    </>
  );
}
