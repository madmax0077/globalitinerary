import Link from "next/link";
import { Globe2, Route, ShieldCheck, Sparkles } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";
import { authorList } from "@/data/authors";

export const metadata = buildMetadata({
  title: "About Us",
  description: `How ${siteConfig.name} builds travel guides: original itineraries and trip-cost models, named editors, and clearly sourced practical notes.`,
  path: "/about",
});

const values = [
  {
    icon: Globe2,
    title: "Coverage with a plan",
    body: "Country hubs plus city guides — but rankings, stay length and cost bands are calculated here, not scraped as a page farm.",
  },
  {
    icon: Route,
    title: "Real itineraries",
    body: "Day-by-day plans use real points of interest. Extra days stay slack or optional — we do not invent landmarks to fill a template.",
  },
  {
    icon: ShieldCheck,
    title: "Named editors",
    body: "Guides carry a byline. The desk explains how rankings and costs are produced, and tells you when to check official sources.",
  },
  {
    icon: Sparkles,
    title: "Free to use",
    body: "The site is free, supported by clearly labelled advertising. Ads never decide what we recommend.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={`About ${siteConfig.name}`}
        description="A trip-planning layer on top of destination facts — itineraries, costs, visas and rankings you can actually use."
        breadcrumbs={[{ name: "About", href: "/about" }]}
      />
      <div className="container-lux py-14">
        <div className="mx-auto max-w-3xl space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            {siteConfig.name} is a free travel-planning site. We help you decide where to go, how
            long to stay, what a trip costs, and which cities to chain together — then hand you a
            visa check and a packing list before you book.
          </p>
          <p>
            What we add ourselves: the{" "}
            <Link href="/blog/top-100-cities-to-visit-2026" className="font-medium text-primary underline">
              Top 100 cities ranking
            </Link>
            , 5–15 day city itineraries, the{" "}
            <Link href="/trip-cost" className="font-medium text-primary underline">
              trip-cost estimator
            </Link>
            , multi-city routes, and first-timer planning copy on each destination page. Those
            layers are editorial, not a republish of someone else&apos;s guidebook.
          </p>
          <p>
            Practical background — history, culture, money, getting around, safety and etiquette —
            is adapted from{" "}
            <a
              href="https://www.wikivoyage.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline"
            >
              Wikivoyage
            </a>{" "}
            under CC BY-SA and attributed on the destination page. Live weather and currency rates
            come from open data APIs. Always confirm visas, health and safety with official sources
            before you travel.
          </p>
        </div>

        <div className="mt-16">
          <SectionHeading
            eyebrow="How a guide is made"
            title="Editorial process"
          />
          <ol className="mx-auto mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <li>
              <span className="font-semibold text-foreground">1. Destination data.</span> Cities and
              countries are matched to coordinates, seasons, cost bands and (where we have them)
              real sights, stays and food lists — not placeholder “old town / cathedral” filler.
            </li>
            <li>
              <span className="font-semibold text-foreground">2. Original planning layer.</span>{" "}
              Editors add trip length, route order, daily budgets and FAQs using our own models.
              Thin shells are not pushed as full guides.
            </li>
            <li>
              <span className="font-semibold text-foreground">3. Source and check.</span> Wiki-derived
              practical notes stay attributed. Visa matrices and safety copy tell you to verify
              officially. Corrections are welcome via{" "}
              <Link href="/contact" className="font-medium text-primary underline">
                Contact
              </Link>
              .
            </li>
          </ol>
        </div>

        <div className="mt-16">
          <SectionHeading eyebrow="The desk" title="Who edits these pages" />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {authorList.map((author) => (
              <Link
                key={author.slug}
                href={`/authors/${author.slug}`}
                className="rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:border-primary/40"
              >
                <p className="font-display text-lg font-bold">{author.name}</p>
                <p className="text-sm text-primary">{author.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{author.focus}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <SectionHeading eyebrow="What we stand for" title="Why travellers use us" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 0.06}
                className="rounded-3xl border border-border bg-card p-6 shadow-soft"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <v.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-border bg-mesh p-8 text-center">
          <h2 className="font-display text-2xl font-bold">Get in touch</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            Have a correction, a sourcing question or a partnership idea? We&apos;d rather fix a
            page than leave a wrong fact up.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90"
          >
            Contact us
          </Link>
        </div>
      </div>
    </>
  );
}
