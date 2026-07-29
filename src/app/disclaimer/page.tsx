import Link from "next/link";
import { LegalShell, LegalSection } from "@/components/shared/legal";
import { siteConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Disclaimer",
  description: `Important disclaimers about the travel information published on ${siteConfig.name}.`,
  path: "/disclaimer",
});

const UPDATED = "July 29, 2026";

export default function DisclaimerPage() {
  return (
    <LegalShell
      title="Disclaimer"
      updated={UPDATED}
      intro="Please read this disclaimer carefully before relying on any information on this website."
    >
      <LegalSection title="General information only">
        <p>
          All information on {siteConfig.name} is published in good faith and for general
          information only. It is not professional travel, legal, medical or financial advice. Your
          use of the information is entirely at your own risk.
        </p>
      </LegalSection>

      <LegalSection title="Accuracy of travel information">
        <p>
          Travel details — including visa rules, safety and health guidance, transport, prices,
          opening hours and best times to visit — change frequently and may become out of date.
          Always confirm critical details with official government, embassy and operator sources
          before booking or travelling.
        </p>
      </LegalSection>

      <LegalSection title="External links">
        <p>
          This site contains links to external websites that are not provided or maintained by us.
          We do not guarantee the accuracy or completeness of information on those sites.
        </p>
      </LegalSection>

      <LegalSection title="Third-party data &amp; images">
        <p>
          Some content is adapted from{" "}
          <a href="https://www.wikivoyage.org" target="_blank" rel="noopener noreferrer">
            Wikivoyage
          </a>{" "}
          (CC BY-SA) and live data such as weather and currency rates is provided by third-party
          services. We are not responsible for errors in third-party data.
        </p>
      </LegalSection>

      <LegalSection title="Consent">
        <p>
          By using our website, you consent to this disclaimer and agree to its terms. See also our{" "}
          <Link href="/terms">Terms of Service</Link> and{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
