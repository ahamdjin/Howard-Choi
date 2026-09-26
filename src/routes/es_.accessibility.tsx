import { createFileRoute } from "@tanstack/react-router";
import { SpanishLegalPage } from "@/pages/es/EsLegalPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/es_/accessibility")({
  head: () => buildSeo({
    title: "Accesibilidad | Buena Park Injury Lawyer",
    description: "Declaración de accesibilidad del sitio web de Buena Park Injury Lawyer.",
    path: "/es/accessibility",
    locale: "es",
    noindex: true,
    followWhenNoindex: true,
  }),
  component: () => <SpanishLegalPage type="accessibility" />,
});
