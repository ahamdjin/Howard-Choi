import { PhotoLinkCard } from "@/components/editorial/EditorialCards";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { serviceLocations, type SiteLocale } from "@/data/injurySite";
import ScrollableCards from "@/components/ScrollableCards";
import { locationMedia } from "@/data/locationMedia";
import carFallback from "@/assets/law-firm/responsive/car-collision-480.webp";
import crossingFallback from "@/assets/law-firm/responsive/pedestrian-crossing-480.webp";
import truckFallback from "@/assets/law-firm/responsive/truck-highway-480.webp";
import motorcycleFallback from "@/assets/law-firm/responsive/motorcycle-road-480.webp";

const fallbackPhotos = [carFallback, crossingFallback, truckFallback, motorcycleFallback];

const featuredCounties = [
  {
    name: { en: "Orange County", ko: "오렌지카운티", es: "Condado de Orange" },
    cities: [
      { slug: "buena-park", name: "Buena Park", koName: "부에나파크" },
      { slug: "anaheim", name: "Anaheim", koName: "애너하임" },
      { slug: "fullerton", name: "Fullerton", koName: "풀러턴" },
      { slug: "garden-grove", name: "Garden Grove", koName: "가든그로브" },
      { slug: "irvine", name: "Irvine", koName: "어바인" },
    ],
  },
  {
    name: { en: "Los Angeles County", ko: "로스앤젤레스카운티", es: "Condado de Los Ángeles" },
    cities: [
      { slug: "los-angeles", name: "Los Angeles", koName: "로스앤젤레스" },
      { slug: "long-beach", name: "Long Beach", koName: "롱비치" },
      { slug: "cerritos", name: "Cerritos", koName: "세리토스" },
    ],
  },
] as const;

const HomeServiceAreas = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const ko = locale === "ko";
  const es = locale === "es";
  const prefix = ko ? "/ko" : es ? "/es" : "";
  return (
    <section id="areas" aria-labelledby="home-service-areas-heading" className="w-full bg-background py-16 text-foreground md:py-20 lg:py-24">
      <div className="site-shell">
        <div className="areas-intro">
          <div className="max-w-[860px]">
            <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/70">{ko ? "서비스 지역" : es ? "Zonas de servicio" : "Communities we serve"}</div>
            <h2 id="home-service-areas-heading" className="editorial-serif mt-5 text-[clamp(2.5rem,4.6vw,4.9rem)] leading-[1.04] tracking-[-0.028em]">
              {ko ? <>부에나파크에서 시작해,<br /><span className="text-foreground/65">인근 지역까지 돕습니다.</span></> : es ? <>Una oficina en Buena Park.<br /><span className="text-foreground/65">Ayuda en ciudades cercanas.</span></> : <>One office in Buena Park.<br /><span className="text-foreground/65">Help across nearby communities.</span></>}
            </h2>
          </div>
          <div>
            <p className="max-w-[70ch] text-[14px] leading-7 text-foreground/70">
              {ko
                ? "사무실은 부에나파크 Beach Boulevard에 있습니다. 사고가 난 도시를 선택하면 사고 보고서 요청 방법, 보관할 자료와 지역별 다음 단계를 확인할 수 있습니다."
                : es
                  ? "Nuestra oficina está en Beach Boulevard, en Buena Park. Elija la ciudad donde ocurrió el accidente para saber dónde pedir el informe, qué documentos guardar y cómo dar el siguiente paso."
                  : "Our office is on Beach Boulevard in Buena Park. Choose the city where you were injured to find out where to request a collision report, which records to keep, and what to do next."}
            </p>
            <ArrowLink variant="editorial" href={`${prefix}/locations`} className="mt-5">{ko ? "모든 지역 보기" : es ? "Ver todas las ciudades" : "View all service locations"}</ArrowLink>
          </div>
        </div>

        <div className="mb-10 grid gap-x-12 gap-y-6 border-y border-foreground/15 py-5 sm:grid-cols-2">
          {featuredCounties.map((county) => (
            <div key={county.name.en}>
              <h3 className="editorial-serif text-2xl">{county.name[locale]}</h3>
              <ul className="mt-1 flex flex-wrap gap-x-5">
                {county.cities.map((city) => (
                  <li key={city.slug}>
                    <ButtonLink variant="editorial" href={`${prefix}/locations/${city.slug}`}>
                      {ko ? city.koName : city.name}
                    </ButtonLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <ScrollableCards
          label={ko ? "지역 10곳 · 옆으로 스와이프" : es ? "10 ciudades · deslice para explorar" : "All 10 service locations · swipe or use arrows"}
          previousLabel={ko ? "이전 도시" : es ? "Ciudad anterior" : "Previous service location"}
          nextLabel={ko ? "다음 도시" : es ? "Ciudad siguiente" : "Next service location"}
        >
          {serviceLocations.map((location, index) => {
            const photo = locationMedia[location.slug];
            return (
              <PhotoLinkCard
                key={location.slug}
                href={`${prefix}/locations/${location.slug}`}
                className="min-h-[345px]"
              >
                <img
                  width={640} height={480} loading="lazy" decoding="async"
                  data-deck-index={index}
                  data-deck-src={photo.src}
                  data-deck-fallback={fallbackPhotos[index % fallbackPhotos.length]}
                  onError={(event) => { const image = event.currentTarget; const fallback = image.dataset.deckFallback; if (fallback && !image.dataset.deckFailed) { image.dataset.deckFailed = "true"; image.alt = ""; image.removeAttribute("srcset"); image.src = fallback; } }}
                  alt={photo.alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15110d]/95 via-[#15110d]/35 to-[#15110d]/15" />
                <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/45 bg-[#15110d]/40">
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </span>
                <div className="relative px-5 pb-6 pt-12">
                  <span className="text-[10px] font-medium tracking-[0.13em] text-white/75">{String(index + 1).padStart(2, "0")} / {serviceLocations.length}</span>
                  <h3 className="editorial-serif mt-3 text-[clamp(2rem,2.7vw,2.55rem)] leading-[1.06] tracking-[-0.02em]">
                    {ko ? location.koName : location.name}
                  </h3>
                  <p className="mt-2 text-[12px] text-white/85">{location.county}</p>
                  <div className="mt-5 border-t border-white/30 pt-4 text-[12px] leading-[1.6] text-white/85">
                    {ko ? `${location.ots.year}년 보고된 사고 ${location.ots.total.toLocaleString()}건` : es ? `${location.ots.total.toLocaleString()} colisiones registradas en ${location.ots.year}` : `${location.ots.total.toLocaleString()} reported collisions · ${location.ots.year}`}
                    <span className="mt-1 block text-[11px] text-white/65">California OTS</span>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-2 border-b border-white/50 pb-1 text-[12px] font-medium">
                    {ko ? "지역별 안내" : es ? "Explorar la ciudad" : "Explore local injury guidance"} <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </span>
                </div>
              </PhotoLinkCard>
            );
          })}
        </ScrollableCards>
      </div>
    </section>
  );
};

export default HomeServiceAreas;
