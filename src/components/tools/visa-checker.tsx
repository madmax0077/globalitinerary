"use client";

import * as React from "react";
import {
  Check,
  ExternalLink,
  BookUser as PassportIcon,
  ShieldCheck,
  ShieldAlert,
  Ban,
  Globe2,
} from "lucide-react";
import Link from "next/link";
import {
  VISA_TYPES,
  type VisaType,
  parseCode,
  STATUS_META,
  buildDocuments,
  officialSourceUrl,
} from "@/lib/visa-docs";
import { etiasStatus } from "@/lib/etias";
import { cn } from "@/lib/utils";

export type VisaColumnItem = {
  iso3: string;
  iso2: string;
  name: string;
  code: string;
};

const toneClasses: Record<string, string> = {
  green: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  amber: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  sky: "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  red: "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300",
};

const toneIcon: Record<string, React.ElementType> = {
  green: ShieldCheck,
  amber: ShieldAlert,
  sky: Globe2,
  red: Ban,
};

const STORAGE_KEY = "gi:home-country";

export function VisaChecker({
  destinationName,
  destIso2,
  column,
}: {
  destinationName: string;
  destIso2?: string;
  column: VisaColumnItem[];
}) {
  const [home, setHome] = React.useState<string>("");
  const [type, setType] = React.useState<VisaType>("tourist");

  // Remember the traveller's home country across pages.
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && column.some((c) => c.iso3 === saved)) setHome(saved);
    } catch {
      /* ignore */
    }
  }, [column]);

  const onHome = (iso3: string) => {
    setHome(iso3);
    try {
      localStorage.setItem(STORAGE_KEY, iso3);
    } catch {
      /* ignore */
    }
  };

  const selected = column.find((c) => c.iso3 === home);
  const status = selected ? parseCode(selected.code) : null;
  const meta = status ? STATUS_META[status.code] : null;
  const docs = status ? buildDocuments(status.code, type) : [];
  const ToneIcon = meta ? toneIcon[meta.tone] : ShieldCheck;
  const etias =
    selected && destIso2 ? etiasStatus(destIso2, selected.iso3, selected.code) : null;

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <PassportIcon className="size-4" /> Your passport / home country
          </span>
          <select
            value={home}
            onChange={(e) => onHome(e.target.value)}
            className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-semibold outline-none focus:border-primary"
          >
            <option value="">Select your country…</option>
            {column.map((c) => (
              <option key={c.iso3} value={c.iso3}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          <span className="text-muted-foreground">Purpose of visit</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as VisaType)}
            className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-semibold outline-none focus:border-primary"
          >
            {VISA_TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {!selected ? (
        <p className="mt-6 rounded-2xl bg-muted/50 p-6 text-center text-sm text-muted-foreground">
          Select your home country above to see whether you need a visa for{" "}
          {destinationName} and which documents to prepare.
        </p>
      ) : (
        <div className="mt-6">
          {/* Status banner */}
          <div className={cn("flex items-start gap-3 rounded-2xl border p-4", toneClasses[meta!.tone])}>
            <ToneIcon className="mt-0.5 size-5 shrink-0" />
            <div>
              <p className="font-display text-lg font-bold">
                {meta!.label}
                {status!.code === "F" && status!.days ? ` · up to ${status!.days} days` : ""}
              </p>
              <p className="mt-0.5 text-sm opacity-90">
                {selected.name} → {destinationName}. {meta!.summary}
              </p>
            </div>
          </div>

          {/* ETIAS / EES notice for the Schengen area */}
          {etias === "etias" && (
            <div className="mt-4 rounded-2xl border border-sky-500/30 bg-sky-500/5 p-4">
              <p className="text-sm">
                <strong>You&apos;ll also need ETIAS.</strong> {destinationName} is in the
                Schengen area. From 2026, visa-exempt travellers must get an approved{" "}
                <strong>ETIAS travel authorisation</strong> online before departure, and
                your entry/exit will be registered by the new{" "}
                <strong>EES</strong> system at the border.{" "}
                <Link href="/etias-ees" className="font-semibold text-primary hover:underline">
                  Read the ETIAS &amp; EES guide →
                </Link>
              </p>
            </div>
          )}
          {etias === "free-movement" && (
            <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
              <p className="text-sm">
                As an EU/EEA/Swiss citizen you have <strong>freedom of movement</strong> —
                no ETIAS or visa is required, though your passport/ID is still checked.
              </p>
            </div>
          )}

          {/* Document checklist */}
          {status!.code !== "X" && (
            <div className="mt-6">
              <h3 className="font-display text-base font-bold">
                {status!.code === "F"
                  ? "What to carry"
                  : "Documents you'll typically need"}
              </h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {docs.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-2 rounded-2xl border border-border bg-background-subtle/50 p-3 text-sm"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Official source + disclaimer */}
          <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
            <p className="text-sm">
              <strong>Always verify with the official source.</strong> Visa rules and
              required documents change frequently and depend on your exact circumstances.
              This is general guidance, last aligned to 2026 data — confirm on the official
              government portal before you book or travel.
            </p>
            <a
              href={officialSourceUrl(destinationName, selected.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Check official {destinationName} visa source <ExternalLink className="size-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
