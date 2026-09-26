import { ArrowUpRight } from "lucide-react";
import type { SiteLocale } from "@/data/injurySite";

const metrics = [
  { value: "$100M+", label: "Total recovered", koLabel: "총 배상액", esLabel: "Total recuperado" },
  { value: "11 Years", value_ko: "11년", value_es: "11 años", label: "Firm history", koLabel: "로펌 운영 기간", esLabel: "Historia de la firma" },
  { value: "$1M", label: "Largest single-client recovery", koLabel: "최대 단일 의뢰인 배상액", esLabel: "Mayor recuperación de un solo cliente" },
] as const;

const FirmSnapshot = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const ko = locale === "ko";
  const es = locale === "es";
  const prefix = ko ? "/ko" : es ? "/es" : "";
  return (
    <section className="flex min-h-[100svh] w-full bg-[#f7f6f3] text-foreground">
      <div className="site-shell flex min-h-[100svh] w-full flex-col py-8 sm:py-10 lg:py-12">
        <div className="border-t border-foreground/12 pt-6">
          <div className="text-[10px] font-medium tracking-[-0.01em] text-foreground/46">{ko ? "의뢰인이 선택하는 이유" : es ? "Por qué nos eligen los clientes" : "Why Clients Choose Us"}</div>
        </div>
        <div className="grid flex-1 content-center py-10 lg:grid-cols-[0.25fr_0.75fr] lg:py-8">
          <div className="hidden lg:block" />
          <div className="max-w-[1180px]">
            <h2 className="editorial-serif max-w-[1120px] text-[clamp(2rem,3vw,3.45rem)] leading-[1.08] tracking-[-0.028em] text-foreground">
              {ko ? "증거와 명확한 소통, 그리고 사고가 실제로 바꾼 것을 반영한 전략 위에 사건을 세웁니다." : es ? "Representación por lesiones basada en evidencia, comunicación clara y una estrategia que refleja lo que el accidente realmente cambió." : "Injury representation built around evidence, clear communication, and a strategy that reflects what the accident actually changed."}
            </h2>
            <div className="mt-10 max-w-[470px] sm:mt-12">
              <p className="text-[13px] leading-[1.55] text-foreground/68 sm:text-[14px]">
                {ko ? "개인상해 청구에는 치료, 보험, 과실 다툼, 소득 손실, 향후 치료와 기한 문제가 한꺼번에 얽힐 수 있습니다. 저희는 그 조각들을 정리하고 기록을 지키며, 다음 결정을 이해할 수 있게 설명합니다." : es ? "Un reclamo por lesiones personales puede involucrar al mismo tiempo tratamiento médico, cobertura de seguro, responsabilidad disputada, pérdida de ingresos, atención futura y plazos. Nuestro papel es organizar esas piezas, proteger el expediente y mantener claro el siguiente paso." : "A personal injury claim can involve medical treatment, insurance coverage, disputed fault, lost income, future care, and deadlines at the same time. Our role is to organize those pieces, protect the record, and keep the next decision understandable."}
              </p>
              <a href={`${prefix}/attorney`} className="mt-7 inline-flex items-center gap-2 rounded-[3px] bg-[#171717] px-4 py-3 text-[11px] font-medium text-white transition-opacity hover:opacity-82">
                {ko ? "Howard Choi 변호사 소개" : es ? "Conozca a Howard Choi" : "Meet Howard Choi"} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 border-t border-foreground/14 sm:grid-cols-3">
          {metrics.map((metric, index) => (
            <div key={metric.label} className={`flex min-h-[118px] flex-col justify-between px-4 py-4 sm:min-h-[150px] sm:px-5 sm:py-5 lg:min-h-[170px] ${index > 0 ? "border-l border-foreground/14" : ""} ${index === 2 ? "border-l-0 border-t border-foreground/14 sm:border-l sm:border-t-0" : ""}`}>
              <div className="editorial-serif text-[clamp(2rem,3.6vw,4rem)] leading-none tracking-[-0.04em]">{ko && "value_ko" in metric ? metric.value_ko : es && "value_es" in metric ? metric.value_es : metric.value}</div>
              <div className="text-[9px] leading-4 text-foreground/46 sm:text-[10px]">{ko ? metric.koLabel : es ? metric.esLabel : metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FirmSnapshot;
