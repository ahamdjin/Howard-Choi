import { createFileRoute } from "@tanstack/react-router";
import { LocationsPage } from "@/pages/EditorialLocationPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/es_/locations")({
  head: () => buildSeo({
    title: "Zonas de Servicio | Abogado de Accidentes en Buena Park",
    description: "Guías locales sobre accidentes y lesiones para Buena Park, Anaheim, Fullerton, Garden Grove, Cypress, La Habra, La Mirada, Cerritos, Norwalk y Whittier.",
    path: "/es/locations",
    locale: "es-US",
    noindex: true,
    followWhenNoindex: true,
  }),
  component: () => <LocationsPage locale="es" />,
});
