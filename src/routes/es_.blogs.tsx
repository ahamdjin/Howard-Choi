import { createFileRoute } from "@tanstack/react-router";
import EsBlogs from "@/pages/es/EsBlogs";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/es_/blogs")({
  head: () => buildSeo({
    title: "Guías de Lesiones Personales en California | Accidentes y Seguros",
    description: "Guías en español sobre accidentes, seguros, culpa comparativa, evidencia, plazos de California y factores que pueden influir en el valor de un reclamo.",
    path: "/es/blogs",
    locale: "es",
    noindex: true,
    followWhenNoindex: true,
  }),
  component: EsBlogs,
});
