import { blogPosts } from "./blogs";
import { fullBlogTranslation, localizedBlogTiming, type Translation } from "./fullBlogTranslations";

const metadata = {
  "california-uninsured-driver-hit-and-run-injury-claims": {
    ko: { title: "캘리포니아 무보험 운전자·뺑소니 상해 청구", excerpt: "운전자 확인, UM·UIM 보험, 신고, 증거 및 서로 다른 청구 기한을 구분하는 방법을 설명합니다.", category: "보험과 사고 증거", alt: "캘리포니아 상해 청구에 관한 법률 가이드" },
    es: { title: "Lesiones por conductores sin seguro y fugas en California", excerpt: "Cómo distinguir la identificación del conductor, cobertura UM/UIM, informes, evidencia y los diferentes plazos de reclamación.", category: "Seguros y evidencia", alt: "Guía jurídica sobre reclamaciones por lesiones en California" },
  },
  "how-long-car-accident-settlement-takes-california": {
    ko: { title: "캘리포니아 자동차 사고 합의는 얼마나 걸리나요?", excerpt: "치료, 증거, 보험 검토, 협상과 합의금 지급 단계가 사건 일정에 어떤 영향을 주는지 설명합니다.", category: "합의와 청구 절차", alt: "자동차 사고 합의 절차에 관한 법률 가이드" },
    es: { title: "¿Cuánto tarda un acuerdo por accidente de auto en California?", excerpt: "Cómo influyen el tratamiento, la evidencia, la revisión del seguro, la negociación y el desembolso en el calendario del caso.", category: "Acuerdos y reclamaciones", alt: "Guía jurídica sobre el proceso de acuerdos por accidentes de auto" },
  },
};

export function additionalBlogLocales(locale: "ko" | "es", modules: Record<string, Translation>) {
  return blogPosts.flatMap((master) => {
    const copy = metadata[master.slug as keyof typeof metadata]?.[locale];
    const translated = copy && fullBlogTranslation(master.slug, locale, modules);
    if (!copy || !translated) return [];
    return [{ ...master, ...copy, ...translated, ...localizedBlogTiming(master.slug, locale),
      relatedHref: `/${locale}/practice-areas/car-accidents`,
      relatedLabel: locale === "ko" ? "자동차 사고 법률 안내" : "Ayuda con accidentes de auto",
    }];
  });
}
