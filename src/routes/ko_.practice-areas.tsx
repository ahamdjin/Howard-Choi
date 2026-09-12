import { createFileRoute } from "@tanstack/react-router";
import { PracticeAreasPage } from "@/pages/DeepSEOInnerPages";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko/practice-areas")({
  head: () => buildSeo({
    title: "개인 상해 업무 분야 | Buena Park Injury Lawyer",
    description: "부에나파크에서 자동차, 트럭, 오토바이, 보행자, 승차공유, 낙상, 부당 사망 및 중대 상해 사건의 업무 분야를 확인하세요.",
    path: "/ko/practice-areas",
    alternatePath: "/practice-areas",
    locale: "ko-US",
  }),
  component: () => <PracticeAreasPage locale="ko" />,
});
