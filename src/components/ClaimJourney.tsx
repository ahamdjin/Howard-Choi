import { ArrowRight, FileText, MessageSquare, Route } from "lucide-react";
import { brand, type SiteLocale } from "@/data/injurySite";

// Licensed stock photographs, not photographs of the firm's staff or clients.
const photographs = [
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=800&q=80",
];

export default function ClaimJourney({ locale, subject, guideId, contextImage }: { locale: SiteLocale; subject: string; guideId: string; contextImage?: string }) {
  const ko = locale === "ko";
  const prefix = ko ? "/ko" : "";
  const steps = ko ? [
    { title: "상황을 알려주세요", body: "사고 경위와 현재 가장 궁금한 점을 정리하세요. 가지고 있는 자료부터 시작할 수 있습니다.", icon: MessageSquare },
    { title: "기록을 함께 살펴봅니다", body: "사고 기록, 보험 연락, 치료 자료를 통해 무엇을 더 확인해야 하는지 알아봅니다.", icon: FileText },
    { title: "다음 단계를 확인하세요", body: "질문과 선택지를 정리하고 상담을 통해 사건에 맞는 진행 방향을 확인하세요.", icon: Route },
  ] : [
    { title: "Start with your story", body: "Share the accident date, location, and your biggest concern.", icon: MessageSquare },
    { title: "Make sense of the records", body: "Keep your photos, reports, treatment records, and insurance letters together.", icon: FileText },
    { title: "Understand your next step", body: "Ask what needs attention now and what a claim could involve.", icon: Route },
  ];
  return (
    <>
      <div className="border-b border-[#1E1C1A]/15">
        <nav aria-label={ko ? "빠른 페이지 안내" : "Explore this guide"} className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-center gap-x-8 gap-y-1 px-5 py-3 text-sm">
          <a className="inline-flex min-h-11 items-center underline-offset-4 hover:underline" href="#your-next-step">{ko ? "진행 과정" : "How to get started"}</a>
          <a className="inline-flex min-h-11 items-center underline-offset-4 hover:underline" href={`#${guideId}`}>{ko ? "사건 안내" : "Read the guide"}</a>
          <a className="inline-flex min-h-11 items-center underline-offset-4 hover:underline" href="#faq">{ko ? "자주 묻는 질문" : "Common questions"}</a>
        </nav>
      </div>
      <section id="your-next-step" className="scroll-mt-24 px-5 py-16 md:py-24">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto mb-10 max-w-[700px] text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.14em] text-[#1E1C1A]/60">{subject}</p>
            <h2 className="editorial-serif text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.08]">{ko ? "혼자 모든 것을 정리할 필요는 없습니다." : "Your next three steps."}</h2>
            <p className="mt-5 text-base leading-7 text-[#1E1C1A]/70">{ko ? "먼저 상황을 이해하고, 필요한 기록과 다음 단계를 차근차근 확인하세요." : "Tell us what happened. Gather what you have. Discuss your options."}</p>
          </div>
          <ol className="grid gap-10 md:grid-cols-3 md:gap-7">
            {steps.map(({ title, body, icon: Icon }, index) => (
              <li key={title}>
                <img src={index === 0 && contextImage ? contextImage : photographs[index]} alt={`${subject} — ${title}`} width={800} height={560} loading="lazy" decoding="async" className="aspect-[10/7] w-full rounded-[3px] object-cover" />
                <div className="mt-5 flex items-center gap-3 border-b border-[#1E1C1A]/15 pb-4"><span className="text-xs text-[#1E1C1A]/60">0{index + 1}</span><Icon className="h-5 w-5" aria-hidden="true" /><h3 className="text-lg font-medium">{title}</h3></div>
                <p className="mt-4 text-base leading-7 text-[#1E1C1A]/70">{body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-col gap-6 border-y border-[#1E1C1A]/20 py-8 md:flex-row md:items-center md:justify-between">
            <div><h3 className="editorial-serif text-3xl">{ko ? "상황을 이야기해 주세요." : "Ready to talk?"}</h3><p className="mt-2 text-sm leading-6 text-[#1E1C1A]/70">{ko ? "부에나파크 사무실 · 영어 및 한국어" : "Questions about your accident? Talk to our Buena Park office."}</p></div>
            <div className="flex flex-wrap items-center gap-5"><a href={brand.phoneHref} className="inline-flex min-h-11 items-center text-sm underline underline-offset-4">{brand.phoneDisplay}</a><a href={`${prefix}/contact`} className="inline-flex min-h-11 items-center gap-3 rounded-full bg-[#211c17] px-6 py-3 text-sm text-[#f3eee5]">{ko ? "상담 요청" : "Request a consultation"}<ArrowRight className="h-4 w-4" /></a></div>
          </div>
        </div>
      </section>
    </>
  );
}
