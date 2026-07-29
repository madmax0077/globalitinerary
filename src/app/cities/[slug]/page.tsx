import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  CloudSun,
  Plane,
  TramFront,
  Sparkles,
  UtensilsCrossed,
  Hotel,
  ShoppingBag,
  Wine,
  Landmark,
  Gem,
  Lightbulb,
  Check,
  Gift,
} from "lucide-react";
import { getCity, getPrerenderedCitySlugs, cities } from "@/data/cities";
import { getAttractionsByCity } from "@/data/attractions";
import { getFreeThings } from "@/lib/free-things";
import { getCountry } from "@/data/countries";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { DestinationCard } from "@/components/shared/destination-card";
import { Gallery } from "@/components/shared/gallery";
import { FaqSection } from "@/components/shared/faq-section";
import { ShareButtons } from "@/components/shared/share-buttons";
import { MapPlaceholder } from "@/components/shared/map-placeholder";
import { ItineraryPlanner } from "@/components/shared/itinerary-planner";
import { AdSlot } from "@/components/shared/ad-slot";
import { SectionHeading } from "@/components/shared/section-heading";
import { LocalTime } from "@/components/tools/local-time";
import { WeatherNow } from "@/components/tools/weather-now";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import {
  buildMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
  touristDestinationJsonLd,
  JsonLd,
} from "@/lib/seo";

