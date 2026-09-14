import { createFileRoute } from "@tanstack/react-router";
import { CaseValueCalculatorPage } from "@/pages/CaseValueCalculator";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/case-value-calculator")({
  head: () => buildSeo({
    title: "California Personal Injury Settlement Calculator | Howard Choi",
    description: "Estimate a rough California personal-injury settlement range using medical costs, lost income, injury severity, treatment, and comparative fault. Educational only.",
    path: "/case-value-calculator",
    alternatePath: "/ko/case-value-calculator",
    locale: "en-US",
  }),
  component: () => <CaseValueCalculatorPage locale="en" />,
});
