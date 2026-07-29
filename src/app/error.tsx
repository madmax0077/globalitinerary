"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-lux flex min-h-[80vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-6xl font-extrabold text-gradient-sunset">Oops</p>
      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        We hit an unexpected turbulence. Try again in a moment.
      </p>
      <Button onClick={reset} variant="gradient" size="lg" className="mt-8">
        <RefreshCw className="size-4" /> Try again
      </Button>
    </div>
  );
}