function haversine(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams() {
  return getPrerenderedCitySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  return buildMetadata({
    title: `Things to Do in ${city.name} — Travel Guide & Itinerary`,
    description: `The best things to do in ${city.name}: top attractions, a day-by-day itinerary, where to stay, best time to visit, local food and free things to do.`,
    path: `/cities/${city.slug}`,
    image: city.heroImage,
    keywords: [
      `things to do in ${city.name}`,
      `${city.name} travel guide`,
      `${city.name} itinerary`,
      `best time to visit ${city.name}`,
      `where to stay in ${city.name}`,
      `free things to do in ${city.name}`,
      `visit ${city.name}`,
    ],
  });
}

function ListCard({
  icon: Icon,
  title,
  items,
}: {
  icon: React.ElementType;
  title: string;
  items: string[];
}) {
  if (!items || items.length === 0) return null;
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-4" />
        </span>
        <h3 className="font-display text-lg font-bold">{title}</h3>
      </div>
      <ul className="mt-4 flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="mt-0.5 size-4 shrink-0 text-emerald" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const country = getCountry(city.countrySlug);
  const cityAttractions = getAttractionsByCity(city.slug);
  const freeThings = getFreeThings(city, cityAttractions);

  // Day trips = nearest cities within the same country (by real coordinates).
  const dayTrips = cities
    .filter((c) => c.slug !== city.slug && c.countrySlug === city.countrySlug)
    .map((c) => ({ city: c, dist: haversine(city.coordinates, c.coordinates) }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 4)
    .map((x) => x.city);

  const related =
    dayTrips.length > 0
      ? dayTrips
      : cities.filter((c) => c.slug !== city.slug).slice(0, 4);

  const facts = [
    { icon: CalendarDays, label: "Best time", value: city.bestTime },
    { icon: CloudSun, label: "Weather", value: city.weather },
    { icon: Plane, label: "Airport", value: city.airport },
    { icon: TramFront, label: "Getting around", value: city.transport },
  ].filter((f) => f.value);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Cities", url: "/cities" },
            { name: city.name, url: `/cities/${city.slug}` },
          ]),
          touristDestinationJsonLd({
            name: city.name,
            description: city.overview,
            image: city.heroImage,
            lat: city.coordinates.lat,
            lng: city.coordinates.lng,
          }),
          faqJsonLd(city.faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={city.heroImage}
            alt={city.name}
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
              { name: "Cities", href: "/cities" },
              { name: city.name, href: `/cities/${city.slug}` },
            ]}
          />
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Link href={`/countries/${city.countrySlug}`}>
                <Badge variant="glass" className="text-white">
                  {country?.flag} {city.countryName}
                </Badge>
              </Link>
              <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
                {city.name}
              </h1>
              <p className="mt-3 max-w-xl text-lg text-white/85">{city.tagline}</p>
            </div>
            <ShareButtons title={`${city.name} Travel Guide`} onDark />
          </div>
        </div>
      </section>

      <div className="container-lux grid gap-12 py-16 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-14">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight">
              About {city.name}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {city.overview}
            </p>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="rounded-2xl border border-border bg-card p-4 shadow-soft"
                >
                  <f.icon className="size-5 text-primary" />
                  <p className="mt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {f.label}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold">{f.value}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Things to do */}
          {city.thingsToDo.length > 0 && (
          <div>
            <SectionHeading eyebrow="Experiences" title={`Things to do in ${city.name}`} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {city.thingsToDo.map((thing, i) => (
                <Reveal
                  key={thing}
                  delay={i * 0.05}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                  <p className="text-sm font-medium">{thing}</p>
                </Reveal>
              ))}
            </div>
          </div>
          )}

          {/* Free things to do */}
          {freeThings.length >= 2 && (
            <div>
              <SectionHeading
                eyebrow="Budget travel"
                title={`Free things to do in ${city.name}`}
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {freeThings.map((thing, i) => (
                  <Reveal
                    key={thing}
                    delay={i * 0.05}
                    className="flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 shadow-soft"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      <Gift className="size-4" />
                    </span>
                    <p className="text-sm font-medium">{thing}</p>
                  </Reveal>
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Mostly free or pay-what-you-like — always double-check opening times and
                any seasonal fees before you go.
              </p>
            </div>
          )}

          {/* Itinerary */}
          {city.itinerary.length > 0 && (
            <div>
              <SectionHeading eyebrow="Plan your trip" title="Suggested itinerary" />
              <div className="mt-8">
                <ItineraryPlanner days={city.itinerary} />
              </div>
            </div>
          )}

          <AdSlot slot="city-mid" className="min-h-[120px]" />

          {/* Eat / stay / shop grids */}
          <div className="grid gap-5 sm:grid-cols-2">
            {city.restaurants.length > 0 && (
              <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-9 place-items-center rounded-xl bg-sunset/10 text-sunset">
                    <UtensilsCrossed className="size-4" />
                  </span>
                  <h3 className="font-display text-lg font-bold">Where to eat</h3>
                </div>
                <ul className="mt-4 flex flex-col gap-3">
                  {city.restaurants.map((r) => (
                    <li key={r.name} className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold">{r.name}</p>
                        {(r.cuisine || r.note) && (
                          <p className="text-xs text-muted-foreground">
                            {r.cuisine}
                            {r.cuisine && r.note ? " • " : ""}
                            {r.note ?? ""}
                          </p>
                        )}
                      </div>
                      {typeof r.priceLevel === "number" && (
                        <span className="text-sm text-emerald">{"$".repeat(r.priceLevel)}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <ListCard icon={Hotel} title="Where to stay" items={city.hotels} />
            <ListCard icon={ShoppingBag} title="Shopping" items={city.shopping} />
            <ListCard icon={Wine} title="Nightlife" items={city.nightlife} />
            <ListCard icon={Landmark} title="Museums & culture" items={city.museums} />
            <ListCard icon={Sparkles} title="Local foods to try" items={city.localFoods} />
          </div>

          {/* Hidden gems & tips */}
          <div className="grid gap-5 sm:grid-cols-2">
            <ListCard icon={Gem} title="Hidden gems" items={city.hiddenGems} />
            <ListCard icon={Lightbulb} title="Travel tips" items={city.tips} />
          </div>

          {/* Attractions in the city */}
          {cityAttractions.length > 0 && (
            <div>
              <SectionHeading eyebrow="Nearby" title="Attractions in the city" />
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {cityAttractions.map((a) => (
                  <DestinationCard
                    key={a.slug}
                    href={`/attractions/${a.slug}`}
                    image={a.thumbnail}
                    title={a.name}
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
            <SectionHeading eyebrow="In pictures" title={`${city.name} gallery`} />
            <div className="mt-8">
              <Gallery images={city.gallery} title={city.name} />
            </div>
          </div>

          {/* FAQ */}
          {city.faqs.length > 0 && (
            <div>
              <SectionHeading eyebrow="Good to know" title="Frequently asked questions" />
              <div className="mt-8">
                <FaqSection faqs={city.faqs} />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            <MapPlaceholder coordinates={city.coordinates} label={city.name} />
          </div>
          {country && <LocalTime timezone={country.timezone} label={city.name} />}
          <WeatherNow lat={city.coordinates.lat} lng={city.coordinates.lng} label={city.name} />
          {country && (
            <Link
              href={`/countries/${country.slug}`}
              className="flex items-center gap-3 rounded-3xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <span className="text-3xl">{country.flag}</span>
              <div>
                <p className="text-xs text-muted-foreground">Country guide</p>
                <p className="font-semibold">{country.name}</p>
              </div>
            </Link>
          )}
          <AdSlot slot="city-sidebar" className="min-h-[280px]" />
        </aside>
      </div>

      {/* Related / day trips */}
      <section className="container-lux pb-20">
        <SectionHeading
          eyebrow="Keep exploring"
          title={dayTrips.length > 0 ? "Day trips & nearby cities" : "Related cities"}
        />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {related.map((c) => (
            <DestinationCard
              key={c.slug}
              href={`/cities/${c.slug}`}
              image={c.thumbnail}
              title={c.name}
              location={c.countryName}
              rating={c.rating}
              bookmarkId={`city:${c.slug}`}
              aspect="landscape"
            />
          ))}
        </div>
      </section>
    </>
  );
}
