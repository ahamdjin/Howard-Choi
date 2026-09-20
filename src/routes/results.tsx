import { createFileRoute } from "@tanstack/react-router";
import { ResultsPage } from "@/pages/EditorialInnerPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/results")({
  head: () => buildSeo({
    title: "Personal Injury Case Results | Buena Park Injury Lawyer",
    description: "Review firm-reported personal injury results with context about the factors that can affect settlement or verdict value. Prior results do not guarantee a similar outcome.",
    path: "/results",
    alternatePath: "/ko/results",
    locale: "en-US",
  }),
  component: () => <ResultsPage locale="en" />,
});
