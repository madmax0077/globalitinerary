import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { countries } from "@/data/countries";
import { collections } from "@/data/content";
import { authorList } from "@/data/authors";
import { continents } from "@/lib/navigation";
import { buildMetadata, breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/config";

export const revalidate = 86400;

export const metadata = buildMetadata({
  title: "Sitemap",
  description: `HTML sitemap for ${siteConfig.name}: countries, collections, travel tools, guides and author pages.`,
  path: "/sitemap",
});

const tools = [
  { href: "/planner", label: "Trip planner" },
  { href: "/route-planner", label: "Multi-city route planner" },
  { href: "/trip-cost", label: "Trip cost estimator" },
  { href: "/packing-list", label: "Packing list" },
  { href: "/compare", label: "Compare destinations" },
  { href: "/etias-ees", label: "ETIAS & EES guide" },
  { href: "/map", label: "Interactive map" },
];

const hubs = [
  { href: "/countries", label: "All countries" },
  { href: "/cities", label: "All cities" },
  { href: "/attractions", label: "Attractions" },
  { href: "/collections", label: "Collections" },
  { href: "/blog", label: "Travel guides" },
  { href: "/blog/top-100-cities-to-visit-2026", label: "Top 100 cities 2026" },
  { href: "/blog/top-200-cities-to-visit-2026", label: "Cities 101–200" },
  { href: "/about", label: "About & editorial process" },
  { href: "/authors", label: "Authors" },
  { href: "/contact", label: "Contact" },
];

export default function HtmlSitemapPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Sitemap", url: "/sitemap" },
        ])}
      />
      <PageHero
        eyebrow="Index"
        title="Sitemap"
        description="Every major hub on Global Itinerary — countries, tools, collections and guides."
        breadcrumbs={[{ name: "Sitemap", href: "/sitemap" }]}
      />
      <div className="container-lux space-y-14 py-14">
        <section>
          <SectionHeading eyebrow="Start here" title="Main pages" />
          <ul className="mt-6 columns-2 gap-x-8 text-sm sm:columns-3">
            {hubs.map((item) => (
              <li key={item.href} className="break-inside-avoid py-1">
                <Link href={item.href} className="text-primary hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionHeading eyebrow="Plan" title="Travel tools" />
          <ul className="mt-6 columns-2 gap-x-8 text-sm sm:columns-3">
            {tools.map((item) => (
              <li key={item.href} className="break-inside-avoid py-1">
                <Link href={item.href} className="text-primary hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionHeading eyebrow="Themes" title="Collections" />
          <ul className="mt-6 columns-2 gap-x-8 text-sm sm:columns-3">
            {collections.map((c) => (
              <li key={c.slug} className="break-inside-avoid py-1">
                <Link href={`/collections/${c.slug}`} className="text-primary hover:underline">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionHeading eyebrow="Team" title="Authors" />
          <ul className="mt-6 flex flex-col gap-1 text-sm">
            {authorList.map((a) => (
              <li key={a.slug}>
                <Link href={`/authors/${a.slug}`} className="text-primary hover:underline">
                  {a.name} — {a.role}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionHeading
            eyebrow="Destinations"
            title="Countries by continent"
            description="Each country page links through to its city guides."
          />
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {continents.map((continent) => {
              const list = countries
                .filter((c) => c.continent === continent)
                .sort((a, b) => a.name.localeCompare(b.name));
              return (
                <div key={continent}>
                  <h3 className="font-display text-lg font-bold">{continent}</h3>
                  <ul className="mt-3 columns-2 gap-x-4 text-sm">
                    {list.map((c) => (
                      <li key={c.slug} className="break-inside-avoid py-0.5">
                        <Link href={`/countries/${c.slug}`} className="hover:text-primary hover:underline">
                          {c.flag} {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
