import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, Check, Minus, Plus, X } from "lucide-react";
import KoreanNavigation from "@/components/KoreanNavigation";
import KoreanFooter from "@/components/KoreanFooter";
import KoreanLocations from "@/components/KoreanLocations";
import heroCityBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroCourthouse from "@/assets/law-firm/hero-courthouse.webp";
import heroJusticeLibrary from "@/assets/law-firm/hero-justice-library.webp";
import heroLawOffice from "@/assets/law-firm/hero-law-office.webp";
import corporateLawImage from "@/assets/law-firm/practice-corporate-law.webp";
import commercialLitigationImage from "@/assets/law-firm/practice-commercial-litigation.webp";
import regulatoryComplianceImage from "@/assets/law-firm/practice-regulatory-compliance.webp";
import leadCounselImage from "@/assets/law-firm/lead-counsel.avif";

const koSerif = { fontFamily: '"Noto Serif KR", serif' } as const;
const SLIDE_DURATION = 5000;
const AUTO_ADVANCE_MS = 4800;

const slides = [
  { image: heroJusticeLibrary, alt: "프라이빗 법률 서재의 정의의 여신상" },
  { image: heroCityBoardroom, alt: "도시가 내려다보이는 로펌 회의실" },
  { image: heroLawOffice, alt: "전통적인 로펌 사무실과 책상" },
  { image: heroCourthouse, alt: "법원 내부" },
];

const reviewAvatars = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
];

const practices = [
  {
    title: "기업 자문",
    description: "기업 설립, 계약, 거버넌스부터 중요한 거래와 성장 과정의 의사결정까지 실무 중심으로 자문합니다.",
    image: corporateLawImage,
    alt: "기업 계약서를 검토하는 변호사",
    points: ["설립 · 거버넌스", "상업 계약", "전략적 거래"],
  },
  {
    title: "상사 소송",
    description: "사업 분쟁의 이해관계가 커지는 순간, 협상부터 소송 전략까지 명확하고 단호하게 대응합니다.",
    image: commercialLitigationImage,
    alt: "사건 자료를 검토하는 상사 소송 변호사",
    points: ["사업 분쟁", "소송 전 전략", "고위험 분쟁 대응"],
  },
  {
    title: "규제 · 컴플라이언스",
    description: "복잡한 규제 의무, 사업 리스크, 규정 변화에 대응할 수 있도록 현실적인 방향을 제시합니다.",
    image: regulatoryComplianceImage,
    alt: "규제 문제를 논의하는 법률 자문팀",
    points: ["규제 전략", "리스크 · 컴플라이언스", "정부기관 대응"],
  },
];

const processSteps = [
  {
    title: "상담",
    body: "사안의 핵심, 사업적 배경, 원하는 결과에 집중하는 첫 대화로 시작합니다.",
    points: ["당장 해결해야 할 문제 정리", "우선순위와 제약조건 확인"],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=88",
  },
  {
    title: "전략",
    body: "템플릿이 아니라 해당 사안의 사실관계와 목표에 맞는 전략을 설계합니다.",
    points: ["업무 범위 · 접근 방식 · 일정 명확화", "행동 전에 리스크와 선택지 설명"],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=88",
  },
  {
    title: "해결",
    body: "가장 강한 실질적 결과를 향해 사안을 움직이는 데 집중합니다.",
    points: ["결정적인 실행과 정기 업데이트", "다음 단계에 대한 모호함 최소화"],
    image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1400&q=88",
  },
  {
    title: "지속 자문",
    body: "한 건의 문제를 넘어 지속적인 법률 파트너가 필요할 때 직접적인 자문 관계를 이어갑니다.",
    points: ["문제가 생길 때 신속한 자문", "담당자 변경 없이 이어지는 연속성"],
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=88",
  },
];

const faqs = [
  ["사업 문제에 언제 변호사를 참여시키는 것이 좋을까요?", "대부분 생각보다 이른 시점이 좋습니다. 초기 자문은 협상을 단순화하고 리스크를 줄이며 작은 문제가 큰 비용으로 이어지는 것을 막는 데 도움이 될 수 있습니다."],
  ["담당 변호사와 직접 일하게 되나요?", "네. 업무 구조 자체가 직접적인 접근과 명확한 책임관계를 중심으로 설계되어 있습니다."],
  ["이해충돌과 민감정보는 어떻게 처리하나요?", "실질적인 법률자문을 제공하기 전에 모든 문의에 대해 이해충돌 여부를 확인하며, 기밀정보는 적절한 주의를 기울여 처리합니다."],
  ["첫 상담 전에 무엇을 준비하면 좋을까요?", "간단한 타임라인, 주요 문서, 관련 당사자, 원하는 결과 정도면 생산적인 첫 대화를 시작하기에 충분합니다."],
  ["지역 외 사건도 진행하나요?", "사건의 성격과 관할에 따라 원격으로 진행하거나 현지 변호사와 협업하는 방식이 가능할 수 있습니다."],
];

