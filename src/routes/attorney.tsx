import { createFileRoute } from "@tanstack/react-router";
import { AttorneyPage } from "@/pages/EditorialInnerPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/attorney")({
  head: () => buildSeo({
    title: "Buena Park Personal Injury Attorneys | Howard Choi & Legal Team",
    description: "Meet the Buena Park personal injury legal team, including California attorney Howard Choi (Bar No. 284364), and learn how accident claims, evidence, insurance, medical losses, and client communication are handled.",
    path: "/attorney",
    alternatePath: "/ko/attorney",
    locale: "en-US",
  }),
  component: () => <AttorneyPage locale="en" />,
});