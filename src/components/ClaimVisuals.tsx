import { ArrowRight, Camera, FileCheck2, HeartPulse, ShieldCheck, Wallet, CalendarDays } from "lucide-react";
import leadCounsel from "@/assets/law-firm/lead-counsel.avif";
import { type SiteLocale } from "@/data/injurySite";

export function EvidenceVisuals({ locale }: { locale: SiteLocale }) {
  const ko = locale === "ko";
  const items = [
    { Icon: Camera, title: ko ? "사고 현장" : "The scene", text: ko ? "사진 · 영상 · 목격자" : "Photos, video, witnesses" },
    { Icon: FileCheck2, title: ko ? "사고 기록" : "The records", text: ko ? "보고서 · 보험 연락" : "Reports and insurance letters" },
    { Icon: HeartPulse, title: ko ? "사고의 영향" : "The impact", text: ko ? "치료 · 업무 · 일상생활" : "Treatment, work, daily life" },
  ];
  return <div className="evidence-visuals mb-8 grid gap-5 sm:grid-cols-3">{items.map(({ Icon, title, text }, index) => <div key={title} className="rounded-md bg-[#eee9e1] p-5">
    <div aria-hidden="true" className="relative mb-5 flex h-28 items-center justify-center overflow-hidden">
      <div className="absolute h-24 w-24 rounded-full bg-[#ded2c0]" />
      <div className={`relative flex h-20 w-16 items-center justify-center rounded-md border border-[#381907]/20 bg-[#faf8f4] shadow-sm ${index === 1 ? "rotate-6" : "-rotate-6"}`}><Icon className="h-9 w-9 text-[#381907]" strokeWidth={1.4} /></div>
      <ShieldCheck className="absolute bottom-0 right-3 h-9 w-9 rounded-full bg-[#eee9e1] p-1.5 text-[#381907]" strokeWidth={1.5} />
    </div>
    <h3 className="text-base font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#57514b]">{text}</p>
  </div>)}</div>;
}

export function ClaimValueVisual({ locale }: { locale: SiteLocale }) {
  const ko = locale === "ko";
  return <div className="mb-8 flex flex-wrap gap-4 rounded-md bg-[#eee9e1] p-6" aria-label={ko ? "손실 항목" : "Types of loss"}>
    {[{ Icon: HeartPulse, label: ko ? "치료" : "Medical care" }, { Icon: Wallet, label: ko ? "소득" : "Lost income" }, { Icon: CalendarDays, label: ko ? "일상생활" : "Daily life" }].map(({ Icon, label }) => <div key={label} className="flex min-w-[140px] flex-1 items-center gap-3"><Icon aria-hidden="true" className="h-10 w-10 rounded-full bg-[#faf8f4] p-2 text-[#381907]" /><span className="text-sm font-semibold">{label}</span></div>)}
  </div>;
}

export function GuideAttorney({ locale }: { locale: SiteLocale }) {
  const ko = locale === "ko";
  const prefix = ko ? "/ko" : "";
  return <section className="guide-attorney bg-[#eae4db] px-5 py-14 md:py-20">
    <div className="mx-auto grid max-w-[1120px] items-center gap-8 md:grid-cols-[0.7fr_1.3fr] md:gap-14">
      <img src={leadCounsel} alt="Howard Choi, California attorney" width={480} height={540} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-[4px] object-cover object-top md:aspect-[4/5] md:max-h-[400px]" />
      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#67584a]">{ko ? "변호사 정보" : "Attorney information"}</p>
        <h2 className="text-[clamp(2rem,3.5vw,3.4rem)] font-semibold leading-tight tracking-[-0.04em]">Howard Choi</h2>
        <p className="mt-3 text-sm font-medium text-[#57514b]">{ko ? "캘리포니아 변호사 · Bar No. 284364" : "California Attorney · Bar No. 284364"}</p>
        <p className="mt-5 max-w-[560px] text-base leading-7 text-[#57514b]">{ko ? "부에나파크 사무실에서 개인상해 사건을 다룹니다. 변호사 등록 정보와 프로필을 직접 확인할 수 있습니다." : "Personal injury counsel based in Buena Park. His California license and professional details can be independently verified before you contact the firm."}</p>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#67584a]">
          <span>{ko ? "영어 · 한국어" : "English · Korean"}</span>
          <span>{ko ? "무료 상담" : "Free consultation"}</span>
          <span>{ko ? "성공보수제" : "Contingency fee"}</span>
        </div>
        <div className="mt-7 flex flex-wrap gap-4">
          <a href={`${prefix}/attorney#profile`} className="inline-flex min-h-11 items-center gap-3 rounded-full bg-[#211c17] px-6 py-3 text-sm font-medium text-[#f3eee5]">{ko ? "프로필 보기" : "View attorney profile"}<ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
          <a href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-3 rounded-full border border-[#211c17]/30 px-6 py-3 text-sm font-medium">{ko ? "State Bar에서 확인" : "Verify State Bar"}<ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
        </div>
      </div>
    </div>
  </section>;
}
