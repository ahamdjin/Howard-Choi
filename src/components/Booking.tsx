import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const Booking = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section id="booking" ref={ref} className="relative isolate overflow-hidden bg-[#171717] py-28 text-white md:py-36 lg:py-44">
      <img
        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=80"
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 -z-10 bg-black/55" />

      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mb-5 block text-[10px] uppercase tracking-[0.2em] text-white/45">Start the conversation</span>
          <h2 className="editorial-serif text-4xl leading-[1.02] md:text-5xl lg:text-6xl">Legal advice begins with the right conversation.</h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-white/60">Share the outline of your matter. We’ll confirm fit, conflicts, and the best next step before anything moves forward.</p>
          <a
            href="mailto:hello@howardchoilaw.com"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs uppercase tracking-[0.12em] text-black transition-transform hover:scale-[1.02]"
          >
            Schedule a consultation
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Booking;
