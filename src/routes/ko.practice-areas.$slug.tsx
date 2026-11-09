import { getPracticeMessaging } from "@/data/practicePageMessaging";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { PracticeAreaDetailPage } from "@/pages/EditorialInnerPages";
import { getPracticeArea } from "@/data/injurySite";
import { breadcrumbJsonLd, buildSeo, serviceJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/ko/practice-areas/$slug")({
  loader: ({ params }) => {
    const practice = getPracticeArea(params.slug);
    if (!practice) throw notFound();
    return practice;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const path = `/ko/practice-areas/${loaderData.slug}`;
    const seo = buildSeo({
      title: getPracticeMessaging(loaderData.slug, "ko")?.title ?? `부에나파크 ${loaderData.koTitle} 변호사`,
      description: getPracticeMessaging(loaderData.slug, "ko")?.description ?? loaderData.koDescription,
      path,
      alternatePath: `/practice-areas/${loaderData.slug}`,
      locale: "ko-US",
    });
    return {
      ...seo,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify(serviceJsonLd({ name: `부에나파크 ${loaderData.koTitle} 변호사`, description: loaderData.koDescription, path, locale: "ko-US" })),
      }, {
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
