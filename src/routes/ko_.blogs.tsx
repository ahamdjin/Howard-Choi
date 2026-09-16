import { createFileRoute } from "@tanstack/react-router";
import KoBlogs from "@/pages/KoBlogs";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko_/blogs")({
  head: () => buildSeo({
    title: "캘리포니아 개인상해 법률 가이드 | 교통사고·보험·증거",
    description: "캘리포니아 교통사고와 개인상해 청구에 필요한 보험, 비교과실, 증거, 치료 기록, 사건 가치, 합의와 사고 이후의 실질적인 다음 단계를 설명하는 한국어 법률 가이드입니다.",
    path: "/ko/blogs",
    alternatePath: "/blogs",
    locale: "ko-US",
  }),
  component: KoBlogs,
});
