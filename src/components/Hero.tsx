import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { SiteLocale } from "@/data/injurySite";
import heroCityBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroCourthouse from "@/assets/law-firm/hero-courthouse.webp";
import heroJusticeLibrary from "@/assets/law-firm/hero-justice-library.webp";
import heroLawOffice from "@/assets/law-firm/hero-law-office.webp";
import attorneyPortrait from "@/assets/law-firm/lead-counsel.avif";

const slides = [
  { image: heroJusticeLibrary, alt: { en: "Lady Justice in a private law library", es: "Estatua de la Justicia en una biblioteca jurídica privada", ko: "법률 서재의 정의의 여신상" } },
  { image: heroCityBoardroom, alt: { en: "Law firm boardroom overlooking the city", es: "Sala de juntas de un bufete con vista a la ciudad", ko: "도시가 내려다보이는 로펌 회의실" } },
  { image: heroLawOffice, alt: { en: "Traditional law office and desk", es: "Oficina jurídica tradicional con escritorio", ko: "전통적인 로펌 사무실과 책상" } },
  { image: heroCourthouse, alt: { en: "Courthouse interior", es: "Interior de un tribunal", ko: "법원 내부" } },
];

const SLIDE_DURATION_SECONDS = 5;

const Hero = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [viewportHeight, setViewportHeight] = useState(900);
  const [currentSlide, setCurrentSlide] = useState(0);
  const es = locale === "es";
  const ko = locale === "ko";
  const prefix = ko ? "/ko" : es ? "/es" : "";

  const nextSlide = useCallback(() => {
    setCurrentSlide((previous) => (previous + 1) % slides.length);
  }, []);

  useEffect(() => {
    const update = () => setViewportHeight(window.innerHeight || 900);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const nextImage = new Image();
    nextImage.src = slides[(currentSlide + 1) % slides.length].image;
  }, [currentSlide]);

  const transitionEnd = viewportHeight * 0.95;
  const imageScale = useTransform(scrollY, [0, transitionEnd], [1, 1.07]);
  const imageFilter = useTransform(scrollY, [0, transitionEnd], ["blur(0px)", "blur(3.5px)"]);
  const imageY = useTransform(scrollY, [0, transitionEnd], ["0%", "-1.25%"]);
  const shadeOpacity = useTransform(scrollY, [0, transitionEnd], [0.42, 0.56]);
  const contentOpacity = useTransform(scrollY, [0, transitionEnd * 0.72], [1, 0]);
  const contentFilter = useTransform(scrollY, [0, transitionEnd * 0.72], ["blur(0px)", "blur(9px)"]);
  const contentY = useTransform(scrollY, [0, transitionEnd * 0.72], [0, -22]);

  const eyebrow = ko ? "사고 · 개인상해 변호사 · 부에나파크, 캘리포니아" : es ? "Abogado de accidentes y lesiones personales · Buena Park, California" : "Accident & Personal Injury Lawyer · Buena Park, California";
  const title = ko ? "부에나파크 사고 변호사." : es ? "Abogado de accidentes en Buena Park, CA." : "Accident Lawyer in Buena Park, CA.";
  const body = ko
    ? "자동차 사고나 그 밖의 중대한 사고 이후, 증거와 보험 그리고 다음 단계에 초점을 둔 개인상해 법률 안내를 제공합니다."
    : es
      ? "Orientación clara después de un choque de auto u otro accidente grave, con representación de lesiones personales centrada en la evidencia, el seguro y lo que sigue."
      : "Clear guidance after a car crash or other serious accident, with personal injury representation focused on the evidence, insurance, and what comes next.";
  const consultation = ko ? "무료 상담" : es ? "Consulta gratuita" : "Free Consultation";
  const call = ko ? "또는 전화" : es ? "O llame al" : "Or call";
  const fee = ko ? "무료 상담 · 배상이 없으면 변호사 수임료도 없습니다." : es ? "Consulta gratuita · Sin honorarios de abogado si no hay recuperación." : "Free consultation · No attorney fee unless there is a recovery.";

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
              alt={slides[currentSlide].alt[locale]}
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
      <div className="hero-bottom-readability" />

      <motion.div className="absolute inset-0 z-10 flex items-end" style={shouldReduceMotion ? undefined : { opacity: contentOpacity, filter: contentFilter, y: contentY }}>
        <div className="site-shell pb-24 md:pb-28">
          <div className="max-w-[700px] text-[#f3eee5]">
            <motion.p initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.7 }} className="mb-4 text-[13px] font-medium tracking-[-0.01em] text-[#f3eee5]/88 md:text-sm">
              {eyebrow}
            </motion.p>
            <motion.h1 initial={shouldReduceMotion ? false : { opacity: 0, y: 16, filter: "blur(9px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.27, duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="editorial-serif text-[clamp(3rem,4.5vw,4.75rem)] leading-[0.93] tracking-[-0.024em] text-[#f3eee5]">
              {title}
            </motion.h1>
            <motion.p initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="mt-5 max-w-[560px] text-[15px] leading-6 text-[#f3eee5]/74 md:text-base">
              {body}
            </motion.p>
            <motion.div initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }} className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })} className="liquid-cta inline-flex w-fit items-center gap-3 rounded-full px-6 py-3 text-[13px] font-medium">
                <span className="relative z-10">{consultation}</span><ArrowRight className="relative z-10 h-4 w-4" />
              </button>
              <a href="tel:+17148448494" className="text-[13px] text-[#f3eee5]/82 transition-opacity hover:opacity-70 md:text-sm">{call} (+1) 714-844-8494</a>
            </motion.div>
            <motion.p initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.58, duration: 0.7 }} className="mt-5 text-[13px] text-[#f3eee5]/62">
              {fee}
            </motion.p>

            <motion.a
              href={`${prefix}/attorney`}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.66, duration: 0.7 }}
              className="mt-7 flex w-fit items-center gap-3.5 border-t border-[#f3eee5]/18 pt-5 transition-opacity hover:opacity-75"
            >
              <img
                src={attorneyPortrait}
                alt="Howard Choi, California accident and personal injury attorney"
                loading="eager"
                decoding="async"
                className="h-11 w-11 shrink-0 rounded-full object-cover object-center"
              />
              <span className="text-[12px] leading-4 text-[#f3eee5]/82">
                <span className="block font-medium text-[#f3eee5]">Howard Choi</span>
                {ko ? "캘리포니아 변호사 · State Bar No. 284364 · 영어 및 한국어" : es ? "Abogado de California · State Bar No. 284364 · Inglés y coreano" : <>California Attorney · State Bar No. 284364 · English &amp; Korean</>}
              </span>
            </motion.a>
          </div>
        </div>
      </motion.div>

      <motion.div className="absolute inset-x-0 bottom-6 z-20" style={shouldReduceMotion ? undefined : { opacity: contentOpacity }}>
        <div className="site-shell flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className="h-px flex-1 overflow-hidden bg-[#f3eee5]/28"
              aria-label={ko ? `슬라이드 ${index + 1}로 이동` : es ? `Ir a la diapositiva ${index + 1}` : `Go to slide ${index + 1}`}
            >
              {index < currentSlide ? <div className="h-full w-full bg-[#f3eee5]" /> : null}
              {index === currentSlide ? (
                shouldReduceMotion ? (
                  <div className="h-full w-full bg-[#f3eee5]" />
                ) : (
                  <motion.div
                    key={`progress-${currentSlide}`}
                    className="h-full bg-[#f3eee5]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: SLIDE_DURATION_SECONDS, ease: "linear" }}
                    onAnimationComplete={nextSlide}
                  />
                )
              ) : null}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
