import { createFileRoute, notFound } from "@tanstack/react-router";
import { PracticeAreaDetailPage } from "@/pages/InjurySitePages";
import { getPracticeArea } from "@/data/injurySite";
import { breadcrumbJsonLd, buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko/practice-areas/$slug")({
  loader: ({ params }) => {
    const practice = getPracticeArea(params.slug);
    if (!practice) throw notFound();
    return practice;
  },
  head: ({ loaderData }) => {
    const path = `/ko/practice-areas/${loaderData.slug}`;
    const seo = buildSeo({
      title: `${loaderData.koTitle} 변호사 | Buena Park Injury Lawyer`,
      description: loaderData.koDescription,
      path,
      alternatePath: `/practice-areas/${loaderData.slug}`,
      locale: "ko-US",
    });
    return {
      ...seo,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbJsonLd([
          { name: "홈", path: "/ko" },
          { name: "업무 분야", path: "/ko/practice-areas" },
          { name: loaderData.koTitle, path },
        ])),
      }],
    };
  },
  component: () => <PracticeAreaDetailPage locale="ko" />,
});
