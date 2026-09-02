import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import leadCounselImage from "@/assets/law-firm/lead-counsel.avif";

const DirectAccess = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="flex min-h-[100svh] items-center bg-[#171717] py-16 text-white md:py-20 lg:py-0">
      <div className="site-shell grid w-full gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="lg:py-10"
        >
          <span className="mb-5 block text-[10px] uppercase tracking-[0.2em] text-white/42">The difference</span>
          <h2 className="editorial-serif text-[clamp(3rem,4.6vw,5rem)] leading-[0.91] text-white">
            Direct access.<br />No hand-offs.
          </h2>
          <p className="mt-6 max-w-[430px] text-[15px] leading-6 text-white/58">
            Your matter stays close to the lawyer responsible for it. Fewer layers, clearer advice, and faster decisions when timing matters.
          </p>

          <div className="mt-14 grid max-w-[420px] grid-cols-2 gap-10 border-t border-white/12 pt-7">
            <div>
              <div className="editorial-serif text-[2.7rem] leading-none">1:1</div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/38">Partner access</div>
            </div>
            <div>
              <div className="editorial-serif text-[2.7rem] leading-none">04</div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/38">Core practice areas</div>
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
            alt="Lead counsel in her office"
            className="aspect-[4/5] h-full w-full object-cover object-center grayscale-[15%] lg:aspect-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default DirectAccess;
