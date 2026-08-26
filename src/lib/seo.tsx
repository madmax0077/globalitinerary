import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

interface PageSeo {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  keywords?: string[];
}

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  authors,
  keywords,
}: PageSeo): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? `${siteConfig.url}${siteConfig.ogImage}`;

  return {
    title,
    description,
    keywords: keywords ?? [...siteConfig.keywords],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: url,
      languages: { en: url, "x-default": url },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: siteConfig.twitter,
      site: siteConfig.twitter,
    },
  };
}

/* ------------------------------------------------------------------ */
/*  JSON-LD structured data                                            */
/* ------------------------------------------------------------------ */

export const organizationId = `${siteConfig.url}/#organization`;
export const websiteId = `${siteConfig.url}/#website`;

export function absUrl(path: string): string {
  if (!path) return siteConfig.url;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function imageObjectJsonLd(url: string, caption?: string) {
  const contentUrl = absUrl(url);
  const isUnsplash = contentUrl.includes("images.unsplash.com");
  const isWiki =
    contentUrl.includes("wikimedia.org") || contentUrl.includes("wikipedia.org");
  return {
    "@type": "ImageObject" as const,
    contentUrl,
    url: contentUrl,
    ...(caption ? { caption } : {}),
    ...(isUnsplash
      ? {
          creditText: "Unsplash",
          license: "https://unsplash.com/license",
          acquireLicensePage: "https://unsplash.com/license",
        }
      : {}),
    ...(isWiki
      ? {
          creditText: "Wikimedia Commons",
          license: "https://creativecommons.org/licenses/by-sa/4.0/",
        }
      : {}),
  };
}

/** Visible breadcrumbs always start with a Home icon — keep JSON-LD in sync. */
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  const trail =
    items[0]?.url === "/" || items[0]?.url === ""
      ? items
      : [{ name: "Home", url: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absUrl(item.url),
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  const items = faqs.filter((f) => f.question?.trim() && f.answer?.trim());
  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function touristAttractionJsonLd(a: {
  name: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
  address: string;
  slug?: string;
  url?: string;
  cityName?: string;
  citySlug?: string;
  countryName?: string;
  countryCode?: string;
  category?: string;
}) {
  const url = a.url ? absUrl(a.url) : a.slug ? absUrl(`/attractions/${a.slug}`) : undefined;
  const additionalType = attractionAdditionalType(a.category);
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    ...(url ? { "@id": `${url}#attraction` } : {}),
    name: a.name,
    ...(url ? { url } : {}),
    description: a.description,
    image: imageObjectJsonLd(a.image, a.name),
    address: {
      "@type": "PostalAddress",
      addressLocality: a.address,
      ...(a.countryCode || a.countryName
        ? { addressCountry: a.countryCode || a.countryName }
        : {}),
    },
    geo: { "@type": "GeoCoordinates", latitude: a.lat, longitude: a.lng },
    ...(additionalType ? { additionalType } : {}),
    ...(a.cityName
      ? {
          containedInPlace: {
            "@type": "City",
            name: a.cityName,
            ...(a.citySlug ? { url: absUrl(`/cities/${a.citySlug}`) } : {}),
          },
        }
      : {}),
    publisher: { "@id": organizationId },
    isPartOf: { "@id": websiteId },
  };
}

const ATTRACTION_TYPE_MAP: Record<string, string> = {
  Landmark: "https://schema.org/LandmarksOrHistoricalBuildings",
  Museum: "https://schema.org/Museum",
  Nature: "https://schema.org/Landform",
  Beach: "https://schema.org/Beach",
  Mountain: "https://schema.org/Mountain",
  Religious: "https://schema.org/PlaceOfWorship",
  Historic: "https://schema.org/LandmarksOrHistoricalBuildings",
  Park: "https://schema.org/Park",
  Adventure: "https://schema.org/TouristAttraction",
};

function attractionAdditionalType(category?: string) {
  if (!category) return undefined;
  return ATTRACTION_TYPE_MAP[category];
}

export function touristDestinationJsonLd(d: {
  name: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
  url?: string;
  country?: string;
  containsPlace?: { name: string; url: string }[];
  containedInPlace?: { name: string; url: string };
  touristType?: string[];
}) {
  const url = d.url ? absUrl(d.url) : undefined;
  return {
    "@context": "https://schema.org",
    "@type": ["TouristDestination", "Place"],
    ...(url ? { "@id": `${url}#destination` } : {}),
    name: d.name,
    ...(url ? { url } : {}),
    description: d.description,
    image: imageObjectJsonLd(d.image, d.name),
    geo: { "@type": "GeoCoordinates", latitude: d.lat, longitude: d.lng },
    ...(d.country
      ? { address: { "@type": "PostalAddress", addressCountry: d.country } }
      : {}),
    ...(d.containsPlace?.length
      ? {
          containsPlace: d.containsPlace.slice(0, 10).map((p) => ({
            "@type": "City",
            name: p.name,
            url: absUrl(p.url),
          })),
        }
      : {}),
    ...(d.containedInPlace
      ? {
          containedInPlace: {
            "@type": "Country",
            name: d.containedInPlace.name,
            url: absUrl(d.containedInPlace.url),
          },
        }
      : {}),
    ...(d.touristType?.length ? { touristType: d.touristType } : {}),
    publisher: { "@id": organizationId },
    isPartOf: { "@id": websiteId },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/apple-icon`,
      width: 180,
      height: 180,
    },
    sameAs: [...siteConfig.sameAs],
    description: siteConfig.description,
    publishingPrinciples: `${siteConfig.url}/about`,
    knowsAbout: ["travel planning", "city travel guides", "itineraries", "trip cost"],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: { "@id": organizationId },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/cities?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function articleJsonLd(a: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  authorUrl?: string;
  url: string;
  articleSection?: string;
  wordCount?: number;
}) {
  const url = absUrl(a.url);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: a.title,
    description: a.description,
    image: imageObjectJsonLd(a.image, a.title),
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    inLanguage: "en-US",
    ...(a.articleSection ? { articleSection: a.articleSection } : {}),
    ...(a.wordCount ? { wordCount: a.wordCount } : {}),
    author: {
      "@type": "Person",
      name: a.author,
      ...(a.authorUrl ? { url: a.authorUrl } : {}),
    },
    publisher: { "@id": organizationId },
    isPartOf: { "@id": websiteId },
    mainEntityOfPage: url,
    url,
  };
}

export function personJsonLd(p: {
  name: string;
  description: string;
  image: string;
  url: string;
  jobTitle: string;
}) {
  const url = absUrl(p.url);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${url}#person`,
    name: p.name,
    description: p.description,
    image: absUrl(p.image),
    url,
    jobTitle: p.jobTitle,
    worksFor: { "@id": organizationId },
  };
}

export function itemListJsonLd(items: { name: string; url: string }[], name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absUrl(item.url),
    })),
  };
}

