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
              className="liquid-cta inline-flex items-center gap-3 rounded-full px-6 py-3 text-[13px] font-medium"
            >
              <span className="relative z-10">Schedule a consultation</span>
              <ArrowRight className="relative z-10 h-4 w-4" />
            </a>
            <a href="tel:+17146900007" className="text-[13px] text-white/68 hover:text-white">
              Or call (+1) 714-690-0007
            </a>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=6301+Beach+Blvd%2C+Buena+Park%2C+CA+90621"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block text-[12px] text-white/42 transition-colors hover:text-white/68"
          >
            6301 Beach Blvd, Buena Park, CA 90621
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Booking;
