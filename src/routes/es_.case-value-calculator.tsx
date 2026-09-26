import { createFileRoute } from "@tanstack/react-router";
import { CaseValueCalculatorPage } from "@/pages/CaseValueCalculator";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/es_/case-value-calculator")({
  head: () => buildSeo({
    title: "Calculadora de Lesiones Personales | Rango Educativo de California",
    description: "Use una calculadora educativa para explorar cómo gastos médicos, salarios perdidos, tratamiento, pérdidas futuras y culpa comparativa pueden afectar un rango aproximado.",
    path: "/es/case-value-calculator",
    locale: "es-US",
    noindex: true,
    followWhenNoindex: true,
  }),
  component: () => <CaseValueCalculatorPage locale="es" />,
});
