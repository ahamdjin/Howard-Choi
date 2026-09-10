import { createFileRoute } from "@tanstack/react-router";
import { ResultsPage } from "@/pages/InjurySitePages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/results")({
  head: () => buildSeo({
    title: "Case Results | Buena Park Injury Lawyer",
    description: "Case-results structure for Buena Park Injury Lawyer. Published outcomes are presented with context and appropriate disclaimers when approved for publication.",
    path: "/results",
    alternatePath: "/ko/results",
    locale: "en-US",
    noindex: true,
  }),
  component: () => <ResultsPage locale="en" />,
});
