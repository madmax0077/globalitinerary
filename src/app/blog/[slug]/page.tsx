import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, CalendarDays } from "lucide-react";
import { getArticle, getAllArticleSlugs, articles } from "@/data/content";
import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import { isCityIndexable } from "@/lib/content-legitimacy";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ArticleCard } from "@/components/shared/article-card";
import { ShareButtons } from "@/components/shared/share-buttons";
import { Newsletter } from "@/components/shared/newsletter";
import { AdSlot } from "@/components/shared/ad-slot";
import { Badge } from "@/components/ui/badge";
import { ArticleContent } from "@/components/blog/article-content";
import { SectionHeading } from "@/components/shared/section-heading";
import { buildMetadata, breadcrumbJsonLd, articleJsonLd, JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/config";

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  // Dedicated article routes (App Router static folders) are excluded here.
  const dedicated = new Set([
    "top-100-cities-to-visit-2026",
    "top-200-cities-to-visit-2026",
  ]);
  return getAllArticleSlugs()
    .filter((slug) => !dedicated.has(slug))
    .map((slug) => ({ slug }));
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

  const tagSet = new Set(article.tags.map((t) => t.toLowerCase()));
  const related = articles
    .filter((a) => a.slug !== article.slug)
    .map((a) => ({
      a,
      score: a.tags.filter((t) => tagSet.has(t.toLowerCase())).length + (a.featured ? 0.5 : 0),
    }))
    .sort((x, y) => y.score - x.score)
    .slice(0, 3)
    .map((x) => x.a);
  const relatedCountries = countries
    .filter((c) => tagSet.has(c.name.toLowerCase()) || tagSet.has(c.continent.toLowerCase()))
    .slice(0, 4);
  const relatedCities = cities
    .filter((c) => isCityIndexable(c) && (tagSet.has(c.name.toLowerCase()) || tagSet.has(c.countryName.toLowerCase())))
    .slice(0, 6);
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

      <article className="container-lux max-w-6xl pt-28">
        <Breadcrumbs
          items={[
            { name: "Blog", href: "/blog" },
            { name: article.title, href: `/blog/${article.slug}` },
          ]}
        />

        <div className="mt-8">
          <ArticleContent
            sections={article.sections}
            header={
              <>
                <Badge>{article.category}</Badge>
                <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl">
                  {article.title}
                </h1>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">{article.excerpt}</p>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft sm:px-5">
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
                      <CalendarDays className="size-4 shrink-0" />
                      {formattedDate}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-4 shrink-0" />
                      {article.readingTime} min read
                    </span>
                  </div>
                </div>

                <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl sm:rounded-3xl">
                  <Image
                    src={article.cover}
                    alt={article.title}
                    fill
                    priority
                    sizes="(max-width:1024px) 100vw, 720px"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
                </div>
              </>
            }
            footer={
              <>
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

                {(relatedCountries.length > 0 || relatedCities.length > 0) && (
                  <div className="mt-10 rounded-2xl border border-border bg-card p-5 shadow-soft sm:rounded-3xl sm:p-6">
                    <h2 className="font-display text-xl font-bold tracking-tight">Explore related destinations</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Continue planning with our destination guides linked from this article.
                    </p>
                    <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                      {relatedCountries.map((c) => (
                        <li key={c.slug}>
                          <Link href={`/countries/${c.slug}`} className="font-semibold text-primary hover:underline">
                            {c.flag} {c.name} travel guide
                          </Link>
                        </li>
                      ))}
                      {relatedCities.map((c) => (
                        <li key={c.slug}>
                          <Link href={`/cities/${c.slug}`} className="font-semibold text-primary hover:underline">
                            {c.name}, {c.countryName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-10">
                  <AdSlot slot="article-footer" className="min-h-[140px]" />
                </div>

                <div className="mt-10 rounded-2xl bg-mesh p-6 text-center sm:rounded-3xl sm:p-8">
                  <h3 className="font-display text-2xl font-bold">Enjoyed this story?</h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                    Get more travel inspiration delivered to your inbox every week.
                  </p>
                  <div className="mt-6">
                    <Newsletter />
                  </div>
                </div>
              </>
            }
          />
        </div>
      </article>

      <section className="container-lux max-w-6xl pb-20 pt-16">
        <SectionHeading eyebrow="Keep reading" title="Related stories" />
        <div className="mt-8 grid items-stretch gap-6 md:grid-cols-3">
          {related.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </>
  );
}
