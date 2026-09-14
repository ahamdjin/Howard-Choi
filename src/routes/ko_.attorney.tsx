import { createFileRoute } from "@tanstack/react-router";
import { AttorneyPage } from "@/pages/EditorialInnerPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko/attorney")({
  head: () => buildSeo({
    title: "부에나파크 개인상해 변호사팀 | 사고·상해 사건",
    description: "부에나파크와 인근 지역의 사고·개인상해 사건을 다루는 변호사팀의 사건 준비, 증거 보존, 보험 검토, 치료·손실 기록과 의뢰인 소통 방식을 확인하세요.",
    path: "/ko/attorney",
    alternatePath: "/attorney",
    locale: "ko-US",
  }),
  component: () => <AttorneyPage locale="ko" />,
});
