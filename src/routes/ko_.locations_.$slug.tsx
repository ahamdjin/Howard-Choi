import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocationDetailPage } from "@/pages/EditorialLocationPages";
import { getServiceLocation } from "@/data/injurySite";
import { breadcrumbJsonLd, buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko_/locations_/$slug")({
  loader: ({ params }) => {
    const location = getServiceLocation(params.slug);
    if (!location) throw notFound();
    return location;
  },
  head: ({ loaderData }) => {
    const path = `/ko/locations/${loaderData.slug}`;
    const isBuenaPark = loaderData.slug === "buena-park";
    const seo = buildSeo({
      title: isBuenaPark
        ? "부에나파크 사고·상해 가이드 | 지역 기록·통계·기한"
        : `${loaderData.koName} 개인상해 변호사 | 지역 사고·상해 안내`,
      description: isBuenaPark
        ? `${loaderData.ots.year} California OTS 부에나파크 교통사고 통계, 지역 공식 기록 자료, 사고 후 보존할 증거, 캘리포니아 청구 기한과 상해 사건 정보를 확인하세요.`
        : `${loaderData.koDescription} ${loaderData.ots.year} California OTS 교통사고 통계, 공식 지역 기록 자료, 사고 후 보존할 증거, 캘리포니아 기한과 상담 준비 정보를 확인하세요.`,
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