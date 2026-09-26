import { createFileRoute } from "@tanstack/react-router";
import { AboutFirmPage } from "@/pages/editorial/AboutFirmPage";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/es_/about")({
  head: () => buildSeo({
    title: "Sobre Nuestra Firma de Lesiones Personales | Buena Park",
    description: "Conozca el enfoque de Buena Park Injury Lawyer para accidentes y lesiones personales: evidencia, seguros, documentación de pérdidas y comunicación clara.",
    path: "/es/about",
    locale: "es-US",
    noindex: true,
    followWhenNoindex: true,
  }),
  component: () => <AboutFirmPage locale="es" />,
});
