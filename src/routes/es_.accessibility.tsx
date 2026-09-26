import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/pages/LegalPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/es_/accessibility")({
  head: () => buildSeo({
    title: "Accesibilidad | Buena Park Injury Lawyer",
    description: "Declaración de accesibilidad del sitio web de Buena Park Injury Lawyer.",
    path: "/es/accessibility",
    locale: "es-US",
    noindex: true,
    followWhenNoindex: true,
  }),
  component: () => <LegalPage type="accessibility" locale="es" />,
});
