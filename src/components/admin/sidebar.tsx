"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Globe2,
  Building2,
  Landmark,
  Newspaper,
  Layers,
  ImageIcon,
  Megaphone,
  Users,
  Mail,
  Settings,
  Search,
  BarChart3,
  ArrowLeft,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Countries", href: "/admin/countries", icon: Globe2 },
  { label: "Cities", href: "/admin/cities", icon: Building2 },
  { label: "Attractions", href: "/admin/attractions", icon: Landmark },
  { label: "Articles", href: "/admin/articles", icon: Newspaper },
  { label: "Collections", href: "/admin/collections", icon: Layers },
  { label: "Media", href: "/admin/media", icon: ImageIcon },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "SEO", href: "/admin/seo", icon: Search },
  { label: "Ads", href: "/admin/ads", icon: Megaphone },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-border bg-card p-4 lg:flex">
      <div className="px-2 py-2">
        <Logo />
      </div>
      <nav className="mt-4 flex flex-1 flex-col gap-0.5 overflow-y-auto">
        {nav.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <Link
        href="/"
        className="mt-2 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Back to site
      </Link>
    </aside>
  );
}
