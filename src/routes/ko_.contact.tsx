import { createFileRoute } from "@tanstack/react-router";
import KoContact from "@/pages/KoContact";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko/contact")({
  head: () =>
    buildSeo({
      title: "Howard Choi Law 문의 | 부에나파크, CA",
      description:
        "부에나파크 Howard Choi Law에 한국어로 상담을 요청하세요. +1 714-690-0007로 전화하거나 희망 상담 시간을 선택할 수 있습니다.",
      path: "/ko/contact",
      alternatePath: "/contact",
      locale: "ko-US",
    }),
  component: KoContact,
});
