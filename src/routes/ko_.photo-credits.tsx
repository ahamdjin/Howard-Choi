import { createFileRoute } from "@tanstack/react-router";
import { PhotoCreditsPage } from "@/routes/photo-credits";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko_/photo-credits")({
  head: () => buildSeo({
    title: "사진 출처 | Buena Park Injury Lawyer",
    description: "지역 사진 저작자, 원본 출처 및 크리에이티브 커먼즈 이용허락 정보.",
    path: "/ko/photo-credits",
    locale: "ko-US",
    noindex: true,
    followWhenNoindex: true,
  }),
  component: () => <PhotoCreditsPage locale="ko" />,
});
