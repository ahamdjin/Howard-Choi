import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocationDetailPage } from "@/pages/EditorialLocationPages";
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
      title: `${loaderData.name} Personal Injury Lawyers | Local Accident Guide`,
      description: `${loaderData.description} See local ${loaderData.ots.year} California OTS collision data, evidence to preserve, injury practice areas, and practical next steps after an accident.`,
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
