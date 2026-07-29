"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { primaryNav, megaMenu } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => setOpen(false), [pathname]);
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="grid size-10 place-items-center rounded-full glass text-foreground lg:hidden"
      >
        <Menu className="size-[18px]" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col gap-6 overflow-y-auto bg-background p-6 shadow-lift"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="grid size-10 place-items-center rounded-full glass"
                >
                  <X className="size-[18px]" />
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {primaryNav.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-lg font-semibold transition-colors hover:bg-muted",
                      pathname === item.href && "text-primary"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/favorites"
                  className={cn(
                    "rounded-2xl px-4 py-3 text-lg font-semibold transition-colors hover:bg-muted",
                    pathname === "/favorites" && "text-primary"
                  )}
                >
                  Saved places
                </Link>
              </nav>

              <div>
                <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Top Countries
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {megaMenu.countries.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-medium"
                    >
                      <span>{c.flag}</span>
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Button asChild variant="gradient" size="lg" className="mt-auto">
                <Link href="/planner">Plan a trip</Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
