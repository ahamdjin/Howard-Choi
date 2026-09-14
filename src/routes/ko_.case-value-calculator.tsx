import { createFileRoute } from "@tanstack/react-router";
import { CaseValueCalculatorPage } from "@/pages/CaseValueCalculator";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko/case-value-calculator")({
  head: () => buildSeo({
    title: "캘리포니아 개인상해 합의금 계산기 | Howard Choi",
    description: "의료비, 소득 손실, 부상 정도, 치료 수준 및 비교과실을 바탕으로 캘리포니아 개인상해 사건의 교육용 예상 범위를 확인하세요.",
    path: "/ko/case-value-calculator",
    alternatePath: "/case-value-calculator",
    locale: "ko-US",
  }),
  component: () => <CaseValueCalculatorPage locale="ko" />,
});
