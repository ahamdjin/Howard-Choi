import { createFileRoute } from "@tanstack/react-router";
import { LocationsPage } from "@/pages/RefinedLocationPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/locations")({
  head: () => buildSeo({
    title: "Locations Served | Buena Park Injury Lawyer",
    description: "Buena Park Injury Lawyer serves Buena Park, Fullerton, Anaheim, Cerritos, La Mirada, and La Habra for accident and personal injury matters.",
    path: "/locations",
    alternatePath: "/ko/locations",
    locale: "en-US",
  }),
  component: () => <LocationsPage locale="en" />,
});
