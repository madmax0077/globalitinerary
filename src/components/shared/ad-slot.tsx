import { cn } from "@/lib/utils";
import { AdUnit } from "@/components/shared/ad-unit";

/**
 * Responsive AdSense placement.
 *
 * Ads only render when BOTH conditions are met:
 *   - NEXT_PUBLIC_ADSENSE_CLIENT_ID is set (your ca-pub-… id), and
 *   - NEXT_PUBLIC_ADSENSE_ENABLED === "true".
 *
 * Until your AdSense account is approved, leave ADSENSE_ENABLED unset — this
 * renders nothing at all (no ad code, no placeholder boxes), which is the
 * correct state while your site is under review.
 */
export function AdSlot({
  slot,
  className,
  label = "Advertisement",
  format = "auto",
}: {
  slot?: string;
  className?: string;
  label?: string;
  format?: string;
}) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const enabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";

  // Not approved / not enabled yet → render nothing.
  if (!enabled || !client || !slot) return null;

  return (
    <aside
      aria-label={label}
      className={cn(
        "relative flex min-h-[120px] w-full items-center justify-center overflow-hidden rounded-3xl bg-background-subtle",
        className
      )}
    >
      <span className="absolute left-3 top-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
        {label}
      </span>
      <AdUnit client={client} slot={slot} format={format} />
    </aside>
  );
}
