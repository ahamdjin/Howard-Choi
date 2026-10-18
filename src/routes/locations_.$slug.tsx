import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocationDetailPage } from "@/pages/EditorialLocationPages";
import { getServiceLocation } from "@/data/injurySite";
import { breadcrumbJsonLd, buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/locations_/$slug")({
  loader: ({ params }) => {
    const location = getServiceLocation(params.slug);
    if (!location) throw notFound();
    return location;
  },
  head: ({ loaderData }) => {
    const path = `/locations/${loaderData.slug}`;
    const isBuenaPark = loaderData.slug === "buena-park";
    const seo = buildSeo({
      title: isBuenaPark
        ? "Buena Park Accident & Injury Guide | Local Records, Data & Deadlines"
        : loaderData.slug === "la-habra"
          ? "La Habra Personal Injury Lawyer | Free Consultation"
          : `${loaderData.name} Personal Injury Lawyer | Accident & Injury Guide`,
      description: isBuenaPark
        ? `A practical Buena Park accident and injury guide with ${loaderData.ots.year} California OTS collision data, local records resources, evidence to preserve, California deadlines, and injury-law guidance.`
        : loaderData.slug === "la-habra"
          ? "Injured in La Habra? Attorney Howard Choi helps with car, motorcycle, pedestrian and other personal injury claims from his Buena Park office. Free consultation."
          : `${loaderData.description} See local ${loaderData.ots.year} California OTS collision data, official records resources, evidence to preserve, California deadlines, and practical next steps after an accident.`,
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