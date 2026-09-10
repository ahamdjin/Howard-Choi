import { createFileRoute } from "@tanstack/react-router";
import KoBlogs from "@/pages/KoBlogs";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko/blogs")({
  head: () => buildSeo({
    title: "개인 상해 법률 블로그 | Buena Park Injury Lawyer",
    description: "캘리포니아 교통사고, 개인 상해 청구, 보험, 증거, 치료 기록과 사고 이후의 중요한 판단을 설명하는 한국어 법률 가이드입니다.",
    path: "/ko/blogs",
    alternatePath: "/blogs",
    locale: "ko-US",
  }),
  component: KoBlogs,
});