const HeroKo = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [viewportHeight, setViewportHeight] = useState(900);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((previous) => (previous + 1) % slides.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    const updateViewportHeight = () => setViewportHeight(window.innerHeight || 900);
    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);
    return () => window.removeEventListener("resize", updateViewportHeight);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((previous) => {
        if (previous >= 100) {
          nextSlide();
          return 0;
        }
        return previous + 100 / (SLIDE_DURATION / 50);
      });
    }, 50);
    return () => window.clearInterval(interval);
  }, [nextSlide]);

  const transitionEnd = viewportHeight * 0.95;
  const imageScale = useTransform(scrollY, [0, transitionEnd], [1, 1.07]);
  const imageFilter = useTransform(scrollY, [0, transitionEnd], ["blur(0px)", "blur(3.5px)"]);
  const imageY = useTransform(scrollY, [0, transitionEnd], ["0%", "-1.25%"]);
  const shadeOpacity = useTransform(scrollY, [0, transitionEnd], [0.42, 0.56]);
  const contentOpacity = useTransform(scrollY, [0, transitionEnd * 0.72], [1, 0]);
  const contentFilter = useTransform(scrollY, [0, transitionEnd * 0.72], ["blur(0px)", "blur(9px)"]);
  const contentY = useTransform(scrollY, [0, transitionEnd * 0.72], [0, -22]);

  return (
    <section className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-[#17130f]">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0.72, scale: 1.04, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <motion.div className="absolute inset-0 will-change-transform" style={shouldReduceMotion ? undefined : { scale: imageScale, filter: imageFilter, y: imageY }}>
          <AnimatePresence mode="sync" initial={false}>
            <motion.img
              key={currentSlide}
              src={slides[currentSlide].image}
              alt={slides[currentSlide].alt}
              loading="eager"
              decoding="async"
              fetchPriority={currentSlide === 0 ? "high" : "auto"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <motion.div className="absolute inset-0 bg-[#17130f]" style={shouldReduceMotion ? { opacity: 0.42 } : { opacity: shadeOpacity }} />

      <motion.div className="absolute inset-0 z-10 flex items-end" style={shouldReduceMotion ? undefined : { opacity: contentOpacity, filter: contentFilter, y: contentY }}>
        <div className="site-shell pb-24 md:pb-28">
          <div className="max-w-[760px] text-[#f3eee5]">
            <motion.p initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.7 }} className="mb-4 text-[13px] font-medium text-[#f3eee5]/88">
              사고 · 상해 법률상담
            </motion.p>

            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16, filter: "blur(9px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.27, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={koSerif}
              className="text-[clamp(2.75rem,4.2vw,4.35rem)] font-medium leading-[1.12] tracking-[-0.05em] text-[#f3eee5]"
            >
              부에나파크 사고 변호사.
            </motion.h1>

            <motion.p initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="mt-5 max-w-[590px] text-[15px] leading-7 text-[#f3eee5]/74">
              부에나파크와 오렌지카운티에서 사고로 부상을 입은 분들을 위해 명확하고 신속한 법률 대응을 제공합니다.
            </motion.p>

            <motion.div initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }} className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })} className="liquid-cta inline-flex w-fit items-center gap-3 rounded-full px-6 py-3 text-[13px] font-medium">
                <span className="relative z-10">상담 요청</span><ArrowRight className="relative z-10 h-4 w-4" />
              </button>
              <a href="tel:+17146900007" className="text-[13px] text-[#f3eee5]/82 transition-opacity hover:opacity-70">전화 +1 714-690-0007</a>
            </motion.div>

            <motion.div initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.62, duration: 0.7 }} className="mt-7 flex items-center gap-3">
              <div className="flex -space-x-2">
                {reviewAvatars.map((avatar, index) => (
                  <img key={avatar} src={avatar} alt={`고객 리뷰 ${index + 1}`} loading="lazy" decoding="async" width={36} height={36} className="h-9 w-9 rounded-full border-2 border-[#f3eee5] object-cover" />
                ))}
              </div>
              <div><div className="text-[13px] leading-none tracking-[0.12em] text-[#f3eee5]">★★★★★</div><p className="mt-1 text-[12px] text-[#f3eee5]/70">고객 리뷰 120+ · 4.9/5</p></div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div className="absolute inset-x-0 bottom-6 z-20" style={shouldReduceMotion ? undefined : { opacity: contentOpacity }}>
        <div className="site-shell flex gap-2">
          {slides.map((_, index) => (
            <button key={index} type="button" onClick={() => { setCurrentSlide(index); setProgress(0); }} className="h-px flex-1 overflow-hidden bg-[#f3eee5]/28" aria-label={`슬라이드 ${index + 1}`}>
              <div className="h-full bg-[#f3eee5] transition-all duration-100 ease-linear" style={{ width: index === currentSlide ? `${progress}%` : index < currentSlide ? "100%" : "0%" }} />
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const PracticeKo = () => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <section id="practice" ref={ref} className="bg-background py-20 md:py-24 lg:py-28">
      <div className="site-shell">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.72 }} className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <span className="mb-5 block text-[13px] text-muted-foreground">업무 분야</span>
            <h2 style={koSerif} className="max-w-[760px] text-[clamp(2.5rem,3.8vw,3.9rem)] font-medium leading-[1.2] tracking-[-0.045em]">
              성장의 모든 단계에서<br />필요한 법률자문.
            </h2>
          </div>
          <p className="max-w-[450px] text-[15px] leading-7 text-muted-foreground">
            설립과 계약부터 분쟁, 규제 대응, 지속적인 법률자문까지 기업의 중요한 순간에 필요한 핵심 업무에 집중합니다.
          </p>
        </motion.div>

        <div className="grid gap-3 lg:grid-cols-3">
          {practices.map((practice, index) => (
            <motion.article key={practice.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay: index * 0.07 }} className="group relative h-[470px] overflow-hidden rounded-[4px] bg-[#181511] lg:h-[520px]">
              <img src={practice.image} alt={practice.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#15110d]/94 via-[#15110d]/14 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-[#f3eee5] md:p-7">
                <div className="mb-3 text-[10px] tracking-[0.12em] text-[#f3eee5]/50">0{index + 1}</div>
                <h3 style={koSerif} className="text-[2rem] font-medium leading-[1.2] tracking-[-0.04em]">{practice.title}</h3>
                <p className="mt-3 max-w-[340px] text-[13px] leading-6 text-[#f3eee5]/70">{practice.description}</p>
                <div className="mt-6 border-t border-[#f3eee5]/16 pt-4">
                  {practice.points.map((point) => <div key={point} className="flex items-center justify-between border-b border-[#f3eee5]/10 py-2 text-[12px] text-[#f3eee5]/62 last:border-b-0"><span>{point}</span><span className="text-[#f3eee5]/35">↗</span></div>)}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExperienceKo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.18 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % processSteps.length), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [active, isInView]);

  const rowTemplate = processSteps.map((_, index) => (index === active ? "2.2fr" : "1fr")).join(" ");

  return (
    <section id="approach" ref={ref} className="flex min-h-[100svh] items-center bg-background py-[clamp(3rem,6vh,5rem)]">
      <div className="site-shell w-full">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.72 }} className="max-w-[670px]">
          <span className="mb-5 block text-[14px] font-semibold leading-none text-foreground">업무 방식</span>
          <h2 style={koSerif} className="text-[clamp(2.5rem,3.7vw,3.75rem)] font-medium leading-[1.2] tracking-[-0.045em]">명확한 다음 단계.</h2>
          <p className="mt-5 max-w-[540px] text-[clamp(1rem,1.35vw,1.2rem)] leading-[1.6] text-foreground/58">첫 대화부터 해결까지, 무엇을 왜 해야 하는지 모호하게 남겨두지 않습니다.</p>
        </motion.div>

        <div className="mt-[clamp(2.8rem,6vh,4.8rem)] grid gap-5 lg:h-[min(59vh,600px)] lg:min-h-[500px] lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.05 }} className="relative min-h-[390px] overflow-hidden rounded-[4px] bg-neutral-200 lg:h-full lg:min-h-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img key={processSteps[active].image} src={processSteps[active].image} alt={`${processSteps[active].title} 과정`} initial={{ opacity: 0, scale: 1.018, filter: "blur(3px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0 }} transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 h-full w-full object-cover" />
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/[0.06]" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 16, gridTemplateRows: rowTemplate }} transition={{ opacity: { duration: 0.8, delay: 0.09 }, x: { duration: 0.8, delay: 0.09 }, gridTemplateRows: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } }} className="grid h-[560px] min-h-0 gap-3 lg:h-full">
            {processSteps.map((step, index) => {
              const open = active === index;
              return (
                <motion.article key={step.title} layout transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="relative min-h-0 overflow-hidden rounded-[4px] bg-[#e6e4e1]">
                  <button type="button" onClick={() => setActive(index)} className="flex h-full w-full min-h-0 flex-col px-7 py-6 text-left md:px-8" aria-expanded={open}>
                    <div className="flex w-full items-start justify-between gap-6"><span style={koSerif} className="text-[clamp(1.7rem,2.35vw,2.35rem)] font-medium leading-[1.2] tracking-[-0.04em]">{step.title}</span>{open ? <X className="mt-1 h-5 w-5 shrink-0 stroke-[1.65]" /> : <Plus className="mt-1 h-5 w-5 shrink-0 stroke-[1.65]" />}</div>
                    <AnimatePresence initial={false}>{open && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.3, delay: 0.05 }} className="mt-auto max-w-[480px] pt-5"><p className="text-[14px] leading-7 text-foreground/88">{step.body}</p><div className="mt-4 space-y-2.5">{step.points.map((point) => <div key={point} className="flex items-center gap-3 text-[13px] text-foreground/68"><Check className="h-4 w-4 shrink-0 stroke-[1.65]" /><span>{point}</span></div>)}</div></motion.div>}</AnimatePresence>
                  </button>
                  {open && isInView && <motion.div key={`ko-progress-${active}`} className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-foreground" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }} />}
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const DirectAccessKo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="flex min-h-[100svh] items-center bg-[#171717] py-16 text-white md:py-20 lg:py-0">
      <div className="site-shell grid w-full gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75 }} className="lg:py-10">
          <span className="mb-5 block text-[10px] tracking-[0.14em] text-white/42">HOW WE DIFFER</span>
          <h2 style={koSerif} className="text-[clamp(2.55rem,3.9vw,4rem)] font-medium leading-[1.18] tracking-[-0.045em] text-white">직접 소통.<br />중간 단계 없이.</h2>
          <p className="mt-6 max-w-[460px] text-[15px] leading-7 text-white/58">사안은 처음부터 끝까지 책임 변호사 가까이에 있습니다. 불필요한 전달 단계를 줄이고, 더 명확한 조언과 빠른 의사결정을 가능하게 합니다.</p>
          <div className="mt-14 grid max-w-[420px] grid-cols-2 gap-10 border-t border-white/12 pt-7">
            <div><div style={koSerif} className="text-[2.4rem] leading-none">1:1</div><div className="mt-2 text-[10px] tracking-[0.1em] text-white/38">직접 변호사 소통</div></div>
            <div><div style={koSerif} className="text-[2.4rem] leading-none">04</div><div className="mt-2 text-[10px] tracking-[0.1em] text-white/38">핵심 업무 영역</div></div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.985 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.9, delay: 0.08 }} className="ml-auto w-full overflow-hidden rounded-[2px] lg:h-[72svh] lg:max-h-[760px] lg:min-h-[560px]">
          <img src={leadCounselImage} alt="사무실의 담당 변호사" loading="lazy" decoding="async" className="aspect-[4/5] h-full w-full object-cover object-center grayscale-[15%] lg:aspect-auto" />
        </motion.div>
      </div>
    </section>
  );
};

const testimonial = "복잡한 사안에서도 차분한 판단, 명확한 설명, 그리고 필요한 순간의 빠른 대응이 인상적이었습니다.";
const testimonialWords = testimonial.split(" ");

const ReadWordKo = ({ word, index, total, progress }: { word: string; index: number; total: number; progress: MotionValue<number> }) => {
  const start = (index / total) * 0.82;
  const end = Math.min(start + 0.17, 1);
  const color = useTransform(progress, [start, end], ["rgba(30,28,25,0.18)", "rgba(30,28,25,1)"]);
  return <motion.span style={{ color }} className="inline">{word}{" "}</motion.span>;
};

const TestimonialKo = () => {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "end 36%"] });

  return (
    <section ref={ref} className="flex min-h-[76svh] items-center bg-background pb-16 pt-10 md:min-h-[80svh] md:pb-20 md:pt-12">
      <div className="site-shell w-full text-center"><div className="mx-auto max-w-[820px]"><div className="mb-6 text-[12px] tracking-[0.22em] text-foreground">★★★★★</div><blockquote style={koSerif} className="text-[clamp(2rem,2.8vw,3.15rem)] font-medium leading-[1.45] tracking-[-0.04em]">“{testimonialWords.map((word, index) => <ReadWordKo key={`${word}-${index}`} word={word} index={index} total={testimonialWords.length} progress={scrollYProgress} />)}”</blockquote><div className="mt-8 flex items-center justify-center gap-3 text-left"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=82" alt="고객" loading="lazy" decoding="async" className="h-9 w-9 rounded-full object-cover" /><div className="leading-tight"><div className="text-[13px] font-medium text-foreground">Marcus Ellison</div><div className="mt-0.5 text-[11px] text-muted-foreground">Founder &amp; Managing Partner</div></div></div></div></div>
    </section>
  );
};

