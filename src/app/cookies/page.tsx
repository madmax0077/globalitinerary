import Link from "next/link";
import { LegalShell, LegalSection } from "@/components/shared/legal";
import { siteConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cookie Policy",
  description: `Learn how ${siteConfig.name} uses cookies and how you can control them.`,
  path: "/cookies",
});

const UPDATED = "July 29, 2026";

export default function CookiesPage() {
  return (
    <LegalShell
      title="Cookie Policy"
      updated={UPDATED}
      intro="This Cookie Policy explains what cookies are, how we use them, and the choices you have."
    >
      <LegalSection title="What are cookies?">
        <p>
          Cookies are small text files placed on your device when you visit a website. They help the
          site work, remember your preferences, measure usage and, in some cases, deliver relevant
          advertising.
        </p>
      </LegalSection>

      <LegalSection title="Types of cookies we use">
        <ul>
          <li>
            <strong>Essential cookies</strong> — required for the site to function (e.g. remembering
            your theme and your cookie choice).
          </li>
          <li>
            <strong>Analytics cookies</strong> — help us understand how visitors use the site so we
            can improve it. These are aggregated and non-identifying.
          </li>
          <li>
            <strong>Advertising cookies</strong> — set by Google AdSense and its partners to show
            ads and, where permitted, personalise them. See our{" "}
            <Link href="/privacy">Privacy Policy</Link> for details.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Third-party cookies">
        <p>
          Some cookies are set by third parties such as Google. We do not control these cookies.
          Learn more about how Google uses cookies in advertising at{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&apos;s advertising policies
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Managing cookies">
        <p>You can control cookies in several ways:</p>
        <ul>
          <li>Use the Accept/Decline choice in our cookie banner.</li>
          <li>Adjust or delete cookies in your browser settings at any time.</li>
          <li>
            Opt out of personalised ads via{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>{" "}
            or{" "}
            <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
              aboutads.info
            </a>
            .
          </li>
        </ul>
        <p>Blocking some cookies may affect how parts of the site work.</p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about cookies? Email{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
