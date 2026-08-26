import { notFound } from "next/navigation";
import Image from "next/image";
import { collections } from "@/data/content";
import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import { attractions } from "@/data/attractions";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { DestinationCard } from "@/components/shared/destination-card";
import { Badge } from "@/components/ui/badge";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { buildMetadata, breadcrumbJsonLd, collectionPageJsonLd, JsonLd } from "@/lib/seo";

export const revalidate = 86400;

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) return {};
  return buildMetadata({
    title: collection.title,
    description: collection.description,
    path: `/collections/${collection.slug}`,
    image: collection.image,
  });
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) notFound();

  // A representative mix of destinations for the collection showcase.
  const picks = [
    ...cities.slice(0, 4).map((c) => ({
      id: `city:${c.slug}`,
      href: `/cities/${c.slug}`,
      image: c.thumbnail,
      title: c.name,
      location: c.countryName,
      rating: c.rating,
      bookmarkId: `city:${c.slug}`,
    })),
    ...attractions.slice(0, 3).map((a) => ({
      id: `attraction:${a.slug}`,
      href: `/attractions/${a.slug}`,
      image: a.thumbnail,
      title: a.name,
      location: a.cityName,
      badge: a.category,
      rating: a.rating,
      bookmarkId: `attraction:${a.slug}`,
    })),
    ...countries.slice(0, 3).map((c) => ({
      id: `country:${c.slug}`,
      href: `/countries/${c.slug}`,
      image: c.thumbnail,
      title: `${c.flag} ${c.name}`,
      badge: c.continent,
      rating: c.rating,
      bookmarkId: `country:${c.slug}`,
    })),
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Collections", url: "/collections" },
            { name: collection.title, url: `/collections/${collection.slug}` },
          ]),
          collectionPageJsonLd({
            name: collection.title,
            description: collection.description,
            url: `/collections/${collection.slug}`,
            numberOfItems: collection.count,
            items: picks.map((p) => ({ name: p.title, url: p.href })),
          }),
        ]}
      />
      <section className="relative flex min-h-[52vh] items-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={collection.image}
            alt={collection.title}
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
              { name: "Collections", href: "/collections" },
              { name: collection.title, href: `/collections/${collection.slug}` },
            ]}
          />
          <Badge variant="glass" className="mt-6 text-white">
            {collection.count} destinations
          </Badge>
          <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
            {collection.title}
          </h1>
          <p className="mt-3 max-w-xl text-lg text-white/85">{collection.description}</p>
        </div>
      </section>

      <div className="container-lux py-16">
        <Stagger className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {picks.map((p) => (
            <StaggerItem key={p.id}>
              <DestinationCard {...p} aspect="portrait" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </>
  );
}
