import { createFileRoute } from "@tanstack/react-router";
import { LocationsPage } from "@/pages/EditorialLocationPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko/locations")({
  head: () => buildSeo({
    title: "부에나파크 및 인근 지역 개인상해 변호사 | 서비스 지역",
    description: "부에나파크, 풀러턴, 애너하임, 세리토스, 라미라다, 라하브라의 개인상해 안내와 지역 교통사고 통계, 보존할 증거, 사건 유형 및 상담 준비 정보를 확인하세요.",
    path: "/ko/locations",
    alternatePath: "/locations",
    locale: "ko-US",
  }),
  component: () => <LocationsPage locale="ko" />,
});
