import { createFileRoute } from "@tanstack/react-router";
import { PhotoCreditsPage } from "@/routes/photo-credits";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/es_/photo-credits")({
  head: () => buildSeo({
    title: "Créditos de fotos | Buena Park Injury Lawyer",
    description: "Autores, fuentes y licencias Creative Commons de las fotografías de ciudades utilizadas en el sitio.",
    path: "/es/photo-credits",
    locale: "es-US",
    noindex: true,
    followWhenNoindex: true,
  }),
  component: () => <PhotoCreditsPage locale="es" />,
});
