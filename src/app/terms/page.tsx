import Link from "next/link";
import { LegalShell, LegalSection } from "@/components/shared/legal";
import { siteConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: `The terms and conditions for using ${siteConfig.name}.`,
  path: "/terms",
});

const UPDATED = "July 29, 2026";

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms of Service"
      updated={UPDATED}
      intro={`By accessing ${siteConfig.domain}, you agree to these Terms of Service. Please read them carefully.`}
    >
      <LegalSection title="Acceptance of terms">
        <p>
          By using {siteConfig.name}, you agree to be bound by these terms. If you do not agree,
          please do not use the site.
        </p>
      </LegalSection>

      <LegalSection title="Use of the website">
        <ul>
          <li>You may use the site for personal, non-commercial travel-planning purposes.</li>
          <li>
            You agree not to misuse the site, attempt to disrupt it, scrape it at scale, or use it
            for any unlawful purpose.
          </li>
          <li>
            You will not reproduce or republish substantial portions of our content without
            permission.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Travel information disclaimer">
        <p>
          Travel content is provided for general information only and may change without notice.
          Always verify visas, health, safety and opening details with official sources before you
          travel. See our <Link href="/disclaimer">Disclaimer</Link> for more.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual property">
        <p>
          Site design, text and branding are owned by {siteConfig.name} or used under licence.
          Certain destination text is adapted from{" "}
          <a href="https://www.wikivoyage.org" target="_blank" rel="noopener noreferrer">
            Wikivoyage
          </a>{" "}
          under the CC BY-SA licence, and images may be sourced from Wikimedia and other providers
          under their respective licences.
        </p>
      </LegalSection>

      <LegalSection title="Third-party links &amp; ads">
        <p>
          The site contains links to third-party websites and displays third-party advertising
          (including Google AdSense). We are not responsible for the content, products or practices
          of third parties.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          The site is provided “as is” without warranties of any kind. To the maximum extent
          permitted by law, {siteConfig.name} is not liable for any loss or damage arising from your
          use of, or reliance on, the site or its content.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We may update these terms at any time. Continued use of the site after changes are posted
          constitutes acceptance of the updated terms.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about these terms? Email{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
