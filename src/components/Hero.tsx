import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, TreePine } from "lucide-react";
import heroImage from "@/assets/hero-camping.jpg";

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [viewportHeight, setViewportHeight] = useState(900);

  useEffect(() => {
    const updateViewportHeight = () => setViewportHeight(window.innerHeight || 900);
    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);

    return () => window.removeEventListener("resize", updateViewportHeight);
  }, []);

  const transitionEnd = viewportHeight * 0.95;

  // Chambers-style scroll treatment: the hero stays pinned while the image
  // subtly pushes in and softens, then the copy gently disappears before the
  // following light section scrolls over the top of it.
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
      {/* Entrance blur/zoom + scroll-linked push-in. The nested layers let the
          initial animation and the scroll animation combine cleanly. */}
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
        <motion.img
          src={heroImage}
          alt="Off-grid camping in nature"
          className="h-full w-full object-cover will-change-transform"
          style={
            shouldReduceMotion
              ? undefined
              : {
                  scale: imageScale,
                  filter: imageFilter,
                  y: imageY,
                }
          }
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-black"
        style={shouldReduceMotion ? { opacity: 0.3 } : { opacity: shadeOpacity }}
      />

      {/* The content gets a soft blur on load, then blurs/fades out as the
          next section approaches — intentionally restrained, not theatrical. */}
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

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        className="absolute bottom-8 right-6 z-10 hidden items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-white/75 sm:flex md:right-12 lg:right-16"
        style={shouldReduceMotion ? undefined : { opacity: contentOpacity }}
      >
        <span>Scroll</span>
        <span className="h-px w-10 bg-white/50" />
      </motion.div>
    </section>
  );
};

export default Hero;
