import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd, JsonLd } from "@/lib/seo";
import { REVALIDATE_GUIDE_SECONDS } from "@/lib/isr";

export const metadata = buildMetadata({
  title: "ETIAS & EES Explained (2026) — Do You Need ETIAS for Europe?",
  description:
    "A plain-English guide to the EU's new ETIAS travel authorisation and EES entry/exit system: who needs ETIAS, when it starts, how much it costs, how to apply and which countries are covered.",
  path: "/etias-ees",
  keywords: [
    "ETIAS",
    "EES",
    "ees etias difference",
    "ETIAS vs EES",
    "do I need ETIAS",
    "ETIAS 2026",
    "EU entry exit system",
    "ETIAS application",
    "Schengen travel authorisation",
    "ETIAS cost",
    "e.e.s. cost",
    "EES cost",
  ],
});

export const revalidate = REVALIDATE_GUIDE_SECONDS;

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "ETIAS & EES guide", href: "/etias-ees" },
];

const faqs = [
  {
    question: "Is ETIAS a visa?",
    answer:
      "No. ETIAS is a travel authorisation, not a visa. It's for travellers who are already visa-exempt for short stays in the Schengen area. If your nationality needs a Schengen visa, ETIAS does not apply to you — you still apply for a visa.",
  },
  {
    question: "When do ETIAS and EES start?",
    answer:
      "The Entry/Exit System (EES) began a phased rollout at Schengen borders in late 2025. ETIAS is expected to become mandatory in the last quarter of 2026, following a transitional grace period. Start dates have shifted several times, so always confirm on the official EU sites before you travel.",
  },
  {
    question: "How much does ETIAS cost and how long is it valid?",
    answer:
      "ETIAS costs €20 for most applicants (free for those under 18 or over 70). Once approved it is valid for three years, or until your passport expires, and covers multiple short stays of up to 90 days in any 180-day period.",
  },
  {
    question: "How do I apply for ETIAS?",
    answer:
      "You apply online via the official ETIAS website or app once it launches. Most applications are approved within minutes, but allow several days in case extra checks are needed. Only use the official EU portal — avoid third-party sites that charge extra fees.",
  },
  {
    question: "What is the difference between ETIAS and EES?",
    answer:
      "EES is an automated system that records non-EU travellers' entries and exits (including fingerprints and a facial image) to replace manual passport stamping. ETIAS is the pre-travel authorisation you obtain before you go. EES happens at the border; ETIAS happens before your trip.",
  },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10">
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <div className="mt-3 flex flex-col gap-3 text-muted-foreground">{children}</div>
    </div>
  );
}

export default function EtiasEesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs.map((b) => ({ name: b.name, url: b.href })))} />
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero
        eyebrow="Europe entry rules 2026"
        title="ETIAS & EES, explained"
        description="Two new EU border systems are changing how visa-free travellers enter Europe. Here's exactly what they are, who they affect and what you need to do — in plain English."
        breadcrumbs={breadcrumbs}
      />

      <div className="container-lux py-12">
        <article className="mx-auto max-w-3xl">
          <Section title="What is ETIAS?">
            <p>
              ETIAS (European Travel Information and Authorisation System) is a new online
              travel authorisation for people who can currently visit the Schengen area
              without a visa — for example travellers from the UK, US, Canada, Australia,
              Japan and dozens of other visa-exempt countries. It is <strong>not a visa</strong>:
              it&apos;s a quick pre-screening linked to your passport, similar to the US ESTA.
            </p>
            <p>
              Once approved, ETIAS is valid for <strong>three years</strong> (or until your
              passport expires) and allows multiple short stays of up to <strong>90 days
              within any 180-day period</strong> across the Schengen countries.
            </p>
          </Section>

          <Section title="What is EES?">
            <p>
              The Entry/Exit System (EES) is a digital border system that automatically
              records when non-EU travellers enter and leave the Schengen area, capturing
              your passport details, a facial image and fingerprints. It replaces the manual
              passport stamp and is designed to make border crossings faster over time —
              though expect longer queues during the initial rollout as travellers register.
            </p>
          </Section>

          <Section title="Do you need ETIAS?">
            <p>
              You&apos;ll need ETIAS if <strong>all three</strong> of these are true: you are a
              non-EU/EEA national, your nationality is currently visa-exempt for short
              Schengen stays, and you are visiting for tourism, business, transit or a short
              stay. If your nationality requires a Schengen visa, you apply for the visa as
              usual and ETIAS does not apply. EU, EEA and Swiss citizens don&apos;t need it at all.
            </p>
            <p>
              Not sure about your specific passport? Open any European country&apos;s{" "}
              <Link href="/countries" className="font-semibold text-primary hover:underline">
                travel guide
              </Link>{" "}
              and use the visa checker — it will tell you whether you need a visa, ETIAS, or
              nothing at all.
            </p>
          </Section>

          <Section title="How to apply (and avoid scams)">
            <p>
              Applications are made online through the official EU ETIAS portal or mobile
              app. You&apos;ll need a valid passport, an email address and a debit/credit card
              for the <strong>€20 fee</strong> (free for applicants under 18 or over 70). Most
              approvals arrive within minutes. Crucially, only use the official EU website —
              many third-party sites charge inflated &quot;service&quot; fees for the same authorisation.
            </p>
          </Section>

          <div className="mt-10 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm">
            <strong>Please verify before you travel.</strong> ETIAS and EES start dates and
            rules have changed multiple times. This guide reflects the situation as of 2026 —
            always confirm the latest details and apply only through the official EU
            (travel-europe.europa.eu) websites.
          </div>
        </article>

        <div className="mx-auto mt-12 max-w-3xl">
          <FaqSection faqs={faqs} />
        </div>
      </div>
    </>
  );
}
