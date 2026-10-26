import { ArrowRight, FileCheck2, MapPin, ShieldCheck } from "lucide-react";
import { type SiteLocale } from "@/data/injurySite";

const prefixFor = (locale: SiteLocale) => locale === "ko" ? "/ko" : locale === "es" ? "/es" : "";

export function PracticeDetailHighlights({ locale, subject, issues }: {
  locale: SiteLocale; subject: string; issues: string[];
}) {
  return (
    <section aria-label={locale === "ko" ? "주요 사건 쟁점" : locale === "es" ? "Puntos clave del reclamo" : "Important case questions"}
      className="border-b border-[#1E1C1A]/12 bg-[#EAE4DA] px-5 py-8 md:py-10">
      <div className="mx-auto grid max-w-[1200px] gap-6 lg:grid-cols-[0.8fr_2fr] lg:items-center lg:gap-12">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#7D6350]">
            {locale === "ko" ? "사건의 주요 쟁점" : locale === "es" ? "Lo que importa" : "What matters in this case"}
          </span>
          <h2 className="editorial-serif mt-2 text-[clamp(1.45rem,2.2vw,2.15rem)] leading-[1.15]">
            {locale === "ko" ? "먼저 살펴볼 사항" : locale === "es" ? "Tres preguntas importantes." : `Three questions worth asking about ${subject.toLowerCase()}.`}
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {issues.slice(0, 3).map((issue, index) => (
            <a key={issue} href="#issues" className="group flex min-h-[115px] flex-col justify-between border-l border-[#1E1C1A]/20 pl-4 text-[#1E1C1A] hover:border-[#785036]">
              <span className="flex items-center justify-between text-[10px] text-[#7D6350]">
                0{index + 1}<ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="mt-4 text-[13px] font-medium leading-[1.5]">{issue}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LocationDetailHighlights({ locale, name, county, year, total, agency, dataHref }: {
  locale: SiteLocale; name: string; county: string; year: number | string;
  total: number; agency: string; dataHref: string;
}) {
  const prefix = prefixFor(locale);
  return (
    <section aria-label={locale === "ko" ? "지역 안내 핵심 정보" : locale === "es" ? "Datos locales de consulta" : "Local guide quick facts"}
      className="border-b border-[#1E1C1A]/12 bg-[#EAE4DA] px-5 py-8 md:py-10">
      <div className="mx-auto grid max-w-[1200px] gap-5 sm:grid-cols-3 lg:gap-8">
        <div className="flex gap-4">
          <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[#74523A]" />
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#806A58]">{locale === "ko" ? "지역" : locale === "es" ? "Comunidad" : "Community served"}</p>
          <h2 className="editorial-serif mt-2 text-[1.7rem] leading-[1.1]">{name}</h2>
          <p className="mt-2 text-[12px] text-[#5B5149]">{county}</p></div>
        </div>
        <div className="flex gap-4">
          <ShieldCheck aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[#74523A]" />
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#806A58]">{locale === "ko" ? "공식 교통안전 통계" : locale === "es" ? "Datos oficiales" : "Local traffic safety data"}</p>
          <div className="editorial-serif mt-2 text-[1.7rem] leading-[1.1]">{total.toLocaleString()}</div>
          <a className="mt-2 inline-flex items-center gap-1 text-[12px] text-[#5B5149] underline underline-offset-4" href={dataHref} target="_blank" rel="noopener noreferrer">
            California OTS · {year}<ArrowRight className="h-3 w-3" />
          </a></div>
        </div>
        <div className="flex gap-4">
          <FileCheck2 aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[#74523A]" />
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#806A58]">{locale === "ko" ? "사고 기록" : locale === "es" ? "Reportes de accidentes" : "Accident records"}</p>
          <p className="mt-2 text-[13px] font-medium leading-[1.5]">{agency}</p>
          <a className="mt-2 inline-flex items-center gap-1 text-[12px] text-[#5B5149] underline underline-offset-4" href="#records">
            {locale === "ko" ? "기록 찾기" : locale === "es" ? "Buscar registros" : "Find records and agencies"}<ArrowRight className="h-3 w-3" />
          </a>
          <p className="mt-2 text-[11px] text-[#756B61]">{locale === "ko" ? "사무실은 부에나파크에 있습니다." : locale === "es" ? "La oficina está en Buena Park." : `Office in Buena Park · ${prefix ? "Local guide" : "Serving surrounding communities"}`}</p></div>
        </div>
      </div>
    </section>
  );
}
