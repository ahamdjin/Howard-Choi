import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import heroCityBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroCourthouse from "@/assets/law-firm/hero-courthouse.webp";
import heroJusticeLibrary from "@/assets/law-firm/hero-justice-library.webp";
import heroLawOffice from "@/assets/law-firm/hero-law-office.webp";

const slides = [
  { image: heroJusticeLibrary, alt: "Lady Justice in a private law library" },
  { image: heroCityBoardroom, alt: "Law firm boardroom overlooking the city" },
  { image: heroLawOffice, alt: "Traditional law office and desk" },
  { image: heroCourthouse, alt: "Courthouse interior" },
];

const Hero = () => {
  const reduceMotion = useReducedMotion();
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = useCallback(() => setCurrentSlide((value) => (value + 1) % slides.length), []);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setTimeout(nextSlide, 6500);
    return () => window.clearTimeout(timer);
  }, [currentSlide, nextSlide, reduceMotion]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#17130f] text-[#f7f3ec]">
      <AnimatePresence mode="sync" initial={false}>
        <motion.img
          key={currentSlide}
          src={slides[currentSlide].image}
          alt={slides[currentSlide].alt}
          loading="eager"
          decoding="async"
          fetchPriority={currentSlide === 0 ? "high" : "auto"}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      <div className="site-shell relative z-10 flex min-h-[100svh] items-end pb-14 pt-36 md:pb-16 lg:pt-40">
        <div className="w-full">
          <div className="max-w-[760px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/72">Buena Park · California personal injury</p>
            <h1 className="editorial-serif mt-5 text-[clamp(3.15rem,7vw,6.8rem)] leading-[0.88] tracking-[-0.045em] text-white">
              Injury law,<br />with you all the way.
            </h1>
            <p className="mt-6 max-w-[560px] text-[15px] leading-7 text-white/74 md:text-[17px]">
              Clear guidance after an accident—from the first insurance call to the decisions that shape your recovery.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="/contact" className="inline-flex min-h-12 w-fit items-center gap-3 bg-white px-6 text-[12px] font-semibold text-[#171717] transition-transform hover:-translate-y-0.5">
                Free Consultation <ArrowRight className="h-4 w-4" />
              </a>
              <a href="tel:+17146900007" className="inline-flex min-h-12 w-fit items-center gap-2 px-1 text-[12px] font-medium text-white/88">
                <Phone className="h-4 w-4" /> 714-690-0007
              </a>
            </div>
          </div>

          <div className="mt-12 grid max-w-[780px] grid-cols-1 gap-px border-y border-white/20 bg-white/20 sm:grid-cols-3">
            {[
              ["California", "Attorney"],
              ["English + Korean", "Communication"],
              ["Free", "Case Review"],
            ].map(([value, label]) => (
              <div key={label} className="bg-black/20 px-5 py-4 backdrop-blur-sm">
                <div className="text-[14px] font-semibold text-white">{value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/52">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 right-5 z-20 hidden gap-1.5 sm:flex">
        {slides.map((_, index) => (
          <button key={index} type="button" onClick={() => setCurrentSlide(index)} aria-label={`Show hero image ${index + 1}`} className={`h-1.5 rounded-full transition-all ${index === currentSlide ? "w-8 bg-white" : "w-1.5 bg-white/45 hover:bg-white/70"}`} />
        ))}
      </div>
    </section>
  );
};

export default Hero;
