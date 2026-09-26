import { createFileRoute } from "@tanstack/react-router";
import EsContact from "@/pages/es/EsContact";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/es_/contact")({
  head: () => buildSeo({
    title: "Contacto | Buena Park Injury Lawyer",
    description: "Comuníquese con Buena Park Injury Lawyer sobre un accidente, tratamiento, seguro, evidencia o plazos. Consulta inicial gratuita.",
    path: "/es/contact",
    locale: "es",
    noindex: true,
    followWhenNoindex: true,
  }),
  component: EsContact,
});
