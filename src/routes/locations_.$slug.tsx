import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocationDetailPage } from "@/pages/InjurySitePages";
import { getServiceLocation } from "@/data/injurySite";
import { breadcrumbJsonLd, buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/locations/$slug")({
  loader: ({ params }) => {
    const location = getServiceLocation(params.slug);
    if (!location) throw notFound();
    return location;
  },
  head: ({ loaderData }) => {
    const path = `/locations/${loaderData.slug}`;
    const seo = buildSeo({
      title: `${loaderData.name} Injury Lawyer | Buena Park Injury Lawyer`,
      description: loaderData.description,
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
