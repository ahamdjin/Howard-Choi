import { createFileRoute } from "@tanstack/react-router";
import { LocationsPage } from "@/pages/DeepSEOLocationPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko/locations")({
  head: () => buildSeo({
    title: "서비스 지역 | Buena Park Injury Lawyer",
    description: "Buena Park Injury Lawyer는 부에나파크, 풀러턴, 애너하임, 세리토스, 라미라다, 라하브라의 사고·개인 상해 사건을 지원합니다.",
    path: "/ko/locations",
    alternatePath: "/locations",
    locale: "ko-US",
  }),
  component: () => <LocationsPage locale="ko" />,
});
