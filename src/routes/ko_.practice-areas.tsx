import { createFileRoute } from "@tanstack/react-router";
import { PracticeAreasPage } from "@/pages/EditorialInnerPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko/practice-areas")({
  head: () => buildSeo({
    title: "개인상해 업무 분야 | 부에나파크 개인상해 변호사",
    description: "부에나파크에서 자동차, 트럭, 오토바이, 보행자, 우버·리프트, 낙상, 부당 사망 및 중대 상해 사건의 증거, 보험, 손해와 다음 단계를 확인하세요.",
    path: "/ko/practice-areas",
    alternatePath: "/practice-areas",
    locale: "ko-US",
  }),
  component: () => <PracticeAreasPage locale="ko" />,
});
