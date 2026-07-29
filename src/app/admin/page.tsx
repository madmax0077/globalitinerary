import Image from "next/image";
import {
  Globe2,
  Building2,
  Landmark,
  Newspaper,
  TrendingUp,
  Eye,
  Users,
  MousePointerClick,
} from "lucide-react";
import {
  VisitorsChart,
  TopCountriesChart,
  SourcesChart,
} from "@/components/admin/charts";
import { Badge } from "@/components/ui/badge";
import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import { attractions } from "@/data/attractions";
import { articles } from "@/data/content";

const sources = [
  { name: "Organic", value: 58, color: "#2563eb" },
  { name: "Direct", value: 22, color: "#38bdf8" },
  { name: "Social", value: 14, color: "#10b981" },
  { name: "Referral", value: 6, color: "#fb7185" },
];

const kpis = [
  { label: "Total visitors", value: "118.2k", delta: "+22.4%", icon: Users, positive: true },
  { label: "Page views", value: "342.1k", delta: "+18.1%", icon: Eye, positive: true },
  { label: "Avg. session", value: "4m 12s", delta: "+6.3%", icon: MousePointerClick, positive: true },
  { label: "Bounce rate", value: "38.4%", delta: "-3.2%", icon: TrendingUp, positive: true },
];

export default function AdminDashboard() {
  const content = [
    { label: "Countries", count: countries.length, icon: Globe2, tone: "bg-primary/10 text-primary" },
    { label: "Cities", count: cities.length, icon: Building2, tone: "bg-sky/10 text-sky" },
    { label: "Attractions", count: attractions.length, icon: Landmark, tone: "bg-emerald/10 text-emerald" },
    { label: "Articles", count: articles.length, icon: Newspaper, tone: "bg-sunset/10 text-sunset" },
  ];

  const recent = [
    ...countries.slice(0, 3).map((c) => ({
      id: c.slug,
      title: c.name,
      type: "Country",
      image: c.thumbnail,
      rating: c.rating,
      status: "Published",
    })),
    ...cities.slice(0, 2).map((c) => ({
      id: c.slug,
      title: c.name,
      type: "City",
      image: c.thumbnail,
      rating: c.rating,
      status: "Published",
    })),
    ...attractions.slice(0, 2).map((a) => ({
      id: a.slug,
      title: a.name,
      type: "Attraction",
      image: a.thumbnail,
      rating: a.rating,
      status: "Published",
    })),
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Welcome back. Here&apos;s what&apos;s happening across Global Itinerary today.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-2xl border border-border bg-card p-5 shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <kpi.icon className="size-5" />
              </span>
              <span
                className={`text-xs font-semibold ${
                  kpi.positive ? "text-emerald" : "text-sunset"
                }`}
              >
                {kpi.delta}
              </span>
            </div>
            <p className="mt-4 font-display text-2xl font-bold">{kpi.value}</p>
            <p className="text-sm text-muted-foreground">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Traffic overview</h2>
              <p className="text-sm text-muted-foreground">Visitors & page views</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-primary" /> Visitors
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-sky" /> Page views
              </span>
            </div>
          </div>
          <VisitorsChart />
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="mb-1 font-semibold">Traffic sources</h2>
          <p className="mb-2 text-sm text-muted-foreground">Where visitors come from</p>
          <SourcesChart />
          <div className="mt-2 grid grid-cols-2 gap-2">
            {sources.map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-sm">
                <span
                  className="size-2.5 rounded-full"
                  style={{ background: s.color }}
                />
                {s.name}
                <span className="ml-auto font-semibold">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content counts + top countries */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Most viewed countries</h2>
          </div>
          <TopCountriesChart />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {content.map((c) => (
            <div
              key={c.label}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <span className={`grid size-10 place-items-center rounded-xl ${c.tone}`}>
                <c.icon className="size-5" />
              </span>
              <div className="mt-4">
                <p className="font-display text-2xl font-bold">{c.count}</p>
                <p className="text-sm text-muted-foreground">{c.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent content table */}
      <div className="rounded-2xl border border-border bg-card shadow-soft">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="font-semibold">Recently updated content</h2>
          <Badge variant="outline">{recent.length} items</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((item) => (
                <tr
                  key={`${item.type}-${item.id}`}
                  className="border-b border-border last:border-0 transition-colors hover:bg-muted/50"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="relative size-10 overflow-hidden rounded-lg">
                        <Image src={item.image} alt="" fill sizes="40px" className="object-cover" />
                      </span>
                      <span className="font-medium">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{item.type}</td>
                  <td className="px-5 py-3">
                    <Badge variant="emerald">{item.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
