import { createFileRoute } from "@tanstack/react-router";
import { LocationsPage } from "@/pages/EditorialLocationPages";
import { breadcrumbJsonLd, buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/locations")({
  head: () => {
    const seo = buildSeo({
    title: "Injury Lawyer Service Areas Near Buena Park, CA | Howard Choi",
    description: "One Buena Park office serving ten Orange and Los Angeles County communities. Explore local accident guides, official traffic-safety data and records resources.",
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