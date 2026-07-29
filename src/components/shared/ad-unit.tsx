"use client";

import * as React from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/** Renders a real AdSense unit and requests a fill once mounted. */
export function AdUnit({
  client,
  slot,
  format = "auto",
}: {
  client: string;
  slot: string;
  format?: string;
}) {
  React.useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* AdSense not ready yet — it will retry on next navigation. */
    }
  }, []);

  return (
    <ins
      className="adsbygoogle block w-full"
      style={{ display: "block" }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
