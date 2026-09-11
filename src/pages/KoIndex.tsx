import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, Minus, Plus, X } from "lucide-react";
import KoreanNavigation from "@/components/KoreanNavigation";
import KoreanFooter from "@/components/KoreanFooter";
import KoreanLocations from "@/components/KoreanLocations";
import Testimonial from "@/components/Testimonial";
import ReviewsSection from "@/components/ReviewsSection";
import FAQ from "@/components/FAQ";
import heroCityBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroCourthouse from "@/assets/law-firm/hero-courthouse.webp";
import heroJusticeLibrary from "@/assets/law-firm/hero-justice-library.webp";
import heroLawOffice from "@/assets/law-firm/hero-law-office.webp";
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

const processSteps = [
  { title: "상담", body: "사고 경위, 부상 상태, 현재 가지고 있는 정보와 지금 가장 먼저 확인해야 할 문제를 정리하는 직접적인 첫 상담입니다.", points: ["사고 경위와 현재 상황 파악", "당장 필요한 우선순위 확인"], image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=88" },
  { title: "조사", body: "사고와 관련된 증거, 당사자, 기록, 보험 정보를 확인하고 나중에 필요한 자료가 사라지지 않도록 정리합니다.", points: ["기록과 가능한 증거 확보", "책임과 보험 범위 확인"], image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=88" },
  { title: "청구 준비", body: "치료비만이 아니라 회복 과정, 업무 손실, 일상생활 변화 등 부상이 실제 삶에 미친 영향을 함께 정리합니다.", points: ["치료와 회복 과정 기록", "업무와 일상생활 영향 정리"], image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1400&q=88" },
  { title: "해결", body: "자료와 선택지를 정리한 상태에서 가능한 해결 경로를 검토하고 다음 결정을 명확하게 이어갑니다.", points: ["가능한 해결 경로 검토", "다음 단계 명확화"], image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=88" },
];

const faqs = [
  ["사고 후 언제 변호사와 상담하는 것이 좋나요?", "가능하면 중요한 증거와 보험 정보가 사라지기 전에 일찍 상황을 정리하는 것이 도움이 될 수 있습니다. 구체적인 대응은 사고의 사실관계에 따라 달라집니다."],
  ["보험사에서 연락이 오면 어떻게 해야 하나요?", "상세한 녹취 진술이나 서류 서명 전에 무엇을 요청받고 있는지 먼저 이해하는 것이 중요합니다. 필요한 대응은 각 사건의 상황에 따라 달라질 수 있습니다."],
  ["첫 상담 전에 무엇을 준비하면 좋을까요?", "사고 날짜와 간단한 경위, 사진이나 영상, 보험 정보, 치료 관련 기록처럼 현재 가지고 있는 자료를 준비하면 첫 상담을 더 효율적으로 진행할 수 있습니다."],
  ["담당 변호사와 직접 소통하나요?", "네. 가능한 한 불필요한 전달 단계를 줄이고 담당 변호사와 직접 상황과 다음 단계를 이해할 수 있도록 운영합니다."],
  ["부에나파크 외 지역도 지원하나요?", "부에나파크를 중심으로 풀러턴, 애너하임, 세리토스, 라미라다, 라하브라 등 인근 지역을 안내하고 있으며 사건과 관할에 따라 지원 범위가 달라질 수 있습니다."],
];

const HeroKo = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [viewportHeight, setViewportHeight] = useState(900);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const nextSlide = useCallback(() => { setCurrentSlide((previous) => (previous + 1) % slides.length); setProgress(0); }, []);

  useEffect(() => {
    const updateViewportHeight = () => setViewportHeight(window.innerHeight || 900);
    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);
    return () => window.removeEventListener("resize", updateViewportHeight);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((previous) => {
        if (previous >= 100) { nextSlide(); return 0; }
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
      <motion.div initial={shouldReduceMotion ? false : { opacity: 0.72, scale: 1.04, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
        <motion.div className="absolute inset-0 will-change-transform" style={shouldReduceMotion ? undefined : { scale: imageScale, filter: imageFilter, y: imageY }}>
          <AnimatePresence mode="sync" initial={false}>
            <motion.img key={currentSlide} src={slides[currentSlide].image} alt={slides[currentSlide].alt} loading="eager" decoding="async" fetchPriority={currentSlide === 0 ? "high" : "auto"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: "easeInOut" }} className="absolute inset-0 h-full w-full object-cover" />
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <motion.div className="absolute inset-0 bg-[#17130f]" style={shouldReduceMotion ? { opacity: 0.42 } : { opacity: shadeOpacity }} />
      <div className="hero-bottom-readability" />
      <motion.div className="absolute inset-0 z-10 flex items-end" style={shouldReduceMotion ? undefined : { opacity: contentOpacity, filter: contentFilter, y: contentY }}>
        <div className="site-shell pb-24 md:pb-28">
          <div className="max-w-[760px] text-[#f3eee5]">
            <motion.p initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.7 }} className="mb-4 text-[13px] font-medium text-[#f3eee5]/88">사고 · 상해 법률상담</motion.p>
            <motion.h1 initial={shouldReduceMotion ? false : { opacity: 0, y: 16, filter: "blur(9px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.27, duration: 0.9, ease: [0.22, 1, 0.36, 1] }} style={koSerif} className="text-[clamp(2.75rem,4.2vw,4.35rem)] font-medium leading-[1.12] tracking-[-0.05em] text-[#f3eee5]">부에나파크 사고 변호사.</motion.h1>
            <motion.p initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="mt-5 max-w-[590px] text-[15px] leading-7 text-[#f3eee5]/74">부에나파크와 인근 지역에서 사고로 부상을 입은 분들을 위해 명확하고 신속한 법률 대응을 제공합니다.</motion.p>
            <motion.div initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }} className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })} className="liquid-cta inline-flex w-fit items-center gap-3 rounded-full px-6 py-3 text-[13px] font-medium"><span className="relative z-10">상담 요청</span><ArrowRight className="relative z-10 h-4 w-4" /></button>
              <a href="tel:+17146900007" className="text-[13px] text-[#f3eee5]/82 transition-opacity hover:opacity-70">전화 +1 714-690-0007</a>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <motion.div className="absolute inset-x-0 bottom-6 z-20" style={shouldReduceMotion ? undefined : { opacity: contentOpacity }}>
        <div className="site-shell flex gap-2">{slides.map((_, index) => <button key={index} type="button" onClick={() => { setCurrentSlide(index); setProgress(0); }} className="h-px flex-1 overflow-hidden bg-[#f3eee5]/28" aria-label={`슬라이드 ${index + 1}`}><div className="h-full bg-[#f3eee5] transition-all duration-100 ease-linear" style={{ width: index === currentSlide ? `${progress}%` : index < currentSlide ? "100%" : "0%" }} /></button>)}</div>
      </motion.div>
    </section>
  );
};

const ExperienceKo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.18 });
  const [active, setActive] = useState(0);
  useEffect(() => { if (!isInView) return; const timer = window.setTimeout(() => setActive((current) => (current + 1) % processSteps.length), AUTO_ADVANCE_MS); return () => window.clearTimeout(timer); }, [active, isInView]);
  const rowTemplate = processSteps.map((_, index) => (index === active ? "2.2fr" : "1fr")).join(" ");

  return (
    <section id="approach" ref={ref} className="flex min-h-[100svh] items-center bg-background py-[clamp(3rem,6vh,5rem)]">
      <div className="site-shell w-full">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.72 }} className="max-w-[670px]">
          <span className="mb-5 block text-[14px] font-semibold leading-none text-foreground">진행 방식</span>
          <h2 style={koSerif} className="text-[clamp(2.5rem,3.7vw,3.75rem)] font-medium leading-[1.2] tracking-[-0.045em]">명확한 다음 단계.</h2>
          <p className="mt-5 max-w-[540px] text-[clamp(1rem,1.35vw,1.2rem)] leading-[1.6] text-foreground/58">첫 상담부터 조사, 자료 정리, 해결까지 각 단계가 왜 필요한지 분명하게 설명합니다.</p>
        </motion.div>
        <div className="mt-[clamp(2.8rem,6vh,4.8rem)] grid gap-5 lg:h-[min(59vh,600px)] lg:min-h-[500px] lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.05 }} className="relative min-h-[390px] overflow-hidden rounded-[4px] bg-neutral-200 lg:h-full lg:min-h-0"><AnimatePresence mode="wait" initial={false}><motion.img key={processSteps[active].image} src={processSteps[active].image} alt={`${processSteps[active].title} 과정`} initial={{ opacity: 0, scale: 1.018, filter: "blur(3px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0 }} transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 h-full w-full object-cover" /></AnimatePresence><div className="absolute inset-0 bg-black/[0.06]" /></motion.div>
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 16, gridTemplateRows: rowTemplate }} transition={{ opacity: { duration: 0.8, delay: 0.09 }, x: { duration: 0.8, delay: 0.09 }, gridTemplateRows: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } }} className="grid h-[560px] min-h-0 gap-3 lg:h-full">
            {processSteps.map((step, index) => { const expanded = active === index; return <motion.article key={step.title} layout transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="relative min-h-0 overflow-hidden rounded-[4px] bg-[#e6e4e1]"><button type="button" onClick={() => setActive(index)} className="flex h-full w-full min-h-0 flex-col px-7 py-6 text-left md:px-8" aria-expanded={expanded}><div className="flex w-full items-start justify-between gap-6"><span style={koSerif} className="text-[clamp(1.7rem,2.35vw,2.35rem)] font-medium leading-[1.2] tracking-[-0.04em]">{step.title}</span>{expanded ? <X className="mt-1 h-5 w-5 shrink-0 stroke-[1.65]" /> : <Plus className="mt-1 h-5 w-5 shrink-0 stroke-[1.65]" />}</div><AnimatePresence initial={false}>{expanded && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.3, delay: 0.05 }} className="mt-auto max-w-[480px] pt-5"><p className="text-[14px] leading-7 text-foreground/88">{step.body}</p><div className="mt-4 space-y-2.5">{step.points.map((point) => <div key={point} className="flex items-center gap-3 text-[13px] text-foreground/68"><Check className="h-4 w-4 shrink-0 stroke-[1.65]" /><span>{point}</span></div>)}</div></motion.div>}</AnimatePresence></button>{expanded && isInView && <motion.div key={`ko-progress-${active}`} className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-foreground" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }} />}</motion.article>; })}
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
        <motion.div initial={{ opacity: 0, y: 22 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75 }} className="lg:py-10"><span className="mb-5 block text-[10px] tracking-[0.14em] text-white/42">직접적인 소통</span><h2 style={koSerif} className="text-[clamp(2.55rem,3.9vw,4rem)] font-medium leading-[1.18] tracking-[-0.045em] text-white">직접 소통.<br />중간 단계 없이.</h2><p className="mt-6 max-w-[460px] text-[15px] leading-7 text-white/58">상해 청구는 가능한 한 담당 변호사 가까이에서 진행됩니다. 불필요한 전달 단계를 줄이고 상황과 다음 결정을 더 직접적으로 이해할 수 있도록 합니다.</p><div className="mt-14 grid max-w-[420px] grid-cols-2 gap-10 border-t border-white/12 pt-7"><div><div style={koSerif} className="text-[2.4rem] leading-none">1:1</div><div className="mt-2 text-[10px] tracking-[0.1em] text-white/38">직접 변호사 소통</div></div><div><div style={koSerif} className="text-[2.4rem] leading-none">08</div><div className="mt-2 text-[10px] tracking-[0.1em] text-white/38">상해 업무 분야</div></div></div></motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.985 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.9, delay: 0.08 }} className="ml-auto w-full overflow-hidden rounded-[2px] lg:h-[72svh] lg:max-h-[760px] lg:min-h-[560px]"><img src={leadCounselImage} alt="사무실의 변호사" loading="lazy" decoding="async" className="aspect-[4/5] h-full w-full object-cover object-center grayscale-[15%] lg:aspect-auto" /></motion.div>
      </div>
    </section>
  );
};

