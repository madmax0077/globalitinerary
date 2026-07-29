import { Construction } from "lucide-react";
import { DataTable, type AdminRow } from "@/components/admin/data-table";
import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import { attractions } from "@/data/attractions";
import { articles, collections } from "@/data/content";

const titles: Record<string, string> = {
  countries: "Countries",
  cities: "Cities",
  attractions: "Attractions",
  articles: "Articles",
  collections: "Collections",
  media: "Media Library",
  analytics: "Analytics",
  seo: "SEO",
  ads: "Ad Placements",
  users: "Users",
  newsletter: "Newsletter",
  settings: "Settings",
};

function getRows(section: string): AdminRow[] | null {
  switch (section) {
    case "countries":
      return countries.map((c) => ({
        id: c.slug,
        image: c.thumbnail,
        title: c.name,
        subtitle: `${c.continent} • ${c.capital}`,
        meta: c.region,
        status: "Published",
      }));
    case "cities":
      return cities.map((c) => ({
        id: c.slug,
        image: c.thumbnail,
        title: c.name,
        subtitle: c.countryName,
        meta: "City guide",
        status: "Published",
      }));
    case "attractions":
      return attractions.map((a) => ({
        id: a.slug,
        image: a.thumbnail,
        title: a.name,
        subtitle: `${a.cityName}, ${a.countryName}`,
        meta: a.category,
        status: "Published",
      }));
    case "articles":
      return articles.map((a) => ({
        id: a.slug,
        image: a.cover,
        title: a.title,
        subtitle: a.author.name,
        meta: a.category,
        status: a.featured ? "Published" : "Draft",
      }));
    case "collections":
      return collections.map((c) => ({
        id: c.slug,
        image: c.image,
        title: c.title,
        subtitle: c.description,
        meta: `${c.count} places`,
        status: "Published",
      }));
    default:
      return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  return { title: `${titles[section] ?? "Admin"} · Admin`, robots: { index: false } };
}

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const title = titles[section] ?? "Manage";
  const rows = getRows(section);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-1 text-muted-foreground">
            {rows
              ? `Manage all ${title.toLowerCase()} across the platform.`
              : "Configure and manage this section."}
          </p>
        </div>
      </div>

      {rows ? (
        <DataTable rows={rows} entity={title.toLowerCase()} />
      ) : (
        <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-card p-16 text-center">
          <Construction className="size-10 text-muted-foreground" />
          <h2 className="mt-4 font-display text-xl font-bold">{title}</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            This module is scaffolded and ready to be wired up to your backend
            services and Prisma models.
          </p>
        </div>
      )}
    </div>
  );
}
