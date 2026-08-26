import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/shared/page-hero";
import { ArticleCard } from "@/components/shared/article-card";
import { authorList, authorUrl, getAuthorBySlug } from "@/data/authors";
import { articles } from "@/data/content";
import { buildMetadata, breadcrumbJsonLd, personJsonLd, JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/config";

export const revalidate = 3600;

export function generateStaticParams() {
  return authorList.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return {};
  return buildMetadata({
    title: `${author.name} — ${author.role}`,
    description: author.bio,
    path: `/authors/${author.slug}`,
    image: author.avatar,
  });
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const work = articles.filter((a) => a.author.name === author.name).slice(0, 24);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Authors", url: "/authors" },
            { name: author.name, url: `/authors/${author.slug}` },
          ]),
          personJsonLd({
            name: author.name,
            description: author.bio,
            image: author.avatar,
            url: authorUrl(author),
            jobTitle: author.role,
          }),
        ]}
      />
      <PageHero
        eyebrow={author.role}
        title={author.name}
        description={author.focus}
        breadcrumbs={[
          { name: "Authors", href: "/authors" },
          { name: author.name, href: `/authors/${author.slug}` },
        ]}
      />
      <div className="container-lux py-14">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 sm:flex-row sm:items-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={author.avatar}
            alt={`${author.name}, ${author.role} at ${siteConfig.name}`}
            width={96}
            height={96}
            className="size-24 shrink-0 rounded-full"
          />
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>{author.bio}</p>
            <p>
              Editorial standards live on our{" "}
              <Link href="/about" className="font-medium text-primary underline">
                About page
              </Link>
              : original itineraries and cost models, sourced practical notes, and a reminder to
              verify visas and safety with official sources.
            </p>
          </div>
        </div>

        {work.length > 0 && (
          <div className="mt-14">
            <h2 className="font-display text-2xl font-bold tracking-tight">Published guides</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {work.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
