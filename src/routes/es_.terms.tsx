import { createFileRoute } from "@tanstack/react-router";
import { SpanishLegalPage } from "@/pages/es/EsLegalPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/es_/terms")({
  head: () => buildSeo({
    title: "Términos de Uso | Buena Park Injury Lawyer",
    description: "Términos que regulan el uso del sitio de Buena Park Injury Lawyer.",
    path: "/es/terms",
    locale: "es",
    noindex: true,
    followWhenNoindex: true,
  }),
  component: () => <SpanishLegalPage type="terms" />,
});
