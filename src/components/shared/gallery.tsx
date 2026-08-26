"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Gallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = React.useState<number | null>(null);

  const close = () => setIndex(null);
  const prev = React.useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const next = React.useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
  );

  React.useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, prev, next]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-4">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={cn(
              "group relative overflow-hidden rounded-2xl",
              i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-[4/3]" : "aspect-square"
            )}
          >
            <Image
              src={src}
              alt={`${title} travel photo ${i + 1} of ${images.length} — destinations and landmarks in the ${title} guide`}
              fill
              sizes="(max-width:640px) 45vw, 22vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-black/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              aria-label="Close"
              onClick={close}
              className="absolute right-5 top-5 grid size-11 place-items-center rounded-full glass text-white"
            >
              <X className="size-5" />
            </button>
            <button
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 grid size-12 place-items-center rounded-full glass text-white sm:left-8"
            >
              <ChevronLeft className="size-6" />
            </button>
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-[3/2] w-full max-w-4xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[index]}
                alt={`${title} travel photo ${index + 1} of ${images.length} — destinations and landmarks in the ${title} guide`}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>
            <button
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 grid size-12 place-items-center rounded-full glass text-white sm:right-8"
            >
              <ChevronRight className="size-6" />
            </button>
            <p className="absolute bottom-6 text-sm text-white/70">
              {index + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
