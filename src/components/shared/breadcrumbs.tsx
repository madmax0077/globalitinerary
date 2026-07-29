import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs({
  items,
  onDark,
}: {
  items: { name: string; href: string }[];
  onDark?: boolean;
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={`flex flex-wrap items-center gap-1.5 text-sm ${
          onDark ? "text-white/80" : "text-muted-foreground"
        }`}
      >
        <li>
          <Link href="/" className="flex items-center hover:opacity-80" aria-label="Home">
            <Home className="size-4" />
          </Link>
        </li>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              <ChevronRight className="size-3.5 opacity-60" />
              {last ? (
                <span
                  aria-current="page"
                  className={onDark ? "font-medium text-white" : "font-medium text-foreground"}
                >
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="hover:opacity-80">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
