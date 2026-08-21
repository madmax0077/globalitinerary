import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { TOP_100_CITIES, top100ByRegion } from "@/data/top-100-cities";
import { getTop100GuideLink } from "@/data/top100-city-guides";
import {
  TOP_100_REGIONS,
  TOP_100_REGION_META,
} from "@/lib/city-taxonomy";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ShareButtons } from "@/components/shared/share-buttons";
import { Newsletter } from "@/components/shared/newsletter";
import { AdSlot } from "@/components/shared/ad-slot";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/section-heading";
import { buildMetadata, breadcrumbJsonLd, articleJsonLd, itemListJsonLd, JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import { PHOTOS, unsplash } from "@/lib/images";

const SLUG = "top-100-cities-to-visit-2026";
const TITLE = "Top 100 Cities to Visit in 2026: A Practical Traveller’s Ranking";
const EXCERPT =
  "Our honest Top 100 cities list for 2026 — ranked from major destination-city travel data, with a one-line reason to go and a link to each city guide on Global Itinerary.";
const DATE = "2026-08-17";
const COVER = unsplash(PHOTOS.cityNight, 1600);

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: TITLE,
  description: EXCERPT,
  path: `/blog/${SLUG}`,
  image: COVER,
  type: "article",
  publishedTime: DATE,
  authors: ["Amelia Chen"],
  keywords: [
    "top 100 cities",
    "best cities to visit 2026",
    "most visited cities",
    "city travel guide",
    "travel destinations",
    "Global Itinerary",
  ],
});


