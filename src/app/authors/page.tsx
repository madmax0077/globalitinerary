import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { authorList } from "@/data/authors";
import { buildMetadata, breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Authors & editorial team",
  description: `Meet the ${siteConfig.name} editors behind city rankings, itineraries and trip-cost guides — and how destination pages are researched and checked.`,
  path: "/authors",
});

export default function AuthorsIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Authors", url: "/authors" },
        ])}
      />
      <PageHero
        eyebrow="Editorial"
        title="Authors & editors"
        description="Guides are compiled and edited by a named desk — not anonymous template dumps. Open a profile for their focus and published work."
        breadcrumbs={[{ name: "Authors", href: "/authors" }]}
      />
      <div className="container-lux py-14">
        <SectionHeading
          eyebrow="Who writes this"
          title="The Global Itinerary desk"
          description="Bylines mark editorial ownership. Itineraries use real places; practical background is sourced and attributed."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {authorList.map((author) => (
            <Link
              key={author.slug}
              href={`/authors/${author.slug}`}
              className="rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={author.avatar}
                alt={`${author.name}, ${author.role}`}
                width={64}
                height={64}
                className="size-16 rounded-full"
              />
              <h2 className="mt-4 font-display text-xl font-bold">{author.name}</h2>
              <p className="text-sm text-primary">{author.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{author.focus}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
