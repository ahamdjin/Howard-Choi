import { createFileRoute } from "@tanstack/react-router";
import { SpanishAttorneyPage } from "@/pages/es/SpanishEditorialPages";
import { absoluteUrl, buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/es_/attorney")({
  head: () => {
    const seo = buildSeo({
      title: "Howard Choi | Abogado de Lesiones Personales en Buena Park",
      description: "Howard Jong-yol Choi es abogado de California en Buena Park, State Bar No. 284364, admitido en 2012. Consulte sus credenciales y enfoque en reclamos por accidentes.",
      path: "/es/attorney",
      locale: "es-US",
      noindex: true,
      followWhenNoindex: true,
    });
    return {
      ...seo,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": `${absoluteUrl("/es/attorney")}#profilepage`,
          url: absoluteUrl("/es/attorney"),
          name: "Howard Choi, abogado de accidentes y lesiones personales en Buena Park",
          inLanguage: "es",
          isPartOf: { "@id": `${absoluteUrl("/")}#website` },
          mainEntity: { "@id": `${absoluteUrl("/")}#howard-choi` },
          about: { "@id": `${absoluteUrl("/")}#howard-choi` },
        }),
      }],
    };
  },
  component: SpanishAttorneyPage,
});
