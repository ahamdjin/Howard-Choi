import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocationDetailPage } from "@/pages/EditorialLocationPages";
import { getServiceLocation } from "@/data/injurySite";
import { breadcrumbJsonLd, buildSeo } from "@/lib/seo";
import { locationGuidesEn } from "@/data/locationGuidesEn";

export const Route = createFileRoute("/locations_/$slug")({
  loader: ({ params }) => {
    const location = getServiceLocation(params.slug);
    if (!location) throw notFound();
    return location;
  },
  head: ({ loaderData }) => {
    const path = `/locations/${loaderData.slug}`;
    const citySeo = locationGuidesEn[loaderData.slug];
    const seo = buildSeo({
      title: citySeo.seoTitle,
      description: citySeo.seoDescription,
      path,
      alternatePath: `/ko/locations/${loaderData.slug}`,
      locale: "en-US",
    });
    return {
      ...seo,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: loaderData.name, path },
        ])),
      }],
    };
  },
  component: () => <LocationDetailPage locale="en" />,
});