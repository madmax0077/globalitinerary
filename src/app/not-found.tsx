import Link from "next/link";
import { Compass, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-lux flex min-h-[80vh] flex-col items-center justify-center py-24 text-center">
      <div className="relative">
        <span className="pointer-events-none absolute inset-0 -z-10 bg-mesh opacity-70 blur-2xl" />
        <p className="font-display text-8xl font-extrabold text-gradient">404</p>
      </div>
      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight">
        This destination is off the map
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you&apos;re looking for has wandered off. Let&apos;s get you back on route.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild variant="gradient" size="lg">
          <Link href="/">
            <Home className="size-4" /> Back home
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/countries">
            <Compass className="size-4" /> Explore destinations
          </Link>
        </Button>
      </div>
    </div>
  );
}
