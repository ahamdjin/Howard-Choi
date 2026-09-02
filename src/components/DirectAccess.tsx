import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const DirectAccess = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="bg-[#171717] py-24 text-white md:py-32 lg:py-36">
      <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
        >
          <span className="mb-5 block text-[10px] uppercase tracking-[0.2em] text-white/45">The difference</span>
          <h2 className="editorial-serif mb-5 text-4xl leading-[0.95] md:text-5xl">Direct access.<br />No hand-offs.</h2>
          <p className="max-w-sm text-sm leading-6 text-white/58">Your matter stays close to the lawyer responsible for it. Fewer layers, clearer advice, faster decisions.</p>

          <div className="mt-12 grid max-w-sm grid-cols-2 gap-10 border-t border-white/12 pt-7">
            <div>
              <div className="editorial-serif text-3xl">1:1</div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/40">Partner access</div>
            </div>
            <div>
              <div className="editorial-serif text-3xl">04</div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/40">Core practice areas</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.85, delay: 0.08 }}
          className="ml-auto w-full max-w-xl overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1400&q=85"
            alt="Attorney portrait"
            className="aspect-[4/5] w-full object-cover grayscale-[20%]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default DirectAccess;
