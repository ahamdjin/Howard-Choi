import { createFileRoute } from "@tanstack/react-router";
import KoContact from "@/pages/KoContact";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko_/contact")({
  head: () => buildSeo({
    title: "부에나파크 개인상해 변호사 상담 | 문의 및 예약",
    description: "사고 장소와 날짜, 현재 치료, 보험 문제, 증거와 궁금한 점을 정리해 부에나파크 개인상해 변호사에 문의하세요. 714-844-8494로 전화하거나 온라인 상담 시간을 예약할 수 있습니다.",
    path: "/ko/contact",
    alternatePath: "/contact",
    locale: "ko-US",
  }),
  component: KoContact,
});
