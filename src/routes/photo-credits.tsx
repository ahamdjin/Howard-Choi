import { createFileRoute } from "@tanstack/react-router";
import { EditorialFrame } from "@/pages/editorial/shared";
import { serviceLocations, type SiteLocale } from "@/data/injurySite";
import { locationMedia } from "@/data/locationMedia";
import { buildSeo } from "@/lib/seo";

// Attribution belongs on this separate, accessible reference page—not over
// the photographs, inside the city cards, or in the homepage carousel.
const licenseUrls: Record<string, string> = {
  "CC0": "https://creativecommons.org/publicdomain/zero/1.0/",
  "CC BY 2.0": "https://creativecommons.org/licenses/by/2.0/",
  "CC BY-SA 2.0": "https://creativecommons.org/licenses/by-sa/2.0/",
  "CC BY-SA 3.0": "https://creativecommons.org/licenses/by-sa/3.0/",
  "CC BY-SA 4.0": "https://creativecommons.org/licenses/by-sa/4.0/",
};

export const PhotoCreditsPage = ({ locale = "en" }: { locale?: SiteLocale }) => (
  <EditorialFrame locale={locale}>
    <main className="bg-[#F8F7F4] px-5 pb-20 pt-32 text-[#1E1C1A] md:pt-40">
      <div className="mx-auto max-w-[920px]">
        <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#766D63]">{locale === "ko" ? "웹사이트 정보" : locale === "es" ? "Información del sitio" : "Site information"}</div>
        <h1 className="editorial-serif mt-4 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.1]">{locale === "ko" ? "사진 출처" : locale === "es" ? "Créditos fotográficos" : "Photograph credits"}</h1>
        <p className="mt-6 max-w-[760px] text-[14px] leading-7 text-[#5E564F]">
          {locale === "ko"
            ? "지역 안내와 홈페이지에 사용된 도시 사진의 저작자 및 이용허락 정보를 안내합니다. 반응형 화면에 맞게 사진의 크기와 구도가 조정될 수 있으며, 사진은 로펌 의뢰인이나 특정 사건을 나타내지 않습니다."
            : locale === "es"
              ? "Aquí se indican los autores y las licencias de las fotografías de ciudades utilizadas en las páginas de zonas de servicio. Las imágenes pueden redimensionarse o recortarse y no representan clientes ni casos específicos del despacho."
              : "City photographs used in the service-area carousel, location directory and city guides are credited below. Photographs may be resized or cropped for responsive layouts. The images do not depict the firm's clients or a particular case."}
        </p>
        <ul className="mt-10 divide-y divide-[#1E1C1A]/15 border-y border-[#1E1C1A]/15">
          {serviceLocations.map((location) => {
            const photo = locationMedia[location.slug];
            if (!photo) return null;
            return (
              <li key={location.slug} className="grid gap-2 py-5 sm:grid-cols-[180px_1fr] sm:gap-7">
                <span className="font-semibold text-[14px]">{location.name}</span>
                <div className="text-[13px] leading-6 text-[#5E564F]">
                  <span>{photo.credit}</span>
                  <span aria-hidden="true"> · </span>
                  <a href={licenseUrls[photo.license] || photo.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#1E1C1A]">{photo.license}</a>
                  <span aria-hidden="true"> · </span>
                  <a href={photo.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#1E1C1A]">{locale === "ko" ? "원본 사진" : locale === "es" ? "Imagen original" : "Original image"}</a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  </EditorialFrame>
);

export const Route = createFileRoute("/photo-credits")({
  head: () => buildSeo({
    title: "Photograph Credits | Buena Park Injury Lawyer",
    description: "Photographer attribution, original sources and Creative Commons license information for city images used on Buena Park Injury Lawyer.",
    path: "/photo-credits",
    locale: "en-US",
    noindex: true,
    followWhenNoindex: true,
  }),
  component: PhotoCreditsPage,
});
