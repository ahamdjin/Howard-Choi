import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
          <span className="mb-5 block text-[10px] uppercase tracking-[0.2em] text-white/42">
            Howard Choi
          </span>

          <h2 className="editorial-serif text-[clamp(3rem,4.6vw,5rem)] leading-[0.91] text-white">
            Personal injury attorney.<br />
            <span className="text-white/48">Based in Buena Park.</span>
          </h2>

          <p className="mt-6 max-w-[500px] text-[15px] leading-6 text-white/58">
            Howard Choi handles personal injury matters from the firm&apos;s Buena Park office, with a focus on clear communication, careful preparation, and keeping clients informed at each stage.
          </p>

          <div className="mt-10 grid max-w-[500px] grid-cols-2 border-y border-white/12">
            <div className="py-6 pr-6 sm:border-r sm:border-white/12">
              <div className="editorial-serif text-[2.25rem] leading-none">284364</div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.16em] text-white/38">California Bar No.</div>
            </div>
            <div className="border-t border-white/12 py-6 sm:border-t-0 sm:pl-6">
              <div className="editorial-serif text-[2.25rem] leading-none">EN / KO</div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.16em] text-white/38">English & Korean</div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/attorney"
              className="inline-flex min-h-11 items-center gap-2 bg-[#f3eee5] px-5 py-3 text-[11px] font-medium text-[#17130f]"
            >
              View Attorney Profile <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 border border-white/18 px-5 py-3 text-[11px] font-medium text-white/82"
            >
              State Bar Profile <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[9px] uppercase tracking-[0.15em] text-white/34">
            <span>Free Consultation</span>
            <span>Contingency Fee Representation</span>
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
            alt="Howard Choi, California personal injury attorney"
            className="aspect-[4/5] h-full w-full object-cover object-center grayscale-[15%] lg:aspect-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default DirectAccess;
