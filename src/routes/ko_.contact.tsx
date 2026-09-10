import { createFileRoute } from "@tanstack/react-router";
import KoContact from "@/pages/KoContact";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko/contact")({
  head: () => buildSeo({
    title: "문의 | Buena Park Injury Lawyer",
    description: "부에나파크 및 인근 지역의 사고·개인 상해 사건에 대해 Buena Park Injury Lawyer에 문의하거나 714-690-0007로 전화하세요.",
    path: "/ko/contact",
    alternatePath: "/contact",
    locale: "ko-US",
  }),
  component: KoContact,
});
