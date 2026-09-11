import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/pages/LegalPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/disclaimer")({
  head: () => buildSeo({
    title: "Legal Disclaimer | Buena Park Injury Lawyer",
    description: "Important information about attorney advertising, legal information, attorney-client relationships, and case results on this website.",
    path: "/disclaimer",
    alternatePath: "/ko/disclaimer",
    locale: "en-US",
  }),
  component: () => <LegalPage type="disclaimer" locale="en" />,
});
