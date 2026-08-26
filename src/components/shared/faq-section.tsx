import type { FAQ } from "@/lib/types";

export function FaqSection({ faqs }: { faqs: FAQ[] }) {
  if (!faqs.length) return null;
  return (
    <div className="flex flex-col gap-8">
      {faqs.map((faq, i) => (
        <article key={i} className="rounded-2xl border border-border bg-card px-5 py-5 shadow-soft sm:px-6">
          <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-foreground">
            {faq.question}
          </h3>
          <p className="mt-2 select-none tracking-[0.4em] text-muted-foreground/55" aria-hidden>
            -----
          </p>
          <p className="mt-3 text-base leading-7 text-muted-foreground sm:leading-8">{faq.answer}</p>
        </article>
      ))}
    </div>
  );
}
