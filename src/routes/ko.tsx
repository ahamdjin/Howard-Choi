import { createFileRoute } from "@tanstack/react-router";
import KoIndex from "@/pages/KoIndex";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko")({
  head: () => buildSeo({
    title: "부에나파크 사고 변호사 | 개인상해 법률 상담",
    description: "부에나파크와 인근 지역의 자동차, 트럭, 오토바이, 보행자, 우버·리프트, 낙상, 부당 사망 및 중대 상해 사건을 다루는 캘리포니아 개인상해 변호사입니다.",
    path: "/ko",
    alternatePath: "/",
    locale: "ko-US",
  }),
  component: KoIndex,
});
