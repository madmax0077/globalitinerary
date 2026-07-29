import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock, CalendarDays } from "lucide-react";
import { getArticle, getAllArticleSlugs, articles } from "@/data/content";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ArticleCard } from "@/components/shared/article-card";
import { ShareButtons } from "@/components/shared/share-buttons";
import { Newsletter } from "@/components/shared/newsletter";
import { AdSlot } from "@/components/shared/ad-slot";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/section-heading";
import { buildMetadata, breadcrumbJsonLd, articleJsonLd, JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/config";

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    image: article.cover,
    type: "article",
    publishedTime: article.date,
    authors: [article.author.name],
    keywords: article.tags,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Blog", url: "/blog" },
            { name: article.title, url: `/blog/${article.slug}` },
          ]),
          articleJsonLd({
            title: article.title,
            description: article.excerpt,
            image: article.cover,
            datePublished: article.date,
            author: article.author.name,
            url: `${siteConfig.url}/blog/${article.slug}`,
          }),
        ]}
      />

      <article className="container-lux max-w-3xl pt-28">
        <Breadcrumbs
          items={[
            { name: "Blog", href: "/blog" },
            { name: article.title, href: `/blog/${article.slug}` },
          ]}
        />

        <Badge className="mt-6">{article.category}</Badge>
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{article.excerpt}</p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
          <div className="flex items-center gap-3">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              width={44}
              height={44}
              className="size-11 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold">{article.author.name}</p>
              <p className="text-xs text-muted-foreground">{article.author.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-4" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" />
              {article.readingTime} min read
            </span>
          </div>
        </div>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl">
          <Image
            src={article.cover}
            alt={article.title}
            fill
            priority
            sizes="(max-width:768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div className="prose-lux mt-10 flex flex-col gap-6">
          {article.sections.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="font-display text-2xl font-bold tracking-tight">
                  {section.heading}
                </h2>
              )}
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((t) => (
              <Badge key={t} variant="outline">
                #{t}
              </Badge>
            ))}
          </div>
          <ShareButtons title={article.title} />
        </div>

        <div className="mt-10">
          <AdSlot slot="article-footer" className="min-h-[140px]" />
        </div>

        <div className="mt-10 rounded-3xl bg-mesh p-8 text-center">
          <h3 className="font-display text-2xl font-bold">Enjoyed this story?</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Get more travel inspiration delivered to your inbox every week.
          </p>
          <div className="mt-6">
            <Newsletter />
          </div>
        </div>
      </article>

      <section className="container-lux pb-20 pt-16">
        <SectionHeading eyebrow="Keep reading" title="Related stories" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {related.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </>
  );
}
