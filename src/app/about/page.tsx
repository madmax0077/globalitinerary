import Link from "next/link";
import { Globe2, Route, ShieldCheck, Sparkles } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us",
  description: `Learn about ${siteConfig.name} — our mission, how we build our travel guides and where our information comes from.`,
  path: "/about",
});

const values = [
  {
    icon: Globe2,
    title: "Every destination",
    body: "Guides to nearly 200 countries and thousands of cities, with more added continually.",
  },
  {
    icon: Route,
    title: "Real itineraries",
    body: "Day-by-day plans, routes and day trips built from real points of interest — never filler.",
  },
  {
    icon: ShieldCheck,
    title: "Honest information",
    body: "We surface practical, sourced guidance and clearly cite where our content comes from.",
  },
  {
    icon: Sparkles,
    title: "Free to use",
    body: "The site is free for everyone, supported by tasteful, clearly-labelled advertising.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={`About ${siteConfig.name}`}
        description={siteConfig.description}
        breadcrumbs={[{ name: "About", href: "/about" }]}
      />
      <div className="container-lux py-14">
        <div className="mx-auto max-w-3xl space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            {siteConfig.name} is a free travel guide built to help you plan every journey with
            confidence — from choosing where to go, to knowing what to pack, to mapping out each day
            once you arrive.
          </p>
          <p>
            We combine beautiful destination photography with genuinely useful, practical
            information: visas and entry rules, money and budgets, getting around, safety and health
            tips, the best time to visit, and day-by-day itineraries you can actually follow.
          </p>
          <p>
            Much of our practical destination text is adapted from{" "}
            <a href="https://www.wikivoyage.org" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">
              Wikivoyage
            </a>{" "}
            (available under the CC BY-SA licence), and we use free, open data services for live
            weather and currency information. We always aim to be transparent about our sources — and
            we encourage you to verify critical details with official sources before you travel.
          </p>
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
            Have feedback, a correction or a partnership idea? We&apos;d love to hear from you.
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
