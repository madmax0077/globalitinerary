import type { ImageCredit } from "@/lib/image-credits";

/** Most guide photos are CC BY-SA, which requires naming the photographer. */
export function PhotoCredit({
  credit,
  onDark,
  className = "",
}: {
  credit: ImageCredit | null;
  onDark?: boolean;
  className?: string;
}) {
  if (!credit) return null;
  const tone = onDark ? "text-white/70" : "text-muted-foreground";
  return (
    <p className={`text-xs ${tone} ${className}`}>
      Photo:{" "}
      <a
        href={credit.filePage}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="underline underline-offset-2 hover:opacity-80"
      >
        {credit.artist}
      </a>
      {credit.licenseName ? (
        <>
          {" · "}
          <a
            href={credit.licenseUrl || credit.filePage}
            target="_blank"
            rel="license noopener noreferrer nofollow"
            className="underline underline-offset-2 hover:opacity-80"
          >
            {credit.licenseName}
          </a>
        </>
      ) : null}
    </p>
  );
}
