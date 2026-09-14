import { createFileRoute } from "@tanstack/react-router";
import { LocationsPage } from "@/pages/EditorialLocationPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/locations")({
  head: () => buildSeo({
    title: "Service Areas & Local Injury Guides | Buena Park Injury Lawyers",
    description: "Explore local accident and injury guides for Buena Park, Fullerton, Anaheim, Cerritos, La Mirada, and La Habra, including California OTS collision data, official records resources, evidence, deadlines, and nearby service coverage.",
    path: "/locations",
    alternatePath: "/ko/locations",
    locale: "en-US",
  }),
  component: () => <LocationsPage locale="en" />,
});