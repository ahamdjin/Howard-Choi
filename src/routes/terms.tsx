import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/pages/LegalPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => buildSeo({
    title: "Terms of Use | Buena Park Injury Lawyer",
    description: "Review the terms governing use of the Buena Park Injury Lawyer website, including legal-information, communication, and appointment terms.",
    path: "/terms",
    alternatePath: "/ko/terms",
    locale: "en-US",
  }),
  component: () => <LegalPage type="terms" locale="en" />,
});
