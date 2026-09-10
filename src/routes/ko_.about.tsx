import { createFileRoute } from "@tanstack/react-router";
import { AboutFirmPage } from "@/pages/InjurySitePages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko/about")({
  head: () => buildSeo({
    title: "로펌 소개 | Buena Park Injury Lawyer",
    description: "부에나파크와 인근 지역의 사고·개인 상해 사건에 집중하는 Buena Park Injury Lawyer의 접근 방식과 지역 중심 구조를 확인하세요.",
    path: "/ko/about",
    alternatePath: "/about",
    locale: "ko-US",
  }),
  component: () => <AboutFirmPage locale="ko" />,
});
