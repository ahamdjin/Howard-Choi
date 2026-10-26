import { responsiveImageProps } from "@/lib/responsive-images";
import { ArrowUpRight } from "lucide-react";
import ScrollableCards from "@/components/ScrollableCards";
import { practiceAreas, type SiteLocale } from "@/data/injurySite";
import { practiceMedia } from "@/data/practiceMedia";
import { esPracticeContent } from "@/data/esPracticeContent";

// Every existing service page is represented exactly once. These short
// summaries explain what differs between matters instead of repeating a
// generic "personal injury lawyer" phrase across eight cards.
const summaries: Record<string, string> = {
  "car-accidents": "Crash reconstruction, medical documentation and the insurance policies that may apply.",
  "truck-accidents": "Carrier records, driver responsibility, vehicle maintenance and commercial coverage.",
  "motorcycle-accidents": "Left turns, visibility disputes, rider injuries and available insurance.",
  "pedestrian-accidents": "Crosswalks, driver visibility, hit-and-runs and long-term injury needs.",
  "rideshare-accidents": "Uber or Lyft trip status, driver responsibility and overlapping insurance.",
  "slip-and-fall": "Unsafe conditions, property control, notice and evidence that may disappear.",
  "wrongful-death": "Fatal-accident evidence, eligible family claims and financial support losses.",
  "serious-injuries": "Brain, spinal and catastrophic injuries requiring carefully documented future care.",
};

const Locations = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const ko = locale === "ko";
  const es = locale === "es";
  const prefix = ko ? "/ko" : es ? "/es" : "";
  const label = ko ? "업무 분야" : es ? "Áreas de práctica" : "Practice Areas";
  const heading = ko
    ? "사고 유형에 맞는 법률 정보를 확인하세요."
    : es
      ? "Encuentre orientación para su tipo de accidente."
      : "Find guidance for your kind of accident.";
  const body = ko
    ? "자동차 사고, 상업용 차량 충돌, 보행자 사고, 중대한 상해 등 여덟 가지 업무 분야를 살펴보세요. 각 페이지에서는 사고별 증거와 보험, 다음 단계를 설명합니다."
    : es
      ? "Explore las ocho áreas de práctica. Cada página explica la evidencia, las preguntas de seguro y los pasos que pueden importar según el tipo de accidente o lesión."
      : "A car crash, a commercial-truck collision and a fall on unsafe property call for different evidence. Explore all eight injury practice areas to find the questions, records and next steps relevant to your situation.";

  return (
    <section id="practice" aria-labelledby="home-practice-heading" className="bg-background py-16 text-foreground md:py-20 lg:py-24">
      <div className="site-shell">
        <div className="mb-10 grid gap-6 lg:mb-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          <div>
            <span className="mb-5 block text-[13px] text-muted-foreground">{label}</span>
            <h2 id="home-practice-heading" className="editorial-serif max-w-[770px] text-[clamp(2.45rem,4.3vw,4.65rem)] leading-[1.02] tracking-[-0.025em]">{heading}</h2>
          </div>
          <div>
            <p className="max-w-[550px] text-[15px] leading-7 text-muted-foreground">{body}</p>
            <a href={`${prefix}/practice-areas`} className="mt-5 inline-flex min-h-11 items-center gap-2 text-[12px] font-medium underline underline-offset-4">
              {ko ? "모든 업무 분야 보기" : es ? "Ver todas las áreas de práctica" : "View all eight practice areas"}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <ScrollableCards
          label={ko ? "업무 분야 8개 · 옆으로 스와이프" : es ? "8 áreas · deslice para explorar" : "All 8 practice areas · swipe or use arrows"}
          previousLabel={ko ? "이전 업무 분야" : es ? "Área anterior" : "Previous practice area"}
          nextLabel={ko ? "다음 업무 분야" : es ? "Área siguiente" : "Next practice area"}
        >
          {practiceAreas.map((practice, index) => {
            const media = practiceMedia[practice.slug];
            const esCopy = esPracticeContent[practice.slug];
            const name = ko ? practice.koTitle : es ? (esCopy?.shortTitle || practice.title) : practice.title;
            const description = ko ? practice.koDescription : es ? (esCopy?.description || practice.description) : summaries[practice.slug] || practice.description;
            return (
              <a
                key={practice.slug}
                href={`${prefix}/practice-areas/${practice.slug}`}
                className="group relative flex min-h-[375px] w-[86%] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[4px] bg-[#181511] text-[#f3eee5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-[47%] lg:w-[31%] xl:w-[24%]"
              >
                {media && (
                  <img
                    data-deck-index={index}
                    data-deck-src={media.src}
                    data-deck-srcset={responsiveImageProps(media.src, "(max-width: 640px) 86vw, (max-width: 1024px) 47vw, 24vw").srcSet}
                    data-deck-sizes="(max-width: 640px) 86vw, (max-width: 1024px) 47vw, 24vw"
                    alt={media.alt}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#15110d]/95 via-[#15110d]/25 to-[#15110d]/10" />
                <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-[#15110d]/35"><ArrowUpRight className="h-4 w-4" /></span>
                <div className="relative px-6 pb-7 pt-16">
                  <span className="text-[11px] tracking-[0.13em] text-white/70">{String(index + 1).padStart(2, "0")} / {practiceAreas.length}</span>
                  <h3 className="editorial-serif mt-3 text-[clamp(1.9rem,2.5vw,2.5rem)] leading-[1.06] tracking-[-0.02em]">{name}</h3>
                  <p className="mt-3 max-w-[340px] text-[13px] leading-[1.6] text-white/85">{description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 border-b border-white/55 pb-1 text-[12px] font-medium">
                    {ko ? "사고별 법률 안내" : es ? "Explorar orientación legal" : "Explore this practice area"} <ArrowUpRight className="h-3.5 w-3.5" />
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

export default Locations;
