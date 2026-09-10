import { createFileRoute } from "@tanstack/react-router";
import KoBlogs from "@/pages/KoBlogs";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko/blogs")({
  head: () =>
    buildSeo({
      title: "법률 인사이트 | Howard Choi Law",
      description:
        "사업 분쟁, 계약, 기업 자문, 리스크와 중요한 법률 의사결정에 관한 Howard Choi Law의 실무 중심 한국어 법률 인사이트입니다.",
      path: "/ko/blogs",
      alternatePath: "/blogs",
      locale: "ko-US",
    }),
  component: KoBlogs,
});
