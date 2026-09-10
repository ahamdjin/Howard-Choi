import { createFileRoute } from "@tanstack/react-router";
import KoIndex from "@/pages/KoIndex";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/ko")({
  head: () =>
    buildSeo({
      title: "부에나파크 사고 변호사 | Howard Choi Law",
      description:
        "Howard Choi Law는 부에나파크와 오렌지카운티에서 사고로 부상을 입은 분들을 위해 명확하고 신속한 법률 대응을 제공합니다.",
      path: "/ko",
      alternatePath: "/",
      locale: "ko-US",
    }),
  component: KoIndex,
});
