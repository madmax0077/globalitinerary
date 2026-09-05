import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Ticket,
  Clock,
  MapPin,
  CalendarDays,
  Camera,
  Info,
  Check,
} from "lucide-react";
import { getAttraction, getAllAttractionSlugs, attractions } from "@/data/attractions";
import { getCity } from "@/data/cities";
import { getCountry } from "@/data/countries";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { DestinationCard } from "@/components/shared/destination-card";
import { Gallery } from "@/components/shared/gallery";
import { FaqSection } from "@/components/shared/faq-section";
import { ShareButtons } from "@/components/shared/share-buttons";
import { MapPlaceholder } from "@/components/shared/map-placeholder";
import { AdSlot } from "@/components/shared/ad-slot";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import {
  buildMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
  touristAttractionJsonLd,
  JsonLd,
} from "@/lib/seo";

export const revalidate = 604800;
export const dynamicParams = true;

export function generateStaticParams() {
  return getAllAttractionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const attraction = getAttraction(slug);
  if (!attraction) return {};
  return buildMetadata({
    title: `${attraction.name} — Visitor Guide, Tickets & Tips`,
    description: `${attraction.name} visitor guide: how to visit, tickets, opening hours, best time to go, photography tips and nearby attractions. ${attraction.tagline}.`,
    path: `/attractions/${attraction.slug}`,
    image: attraction.heroImage,
    keywords: [
      attraction.name,
      `visit ${attraction.name}`,
      `${attraction.name} tickets`,
      `${attraction.name} opening hours`,
      `things to do near ${attraction.name}`,
      attraction.category,
    ],
  });
}

export default async function AttractionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const attraction = getAttraction(slug);
  if (!attraction) notFound();

  const city = getCity(attraction.citySlug);
  const country = getCountry(attraction.countrySlug);
  const nearby = attraction.nearbySlugs
    .map((s) => getAttraction(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const nearbyFallback = nearby.length
    ? nearby
    : attractions.filter((a) => a.slug !== attraction.slug).slice(0, 3);

  const info = [
    { icon: Ticket, label: "Tickets", value: attraction.ticketPrice },
    { icon: Clock, label: "Opening hours", value: attraction.openingHours },
    { icon: CalendarDays, label: "Best time", value: attraction.bestTime },
    { icon: Info, label: "Suggested duration", value: attraction.duration },
    { icon: MapPin, label: "Address", value: attraction.address },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Attractions", url: "/attractions" },
            { name: attraction.name, url: `/attractions/${attraction.slug}` },
          ]),
          touristAttractionJsonLd({
            name: attraction.name,
            description: attraction.description,
            image: attraction.heroImage,
            lat: attraction.coordinates.lat,
            lng: attraction.coordinates.lng,
            address: attraction.address,
            slug: attraction.slug,
            cityName: attraction.cityName,
            citySlug: attraction.citySlug,
            countryName: attraction.countryName,
            countryCode: country?.id,
            category: attraction.category,
          }),
          faqJsonLd(attraction.faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={attraction.heroImage}
            alt={attraction.name}
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
              { name: "Attractions", href: "/attractions" },
              { name: attraction.name, href: `/attractions/${attraction.slug}` },
            ]}
          />
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="glass" className="text-white">
                  {attraction.category}
                </Badge>
                <Link href={`/cities/${attraction.citySlug}`}>
                  <Badge variant="glass" className="text-white">
                    <MapPin className="size-3" /> {attraction.cityName}, {attraction.countryName}
                  </Badge>
                </Link>
              </div>
              <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
                {attraction.name}
              </h1>
              <p className="mt-3 max-w-xl text-lg text-white/85">{attraction.tagline}</p>
            </div>
            <ShareButtons title={attraction.name} onDark />
          </div>
        </div>
      </section>

      <div className="container-lux grid gap-12 py-16 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-14">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight">About</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {attraction.description}
            </p>
          </Reveal>

          <Reveal className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h3 className="font-display text-xl font-bold">History</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{attraction.history}</p>
          </Reveal>

          {/* Photography tips */}
          <div>
            <SectionHeading eyebrow="For the shot" title="Photography tips" />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {attraction.photographyTips.map((tip, i) => (
                <Reveal
                  key={tip}
                  delay={i * 0.06}
                  className="rounded-2xl border border-border bg-card p-5 shadow-soft"
                >
                  <Camera className="size-5 text-primary" />
                  <p className="mt-3 text-sm text-muted-foreground">{tip}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Visitor guide */}
          <div className="rounded-3xl bg-mesh p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold">Visitor guide</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {attraction.visitorGuide.map((g) => (
                <li key={g} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald" />
                  {g}
                </li>
              ))}
            </ul>
          </div>

          {/* Gallery */}
          <div>
            <SectionHeading eyebrow="In pictures" title="Gallery" />
            <div className="mt-8">
              <Gallery images={attraction.gallery} title={attraction.name} />
            </div>
          </div>

          {/* FAQ */}
          {attraction.faqs.length > 0 && (
            <div>
              <SectionHeading eyebrow="Good to know" title="Frequently asked questions" />
              <div className="mt-8">
                <FaqSection faqs={attraction.faqs} />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h3 className="font-display text-lg font-bold">Plan your visit</h3>
            <dl className="mt-4 flex flex-col gap-4">
              {info.map((g) => (
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
          </div>
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            <MapPlaceholder coordinates={attraction.coordinates} label={attraction.name} />
          </div>
          {city && (
            <Link
              href={`/cities/${city.slug}`}
              className="flex items-center gap-3 rounded-3xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <span className="text-3xl">{country?.flag}</span>
              <div>
                <p className="text-xs text-muted-foreground">Explore the city</p>
                <p className="font-semibold">{city.name}</p>
              </div>
            </Link>
          )}
          <AdSlot slot="attraction-sidebar" className="min-h-[280px]" />
        </aside>
      </div>

      {/* Nearby */}
      <section className="container-lux pb-20">
        <SectionHeading eyebrow="Nearby" title="More to discover" />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {nearbyFallback.map((a) => (
            <DestinationCard
              key={a.slug}
              href={`/attractions/${a.slug}`}
              image={a.thumbnail}
              title={a.name}
              location={`${a.cityName}, ${a.countryName}`}
              badge={a.category}
              rating={a.rating}
              bookmarkId={`attraction:${a.slug}`}
              aspect="landscape"
            />
          ))}
        </div>
      </section>
    </>
  );
}
