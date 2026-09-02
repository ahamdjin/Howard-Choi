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
  const imageScale = useTransform(scrollY, [0, transitionEnd], [1, 1.075]);
  const imageFilter = useTransform(scrollY, [0, transitionEnd], ["blur(0px)", "blur(3.5px)"]);
  const imageY = useTransform(scrollY, [0, transitionEnd], ["0%", "-1.5%"]);
  const shadeOpacity = useTransform(scrollY, [0, transitionEnd], [0.43, 0.56]);
  const contentOpacity = useTransform(scrollY, [0, transitionEnd * 0.72], [1, 0]);
  const contentFilter = useTransform(scrollY, [0, transitionEnd * 0.72], ["blur(0px)", "blur(9px)"]);
  const contentY = useTransform(scrollY, [0, transitionEnd * 0.72], [0, -24]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0.72, scale: 1.045, filter: "blur(10px)" }}
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
        style={shouldReduceMotion ? { opacity: 0.43 } : { opacity: shadeOpacity }}
      />

      <motion.div
        className="absolute bottom-20 left-6 z-10 max-w-3xl text-white md:left-12 lg:left-16"
        style={shouldReduceMotion ? undefined : { opacity: contentOpacity, filter: contentFilter, y: contentY }}
      >
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mb-5 text-sm font-medium tracking-[-0.01em] text-white/90 md:text-base"
        >
          Business &amp; Litigation Counsel
        </motion.p>

        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="editorial-serif max-w-3xl text-4xl font-normal leading-[1.02] tracking-[-0.035em] sm:text-5xl md:text-6xl lg:text-[4.4rem]"
        >
          Discreet counsel for high-stakes matters.
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44, duration: 0.7 }}
          className="mt-5 max-w-xl text-base font-light leading-7 text-white/78 md:text-lg"
        >
          Corporate, litigation, and regulatory counsel for founders and businesses when the decisions cannot wait.
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.54, duration: 0.7 }}
          className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <button
            onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.02]"
          >
            Schedule a Consultation
            <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href="tel:+12125550148"
            className="text-sm text-white/88 transition-opacity hover:opacity-70 md:text-base"
          >
            Or call (+1) 212 555 0148
          </a>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.66, duration: 0.7 }}
          className="mt-8 flex items-center gap-4"
        >
          <div className="flex -space-x-2.5">
            {reviewAvatars.map((avatar, index) => (
              <img
                key={avatar}
                src={avatar}
                alt={`Client review ${index + 1}`}
                className="h-10 w-10 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
          <div>
            <div className="text-[15px] leading-none tracking-[0.12em] text-white">★★★★★</div>
            <p className="mt-1 text-sm text-white/78">4.9/5 from 120+ client reviews</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-7 left-6 right-6 z-10 flex gap-2 md:left-12 md:right-12 lg:left-16 lg:right-16"
        style={shouldReduceMotion ? undefined : { opacity: contentOpacity }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              setCurrentSlide(index);
              setProgress(0);
            }}
            className="h-[2px] flex-1 overflow-hidden bg-white/25"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{ width: index === currentSlide ? `${progress}%` : index < currentSlide ? "100%" : "0%" }}
            />
          </button>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
