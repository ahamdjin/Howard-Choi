import { createFileRoute } from "@tanstack/react-router";
import { CaseValueCalculatorPage } from "@/pages/CaseValueCalculator";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/case-value-calculator")({
  head: () => buildSeo({
    title: "Personal Injury Calculator | Buena Park Injury Lawyer",
    description: "Explore an educational California injury claim estimate using medical bills, lost wages, future care and fault. A calculation is not a settlement guarantee.",
    path: "/case-value-calculator",
    alternatePath: "/ko/case-value-calculator",
    locale: "en-US",
  }),
  component: () => <CaseValueCalculatorPage locale="en" />,
});
