import { createFileRoute } from "@tanstack/react-router";
import { SpanishLegalPage } from "@/pages/es/EsLegalPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/es_/disclaimer")({
  head: () => buildSeo({
    title: "Aviso Legal | Buena Park Injury Lawyer",
    description: "Información sobre publicidad de abogado, asesoría legal, relación abogado-cliente y resultados.",
    path: "/es/disclaimer",
    locale: "es",
    noindex: true,
    followWhenNoindex: true,
  }),
  component: () => <SpanishLegalPage type="disclaimer" />,
});
