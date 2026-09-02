import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Testimonial = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section ref={ref} className="bg-background py-28 md:py-36 lg:py-44">
      <div className="container mx-auto px-6 text-center lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="mx-auto max-w-3xl"
        >
          <div className="mb-5 text-xs tracking-[0.35em]">★★★★★</div>
          <blockquote className="editorial-serif text-3xl leading-[1.08] text-foreground/70 md:text-4xl lg:text-5xl">
            “Measured advice, commercial clarity, and absolute discretion through a complex cross-border transaction.”
          </blockquote>
          <p className="mt-7 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Private client · Business owner</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;