const FAQKo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [open, setOpen] = useState<number | null>(null);
  return <section id="faq" ref={ref} className="bg-background pb-28 md:pb-36 lg:pb-44"><div className="site-shell"><motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mx-auto mb-12 max-w-2xl text-center"><span className="mb-4 block text-[10px] tracking-[0.12em] text-muted-foreground">상담 전에</span><h2 style={koSerif} className="text-[clamp(2.25rem,3.4vw,3.4rem)] font-medium leading-[1.25] tracking-[-0.04em]">사고 이후 자주 묻는 질문.</h2></motion.div><div className="mx-auto max-w-3xl divide-y divide-black/10 border-y border-black/10">{faqs.map(([question, answer], index) => { const active = open === index; return <div key={question}><button type="button" onClick={() => setOpen(active ? null : index)} className="flex w-full items-center justify-between gap-6 py-5 text-left text-[14px] leading-6"><span>{question}</span>{active ? <Minus className="h-4 w-4 shrink-0" /> : <Plus className="h-4 w-4 shrink-0" />}</button><AnimatePresence initial={false}>{active && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="max-w-2xl pb-6 text-[14px] leading-7 text-muted-foreground">{answer}</p></motion.div>}</AnimatePresence></div>; })}</div></div></section>;
};

const BookingKo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  return <section id="booking" ref={ref} className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#171717] py-20 text-white md:py-24"><img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=82" alt="" loading="lazy" decoding="async" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-[0.18]" /><div className="absolute inset-0 -z-10 bg-black/60" /><div className="site-shell w-full"><motion.div initial={{ opacity: 0, y: 22 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75 }} className="mx-auto max-w-[790px] text-center"><span className="mb-5 block text-[12px] text-white/52">사고 이후 다음 단계</span><h2 style={koSerif} className="text-[clamp(2.45rem,3.8vw,3.9rem)] font-medium leading-[1.2] tracking-[-0.045em]">상황을 설명하는 것부터 시작하세요.</h2><p className="mx-auto mt-6 max-w-[600px] text-[15px] leading-7 text-white/60">사고 경위와 현재 상황을 알려주시면 상담 가능 여부와 다음 단계에 필요한 기본 정보를 확인할 수 있습니다.</p><div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"><a href="/ko/contact" className="liquid-cta inline-flex items-center gap-3 rounded-full px-6 py-3 text-[13px] font-medium"><span className="relative z-10">상담 요청</span><ArrowRight className="relative z-10 h-4 w-4" /></a><a href="tel:+17146900007" className="text-[13px] text-white/68 hover:text-white">전화 +1 714-690-0007</a></div><a href="https://www.google.com/maps/search/?api=1&query=6301+Beach+Blvd%2C+Buena+Park%2C+CA+90621" target="_blank" rel="noreferrer" className="mt-6 inline-block text-[12px] text-white/42 transition-colors hover:text-white/68">6301 Beach Blvd, Buena Park, CA 90621</a></motion.div></div></section>;
};

const KoIndex = () => (
  <div className="min-h-[100svh] overflow-x-clip bg-background" style={{ fontFamily: '"Noto Sans KR", sans-serif' }}>
    <KoreanNavigation />
    <div className="relative"><div className="sticky top-0 z-0 h-[100svh] w-full"><HeroKo /></div><div className="relative z-10 w-full bg-background"><KoreanLocations /></div></div>
    <div className="relative z-20 bg-background"><ExperienceKo /><DirectAccessKo /><Testimonial locale="ko" /><ReviewsSection locale="ko" /><FAQ locale="ko" /><BookingKo /><KoreanFooter /></div>
  </div>
);

export default KoIndex;
