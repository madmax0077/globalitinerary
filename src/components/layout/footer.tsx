import Link from "next/link";
import { Mail } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Newsletter } from "@/components/shared/newsletter";
import { footerNav } from "@/lib/navigation";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border bg-background-subtle">
      <div className="container-lux py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold">Get travel inspiration weekly</p>
              <Newsletter compact />
            </div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-all hover:border-primary hover:text-primary"
            >
              <Mail className="size-4" />
              {siteConfig.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footerNav).map(([heading, links]) => (
              <div key={heading}>
                <h3 className="mb-4 text-sm font-semibold">{heading}</h3>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Crafted for explorers.
          </p>
          <p>{siteConfig.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
