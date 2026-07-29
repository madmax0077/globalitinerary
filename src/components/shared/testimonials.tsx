import Image from "next/image";
import { Quote } from "lucide-react";
import { Stars } from "@/components/shared/stars";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/data/content";

export function Testimonials() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {testimonials.map((t, i) => (
        <Reveal key={t.name} delay={i * 0.08}>
          <figure className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
            <Quote className="size-8 text-primary/30" />
            <blockquote className="flex-1 text-sm leading-relaxed text-foreground/90">
              “{t.quote}”
            </blockquote>
            <Stars rating={t.rating} size={13} />
            <figcaption className="flex items-center gap-3 border-t border-border pt-4">
              <Image
                src={t.avatar}
                alt={t.name}
                width={40}
                height={40}
                className="size-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
