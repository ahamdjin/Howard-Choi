import { createFileRoute } from "@tanstack/react-router";
import { AttorneyPage } from "@/pages/EditorialInnerPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko/attorney")({
  head: () => buildSeo({
    title: "부에나파크 개인상해 변호사팀 | Howard Choi 변호사",
    description: "부에나파크 개인상해 법률팀과 California Bar No. 284364 Howard Choi 변호사의 공개 등록 정보, 사고 사건 준비, 증거, 보험, 치료·손실 기록과 소통 방식을 확인하세요.",
    path: "/ko/attorney",
    alternatePath: "/attorney",
    locale: "ko-US",
  }),
  component: () => <AttorneyPage locale="ko" />,
});