import { createFileRoute } from "@tanstack/react-router";
import ThankYou from "@/pages/ThankYou";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko/thank-you")({
  head: () => buildSeo({
    title: "문의 접수 완료 | Buena Park Injury Lawyer",
    description: "Buena Park Injury Lawyer에 문의가 정상적으로 접수되었습니다.",
    path: "/ko/thank-you",
    alternatePath: "/thank-you",
    locale: "ko-US",
    noindex: true,
  }),
  component: () => <ThankYou locale="ko" />,
});
