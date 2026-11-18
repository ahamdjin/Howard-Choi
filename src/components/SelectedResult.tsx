import { responsiveImageProps } from "@/lib/responsive-images";
import { ArrowUpRight } from "lucide-react";
import type { SiteLocale } from "@/data/injurySite";
import courthouseImage from "@/assets/law-firm/hero-courthouse.webp";
import boardroomImage from "@/assets/law-firm/hero-city-boardroom.webp";
import officeImage from "@/assets/law-firm/hero-law-office.webp";

const results = [
  {
    amount: "$100M+",
    title: "Total client recoveries",
    koTitle: "총 의뢰인 배상액",
    esTitle: "Recuperaciones totales de clientes",
    detail: "Reported by the firm across client matters.",
    koDetail: "로펌이 밝힌 의뢰인 사건 전체 배상액입니다.",
    esDetail: "Cifra reportada por la firma a través de asuntos de clientes.",
    image: boardroomImage,
    alt: "City view from a law firm boardroom",
  },
  {
    amount: "$1M",
    title: "Largest single-client recovery",
    koTitle: "최대 단일 의뢰인 배상액",
    esTitle: "Mayor recuperación de un solo cliente",
    detail: "The highest recovery the firm reports for one client.",
    koDetail: "로펌이 밝힌 한 의뢰인 기준 최대 배상액입니다.",
    esDetail: "La mayor recuperación que la firma reporta para un solo cliente.",
    image: courthouseImage,
    alt: "Courthouse interior",
  },
  {
    amount: "Since 2015",
    koAmount: "2015년부터",
    esAmount: "Desde 2015",
    title: "Independent practice",
    koTitle: "독립 개업",
    esTitle: "Práctica independiente",
    detail: "Independent personal injury practice since 2015.",
    koDetail: "2015년부터 독립적으로 개인상해 사건을 맡아 왔습니다.",
    esDetail: "Práctica independiente de lesiones personales desde 2015.",
    image: officeImage,
    alt: "Traditional law office and desk",
  },
];

const SelectedResult = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const ko = locale === "ko";
  const es = locale === "es";
  const prefix = ko ? "/ko" : es ? "/es" : "";
  return (
    <section id="results" aria-labelledby="home-results-heading" className="!min-h-0 w-full bg-[#0f0f0f] py-14 text-[#f4f1ea] md:py-20">
      <div className="site-shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
            <h2 id="home-results-heading" className="editorial-serif max-w-[720px] text-[clamp(2.5rem,4.4vw,4.6rem)] leading-[0.94] tracking-[-0.035em]">
              {ko ? "사건 결과와 변호 경력" : es ? "Resultados y experiencia" : "Case results and experience"}
            </h2>
          </div>
          <a href={`${prefix}/results`} className="inline-flex items-center gap-2 whitespace-nowrap rounded-[3px] bg-[#f3eee5] px-4 py-3 text-[11px] font-medium text-[#17130f] transition-opacity hover:opacity-85 lg:mb-2">
            {ko ? "사건 결과 보기" : es ? "Ver resultados" : "View case results"} <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="mt-8 grid gap-4 border-t border-white/20 pt-6 md:grid-cols-3 lg:mt-10">
          {results.map((result) => (
            <div key={result.title} className="overflow-hidden rounded-[3px] bg-[#191919]">
              <div className="relative h-28 overflow-hidden md:h-36">
                <img {...responsiveImageProps(result.image)} src={result.image} alt={result.alt} loading="lazy" decoding="async" className="h-full w-full object-cover opacity-45" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/35 to-transparent" />
                <div className="absolute inset-x-5 bottom-4">
                  <div className="editorial-serif text-[clamp(2.6rem,4.5vw,3.6rem)] leading-none tracking-[-0.04em]">
                    {ko && "koAmount" in result ? result.koAmount : es && "esAmount" in result ? result.esAmount : result.amount}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="text-base font-medium tracking-[-0.01em] text-white">{ko ? result.koTitle : es ? result.esTitle : result.title}</div>
                <p className="mt-2 text-sm leading-6 text-white/75">{ko ? result.koDetail : es ? result.esDetail : result.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-[760px] text-xs leading-5 text-white/65">
          {ko ? "과거의 결과가 유사한 결과를 보장하지는 않습니다. 모든 사건은 고유한 사실관계, 손해, 보험, 증거와 상황에 따라 달라집니다." : es ? "Los resultados anteriores no garantizan un resultado similar. Cada asunto depende de sus propios hechos, daños, seguro, evidencia y circunstancias." : "Prior results do not guarantee a similar outcome. Every matter depends on its own facts, damages, insurance, evidence, and circumstances."}
        </p>
      </div>
    </section>
  );
};

export default SelectedResult;
