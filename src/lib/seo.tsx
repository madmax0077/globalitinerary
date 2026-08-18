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
    alternates: { canonical: url },
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

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
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
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: a.name,
    description: a.description,
    image: a.image,
    address: { "@type": "PostalAddress", addressLocality: a.address },
    geo: { "@type": "GeoCoordinates", latitude: a.lat, longitude: a.lng },
  };
}

export function touristDestinationJsonLd(d: {
  name: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: d.name,
    description: d.description,
    image: d.image,
    geo: { "@type": "GeoCoordinates", latitude: d.lat, longitude: d.lng },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    logo: `${siteConfig.url}/icon.svg`,
    sameAs: siteConfig.sameAs,
    description: siteConfig.description,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
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
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    image: a.image,
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    author: { "@type": "Person", name: a.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/icon.svg` },
    },
    mainEntityOfPage: a.url,
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
      url: item.url.startsWith("http") ? item.url : `${siteConfig.url}${item.url}`,
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
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
