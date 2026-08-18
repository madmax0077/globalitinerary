import { PageHero } from "@/components/shared/page-hero";
import { FavoritesClient } from "@/components/shared/favorites-client";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({
    title: "Your Saved Places",
    description:
      "Your bookmarked countries, cities and attractions — saved on this device for planning your next trip.",
    path: "/favorites",
  }),
  robots: { index: false, follow: true },
};

export default function FavoritesPage() {
  return (
    <>
      <PageHero
        eyebrow="Your collection"
        title="Saved places"
        description="Everything you've bookmarked, in one place. Your list is stored on this device — no account required."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Saved", href: "/favorites" },
        ]}
      />
      <div className="container-lux py-12">
        <FavoritesClient />
      </div>
    </>
  );
}
