import { createFileRoute } from "@tanstack/react-router";
import EsIndex from "@/pages/es/EsIndex";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/es/")({
  head: () => buildSeo({
    title: "Abogado de lesiones personales y accidentes de auto en Buena Park | Consulta gratuita",
    description: "¿Lesionado? Howard Choi ayuda a víctimas de lesiones personales y accidentes de auto en Buena Park. Consulta gratuita. Sin honorarios salvo que haya recuperación.",
    path: "/es",
    locale: "es-US",
    noindex: true,
    followWhenNoindex: true,
  }),
  component: EsIndex,
});
