import { createFileRoute } from "@tanstack/react-router";
import KoIndex from "@/pages/KoIndex";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko/")({
  head: () => buildSeo({
    title: "부에나파크 개인상해 및 교통사고 변호사 | 무료 상담",
    description: "다치셨나요? Howard Choi 변호사가 부에나파크 개인상해 및 교통사고 피해자의 보상 청구를 돕습니다. 무료 상담. 보상금 회수 없이는 변호사 수임료가 없습니다.",
    path: "/ko",
    alternatePath: "/",
    locale: "ko-US",
  }),
  component: KoIndex,
});
