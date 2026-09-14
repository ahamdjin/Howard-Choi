import { createFileRoute } from "@tanstack/react-router";
import { CaseValueCalculatorPage } from "@/pages/CaseValueCalculator";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/case-value-calculator")({
  head: () => buildSeo({
    title: "California Personal Injury Settlement Calculator | Free Case Value Estimate",
    description: "Use our free California personal injury settlement calculator to estimate an educational case-value range using medical bills, lost wages, treatment, future losses, injury severity, and comparative fault.",
    path: "/case-value-calculator",
    alternatePath: "/ko/case-value-calculator",
    locale: "en-US",
  }),
  component: () => <CaseValueCalculatorPage locale="en" />,
});
