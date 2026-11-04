import type { SiteLocale } from "@/data/injurySite";
import { locationPracticeMedia as practiceMedia } from "@/data/locationPracticeMedia";
import { locationMedia } from "@/data/locationMedia";

const practiceAlt: Record<"es" | "ko", Record<string, string>> = {
  es: {
    "car-accidents": "Automóvil dañado con el parabrisas roto después de una colisión",
    "truck-accidents": "Camión comercial en una autopista",
    "motorcycle-accidents": "Motociclista circulando por una carretera",
    "pedestrian-accidents": "Paso peatonal señalizado en una esquina",
    "rideshare-accidents": "Dos automóviles involucrados en una colisión por alcance",
    "slip-and-fall": "Señal de advertencia de piso mojado en un interior",
    "serious-injuries": "Pasillo vacío de un hospital moderno",
    "wrongful-death": "Manos unidas en señal de apoyo",
  },
  ko: {
    "car-accidents": "충돌 후 앞유리가 깨진 손상된 자동차",
    "truck-accidents": "고속도로를 달리는 상업용 트럭",
    "motorcycle-accidents": "도로를 달리는 오토바이 운전자",
    "pedestrian-accidents": "도로 모퉁이에 표시된 횡단보도",
    "rideshare-accidents": "추돌 사고에 연루된 두 대의 자동차",
    "slip-and-fall": "실내의 젖은 바닥 경고 표지판",
    "serious-injuries": "현대식 병원의 빈 복도",
    "wrongful-death": "위로와 지지를 전하며 맞잡은 손",
  },
};
const locationAlt: Record<string, { es: string; ko: string }> = {
  "costa-mesa": {
    es: "Edificios de oficinas en Bristol Street frente a South Coast Plaza en Costa Mesa",
    ko: "Costa Mesa의 South Coast Plaza 맞은편 Bristol Street에 있는 사무용 건물들",
  },
};

export const localizedPracticeMedia = (slug: string, locale: SiteLocale) => ({
  ...practiceMedia[slug],
  alt: locale === "en" ? practiceMedia[slug].alt : practiceAlt[locale][slug],
});
export const localizedLocationMedia = (slug: string, locale: SiteLocale) => ({
  ...locationMedia[slug],
  alt: locale === "en" ? locationMedia[slug].alt : locationAlt[slug]?.[locale] ?? locationMedia[slug].alt,
});
