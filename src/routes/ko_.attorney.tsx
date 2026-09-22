import { createFileRoute } from "@tanstack/react-router";
import { AttorneyPage } from "@/pages/EditorialInnerPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko_/attorney")({
  head: () => buildSeo({
    title: "부에나파크 개인상해 변호사 | Howard Choi 변호사",
    description: "부에나파크 개인상해 변호사 Howard Choi(캘리포니아 변호사 번호 284364)의 공개 등록 정보와 사고 사건 준비, 증거, 보험, 치료 및 손실 기록을 다루는 방식을 확인하세요.",
    path: "/ko/attorney",
    alternatePath: "/attorney",
    locale: "ko-US",
  }),
  component: () => <AttorneyPage locale="ko" />,
});