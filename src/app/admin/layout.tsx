import type { Metadata } from "next";
import { Bell, Search } from "lucide-react";
import { AdminSidebar } from "@/components/admin/sidebar";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh bg-background-subtle">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/80 px-4 backdrop-blur-md sm:px-6">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground sm:max-w-sm">
            <Search className="size-4" />
            <input
              className="w-full bg-transparent outline-none"
              placeholder="Search the dashboard…"
              aria-label="Search dashboard"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <button
              aria-label="Notifications"
              className="relative grid size-10 place-items-center rounded-full glass"
            >
              <Bell className="size-[18px]" />
              <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-sunset" />
            </button>
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/80?img=8" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
