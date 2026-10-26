import { createFileRoute } from "@tanstack/react-router";
import { LocationsPage } from "@/pages/EditorialLocationPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/locations")({
  head: () => buildSeo({
    title: "Injury Lawyer Service Areas Near Buena Park, CA | Howard Choi",
    description: "One Buena Park office serving ten Orange and Los Angeles County communities. Explore local accident guides, official traffic-safety data and records resources.",
    path: "/locations",
    alternatePath: "/ko/locations",
    locale: "en-US",
  }),
  component: () => <LocationsPage locale="en" />,
});