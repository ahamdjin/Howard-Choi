import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/pages/LegalPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/accessibility")({
  head: () => buildSeo({
    title: "Accessibility Statement | Buena Park Injury Lawyer",
    description: "Read the Buena Park Injury Lawyer website accessibility statement and learn how to request assistance using the site.",
    path: "/accessibility",
    alternatePath: "/ko/accessibility",
    locale: "en-US",
  }),
  component: () => <LegalPage type="accessibility" locale="en" />,
});
