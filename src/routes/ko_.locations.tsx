import { createFileRoute } from "@tanstack/react-router";
import { LocationsPage } from "@/pages/EditorialLocationPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko/locations")({
  head: () => buildSeo({
    title: "서비스 지역·지역 사고 가이드 | 부에나파크 개인상해 변호사",
    description: "부에나파크, 풀러턴, 애너하임, 세리토스, 라미라다, 라하브라의 캘리포니아 OTS 교통사고 통계, 공식 기록 자료, 증거, 기한 및 개인상해 서비스 지역 안내를 확인하세요.",
    path: "/ko/locations",
    alternatePath: "/locations",
    locale: "ko-US",
  }),
  component: () => <LocationsPage locale="ko" />,
});