import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { unsplash, PHOTOS } from "@/lib/images";
import { cn } from "@/lib/utils";

type Category = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  href: string;
  highlights: string[];
  accent: "primary" | "sunset" | "emerald" | "sky";
};

const categories: Category[] = [
  {
    eyebrow: "Luxury Travel",
    title: "Five-star escapes, unforgettable moments",
    description:
      "Overwater villas, private butlers and Michelin tables. Discover the world's most exclusive stays and experiences.",
    image: unsplash(PHOTOS.maldives, 1600),
    href: "/collections/luxury-escapes",
    highlights: ["Private islands", "Michelin dining", "Butler service"],
    accent: "primary",
  },
  {
    eyebrow: "Beach & Islands",
    title: "Turquoise waters and endless summers",
    description:
      "From hidden coves to famous shores, find the perfect stretch of sand for your next getaway.",
    image: unsplash(PHOTOS.beach, 1600),
    href: "/collections/beach-paradise",
    highlights: ["Snorkeling", "Sunset sails", "Beach clubs"],
    accent: "sky",
  },
  {
    eyebrow: "Mountains & Adventure",
    title: "Chase the horizon, breathe the altitude",
    description:
      "Epic treks, alpine villages and adrenaline in the world's most dramatic landscapes.",
    image: unsplash(PHOTOS.alps, 1600),
    href: "/collections/mountain-adventures",
    highlights: ["Hiking trails", "Ski resorts", "Scenic railways"],
    accent: "emerald",
  },
  {
    eyebrow: "Food Journeys",
    title: "Taste your way around the globe",
    description:
      "Street food markets, family trattorias and culinary capitals worth crossing the world for.",
    image: unsplash(PHOTOS.food, 1600),
    href: "/collections/food-journeys",
    highlights: ["Street food", "Wine regions", "Cooking classes"],
    accent: "sunset",
  },
];

const accentText: Record<string, string> = {
  primary: "text-primary",
  sunset: "text-sunset",
  emerald: "text-emerald",
  sky: "text-sky",
};

export function CategoryShowcase() {
  return (
    <div className="flex flex-col gap-6">
      {categories.map((cat, i) => (
        <Reveal key={cat.title} delay={i * 0.05}>
          <div
            className={cn(
              "grid items-center gap-8 overflow-hidden rounded-[2rem] border border-border bg-card p-6 shadow-soft md:p-8 lg:grid-cols-2",
              i % 2 === 1 && "lg:[direction:rtl]"
            )}
          >
            <div className="relative aspect-[16/11] overflow-hidden rounded-3xl [direction:ltr]">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width:1024px) 90vw, 45vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="[direction:ltr]">
              <span
                className={cn(
                  "text-sm font-semibold uppercase tracking-[0.18em]",
                  accentText[cat.accent]
                )}
              >
                {cat.eyebrow}
              </span>
              <h3 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {cat.title}
              </h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                {cat.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {cat.highlights.map((h) => (
                  <Badge key={h} variant="outline">
                    {h}
                  </Badge>
                ))}
              </div>
              <Link
                href={cat.href}
                className={cn(
                  "group mt-7 inline-flex items-center gap-2 text-sm font-semibold",
                  accentText[cat.accent]
                )}
              >
                Explore the collection
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