const FAQKo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" ref={ref} className="bg-background pb-28 md:pb-36 lg:pb-44">
      <div className="site-shell">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-4 block text-[10px] tracking-[0.12em] text-muted-foreground">상담 전에</span>
          <h2 style={koSerif} className="text-[clamp(2.25rem,3.4vw,3.4rem)] font-medium leading-[1.25] tracking-[-0.04em]">첫 통화 전에 알아두면 좋은 것들.</h2>
        </motion.div>
        <div className="mx-auto max-w-3xl divide-y divide-black/10 border-y border-black/10">
          {faqs.map(([question, answer], index) => {
            const active = open === index;
            return <div key={question}><button type="button" onClick={() => setOpen(active ? null : index)} className="flex w-full items-center justify-between gap-6 py-5 text-left text-[14px] leading-6"><span>{question}</span>{active ? <Minus className="h-4 w-4 shrink-0" /> : <Plus className="h-4 w-4 shrink-0" />}</button><AnimatePresence initial={false}>{active && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="max-w-2xl pb-6 text-[14px] leading-7 text-muted-foreground">{answer}</p></motion.div>}</AnimatePresence></div>;
          })}
        </div>
      </div>
    </section>
  );
};

const BookingKo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section id="booking" ref={ref} className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#171717] py-20 text-white md:py-24">
      <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=82" alt="" loading="lazy" decoding="async" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-[0.18]" />
      <div className="absolute inset-0 -z-10 bg-black/60" />
      <div className="site-shell w-full">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75 }} className="mx-auto max-w-[790px] text-center">
          <span className="mb-5 block text-[12px] text-white/52">대화를 시작하세요</span>
          <h2 style={koSerif} className="text-[clamp(2.45rem,3.8vw,3.9rem)] font-medium leading-[1.2] tracking-[-0.045em]">좋은 법률자문은 올바른 첫 대화에서 시작됩니다.</h2>
          <p className="mx-auto mt-6 max-w-[600px] text-[15px] leading-7 text-white/60">사안의 개요를 알려주세요. 업무 적합성, 이해충돌 여부, 다음 단계를 확인한 뒤 진행 방향을 안내해 드립니다.</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"><a href="/ko/contact" className="liquid-cta inline-flex items-center gap-3 rounded-full px-6 py-3 text-[13px] font-medium"><span className="relative z-10">상담 요청</span><ArrowRight className="relative z-10 h-4 w-4" /></a><a href="tel:+17146900007" className="text-[13px] text-white/68 hover:text-white">전화 +1 714-690-0007</a></div>
          <a href="https://www.google.com/maps/search/?api=1&query=6301+Beach+Blvd%2C+Buena+Park%2C+CA+90621" target="_blank" rel="noreferrer" className="mt-6 inline-block text-[12px] text-white/42 transition-colors hover:text-white/68">6301 Beach Blvd, Buena Park, CA 90621</a>
        </motion.div>
      </div>
    </section>
  );
};

const KoIndex = () => {
  return (
    <div className="min-h-[100svh] overflow-x-clip bg-background" style={{ fontFamily: '"Noto Sans KR", sans-serif' }}>
      <KoreanNavigation />
      <div className="relative">
        <div className="sticky top-0 z-0 h-[100svh] w-full"><HeroKo /></div>
        <div className="relative z-10 w-full bg-background"><KoreanLocations /></div>
      </div>
      <div className="relative z-20 bg-background">
        <ExperienceKo />
        <DirectAccessKo />
        <TestimonialKo />
        <FAQKo />
        <BookingKo />
        <KoreanFooter />
      </div>
    </div>
  );
};

export default KoIndex;
