import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ArticleCard({
  article,
  className,
  horizontal = false,
}: {
  article: Article;
  className?: string;
  horizontal?: boolean;
}) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className={cn(
        "group flex overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift",
        horizontal ? "flex-col sm:flex-row" : "flex-col",
        className
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          horizontal ? "aspect-[16/10] sm:aspect-auto sm:w-2/5" : "aspect-[16/10]"
        )}
      >
        <Image
          src={article.cover}
          alt={article.title}
          fill
          sizes="(max-width:640px) 90vw, 40vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <Badge variant="glass" className="absolute left-3 top-3 text-white">
          {article.category}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-snug transition-colors group-hover:text-primary">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{article.author.name}</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {article.readingTime} min read
          </span>
        </div>
      </div>
    </Link>
  );
}
