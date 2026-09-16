import { createFileRoute } from "@tanstack/react-router";
import { AboutFirmPage } from "@/pages/EditorialInnerPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko_/about")({
  head: () => buildSeo({
    title: "부에나파크 개인상해 로펌 소개 | 사고·상해 사건",
    description: "부에나파크를 중심으로 사고·개인상해 사건을 다루는 로펌의 증거 보존, 보험 분석, 치료·경제적 손실 기록, 의뢰인 소통과 지역 중심 접근 방식을 확인하세요.",
    path: "/ko/about",
    alternatePath: "/about",
    locale: "ko-US",
  }),
  component: () => <AboutFirmPage locale="ko" />,
});
