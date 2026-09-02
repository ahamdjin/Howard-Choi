import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=88",
    alt: "Legal documents on a desk",
  },
  {
    image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1800&q=88",
    alt: "Business handshake",
  },
  {
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=88",
    alt: "Professional team meeting",
  },
  {
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=88",
    alt: "Modern professional office",
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
    <section className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-black">
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
        className="absolute inset-0 bg-black"
        style={shouldReduceMotion ? { opacity: 0.42 } : { opacity: shadeOpacity }}
      />

      <motion.div
        className="absolute inset-0 z-10 flex items-end"
        style={shouldReduceMotion ? undefined : { opacity: contentOpacity, filter: contentFilter, y: contentY }}
      >
        <div className="site-shell pb-24 md:pb-28">
          <div className="max-w-[680px]">
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.7 }}
              className="mb-4 text-[13px] font-medium tracking-[-0.01em] text-white/90 md:text-sm"
            >
              Business &amp; Litigation Counsel
            </motion.p>

            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16, filter: "blur(9px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.27, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="editorial-serif text-[clamp(3.35rem,5.2vw,5.35rem)] leading-[0.91] text-white"
            >
              Discreet counsel for high-stakes matters.
            </motion.h1>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mt-5 max-w-[560px] text-[15px] font-light leading-6 text-white/76 md:text-base"
            >
              Corporate, litigation, and regulatory counsel for founders and businesses when the decisions cannot wait.
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <button
                onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3 text-[13px] font-medium text-black transition-transform duration-300 hover:scale-[1.015]"
              >
                Schedule a Consultation
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="tel:+12125550148"
                className="text-[13px] text-white/84 transition-opacity hover:opacity-70 md:text-sm"
              >
                Or call (+1) 212 555 0148
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
                    className="h-9 w-9 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="text-[13px] leading-none tracking-[0.12em] text-white">★★★★★</div>
                <p className="mt-1 text-[12px] text-white/72">4.9/5 from 120+ client reviews</p>
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
              className="h-px flex-1 overflow-hidden bg-white/30"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
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
