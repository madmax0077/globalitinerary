"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Globe2, Sparkles } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { SearchTrigger, SearchIconButton } from "@/components/search/search-trigger";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { primaryNav, megaMenu } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [megaOpen, setMegaOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setMegaOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={cn(
          "transition-all duration-500",
          scrolled ? "px-3 pt-3" : "px-0 pt-0"
        )}
      >
        <div
          className={cn(
            "mx-auto flex h-16 items-center gap-4 transition-all duration-500",
            scrolled
              ? "container-lux max-w-6xl rounded-full glass-strong px-4 shadow-lift"
              : "container-lux px-5 sm:px-6 lg:px-8"
          )}
        >
          <Logo />

          <nav className="ml-2 hidden items-center gap-1 lg:flex">
            {primaryNav.map((item) =>
              "hasMega" in item && item.hasMega ? (
                <div
                  key={item.label}
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:bg-muted",
                      pathname.startsWith("/countries") && "text-primary"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform",
                        megaOpen && "rotate-180"
                      )}
                    />
                  </Link>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:bg-muted",
                    pathname === item.href && "text-primary"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="ml-auto hidden max-w-xs flex-1 md:block lg:max-w-sm">
            <SearchTrigger />
          </div>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <SearchIconButton className="md:hidden" />
            <ThemeToggle />
            <Button asChild variant="gradient" size="sm" className="hidden sm:inline-flex">
              <Link href="/planner">
                <Sparkles className="size-4" /> Plan a trip
              </Link>
            </Button>
            <MobileNav />
          </div>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
              className="container-lux absolute inset-x-0 top-full hidden pt-2 lg:block"
            >
              <div className="mx-auto grid max-w-5xl grid-cols-3 gap-6 rounded-3xl glass-strong p-6 shadow-lift">
                <div>
                  <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <Globe2 className="size-3.5" /> Top Countries
                  </p>
                  <div className="grid gap-1">
                    {megaMenu.countries.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-muted"
                      >
                        <span className="text-xl">{c.flag}</span>
                        <span>
                          <span className="block text-sm font-semibold">{c.name}</span>
                          <span className="block text-xs text-muted-foreground">
                            {c.caption}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Trending Cities
                  </p>
                  <div className="grid gap-1">
                    {megaMenu.cities.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-muted"
                      >
                        <span className="relative size-9 overflow-hidden rounded-lg">
                          <Image src={c.image} alt="" fill sizes="36px" className="object-cover" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold">{c.name}</span>
                          <span className="block text-xs text-muted-foreground">
                            {c.caption}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-mesh p-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Collections
                  </p>
                  <div className="grid gap-1.5">
                    {megaMenu.collections.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium glass transition-transform hover:translate-x-1"
                      >
                        {c.name}
                        <span className="text-xs text-muted-foreground">{c.caption}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
