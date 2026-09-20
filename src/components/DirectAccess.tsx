import { motion, useInView } from "framer-motion";
import { ArrowUpRight, BadgeCheck, Languages } from "lucide-react";
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
            Meet the Attorney
          </span>

          <h2 className="editorial-serif text-[clamp(3rem,4.6vw,5rem)] leading-[0.91] text-white">
            Howard Choi.<br />
            <span className="text-white/52">Personal injury counsel.</span>
          </h2>

          <p className="mt-6 max-w-[500px] text-[15px] leading-6 text-white/58">
            Howard Choi is a California attorney representing people and families in personal injury matters from the firm&apos;s Buena Park office. The firm serves clients across nearby Orange and Los Angeles County communities, with consultations available in English and Korean.
          </p>

          <div className="mt-10 max-w-[500px] border-t border-white/12">
            <div className="grid sm:grid-cols-2">
              <div className="border-b border-white/10 py-5 sm:border-b-0 sm:border-r sm:pr-6">
                <BadgeCheck className="h-4 w-4 text-white/46" />
                <div className="mt-3 text-[12px] font-medium text-white/86">California State Bar</div>
                <div className="mt-1 text-[11px] leading-5 text-white/42">Bar No. 284364</div>
              </div>
              <div className="py-5 sm:pl-6">
                <Languages className="h-4 w-4 text-white/46" />
                <div className="mt-3 text-[12px] font-medium text-white/86">Languages</div>
                <div className="mt-1 text-[11px] leading-5 text-white/42">English & Korean</div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/attorney"
              className="inline-flex min-h-11 w-fit items-center gap-2 bg-[#f3eee5] px-5 py-3 text-[12px] font-medium text-[#17130f] transition-opacity hover:opacity-85"
            >
              View Attorney Profile <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 w-fit items-center gap-2 border border-white/20 px-5 py-3 text-[12px] font-medium text-white/82 transition-colors hover:border-white/38 hover:text-white"
            >
              Verify State Bar <ArrowUpRight className="h-4 w-4" />
            </a>
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
            alt="Personal injury attorney at the Buena Park law office"
            className="aspect-[4/5] h-full w-full object-cover object-center grayscale-[15%] lg:aspect-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default DirectAccess;
