import Link from "next/link";
import { LegalShell, LegalSection } from "@/components/shared/legal";
import { siteConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects your information, including cookies and third-party advertising.`,
  path: "/privacy",
});

const UPDATED = "July 29, 2026";

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      updated={UPDATED}
      intro={`This Privacy Policy explains how ${siteConfig.name} (“we”, “us”, “our”) collects, uses and safeguards information when you visit ${siteConfig.domain}.`}
    >
      <LegalSection title="Who we are">
        <p>
          {siteConfig.name} is a free online travel guide available at{" "}
          <Link href="/">{siteConfig.domain}</Link>. For any privacy question you can reach us at{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </LegalSection>

      <LegalSection title="Information we collect">
        <p>We aim to collect as little personal data as possible. We may process:</p>
        <ul>
          <li>
            <strong>Information you provide</strong> — such as your email address if you subscribe
            to our newsletter or contact us.
          </li>
          <li>
            <strong>Usage &amp; device data</strong> — pages viewed, approximate location, browser
            type, device and referring pages, collected automatically through cookies and analytics.
          </li>
          <li>
            <strong>Cookies &amp; similar technologies</strong> — see our{" "}
            <Link href="/cookies">Cookie Policy</Link> for details.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="How we use information">
        <ul>
          <li>To operate, maintain and improve the website and its content.</li>
          <li>To measure traffic and understand how the site is used.</li>
          <li>To send our newsletter, if you have subscribed (you can opt out at any time).</li>
          <li>To display advertising that helps keep the site free.</li>
          <li>To comply with legal obligations and prevent abuse.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Advertising &amp; Google AdSense">
        <p>
          We use third-party advertising companies, including{" "}
          <strong>Google AdSense</strong>, to serve ads when you visit the site. These companies may
          use cookies and similar technologies to serve ads based on your prior visits to this and
          other websites.
        </p>
        <ul>
          <li>
            Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s
            prior visits to this website or other websites.
          </li>
          <li>
            Google&apos;s use of advertising cookies enables it and its partners to serve ads to you
            based on your visit to our site and/or other sites on the Internet.
          </li>
          <li>
            You may opt out of personalised advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>
            . You can also opt out of some third-party vendors&apos; use of cookies for personalised
            advertising at{" "}
            <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
              aboutads.info
            </a>
            .
          </li>
        </ul>
        <p>
          For more information on how Google uses data, see{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
          >
            How Google uses information from sites that use its services
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Analytics">
        <p>
          We may use privacy-friendly analytics to understand aggregate traffic patterns. This data
          is used only in aggregate and is not used to identify individual visitors.
        </p>
      </LegalSection>

      <LegalSection title="Consent (EEA, UK &amp; similar regions)">
        <p>
          If you are located in the European Economic Area, the United Kingdom or another region
          that requires consent, we (and our advertising partners such as Google) will ask for your
          consent before setting non-essential cookies. You can withdraw or change your consent at
          any time via the cookie notice or your browser settings.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>
          Depending on where you live, you may have the right to access, correct, delete or restrict
          the use of your personal data, and to object to processing. To exercise any right, email us
          at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </LegalSection>

      <LegalSection title="Children's privacy">
        <p>
          This site is not directed at children under 13 (or the minimum age in your jurisdiction),
          and we do not knowingly collect personal data from them.
        </p>
      </LegalSection>

      <LegalSection title="Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time. Changes take effect when posted on
          this page, and the “Last updated” date above will be revised accordingly.
        </p>
      </LegalSection>

      <LegalSection title="Contact us">
        <p>
          Questions about this policy? Email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{" "}
          or use our <Link href="/contact">contact page</Link>.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
