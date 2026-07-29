import { cn } from "@/lib/utils";
import { AdUnit } from "@/components/shared/ad-unit";
import { adsenseClientId } from "@/lib/config";

/**
 * Responsive AdSense placement.
 *
 * The verification script + ads.txt use the publisher id unconditionally, but
 * actual ad units only render when NEXT_PUBLIC_ADSENSE_ENABLED === "true".
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
  const client = adsenseClientId;
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
