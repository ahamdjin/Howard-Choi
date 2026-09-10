import { AnimatePresence, motion, useInView } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useRef, useState } from "react";
import type { SiteLocale } from "@/data/injurySite";

type FAQProps = {
  locale?: SiteLocale;
};

const faqCopy = {
  en: {
    eyebrow: "After an accident",
    title: "Answers before your first call.",
    body: "A few of the questions that usually matter most in the first days after an accident.",
    questions: [
      ["When should I speak with an injury lawyer after an accident?", "If you were injured, fault is disputed, an insurance company is asking for important information, or the accident is affecting your work or daily life, getting legal guidance early can help you understand the claim before key decisions are made."],
      ["What should I do first after a car accident?", "Prioritize safety and appropriate medical attention. When it is safe, preserve useful information such as photos, driver and insurance details, witness information, reports, and records of your treatment and accident-related expenses."],
      ["Should I talk to the insurance company myself?", "You may need to communicate with insurers, but it helps to know which company you are speaking with, what they are asking for, and what information you are providing. If responsibility, coverage, or injuries are disputed, legal advice can clarify your position."],
      ["What should I bring to an initial consultation?", "A simple timeline plus any photos, police or incident reports, insurance information, medical records you already have, and relevant correspondence is usually enough to begin. You do not need to have every document before asking for help."],
      ["What areas does Buena Park Injury Lawyer serve?", "The site's local focus is Buena Park, Fullerton, Anaheim, Cerritos, La Mirada, and La Habra. Whether a particular matter can be accepted also depends on its facts, jurisdiction, conflicts, and the firm's availability."],
    ],
  },
  ko: {
    eyebrow: "사고 이후",
    title: "첫 상담 전에 자주 묻는 질문.",
    body: "사고 직후 며칠 동안 가장 먼저 궁금해지는 질문들을 간단하게 정리했습니다.",
    questions: [
      ["사고 후 언제 변호사와 상담하는 것이 좋나요?", "가능하면 중요한 증거와 보험 정보가 사라지기 전에 일찍 상황을 정리하는 것이 도움이 될 수 있습니다. 구체적인 대응은 사고의 사실관계에 따라 달라집니다."],
      ["자동차 사고 직후 가장 먼저 무엇을 해야 하나요?", "안전과 필요한 치료를 우선으로 하세요. 가능하다면 현장 사진, 운전자 및 보험 정보, 목격자 정보, 보고서와 치료 관련 기록을 보관하는 것이 도움이 됩니다."],
      ["보험사와 직접 이야기해도 되나요?", "보험사와 소통이 필요할 수 있지만 어느 회사와 이야기하는지, 무엇을 요청받고 있는지, 어떤 정보를 제공하는지 이해하는 것이 중요합니다. 책임이나 보장 범위가 다투어지는 경우 법률 상담이 도움이 될 수 있습니다."],
      ["첫 상담에는 무엇을 준비하면 되나요?", "간단한 사고 경위와 사진, 경찰 또는 사고 보고서, 보험 정보, 현재 가지고 있는 치료 기록과 관련 연락 내용을 준비하면 충분히 시작할 수 있습니다."],
      ["부에나파크 외 지역도 지원하나요?", "부에나파크를 중심으로 풀러턴, 애너하임, 세리토스, 라미라다, 라하브라 등 인근 지역을 안내하고 있으며 실제 사건 수임 가능 여부는 사실관계와 관할, 이해상충 및 로펌의 상황에 따라 달라질 수 있습니다."],
    ],
  },
} as const;

const FAQ = ({ locale = "en" }: FAQProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.14 });
  const [open, setOpen] = useState<number | null>(null);
  const copy = faqCopy[locale];
  const ko = locale === "ko";

  return (
    <section id="faq" ref={ref} className="relative h-[100svh] overflow-y-auto bg-[#f3efe8] text-foreground lg:overflow-hidden">
      <div className="site-shell flex h-full w-full items-center py-16 md:py-20 lg:py-20">
        <div className="grid w-full gap-8 lg:grid-cols-[0.58fr_1.42fr] lg:items-start lg:gap-16 xl:gap-24">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.68 }}>
            <span className="mb-4 block text-[9px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{copy.eyebrow}</span>
            <h2
              style={ko ? { fontFamily: '"Noto Serif KR", serif' } : undefined}
              className={`${ko ? "text-[clamp(2rem,2.55vw,3rem)] font-medium leading-[1.3] tracking-[-0.045em]" : "editorial-serif text-[clamp(2rem,2.7vw,3.2rem)] leading-[1.04] tracking-[-0.026em]"} max-w-[520px]`}
            >
              {copy.title}
            </h2>
            <p className="mt-4 max-w-[390px] text-[13px] leading-5 text-foreground/52">{copy.body}</p>
            <div className="mt-6 flex max-w-[390px] items-center gap-3 border-t border-foreground/12 pt-3 text-[9px] font-medium uppercase tracking-[0.14em] text-foreground/30">
              <span>05</span><span>{ko ? "질문" : "Questions"}</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.72, delay: 0.06 }} className="border-t border-foreground/14">
            {copy.questions.map(([question, answer], index) => {
              const active = open === index;
              return (
                <div key={question} className="border-b border-foreground/12">
                  <button type="button" onClick={() => setOpen(active ? null : index)} className="grid w-full grid-cols-[28px_1fr_auto] items-center gap-2.5 py-[17px] text-left md:grid-cols-[36px_1fr_auto] md:gap-4 md:py-5" aria-expanded={active}>
                    <span className="text-[9px] tabular-nums text-foreground/26">{String(index + 1).padStart(2, "0")}</span>
                    <span className={`${ko ? "text-[13px] leading-6 md:text-[14px]" : "text-[13px] leading-5 md:text-[15px]"} font-medium tracking-[-0.012em]`}>{question}</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-foreground/12 transition-colors duration-300 hover:bg-foreground hover:text-background">{active ? <Minus className="h-3 w-3 stroke-[1.45]" /> : <Plus className="h-3 w-3 stroke-[1.45]" />}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {active && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ height: { duration: 0.38, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.22 } }} className="overflow-hidden">
                        <p className={`max-w-[860px] pb-5 pl-[40px] pr-9 text-[12px] text-foreground/55 md:pb-6 md:pl-[52px] md:pr-14 ${ko ? "leading-6" : "leading-5"}`}>{answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
