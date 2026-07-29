"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, MapPin, Sparkles, Star } from "lucide-react";
import { SearchTrigger } from "@/components/search/search-trigger";
import { Badge } from "@/components/ui/badge";
import { unsplash, PHOTOS } from "@/lib/images";

const trending = [
  { label: "Japan", href: "/countries/japan" },
  { label: "Santorini", href: "/cities/santorini" },
  { label: "Machu Picchu", href: "/attractions/machu-picchu" },
  { label: "Dubai", href: "/cities/dubai" },
];

const stats = [
  { value: "194", label: "Countries" },
  { value: "1,000+", label: "Cities" },
  { value: "6", label: "Continents" },
  { value: "Free", label: "To explore" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={unsplash(PHOTOS.santoriniDomes, 2600)}
          alt="A breathtaking travel destination at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>

      <div className="container-lux w-full pt-28 pb-16">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <Badge variant="glass" className="mb-5 text-white">
              <Sparkles className="size-3.5" />
              The world&apos;s most beautiful travel guide
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            Explore every corner
            <br />
            of our{" "}
            <span className="bg-[linear-gradient(100deg,#7dd3fc,#34d399)] bg-clip-text text-transparent">
              beautiful planet
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/85"
          >
            Curated guides to every country, city, island and landmark on earth —
            with stunning photography, insider tips and itineraries crafted for the
            modern explorer.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease }}
            className="mt-8 max-w-xl rounded-full bg-white/10 p-2 backdrop-blur-md ring-1 ring-white/20"
          >
            <SearchTrigger className="h-13 border-transparent bg-white text-foreground dark:bg-white dark:text-neutral-900" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease }}
            className="mt-5 flex flex-wrap items-center gap-2"
          >
            <span className="flex items-center gap-1.5 text-sm text-white/70">
              <Compass className="size-4" /> Trending:
            </span>
            {trending.map((t) => (
              <Link
                key={t.label}
                href={t.href}
                className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/15 backdrop-blur-md transition hover:bg-white/20"
              >
                <MapPin className="size-3.5" />
                {t.label}
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="mt-16 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white/10 p-4 text-white backdrop-blur-md ring-1 ring-white/15"
            >
              <p className="font-display text-2xl font-bold sm:text-3xl">{s.value}</p>
              <p className="text-sm text-white/70">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/40 p-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="h-2 w-1 rounded-full bg-white/70"
          />
        </div>
      </motion.div>

      <span className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-center justify-center gap-1 pb-2 text-white/40">
        <Star className="size-3 fill-white/40" />
      </span>
    </section>
  );
}
