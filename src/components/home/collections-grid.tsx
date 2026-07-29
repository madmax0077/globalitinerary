import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { collections } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const accentRing: Record<string, string> = {
  primary: "from-primary/80",
  sunset: "from-sunset/80",
  emerald: "from-emerald/80",
  sky: "from-sky/80",
};

export function CollectionsGrid() {
  return (
    <div className="grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[240px]">
      {collections.map((c, i) => (
        <Reveal
          key={c.slug}
          delay={i * 0.06}
          className={cn(
            i === 0 && "col-span-2 row-span-2",
            i === 3 && "md:col-span-2"
          )}
        >
          <Link
            href={`/collections/${c.slug}`}
            className="group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-3xl p-5 text-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <Image
              src={c.image}
              alt={c.title}
              fill
              sizes="(max-width:768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t to-transparent",
                accentRing[c.accent]
              )}
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative">
              <p className="text-xs font-medium text-white/80">{c.count} places</p>
              <h3 className="font-display text-xl font-bold leading-tight">
                {c.title}
              </h3>
              <p className="mt-1 line-clamp-2 max-w-xs text-sm text-white/85">
                {c.description}
              </p>
            </div>
            <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/15 backdrop-blur-md transition group-hover:bg-white group-hover:text-black">
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
