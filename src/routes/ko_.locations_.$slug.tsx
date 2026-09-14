import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocationDetailPage } from "@/pages/EditorialLocationPages";
import { getServiceLocation } from "@/data/injurySite";
import { breadcrumbJsonLd, buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko/locations/$slug")({
  loader: ({ params }) => {
    const location = getServiceLocation(params.slug);
    if (!location) throw notFound();
    return location;
  },
  head: ({ loaderData }) => {
    const path = `/ko/locations/${loaderData.slug}`;
    const seo = buildSeo({
      title: `${loaderData.koName} 개인상해 변호사 | 지역 사고·상해 안내`,
      description: `${loaderData.koDescription} ${loaderData.ots.year} California OTS 교통사고 통계, 사고 후 보존할 증거, 주요 개인상해 사건 유형과 상담 준비 정보를 확인하세요.`,
      path,
      alternatePath: `/locations/${loaderData.slug}`,
      locale: "ko-US",
    });
    return {
      ...seo,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbJsonLd([
          { name: "홈", path: "/ko" },
          { name: "서비스 지역", path: "/ko/locations" },
          { name: loaderData.koName, path },
        ])),
      }],
    };
  },
  component: () => <LocationDetailPage locale="ko" />,
});
