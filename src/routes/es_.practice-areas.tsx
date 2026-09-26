import { createFileRoute } from "@tanstack/react-router";
import { SpanishPracticeAreasPage } from "@/pages/es/SpanishEditorialPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/es_/practice-areas")({
  head: () => buildSeo({
    title: "Áreas de Lesiones Personales | Buena Park Injury Lawyer",
    description: "Explore accidentes de auto, camión, motocicleta, peatones, Uber y Lyft, resbalones y caídas, muerte por negligencia y lesiones graves.",
    path: "/es/practice-areas",
    locale: "es",
    noindex: true,
    followWhenNoindex: true,
  }),
  component: SpanishPracticeAreasPage,
});
