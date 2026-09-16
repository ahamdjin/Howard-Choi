import { createFileRoute } from "@tanstack/react-router";
import { CaseValueCalculatorPage } from "@/pages/CaseValueCalculator";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko_/case-value-calculator")({
  head: () => buildSeo({
    title: "캘리포니아 교통사고·개인상해 합의금 계산기 | 무료 예상 범위",
    description: "의료비, 임금 손실, 치료 수준, 향후 손실, 부상 정도와 비교과실을 입력해 캘리포니아 교통사고·개인상해 사건의 교육용 예상 범위를 무료로 확인하세요.",
    path: "/ko/case-value-calculator",
    alternatePath: "/case-value-calculator",
    locale: "ko-US",
  }),
  component: () => <CaseValueCalculatorPage locale="ko" />,
});
