import { createFileRoute } from "@tanstack/react-router";
import EditorialStandardsPage from "@/pages/EditorialStandardsPage";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/editorial-standards")({
  head: () => buildSeo({
    title: "Editorial Standards | Buena Park Injury Lawyer",
    description: "See how Buena Park Injury Lawyer approaches legal sourcing, attorney identity, case-result and testimonial claims, updates, and corrections.",
    path: "/editorial-standards",
    locale: "en-US",
  }),
  component: EditorialStandardsPage,
});