export function collectionPageJsonLd(c: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string }[];
  numberOfItems?: number;
}) {
  const url = absUrl(c.url);
  const listed = c.items.slice(0, 15);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    name: c.name,
    url,
    description: c.description,
    publisher: { "@id": organizationId },
    isPartOf: { "@id": websiteId },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: c.numberOfItems ?? c.items.length,
      itemListElement: listed.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: absUrl(item.url),
      })),
    },
  };
}

export function webApplicationJsonLd(app: {
  name: string;
  url: string;
  description: string;
}) {
  const url = absUrl(app.url);
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${url}#app`,
    name: app.name,
    url,
    description: app.description,
    applicationCategory: "TravelApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: { "@id": organizationId },
    isPartOf: { "@id": websiteId },
  };
}

export function touristTripJsonLd(trip: {
  name: string;
  description: string;
  stops: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: trip.name,
    description: trip.description,
    publisher: { "@id": organizationId },
    itinerary: {
      "@type": "ItemList",
      itemListElement: trip.stops.map((stop, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: stop.name,
        url: absUrl(stop.url),
      })),
    },
  };
}

export function JsonLd({
  data,
}: {
  data: object | null | undefined | Array<object | null | undefined>;
}) {
  const payload = (Array.isArray(data) ? data : [data]).filter(
    (d): d is object => Boolean(d),
  );
  if (payload.length === 0) return null;
  return (
    <>
      {payload.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}
