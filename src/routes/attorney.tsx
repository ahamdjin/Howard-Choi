import { createFileRoute } from "@tanstack/react-router";
import { AttorneyPage } from "@/pages/EditorialInnerPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/attorney")({
  head: () => buildSeo({
    title: "Personal Injury Attorneys | Buena Park, CA",
    description: "Meet the personal injury attorneys serving Buena Park and nearby communities, and learn how the legal team approaches accident claims, evidence, insurance, medical documentation, and client communication.",
    path: "/attorney",
    alternatePath: "/ko/attorney",
    locale: "en-US",
  }),
  component: () => <AttorneyPage locale="en" />,
});
