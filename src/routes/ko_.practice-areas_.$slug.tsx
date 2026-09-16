import { createFileRoute, notFound } from "@tanstack/react-router";
import { PracticeAreaDetailPage } from "@/pages/EditorialInnerPages";
import { getPracticeArea } from "@/data/injurySite";
import { breadcrumbJsonLd, buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko_/practice-areas_/$slug")({
  loader: ({ params }) => {
    const practice = getPracticeArea(params.slug);
    if (!practice) throw notFound();
    return practice;
  },
  head: ({ loaderData }) => {
    const path = `/ko/practice-areas/${loaderData.slug}`;
    const seo = buildSeo({
      title: `부에나파크 ${loaderData.koTitle} 변호사 | 증거·보험·손해 안내`,
      description: `${loaderData.koDescription} 사고 이후 보존할 증거, 보험과 책임, 치료와 손실, 사건 가치에 영향을 주는 요소와 다음 단계를 확인하세요.`,
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
