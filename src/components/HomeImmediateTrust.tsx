import { BadgeCheck, Clock, Languages, Scale } from "lucide-react";
import type { SiteLocale } from "@/data/injurySite";

const promises = [
  { icon: Scale, label: "Free consultation", detail: "No cost to ask", koLabel: "무료 상담", koDetail: "문의에는 비용이 들지 않습니다", esLabel: "Consulta gratuita", esDetail: "Sin costo por preguntar" },
  { icon: BadgeCheck, label: "No attorney fee unless there is a recovery", detail: "Contingency fee", koLabel: "배상을 받지 못하면 수임료가 없습니다", koDetail: "성공보수제", esLabel: "Sin honorarios de abogado si no hay recuperación", esDetail: "Honorarios de contingencia" },
  { icon: Languages, label: "English & Korean", detail: "Spoken at the office", koLabel: "영어 · 한국어 상담", koDetail: "사무실에서 직접 상담합니다", esLabel: "Inglés y coreano", esDetail: "Idiomas hablados en la oficina" },
  { icon: Clock, label: "Deadlines matter", detail: "Two years in most CA injury cases", koLabel: "기한이 중요합니다", koDetail: "캘리포니아 상해 소송은 보통 2년", esLabel: "Los plazos importan", esDetail: "Dos años en muchos casos de lesiones en CA" },
] as const;

const HomeImmediateTrust = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const ko = locale === "ko";
  const es = locale === "es";
  return (
    <aside aria-label={ko ? "이 로펌을 신뢰할 수 있는 이유" : es ? "Razones para confiar en esta firma" : "Why clients can trust this firm"} className="bg-[#f7f6f3] text-foreground">
      <div className="site-shell py-8 md:py-10">
        <div className="grid gap-px border-y border-foreground/12 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map(({ icon: Icon, label, detail, koLabel, koDetail, esLabel, esDetail }) => (
            <div key={label} className="flex items-start gap-3.5 bg-[#f7f6f3] px-5 py-6">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-foreground/45" strokeWidth={1.6} />
              <div>
                <div className="text-[13px] font-medium leading-5 tracking-[-0.01em] text-foreground">{ko ? koLabel : es ? esLabel : label}</div>
                <div className="mt-1 text-[11px] leading-4 text-foreground/45">{ko ? koDetail : es ? esDetail : detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default HomeImmediateTrust;
