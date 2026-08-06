import Script from "next/script";

/**
 * Ezoic standalone integration.
 *
 * Off by default — running Ezoic alongside AdSense often blocks AdSense
 * site verification / approval. Enable only with NEXT_PUBLIC_EZOIC_ENABLED=true
 * after you deliberately choose Ezoic over AdSense.
 */
export function Ezoic() {
  if (process.env.NEXT_PUBLIC_EZOIC_ENABLED !== "true") return null;

  return (
    <>
      <Script
        id="ezoic-sa"
        strategy="afterInteractive"
        src="https://www.ezojs.com/ezoic/sa.min.js"
      />
      <Script id="ezoic-init" strategy="afterInteractive">
        {`window.ezstandalone = window.ezstandalone || {};
ezstandalone.cmd = ezstandalone.cmd || [];`}
      </Script>
      <Script
        id="ezoic-analytics"
        strategy="afterInteractive"
        src="https://ezoicanalytics.com/analytics.js"
      />
    </>
  );
}
