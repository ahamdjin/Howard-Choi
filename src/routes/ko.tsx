import { createFileRoute } from "@tanstack/react-router";
import KoIndex from "@/pages/KoIndex";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko")({
  head: () => buildSeo({
    title: "부에나파크 사고·개인 상해 변호사 | Buena Park Injury Lawyer",
    description: "Buena Park Injury Lawyer는 부에나파크, 풀러턴, 애너하임, 세리토스, 라미라다, 라하브라의 사고·개인 상해 사건을 지원합니다.",
    path: "/ko",
    alternatePath: "/",
    locale: "ko-US",
  }),
  component: KoIndex,
});
