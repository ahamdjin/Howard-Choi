import { createFileRoute } from "@tanstack/react-router";
import EsThankYou from "@/pages/es/EsThankYou";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/es_/thank-you")({
  head: () => buildSeo({
    title: "Gracias | Buena Park Injury Lawyer",
    description: "Su mensaje fue recibido por Buena Park Injury Lawyer.",
    path: "/es/thank-you",
    locale: "es-US",
    noindex: true,
    followWhenNoindex: true,
  }),
  component: EsThankYou,
});