export default function Top100CitiesArticlePage() {
  const formattedDate = new Date(DATE).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Blog", url: "/blog" },
            { name: TITLE, url: `/blog/${SLUG}` },
          ]),
          articleJsonLd({
            title: TITLE,
            description: EXCERPT,
            image: COVER,
            datePublished: DATE,
            author: "Amelia Chen",
            url: `${siteConfig.url}/blog/${SLUG}`,
          }),
          itemListJsonLd(
            TOP_100_CITIES.map((c) => ({
              name: `#${c.rank} ${c.name}`,
              url: `/cities/${c.slug}`,
            })),
            TITLE,
          ),
        ]}
      />

      <article className="container-lux max-w-3xl pt-28">
        <Breadcrumbs
          items={[
            { name: "Blog", href: "/blog" },
            { name: "Top 100 Cities 2026", href: `/blog/${SLUG}` },
          ]}
        />

        <Badge className="mt-6">Guides</Badge>
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {TITLE}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{EXCERPT}</p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
          <div>
            <p className="text-sm font-semibold">Amelia Chen</p>
            <p className="text-xs text-muted-foreground">Senior Travel Editor</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-4" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" />
              18 min read
            </span>
          </div>
        </div>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl">
          <Image src={COVER} alt={TITLE} fill priority sizes="(max-width:768px) 100vw, 768px" className="object-cover" />
        </div>

        <div className="prose-lux mt-10 flex flex-col gap-8">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Travellers keep asking the same question: which cities are actually worth the flight in
            2026? This ranking is Global Itinerary’s practical Top 100 — grounded in how people
            really travel to cities (international arrivals, leisure demand and multi-day stay
            potential), not a random AI filler list. Every city below has a live guide on this
            site with budget ranges, sights and planning tips.
          </p>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">How we ranked these cities</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              Order follows the core destination-city set used across our tourism data (aligned with
              widely published city-arrival rankings such as Euromonitor Destination Cities and
              Mastercard Global Destination Cities research), then adds proven leisure hubs —
              Kyoto, Santorini, Queenstown, Cusco, Petra — that travellers deliberately plan trips
              around even when they are not the world’s largest airport cities. Rankings are for
              trip planning, not a scientific “best city” contest. Visa rules, safety advisories and
              seasons change — always check current guidance for your passport.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">How to use this list</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              Pick one primary city for a first visit, then add one complementary stop in the same
              region (for example Tokyo + Kyoto, Rome + Florence, Dubai + Abu Dhabi). Each city has
              a live destination page plus a separate 5–15 day itinerary post with trip cost and
              FAQs. Compare countries on our Compare tool when you are deciding between regions.
            </p>
          </div>

          {TOP_100_REGIONS.map((regionId) => {
            const meta = TOP_100_REGION_META[regionId];
            const regionCities = top100ByRegion(regionId);
            if (!regionCities.length) return null;
            return (
              <div key={regionId}>
                <h2 className="font-display text-2xl font-bold tracking-tight">{meta.title}</h2>
                <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{meta.body}</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {regionCities.map((c) => (
                    <li key={c.slug} className="rounded-2xl border border-border bg-card px-4 py-3 text-sm shadow-soft">
                      <Link href={`/cities/${c.slug}`} className="font-semibold text-primary hover:underline">
                        #{c.rank} {c.name}
                      </Link>
                      {(() => {
                        const guide = getTop100GuideLink(c.slug);
                        return guide ? (
                          <>
                            <span className="text-muted-foreground"> · </span>
                            <Link href={`/blog/${guide.articleSlug}`} className="text-primary hover:underline">
                              {guide.days}-day plan
                            </Link>
                          </>
                        ) : null;
                      })()}
                      <span className="text-muted-foreground">
                        {" "}
                        ·{" "}
                        <Link href={`/countries/${c.countrySlug}`} className="hover:underline">
                          {c.country}
                        </Link>
                        {" — "}
                        {c.why}
                      </span>
                      <p className="mt-1.5 flex flex-wrap gap-1.5">
                        {c.categories.map((cat) => (
                          <Badge key={cat} variant="outline" className="text-[10px] font-medium">
                            {cat}
                          </Badge>
                        ))}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">Full Top 100 ranking</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              Complete list with direct links to each city guide on Global Itinerary.
            </p>
            <ol className="mt-6 flex flex-col gap-2">
              {TOP_100_CITIES.map((c) => (
                <li
                  key={c.slug}
                  className="grid grid-cols-[2.5rem_1fr] gap-2 rounded-2xl border border-border bg-card px-3 py-3 text-sm shadow-soft sm:grid-cols-[3rem_1fr_auto]"
                >
                  <span className="font-display text-lg font-bold text-primary">{c.rank}</span>
                  <div>
                    <Link href={`/cities/${c.slug}`} className="font-semibold hover:text-primary hover:underline">
                      {c.name}
                    </Link>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3" />
                      <Link href={`/countries/${c.countrySlug}`} className="hover:underline">
                        {c.country}
                      </Link>
                    </p>
                    <p className="mt-1 text-muted-foreground">{c.why}</p>
                    <p className="mt-1.5 flex flex-wrap gap-1.5">
                      <Badge variant="outline" className="text-[10px]">
                        {TOP_100_REGION_META[c.region].title}
                      </Badge>
                      {c.categories.slice(0, 3).map((cat) => (
                        <Badge key={cat} variant="outline" className="text-[10px]">
                          {cat}
                        </Badge>
                      ))}
                    </p>
                  </div>
                  <span className="hidden self-center text-right text-xs font-semibold sm:block">
                    <Link href={`/cities/${c.slug}`} className="text-primary hover:underline">
                      City guide
                    </Link>
                    {(() => {
                      const guide = getTop100GuideLink(c.slug);
                      return guide ? (
                        <>
                          <span className="text-muted-foreground"> · </span>
                          <Link href={`/blog/${guide.articleSlug}`} className="text-primary hover:underline">
                            {guide.days}-day plan
                          </Link>
                        </>
                      ) : null;
                    })()}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">Budget reality check</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              Daily ground costs vary sharply across this list: Southeast Asian hubs often sit well
              under USD 100 mid-range per person, while Switzerland, Iceland, Nordic capitals and
              major US cities commonly run USD 150–300+. Use each city’s trip-cost section and our
              Trip Cost Estimator — figures exclude long-haul flights.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">FAQs</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              Is this the official “most visited cities” list? It is an editorial ranking for trip
              planning, informed by major destination-city data sets and leisure travel patterns —
              not a government statistic. Why include places like Petra or Queenstown? Because many
              travellers build whole itineraries around them. Should I visit all 100? No — choose a
              region, pick two or three cities, and go deep.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <div className="flex flex-wrap gap-2">
            {["Top 100", "Cities", "2026", "Travel Planning", "City Guides"].map((t) => (
              <Badge key={t} variant="outline">
                #{t}
              </Badge>
            ))}
          </div>
          <ShareButtons title={TITLE} />
        </div>

        <div className="mt-10">
          <AdSlot slot="article-footer" className="min-h-[140px]" />
        </div>

        <div className="mt-10">
          <SectionHeading eyebrow="Keep planning" title="Explore more city guides" />
          <p className="mt-3 text-muted-foreground">
            Browse all destinations or open the planner to sketch a multi-city trip.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/cities"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              All cities
            </Link>
            <Link
              href="/planner"
              className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold"
            >
              Trip planner
            </Link>
            <Link
              href="/compare"
              className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold"
            >
              Compare countries
            </Link>
          </div>
        </div>

        <div className="mt-14">
          <Newsletter />
        </div>
      </article>
    </>
  );
}
