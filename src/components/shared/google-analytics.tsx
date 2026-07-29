import Script from "next/script";

/**
 * Google Analytics 4 (gtag.js). Renders nothing unless a Measurement ID
 * (G-XXXXXXXXXX) is provided, so it's safe to include unconditionally.
 */
export function GoogleAnalytics({ id }: { id?: string }) {
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
