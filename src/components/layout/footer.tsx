import Link from "next/link";
import { Camera, PlayCircle, Send, Share2 } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Newsletter } from "@/components/shared/newsletter";
import { footerNav } from "@/lib/navigation";
import { siteConfig } from "@/lib/config";

const socials = [
  { icon: Camera, href: "https://instagram.com", label: "Instagram" },
  { icon: Send, href: "https://twitter.com", label: "Twitter" },
  { icon: PlayCircle, href: "https://youtube.com", label: "YouTube" },
  { icon: Share2, href: "https://github.com", label: "Share" },
];

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
            <div className="mt-2 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
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
