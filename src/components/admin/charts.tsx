"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const visitorsData = [
  { month: "Jan", visitors: 42000, pageviews: 128000 },
  { month: "Feb", visitors: 48500, pageviews: 141000 },
  { month: "Mar", visitors: 61000, pageviews: 176000 },
  { month: "Apr", visitors: 72500, pageviews: 205000 },
  { month: "May", visitors: 84000, pageviews: 246000 },
  { month: "Jun", visitors: 96500, pageviews: 289000 },
  { month: "Jul", visitors: 118000, pageviews: 342000 },
];

const topCountriesData = [
  { name: "Japan", views: 32400 },
  { name: "Italy", views: 28900 },
  { name: "Iceland", views: 21500 },
  { name: "Greece", views: 18700 },
  { name: "UAE", views: 15200 },
  { name: "Peru", views: 12800 },
];

const sourceData = [
  { name: "Organic", value: 58, color: "#2563eb" },
  { name: "Direct", value: 22, color: "#38bdf8" },
  { name: "Social", value: 14, color: "#10b981" },
  { name: "Referral", value: 6, color: "#fb7185" },
];

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: "var(--card)",
  color: "var(--foreground)",
  fontSize: 12,
  boxShadow: "var(--shadow-lift)",
};

export function VisitorsChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={visitorsData} margin={{ left: -12, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="gVisitors" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gViews" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
          tickFormatter={(v) => `${v / 1000}k`}
        />
        <Tooltip contentStyle={tooltipStyle} />
        <Area
          type="monotone"
          dataKey="pageviews"
          stroke="#38bdf8"
          strokeWidth={2}
          fill="url(#gViews)"
        />
        <Area
          type="monotone"
          dataKey="visitors"
          stroke="#2563eb"
          strokeWidth={2.5}
          fill="url(#gVisitors)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function TopCountriesChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={topCountriesData} margin={{ left: -12, right: 8, top: 8 }}>
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
          tickFormatter={(v) => `${v / 1000}k`}
        />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)" }} />
        <Bar dataKey="views" radius={[8, 8, 0, 0]} fill="#2563eb" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SourcesChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={sourceData}
          dataKey="value"
          nameKey="name"
          innerRadius={62}
          outerRadius={100}
          paddingAngle={3}
          stroke="none"
        >
          {sourceData.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
}
