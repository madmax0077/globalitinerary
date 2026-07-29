import Script from "next/script";

/**
 * Ezoic standalone integration. Loads the Ezoic script + analytics and
 * initialises the ezstandalone command queue site-wide. Required on the
 * site for Ezoic's review/approval.
 */
export function Ezoic() {
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
