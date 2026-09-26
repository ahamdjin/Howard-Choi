import { ArrowRight, Camera, FileCheck2, HeartPulse, ShieldCheck, Wallet, CalendarDays } from "lucide-react";
import leadCounsel from "@/assets/law-firm/lead-counsel.avif";
import { type SiteLocale } from "@/data/injurySite";

export function EvidenceVisuals({ locale }: { locale: SiteLocale }) {
  const ko = locale === "ko";
  const es = locale === "es";
  const items = [
    { Icon: Camera, title: ko ? "사고 현장" : es ? "La escena" : "The scene", text: ko ? "사진 · 영상 · 목격자" : es ? "Fotos, video y testigos" : "Photos, video, witnesses" },
    { Icon: FileCheck2, title: ko ? "사고 기록" : es ? "Los registros" : "The records", text: ko ? "보고서 · 보험 연락" : es ? "Reportes y cartas del seguro" : "Reports and insurance letters" },
    { Icon: HeartPulse, title: ko ? "사고의 영향" : es ? "El impacto" : "The impact", text: ko ? "치료 · 업무 · 일상생활" : es ? "Tratamiento, trabajo y vida diaria" : "Treatment, work, daily life" },
  ];
  return <div className="evidence-visuals mb-8 grid gap-5 sm:grid-cols-3">{items.map(({ Icon, title, text }, index) => <div key={title} className="rounded-md bg-[#eee9e1] p-5">
    <div aria-hidden="true" className="relative mb-5 flex h-28 items-center justify-center overflow-hidden"><div className="absolute h-24 w-24 rounded-full bg-[#ded2c0]" /><div className={`relative flex h-20 w-16 items-center justify-center rounded-md border border-[#381907]/20 bg-[#faf8f4] shadow-sm ${index === 1 ? "rotate-6" : "-rotate-6"}`}><Icon className="h-9 w-9 text-[#381907]" strokeWidth={1.4} /></div><ShieldCheck className="absolute bottom-0 right-3 h-9 w-9 rounded-full bg-[#eee9e1] p-1.5 text-[#381907]" strokeWidth={1.5} /></div>
    <h3 className="text-base font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#57514b]">{text}</p>
  </div>)}</div>;
}

export function ClaimValueVisual({ locale }: { locale: SiteLocale }) {
  const ko = locale === "ko";
  const es = locale === "es";
  return <div className="mb-8 flex flex-wrap gap-4 rounded-md bg-[#eee9e1] p-6" aria-label={ko ? "손실 항목" : es ? "Tipos de pérdida" : "Types of loss"}>
    {[{ Icon: HeartPulse, label: ko ? "치료" : es ? "Atención médica" : "Medical care" }, { Icon: Wallet, label: ko ? "소득" : es ? "Ingresos perdidos" : "Lost income" }, { Icon: CalendarDays, label: ko ? "일상생활" : es ? "Vida diaria" : "Daily life" }].map(({ Icon, label }) => <div key={label} className="flex min-w-[140px] flex-1 items-center gap-3"><Icon aria-hidden="true" className="h-10 w-10 rounded-full bg-[#faf8f4] p-2 text-[#381907]" /><span className="text-sm font-semibold">{label}</span></div>)}
  </div>;
}

export function GuideAttorney({ locale }: { locale: SiteLocale }) {
  const ko = locale === "ko";
  const es = locale === "es";
  const prefix = ko ? "/ko" : es ? "/es" : "";
  return <section className="guide-attorney bg-[#eae4db] px-5 py-14 md:py-20">
    <div className="mx-auto grid max-w-[1120px] items-center gap-8 md:grid-cols-[0.7fr_1.3fr] md:gap-14">
      <img src={leadCounsel} alt="Howard Choi" width={480} height={540} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-[4px] object-cover object-top md:aspect-[4/5] md:max-h-[400px]" />
      <div><p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#67584a]">{ko ? "변호사 소개" : es ? "Conozca a su abogado" : "Meet your attorney"}</p><h2 className="text-[clamp(2rem,3.5vw,3.4rem)] font-semibold leading-tight tracking-[-0.04em]">Howard Choi</h2><p className="mt-3 text-sm font-medium text-[#57514b]">{ko ? "개인상해 · 부에나파크" : es ? "Lesiones personales · Buena Park" : "Personal injury · Buena Park"}</p><p className="mt-5 max-w-[540px] text-base leading-7 text-[#57514b]">{ko ? "사고 경위와 궁금한 점을 알려주세요. 프로필을 살펴보거나 상담을 요청할 수 있습니다." : es ? "Conozca al abogado detrás de la firma. Revise su perfil o solicite una conversación sobre su accidente." : "Get to know the attorney behind the firm. Review his profile or request a conversation about your accident."}</p>
        <div className="mt-7 flex flex-wrap gap-4"><a href={`${prefix}/attorney#profile`} className="inline-flex min-h-11 items-center gap-3 rounded-full bg-[#211c17] px-6 py-3 text-sm font-medium text-[#f3eee5]">{ko ? "프로필 보기" : es ? "Ver perfil del abogado" : "View attorney profile"}<ArrowRight aria-hidden="true" className="h-4 w-4" /></a><a href={`${prefix}/contact`} className="inline-flex min-h-11 items-center gap-3 rounded-full border border-[#211c17]/30 px-6 py-3 text-sm font-medium">{ko ? "상담 요청" : es ? "Solicitar una consulta" : "Request a consultation"}</a></div>
      </div>
    </div>
  </section>;
}
