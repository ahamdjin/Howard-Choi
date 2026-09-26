import { createFileRoute } from "@tanstack/react-router";
import { SpanishResultsPage } from "@/pages/es/SpanishEditorialPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/es_/results")({
  head: () => buildSeo({
    title: "Resultados de Lesiones Personales | Buena Park Injury Lawyer",
    description: "Cifras y resultados reportados por la firma con contexto sobre los factores que pueden influir en un reclamo. Los resultados anteriores no garantizan un resultado similar.",
    path: "/es/results",
    locale: "es",
    noindex: true,
    followWhenNoindex: true,
  }),
  component: SpanishResultsPage,
});
