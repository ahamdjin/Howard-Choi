import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/pages/LegalPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () => buildSeo({
    title: "Privacy Policy | Buena Park Injury Lawyer",
    description: "Read the Buena Park Injury Lawyer privacy policy, including how website, inquiry, scheduling, and communication information may be handled.",
    path: "/privacy-policy",
    alternatePath: "/ko/privacy-policy",
    locale: "en-US",
  }),
  component: () => <LegalPage type="privacy" locale="en" />,
});
