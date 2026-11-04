import { claimProcessCopy } from "@/data/claimProcessCopy";
import { ClaimProcessSteps } from "@/components/editorial/ClaimProcess";
import { ArrowRight } from "lucide-react";
import { brand, type SiteLocale } from "@/data/injurySite";

const photographs = [
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=800&q=80",
];

export default function ClaimJourney({ locale, subject, guideId, contextImage }: { locale: SiteLocale; subject: string; guideId: string; contextImage?: string }) {
  const ko = locale === "ko";
  const es = locale === "es";
  const prefix = ko ? "/ko" : es ? "/es" : "";
  const copy = claimProcessCopy[locale];
  return (
    <>
      <div className="border-b border-[#1E1C1A]/15">
        <nav aria-label={ko ? "빠른 페이지 안내" : es ? "Explorar esta guía" : "Explore this guide"} className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-center gap-x-8 gap-y-1 px-5 py-3 text-sm">
          <a className="inline-flex min-h-11 items-center underline-offset-4 hover:underline" href="#your-next-step">{ko ? "진행 과정" : es ? "Cómo empezar" : "How to get started"}</a>
          <a className="inline-flex min-h-11 items-center underline-offset-4 hover:underline" href={`#${guideId}`}>{ko ? "사건 안내" : es ? "Leer la guía" : "Read the guide"}</a>
          <a className="inline-flex min-h-11 items-center underline-offset-4 hover:underline" href="#faq">{ko ? "자주 묻는 질문" : es ? "Preguntas frecuentes" : "Common questions"}</a>
        </nav>
      </div>
      <section id="your-next-step" className="scroll-mt-24 px-5 py-16 md:py-24">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto mb-10 max-w-[700px] text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.14em] text-[#1E1C1A]/60">{subject}</p>
            <h2 className="editorial-serif text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.08]">{copy.title}</h2>
            <p className="mt-5 text-base leading-7 text-[#1E1C1A]/70">{copy.intro}</p>
          </div>
          <ClaimProcessSteps locale={locale} images={photographs.map((src, index) => ({
            src: index === 0 && contextImage ? contextImage : src,
            alt: `${subject}: ${copy.steps[index].title}`,
          }))} />
          <div className="mt-12 flex flex-col gap-6 border-y border-[#1E1C1A]/20 py-8 md:flex-row md:items-center md:justify-between">
            <div><h3 className="editorial-serif text-3xl">{ko ? "상황을 이야기해 주세요." : es ? "¿Listo para hablar?" : "Ready to talk?"}</h3><p className="mt-2 text-sm leading-6 text-[#1E1C1A]/70">{ko ? "부에나파크 사무실 · 영어 및 한국어" : es ? "¿Tiene preguntas sobre su accidente? Hable con nuestra oficina de Buena Park." : "Questions about your accident? Talk to our Buena Park office."}</p></div>
            <div className="flex flex-wrap items-center gap-5"><a href={brand.phoneHref} className="inline-flex min-h-11 items-center text-sm underline underline-offset-4">{brand.phoneDisplay}</a><a href={`${prefix}/contact`} className="inline-flex min-h-11 items-center gap-3 rounded-full bg-[#211c17] px-6 py-3 text-sm text-[#f3eee5]">{ko ? "상담 요청" : es ? "Solicitar una consulta" : "Request a consultation"}<ArrowRight className="h-4 w-4" /></a></div>
          </div>
        </div>
      </section>
    </>
  );
}
