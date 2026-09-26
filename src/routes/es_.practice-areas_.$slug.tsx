import { createFileRoute, notFound } from "@tanstack/react-router";
import { SpanishPracticeAreaDetailPage } from "@/pages/es/SpanishEditorialPages";
import { getPracticeArea } from "@/data/injurySite";
import { getSpanishPractice } from "@/data/esPracticeContent";
import { breadcrumbJsonLd, buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/es_/practice-areas_/$slug")({
  loader: ({ params }) => {
    const practice = getPracticeArea(params.slug);
    const copy = getSpanishPractice(params.slug);
    if (!practice || !copy) throw notFound();
    return { practice, copy };
  },
  head: ({ loaderData }) => {
    const path = `/es/practice-areas/${loaderData.practice.slug}`;
    const seo = buildSeo({
      title: `${loaderData.copy.title} | Evidencia, Seguro y Daños`,
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
          { name: "Áreas de práctica", path: "/es/practice-areas" },
          { name: loaderData.copy.shortTitle, path },
        ])),
      }],
    };
  },
  component: SpanishPracticeAreaDetailPage,
});
