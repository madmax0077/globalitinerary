import type { Author } from "@/lib/types";
import { siteConfig } from "@/lib/config";

export type EditorialAuthor = Author & {
  slug: string;
  bio: string;
  focus: string;
};

export const authors = {
  amelia: {
    slug: "amelia-chen",
    name: "Amelia Chen",
    role: "Senior Travel Editor",
    avatar: "/authors/amelia-chen.svg",
    focus: "City rankings, first-timer itineraries and trip-cost models",
    bio: "Amelia leads Global Itinerary’s destination desk: she edits country and city guides, owns the Top 100 / 101–200 city rankings, and checks that itineraries use real places rather than filler. Her work is editorial — compiled from destination data, cost bands and published travel research — then rewritten for travellers planning a trip.",
  },
  marco: {
    slug: "marco-rossi",
    name: "Marco Rossi",
    role: "Itinerary Editor",
    avatar: "/authors/marco-rossi.svg",
    focus: "Multi-day routes, neighbourhood stays and practical logistics",
    bio: "Marco shapes day-by-day itineraries and stay-area notes. He sequences cities by geography, flags brutal day-stacks, and keeps route copy honest when a trip needs slack time instead of invented sights.",
  },
  sofia: {
    slug: "sofia-ahmed",
    name: "Sofia Ahmed",
    role: "Planning Editor",
    avatar: "/authors/sofia-ahmed.svg",
    focus: "Budgets, visas, seasons and first-time trip logistics",
    bio: "Sofia edits the planning layer: best time to visit, daily budgets, visa explainers and packing/route tools. She focuses on what a first-time visitor needs to decide before they book, with a reminder to confirm official rules before travel.",
  },
} as const satisfies Record<string, EditorialAuthor>;

export const authorList: EditorialAuthor[] = Object.values(authors);

export function getAuthorBySlug(slug: string): EditorialAuthor | undefined {
  return authorList.find((a) => a.slug === slug);
}

export function getAuthorByName(name: string): EditorialAuthor | undefined {
  return authorList.find((a) => a.name === name);
}

export function authorUrl(author: Pick<EditorialAuthor, "slug">): string {
  return `${siteConfig.url}/authors/${author.slug}`;
}
