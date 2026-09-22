import { ArrowUpRight } from "lucide-react";
import type { SiteLocale } from "@/data/injurySite";
import courthouseImage from "@/assets/law-firm/hero-courthouse.webp";
import boardroomImage from "@/assets/law-firm/hero-city-boardroom.webp";
import officeImage from "@/assets/law-firm/hero-law-office.webp";

// These are firm-reported totals, not individual case studies. When real case
// results are supplied, replace these three entries with them and keep the
// prior-results disclaimer below.
const results = [
  {
    amount: "$100M+",
    title: "Total client recoveries",
    koTitle: "총 의뢰인 배상액",
    detail: "Reported by the firm across client matters.",
    koDetail: "로펌이 밝힌 의뢰인 사건 전체 배상액입니다.",
    image: boardroomImage,
    alt: "City view from a law firm boardroom",
  },
  {
    amount: "$1M",
    title: "Largest single-client recovery",
    koTitle: "최대 단일 의뢰인 배상액",
    detail: "The highest recovery the firm reports for one client.",
    koDetail: "로펌이 밝힌 한 의뢰인 기준 최대 배상액입니다.",
    image: courthouseImage,
    alt: "Courthouse interior",
  },
  {
    amount: "11 Years",
    koAmount: "11년",
    title: "Operating as a firm",
    koTitle: "로펌 운영 기간",
    detail: "Handling accident and injury claims out of the Buena Park office.",
    koDetail: "부에나파크 사무실에서 사고와 상해 사건을 맡아 왔습니다.",
    image: officeImage,
    alt: "Traditional law office and desk",
  },
];

const SelectedResult = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const ko = locale === "ko";
  return (
  <section id="results" aria-labelledby="home-results-heading" className="bg-[#0f0f0f] py-20 text-[#f4f1ea] md:py-24 lg:py-28">
    <div className="site-shell">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-white/38">{ko ? "실적 및 경력" : "Results & experience"}</div>
          <h2 id="home-results-heading" className="editorial-serif mt-5 max-w-[720px] text-[clamp(2.5rem,4.4vw,4.6rem)] leading-[0.94] tracking-[-0.035em]">
            {ko ? "숫자로 보는 실적." : "The numbers, in plain terms."}
          </h2>
        </div>
        <a
          href={ko ? "/ko/results" : "/results"}
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-[3px] bg-[#f3eee5] px-4 py-3 text-[11px] font-medium text-[#17130f] transition-opacity hover:opacity-85 lg:mb-2"
        >
          {ko ? "사건 결과 보기" : "View case results"} <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-14">
        {results.map((result) => (
          <div key={result.title} className="overflow-hidden rounded-[3px] bg-[#191919]">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={result.image}
                alt={result.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-45"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/35 to-transparent" />
              <div className="absolute inset-x-5 bottom-4">
                <div className="editorial-serif text-[clamp(2.6rem,4.5vw,3.6rem)] leading-none tracking-[-0.04em]">
                  {ko && "koAmount" in result ? result.koAmount : result.amount}
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="text-[13px] font-medium tracking-[-0.01em] text-white">{ko ? result.koTitle : result.title}</div>
              <p className="mt-2 text-[12px] leading-5 text-white/52">{ko ? result.koDetail : result.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-9 max-w-[760px] text-[10px] leading-4 text-white/30">
        {ko ? "과거의 결과가 유사한 결과를 보장하지는 않습니다. 모든 사건은 고유한 사실관계, 손해, 보험, 증거와 상황에 따라 달라집니다." : "Prior results do not guarantee a similar outcome. Every matter depends on its own facts, damages, insurance, evidence, and circumstances."}
      </p>
    </div>
  </section>
  );
};

export default SelectedResult;
