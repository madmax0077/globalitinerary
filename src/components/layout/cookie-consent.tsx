"use client";

import * as React from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const KEY = "gi:cookie-consent";

export function CookieConsent() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* localStorage unavailable — skip the banner. */
    }
  }, []);

  const choose = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-3xl rounded-2xl border border-border bg-card/95 p-4 shadow-lift backdrop-blur-md sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <Cookie className="size-5" />
        </span>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          We use cookies to run this site, understand traffic and serve personalised ads via
          Google&nbsp;AdSense. See our{" "}
          <Link href="/cookies" className="font-medium text-primary underline">
            Cookie Policy
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="font-medium text-primary underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => choose("declined")}
            className="rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:border-primary/50"
          >
            Decline
          </button>
          <button
            onClick={() => choose("accepted")}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
