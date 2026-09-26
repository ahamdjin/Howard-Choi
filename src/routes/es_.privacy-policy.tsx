import { createFileRoute } from "@tanstack/react-router";
import { SpanishLegalPage } from "@/pages/es/EsLegalPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/es_/privacy-policy")({
  head: () => buildSeo({
    title: "Política de Privacidad | Buena Park Injury Lawyer",
    description: "Política de privacidad del sitio de Buena Park Injury Lawyer.",
    path: "/es/privacy-policy",
    locale: "es-US",
    noindex: true,
    followWhenNoindex: true,
  }),
  component: () => <SpanishLegalPage type="privacy" />,
});
