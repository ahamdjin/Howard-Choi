import { responsiveImageProps } from "@/lib/responsive-images";
import { ArrowUpRight } from "lucide-react";
import { serviceLocations, type SiteLocale } from "@/data/injurySite";
import ScrollableCards from "@/components/ScrollableCards";
import carCollision from "@/assets/law-firm/car-collision.jpg";
import pedestrianCrossing from "@/assets/law-firm/pedestrian-crossing.jpg";
import truckHighway from "@/assets/law-firm/truck-highway.jpg";
import motorcycleRoad from "@/assets/law-firm/motorcycle-road.jpg";

// Illustrative accident photographs, not city landmarks or photographs of
// accidents in the labeled locations. Reuse four local, cached images for all
// ten location cards; avoid ten extra image downloads.
const illustrations = [
  { image: carCollision, alt: "Two cars after a collision" },
  { image: pedestrianCrossing, alt: "Marked pedestrian crossing" },
  { image: truckHighway, alt: "Commercial truck on a highway" },
  { image: motorcycleRoad, alt: "Motorcycle traveling on a roadway" },
];

const HomeServiceAreas = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const ko = locale === "ko";
  const es = locale === "es";
  const prefix = ko ? "/ko" : es ? "/es" : "";
  return (
    <section id="areas" aria-labelledby="home-service-areas-heading" className="w-full bg-background py-16 text-foreground md:py-20 lg:py-24">
      <div className="site-shell">
        <div className="mb-10 grid gap-7 lg:mb-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-12">
          <div className="max-w-[860px]">
            <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/50">{ko ? "서비스 지역" : es ? "Zonas de servicio" : "Communities we serve"}</div>
            <h2 id="home-service-areas-heading" className="editorial-serif mt-5 text-[clamp(2.5rem,4.6vw,4.9rem)] leading-[1.04] tracking-[-0.028em]">
              {ko ? <>부에나파크에서 시작해,<br /><span className="text-foreground/65">인근 지역까지 돕습니다.</span></> : es ? <>Una oficina en Buena Park.<br /><span className="text-foreground/65">Ayuda en ciudades cercanas.</span></> : <>One office in Buena Park.<br /><span className="text-foreground/65">Help across nearby communities.</span></>}
            </h2>
          </div>
          <div>
            <p className="max-w-[520px] text-[14px] leading-7 text-foreground/70">
              {ko
                ? "사무실은 부에나파크 Beach Blvd에 있습니다. 오렌지카운티와 인근 로스앤젤레스카운티의 열 개 지역별 안내에서 사고 기록, 담당 기관 및 다음 단계를 살펴보세요."
                : es
                  ? "Nuestra oficina está en Beach Blvd, Buena Park. Explore diez comunidades de los condados de Orange y Los Ángeles, con información sobre accidentes y recursos locales."
                  : "Our office is on Beach Boulevard in Buena Park. Browse ten nearby Orange and Los Angeles County communities for local accident records, reporting agencies and practical information after an injury."}
            </p>
            <a href={`${prefix}/locations`} className="mt-5 inline-flex min-h-11 items-center gap-2 text-[12px] font-medium underline underline-offset-4">
              {ko ? "모든 지역 보기" : es ? "Ver todas las ciudades" : "View all service locations"} <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <ScrollableCards
          label={ko ? "지역 10곳 · 옆으로 스와이프" : es ? "10 ciudades · deslice para explorar" : "All 10 service locations · swipe or use arrows"}
          previousLabel={ko ? "이전 도시" : es ? "Ciudad anterior" : "Previous service location"}
          nextLabel={ko ? "다음 도시" : es ? "Ciudad siguiente" : "Next service location"}
        >
          {serviceLocations.map((location, index) => {
            const { image, alt } = illustrations[index % illustrations.length];
            return (
              <a
                key={location.slug}
                href={`${prefix}/locations/${location.slug}`}
                className="group relative flex min-h-[345px] w-[86%] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[4px] bg-[#181511] text-[#f3eee5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-[47%] lg:w-[31%] xl:w-[24%]"
              >
                <img
                  {...responsiveImageProps(image, "(max-width: 640px) 86vw, (max-width: 1024px) 47vw, 24vw")}
                  src={image}
                  alt={alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15110d]/95 via-[#15110d]/35 to-[#15110d]/15" />
                <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/45 bg-[#15110d]/40">
                  <ArrowUpRight className="h-4 w-4" />
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
                    {ko ? "지역별 안내" : es ? "Explorar la ciudad" : "Explore local injury guidance"} <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </a>
            );
          })}
        </ScrollableCards>
      </div>
    </section>
  );
};

export default HomeServiceAreas;
