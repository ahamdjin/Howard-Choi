import { createFileRoute } from "@tanstack/react-router";
import { AboutFirmPage } from "@/pages/EditorialInnerPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => buildSeo({
    title: "About Our Personal Injury Law Firm | Buena Park, CA",
    description: "Learn how our Buena Park personal injury law firm approaches accident claims through evidence preservation, insurance analysis, medical and financial documentation, clear communication, and local service across nearby Orange and Los Angeles County communities.",
    path: "/about",
    alternatePath: "/ko/about",
    locale: "en-US",
  }),
  component: () => <AboutFirmPage locale="en" />,
});
