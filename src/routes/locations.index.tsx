import { createFileRoute } from "@tanstack/react-router";
import { LocationsPage } from "@/pages/EditorialLocationPages";
import { breadcrumbJsonLd, buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/locations/")({
  head: () => {
    const seo = buildSeo({
    title: "Personal Injury Lawyer Service Areas | Buena Park, CA",
    description: "Serving Orange and Los Angeles County from our Buena Park office. Explore local injury guides, accident resources and free consultation options.",
    path: "/locations",
    alternatePath: "/ko/locations",
    locale: "en-US",
    });
    return {
      ...seo,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Service Areas", path: "/locations" },
        ])),
      }],
    };
  },
  component: () => <LocationsPage locale="en" />,
});