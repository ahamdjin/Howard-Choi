import { createFileRoute } from "@tanstack/react-router";
import { ResultsPage } from "@/pages/EditorialInnerPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko_/results")({
  head: () => buildSeo({
    title: "개인상해 사건 결과 | 부에나파크 개인상해 변호사",
    description: "개인상해 사건 결과를 사건 유형과 핵심 맥락과 함께 확인하세요. 책임, 치료, 보험, 손실과 증거가 결과에 어떤 영향을 줄 수 있는지도 설명합니다. 과거 결과는 유사한 결과를 보장하지 않습니다.",
    path: "/ko/results",
    alternatePath: "/results",
    locale: "ko-US",
    noindex: true,
  }),
  component: () => <ResultsPage locale="ko" />,
});
