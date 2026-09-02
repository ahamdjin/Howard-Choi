import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, TreePine } from "lucide-react";
import heroImage from "@/assets/hero-camping.jpg";
import forestImage from "@/assets/spot-forest.jpg";
import lakeImage from "@/assets/spot-lake.jpg";
import meadowImage from "@/assets/spot-meadow.jpg";

const slides = [
  { image: heroImage, alt: "Off-grid camping in nature" },
  { image: forestImage, alt: "Forest camping spot" },
  { image: lakeImage, alt: "Lakeside retreat" },
  { image: meadowImage, alt: "Meadow camping experience" },
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

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  useEffect(() => {
    const updateViewportHeight = () => setViewportHeight(window.innerHeight || 900);
    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);

    return () => window.removeEventListener("resize", updateViewportHeight);
  }, []);

  useEffect(() => {
    const progressInterval = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }

        return prev + 100 / (SLIDE_DURATION / 50);
      });
    }, 50);

    return () => window.clearInterval(progressInterval);
  }, [nextSlide]);

  const transitionEnd = viewportHeight * 0.95;

  // Chambers-style scroll treatment: the whole hero image layer remains pinned
  // while the active carousel image gently pushes in and softens underneath the
  // following light section.
  const imageScale = useTransform(scrollY, [0, transitionEnd], [1, 1.075]);
  const imageFilter = useTransform(
    scrollY,
    [0, transitionEnd],
    ["blur(0px)", "blur(3.5px)"],
  );
  const imageY = useTransform(scrollY, [0, transitionEnd], ["0%", "-1.5%"]);
  const shadeOpacity = useTransform(scrollY, [0, transitionEnd], [0.3, 0.46]);

  const contentOpacity = useTransform(
    scrollY,
    [0, transitionEnd * 0.72],
    [1, 0],
  );
  const contentFilter = useTransform(
    scrollY,
    [0, transitionEnd * 0.72],
    ["blur(0px)", "blur(9px)"],
  );
  const contentY = useTransform(scrollY, [0, transitionEnd * 0.72], [0, -24]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Initial entrance treatment + scroll-linked treatment live on wrappers,
          so all four carousel images share the same zoom/blur behavior. */}
      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : { opacity: 0.72, scale: 1.045, filter: "blur(10px)" }
        }
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={
            shouldReduceMotion
              ? undefined
              : {
                  scale: imageScale,
                  filter: imageFilter,
                  y: imageY,
                }
          }
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
        style={shouldReduceMotion ? { opacity: 0.3 } : { opacity: shadeOpacity }}
      />

      <motion.div
        className="absolute bottom-20 left-6 z-10 text-white md:left-12 lg:left-16"
        style={
          shouldReduceMotion
            ? undefined
            : {
                opacity: contentOpacity,
                filter: contentFilter,
                y: contentY,
              }
        }
      >
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, y: 10, filter: "blur(8px)" }
          }
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.2, duration: 0.75, ease: "easeOut" }}
          className="mb-4"
        >
          <TreePine className="h-6 w-6 stroke-[1.5] text-white" />
        </motion.div>

        <motion.h1
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, y: 18, filter: "blur(10px)" }
          }
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-md flex-col text-left text-4xl font-light tracking-tight md:text-5xl lg:text-6xl"
        >
          <span>Disconnect</span>
          <span>to Reconnect</span>
        </motion.h1>

        <motion.button
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, y: 10, filter: "blur(6px)" }
          }
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.48, duration: 0.7, ease: "easeOut" }}
          onClick={() =>
            document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
          }
          className="mt-6 flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm tracking-wide text-foreground transition-colors hover:bg-white/90"
        >
          Book Now
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </motion.div>

      {/* Restore the original four-image timeline controls. They fade away with
          the hero copy as the white section moves over the pinned image. */}
      <motion.div
        className="absolute bottom-8 left-6 right-6 z-10 flex gap-2 md:left-12 md:right-12 lg:left-16 lg:right-16"
        style={shouldReduceMotion ? undefined : { opacity: contentOpacity }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            className="h-[2px] flex-1 cursor-pointer overflow-hidden bg-white/30"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{
                width:
                  index === currentSlide
                    ? `${progress}%`
                    : index < currentSlide
                      ? "100%"
                      : "0%",
              }}
            />
          </button>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
