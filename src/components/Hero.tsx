import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroCityBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroCourthouse from "@/assets/law-firm/hero-courthouse.webp";
import heroJusticeLibrary from "@/assets/law-firm/hero-justice-library.webp";
import heroLawOffice from "@/assets/law-firm/hero-law-office.webp";

const slides = [
  {
    image: heroJusticeLibrary,
    alt: "Lady Justice in a private law library",
  },
  {
    image: heroCityBoardroom,
    alt: "Law firm boardroom overlooking the city",
  },
  {
    image: heroLawOffice,
    alt: "Traditional law office and desk",
  },
  {
    image: heroCourthouse,
    alt: "Courthouse interior",
  },
];

const reviewAvatars = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
];

const SLIDE_DURATION = 5000;

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [viewportHeight, setViewportHeight] = useState(900);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
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
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 100 / (SLIDE_DURATION / 50);
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
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={shouldReduceMotion ? undefined : { scale: imageScale, filter: imageFilter, y: imageY }}
        >
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

      <motion.div
        className="absolute inset-0 bg-[#17130f]"
        style={shouldReduceMotion ? { opacity: 0.42 } : { opacity: shadeOpacity }}
      />

      <motion.div
        className="absolute inset-0 z-10 flex items-end"
        style={shouldReduceMotion ? undefined : { opacity: contentOpacity, filter: contentFilter, y: contentY }}
      >
        <div className="site-shell pb-24 md:pb-28">
          <div className="max-w-[700px] text-[#f3eee5]">
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.7 }}
              className="mb-4 text-[13px] font-medium tracking-[-0.01em] text-[#f3eee5]/88 md:text-sm"
            >
              Accident &amp; Injury Counsel
            </motion.p>

            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16, filter: "blur(9px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.27, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="editorial-serif text-[clamp(3rem,4.5vw,4.75rem)] leading-[0.93] tracking-[-0.024em] text-[#f3eee5]"
            >
              Accident attorney in Buena Park.
            </motion.h1>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mt-5 max-w-[560px] text-[15px] leading-6 text-[#f3eee5]/74 md:text-base"
            >
              Clear, responsive legal representation for people injured in accidents in Buena Park and across Orange County.
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <button
                onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                className="liquid-cta inline-flex w-fit items-center gap-3 rounded-full px-6 py-3 text-[13px] font-medium"
              >
                <span className="relative z-10">Schedule a Consultation</span>
                <ArrowRight className="relative z-10 h-4 w-4" />
              </button>
              <a
                href="tel:+17146900007"
                className="text-[13px] text-[#f3eee5]/82 transition-opacity hover:opacity-70 md:text-sm"
              >
                Or call (+1) 714-690-0007
              </a>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.7 }}
              className="mt-7 flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {reviewAvatars.map((avatar, index) => (
                  <img
                    key={avatar}
                    src={avatar}
                    alt={`Client review ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full border-2 border-[#f3eee5] object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="text-[13px] leading-none tracking-[0.12em] text-[#f3eee5]">★★★★★</div>
                <p className="mt-1 text-[12px] text-[#f3eee5]/70">4.9/5 from 120+ client reviews</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-6 z-20"
        style={shouldReduceMotion ? undefined : { opacity: contentOpacity }}
      >
        <div className="site-shell flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                setCurrentSlide(index);
                setProgress(0);
              }}
              className="h-px flex-1 overflow-hidden bg-[#f3eee5]/28"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className="h-full bg-[#f3eee5] transition-all duration-100 ease-linear"
                style={{ width: index === currentSlide ? `${progress}%` : index < currentSlide ? "100%" : "0%" }}
              />
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
