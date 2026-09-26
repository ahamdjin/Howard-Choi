import { createFileRoute } from "@tanstack/react-router";
import { ResultsPage } from "@/pages/editorial/ResultsPage";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/es_/results")({
  head: () => buildSeo({
    title: "Resultados de Lesiones Personales | Buena Park Injury Lawyer",
    description: "Cifras y resultados reportados por la firma con contexto sobre los factores que pueden influir en un reclamo. Los resultados anteriores no garantizan un resultado similar.",
    path: "/es/results",
    locale: "es-US",
    noindex: true,
    followWhenNoindex: true,
  }),
  component: () => <ResultsPage locale="es" />,
});
