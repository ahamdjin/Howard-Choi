import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocationDetailPage } from "@/pages/EditorialLocationPages";
import { getServiceLocation } from "@/data/injurySite";
import { getSpanishLocation } from "@/data/esLocationContent";
import { breadcrumbJsonLd, buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/es_/locations_/$slug")({
  loader: ({ params }) => {
    const location = getServiceLocation(params.slug);
    const copy = getSpanishLocation(params.slug);
    if (!location || !copy) throw notFound();
    return { location, copy };
  },
  head: ({ loaderData }) => {
    const path = `/es/locations/${loaderData.location.slug}`;
    const title = loaderData.location.slug === "buena-park"
      ? "Guía de Accidentes y Lesiones en Buena Park"
      : `Abogado de Lesiones Personales en ${loaderData.location.name}`;
    const seo = buildSeo({
      title: `${title} | Buena Park Injury Lawyer`,
      description: loaderData.copy.description,
      path,
      locale: "es-US",
      noindex: true,
      followWhenNoindex: true,
    });
    return {
      ...seo,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbJsonLd([
          { name: "Inicio", path: "/es" },
          { name: "Zonas de servicio", path: "/es/locations" },
          { name: loaderData.location.name, path },
        ])),
      }],
    };
  },
  component: () => <LocationDetailPage locale="es" />,
});
