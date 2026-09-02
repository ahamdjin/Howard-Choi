import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const Booking = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      id="booking"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#171717] py-20 text-white md:py-24"
    >
      <img
        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=82"
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-[0.18]"
      />
      <div className="absolute inset-0 -z-10 bg-black/60" />

      <div className="site-shell w-full">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="mx-auto max-w-[760px] text-center"
        >
          <span className="mb-5 block text-[12px] text-white/52">Start the conversation</span>
          <h2 className="editorial-serif text-[clamp(3rem,4.8vw,5.15rem)] leading-[0.96] tracking-[-0.025em]">
            Legal advice begins with the right conversation.
          </h2>
          <p className="mx-auto mt-6 max-w-[570px] text-[16px] leading-7 text-white/60">
            Share the outline of your matter. We’ll confirm fit, conflicts, and the best next step before anything moves forward.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:hello@howardchoilaw.com"
              className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-[13px] font-medium text-black transition-transform hover:scale-[1.015]"
            >
              Schedule a consultation
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="tel:+12125550148" className="text-[13px] text-white/68 hover:text-white">
              Or call (+1) 212 555 0148
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Booking;
