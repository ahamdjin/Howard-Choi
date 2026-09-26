import { createFileRoute } from "@tanstack/react-router";
import EsIndex from "@/pages/es/EsIndex";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/es")({
  head: () => buildSeo({
    title: "Abogado de Accidentes en Buena Park | Lesiones Personales",
    description: "Información en español sobre accidentes y lesiones personales en Buena Park y comunidades cercanas, incluidos reclamos de auto, camión, motocicleta, peatones, Uber y Lyft.",
    path: "/es",
    locale: "es",
    noindex: true,
    followWhenNoindex: true,
  }),
  component: EsIndex,
});
