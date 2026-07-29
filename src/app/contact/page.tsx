import { Mail, MessageCircle, Handshake, Bug } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { siteConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us",
  description: `Get in touch with the ${siteConfig.name} team.`,
  path: "/contact",
});

const reasons = [
  { icon: MessageCircle, title: "General questions", body: "Feedback, ideas or anything else about the site." },
  { icon: Bug, title: "Corrections", body: "Spotted something out of date or inaccurate? Let us know." },
  { icon: Handshake, title: "Partnerships & advertising", body: "Work with us or advertise on the site." },
];

const faqs = [
  {
    q: "How quickly will I get a reply?",
    a: "We read every message and typically respond within two to three business days. Detailed partnership enquiries can occasionally take a little longer.",
  },
  {
    q: "I found incorrect information in a guide — what should I do?",
    a: "Please email us the page link and what needs fixing. Our guides are compiled from open data sources such as Wikivoyage and Wikipedia, and traveller corrections genuinely help keep them accurate for everyone.",
  },
  {
    q: "Can I request a destination that isn't on the site yet?",
    a: "Absolutely. We add new countries, cities and attractions regularly, and reader requests help us prioritise what to publish next.",
  },
  {
    q: "Do you offer bookings or sell tickets?",
    a: "No. Global Itinerary is a free travel-guide and trip-planning resource — we don't process bookings or payments. We simply help you research and plan your trip.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact us"
        description="We usually reply within a couple of business days."
        breadcrumbs={[{ name: "Contact", href: "/contact" }]}
      />
      <div className="container-lux py-14">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Mail className="size-6" />
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold">Email us</h2>
            <p className="mt-2 text-muted-foreground">
              The best way to reach us is by email. Send your message to:
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90"
            >
              <Mail className="size-4" />
              {siteConfig.email}
            </a>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
                <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <r.icon className="size-5" />
                </span>
                <h3 className="mt-3 font-semibold">{r.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="font-display text-xl font-bold">Before you write</h2>
            <p className="mt-2 text-muted-foreground">
              To help us reply as quickly and usefully as possible, please include the
              specific page or destination you&apos;re writing about, and — if you&apos;re
              reporting a correction — a short note on what looks wrong and, where possible,
              a source. For partnership or advertising enquiries, a couple of lines about
              your company and what you have in mind lets us point you to the right details
              straight away.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="font-display text-xl font-bold">Frequently asked</h2>
            <div className="mt-4 flex flex-col gap-4">
              {faqs.map((f) => (
                <div key={f.q} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
                  <h3 className="font-semibold">{f.q}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            {siteConfig.name} · {siteConfig.domain}
          </p>
        </div>
      </div>
    </>
  );
}
