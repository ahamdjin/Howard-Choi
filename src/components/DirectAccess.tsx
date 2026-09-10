import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import leadCounselImage from "@/assets/law-firm/lead-counsel.avif";

const DirectAccess = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="flex min-h-[100svh] items-center bg-[#171717] py-16 text-white md:py-20 lg:py-0">
      <div className="site-shell grid w-full gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="lg:py-10"
        >
          <span className="mb-5 block text-[10px] uppercase tracking-[0.2em] text-white/42">The difference</span>
          <h2 className="editorial-serif text-[clamp(2.7rem,12vw,5rem)] leading-[0.93] text-white">
            Direct access.<br />No hand-offs.
          </h2>
          <p className="mt-6 max-w-[430px] text-[14px] leading-6 text-white/58 md:text-[15px]">
            Your injury claim stays close to the attorney responsible for it. Fewer layers, clearer answers, and a more direct understanding of what happens next.
          </p>

          <div className="mt-10 grid max-w-[420px] grid-cols-2 gap-6 border-t border-white/12 pt-6 sm:mt-14 sm:gap-10 sm:pt-7">
            <div>
              <div className="editorial-serif text-[2.35rem] leading-none sm:text-[2.7rem]">1:1</div>
              <div className="mt-2 text-[9px] uppercase tracking-[0.16em] text-white/38 sm:text-[10px]">Direct attorney access</div>
            </div>
            <div>
              <div className="editorial-serif text-[2.35rem] leading-none sm:text-[2.7rem]">08</div>
              <div className="mt-2 text-[9px] uppercase tracking-[0.16em] text-white/38 sm:text-[10px]">Injury practice areas</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.08 }}
          className="ml-auto w-full overflow-hidden rounded-[2px] lg:h-[72svh] lg:max-h-[760px] lg:min-h-[560px]"
        >
          <img
            src={leadCounselImage}
            alt="Attorney in the office"
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] h-full w-full object-cover object-center grayscale-[15%] sm:aspect-[16/10] lg:aspect-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default DirectAccess;
