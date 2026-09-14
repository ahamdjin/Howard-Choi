import { createFileRoute } from "@tanstack/react-router";
import { CaseValueCalculatorPage } from "@/pages/CaseValueCalculator";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/case-value-calculator")({
  head: () => buildSeo({
    title: "California Personal Injury Settlement Calculator | Howard Choi",
    description: "Use this free California personal injury settlement calculator to estimate a rough case-value range from medical bills, lost wages, treatment, future losses, and fault.",
    path: "/case-value-calculator",
    alternatePath: "/ko/case-value-calculator",
    locale: "en-US",
  }),
  component: () => <CaseValueCalculatorPage locale="en" />,
});
