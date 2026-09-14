import { createFileRoute } from "@tanstack/react-router";
import { LocationsPage } from "@/pages/EditorialLocationPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/locations")({
  head: () => buildSeo({
    title: "Personal Injury Lawyers Serving Buena Park & Nearby Cities",
    description: "Local personal injury guides for Buena Park, Fullerton, Anaheim, Cerritos, La Mirada, and La Habra, including collision context, evidence to preserve, practice areas, and consultation preparation.",
    path: "/locations",
    alternatePath: "/ko/locations",
    locale: "en-US",
  }),
  component: () => <LocationsPage locale="en" />,
});
