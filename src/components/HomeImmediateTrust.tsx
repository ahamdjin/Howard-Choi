import { Card } from "@/components/ui/card";
import { ArrowLink } from "@/components/ui/button";
import { BadgeCheck, Clock, Languages, Scale } from "lucide-react";
import type { SiteLocale } from "@/data/injurySite";

const promises = [
  { icon: Scale, label: "Free consultation", detail: "No cost to ask", koLabel: "무료 상담", koDetail: "문의에는 비용이 들지 않습니다", esLabel: "Consulta gratuita", esDetail: "Sin costo por preguntar" },
  { icon: BadgeCheck, label: "No lawyer fee unless there is a recovery", detail: "Contingency fee", koLabel: "배상을 받지 못하면 수임료가 없습니다", koDetail: "성공보수제", esLabel: "Sin honorarios de abogado si no hay recuperación", esDetail: "Honorarios de contingencia" },
  { icon: Languages, label: "English, Korean & Spanish", detail: "Spoken at the office", koLabel: "영어 · 한국어 · 스페인어", koDetail: "사무실에서 사용 가능합니다", esLabel: "Inglés, coreano y español", esDetail: "Idiomas hablados en la oficina" },
  { icon: Clock, label: "Deadlines matter", detail: "Two years in most CA injury cases", koLabel: "기한이 중요합니다", koDetail: "캘리포니아 상해 소송은 보통 2년", esLabel: "Los plazos importan", esDetail: "Dos años en muchos casos de lesiones en CA" },
] as const;

const HomeImmediateTrust = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const ko = locale === "ko";
  const es = locale === "es";
  return (
    <aside aria-label={ko ? "이 로펌을 신뢰할 수 있는 이유" : es ? "Razones para confiar en esta firma" : "Why clients can trust this firm"} className="home-trust bg-[#f7f6f3] text-foreground">
      <div className="site-shell py-8 md:py-10">
        <div className="grid gap-px border-y border-foreground/12 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map(({ icon: Icon, label, detail, koLabel, koDetail, esLabel, esDetail }) => (
            <Card key={label} className="border-0 shadow-none rounded-none flex items-start gap-3.5 bg-[#f7f6f3] px-5 py-6">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-foreground/70" strokeWidth={1.6} />
              <div>
                <div className="text-[13px] font-medium leading-5 tracking-[-0.01em] text-foreground">{ko ? koLabel : es ? esLabel : label}</div>
                <div className="mt-1 text-[11px] leading-4 text-foreground/70">{ko ? koDetail : es ? esDetail : detail}</div>
              </div>
            </Card>
          ))}
        </div>
        <div className="home-accident-guides">
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-[12px] leading-5">
            <div>
              <h2 className="editorial-serif md:hidden">{ko ? "자동차 사고로 다치셨나요?" : es ? "¿Se lesionó en un choque?" : "Injured in a car accident?"}</h2>
              <p className="text-foreground/75">
                <span className="hidden md:inline">{ko ? "자동차 사고 후 " : es ? "¿Tuvo un accidente de auto? " : "Injured in a car accident? "}</span>
                {ko ? "어떤 자료를 보관하고 보험사에 무엇을 확인해야 하는지 알아보세요." : es ? "Infórmese sobre qué pruebas guardar y qué preguntar cuando le llame la aseguradora." : "Find out what evidence to keep and what to ask when the insurer calls."}
              </p>
            </div>
            <ArrowLink direction="right" variant="ink" href={ko ? "/ko/practice-areas/car-accidents" : es ? "/es/practice-areas/car-accidents" : "/practice-areas/car-accidents"}>
              {ko ? "부에나파크 교통사고 변호사" : es ? "Abogado de accidentes de auto en Buena Park" : "Buena Park car accident lawyer"}
            </ArrowLink>
          </div>
          <nav aria-label={ko ? "관련 상해 사건 유형" : es ? "Otras áreas de práctica" : "Related practice areas"} className="home-related-guides mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3>{ko ? "관련 상해 사건 유형" : es ? "Otras áreas de práctica" : "Related practice areas"}</h3>
            <ArrowLink href={ko ? "/ko/practice-areas/truck-accidents" : es ? "/es/practice-areas/truck-accidents" : "/practice-areas/truck-accidents"}>{ko ? "트럭 사고" : es ? "Accidentes de camión" : "Truck accident claims"}</ArrowLink>
            <ArrowLink href={ko ? "/ko/practice-areas/rideshare-accidents" : es ? "/es/practice-areas/rideshare-accidents" : "/practice-areas/rideshare-accidents"}>{ko ? "우버·리프트 사고" : es ? "Accidentes de Uber y Lyft" : "Uber and Lyft accident claims"}</ArrowLink>
            <ArrowLink href={ko ? "/ko/practice-areas/serious-injuries" : es ? "/es/practice-areas/serious-injuries" : "/practice-areas/serious-injuries"}>{ko ? "중대한 상해" : es ? "Lesiones graves y catastróficas" : "Brain and catastrophic injuries"}</ArrowLink>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default HomeImmediateTrust;
