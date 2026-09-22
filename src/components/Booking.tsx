import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone } from "lucide-react";
import WebsiteInquiryForm from "@/components/WebsiteInquiryForm";
import { brand } from "@/data/injurySite";

// The form is the shared WebsiteInquiryForm, which relies on HighLevel External
// Tracking reading the DOM on submit. That script only loads on paths listed in
// `externalFormPage` in src/routes/__root.tsx; "/" must stay in that list.
const Booking = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="booking"
      ref={ref}
      className="relative isolate overflow-hidden bg-[#171717] py-20 text-white md:py-24"
    >
      <img
        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=82"
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-[0.18]"
      />
      <div className="absolute inset-0 -z-10 bg-black/65" />

      <div className="site-shell">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:gap-20"
        >
          <div>
            <span className="mb-5 block text-[10px] uppercase tracking-[0.18em] text-white/48">
              Start the conversation
            </span>
            <h2 className="editorial-serif text-[clamp(2.6rem,4.4vw,4.6rem)] leading-[0.95] tracking-[-0.032em]">
              Tell us what happened.
            </h2>
            <p className="mt-6 max-w-[520px] text-[15px] leading-7 text-white/60">
              Share the accident date and location, your current treatment, and the questions you need answered.
              Consultations are free, and representation is available on a contingency-fee basis, with no attorney fee unless
              there is a recovery.
            </p>

            <div className="mt-10 space-y-5 border-t border-white/12 pt-8">
              <a href={brand.phoneHref} className="group flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/18 transition-colors group-hover:border-white/45">
                  <Phone className="h-4 w-4" strokeWidth={1.6} />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-white/42">Call directly</span>
                  <span className="text-[15px] text-white transition-opacity group-hover:opacity-75">
                    {brand.phoneDisplay}
                  </span>
                </span>
              </a>
              <a
                href="https://share.google/LBJ1C8zWrZFjJBkVe"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/18 transition-colors group-hover:border-white/45">
                  <MapPin className="h-4 w-4" strokeWidth={1.6} />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-white/42">Office</span>
                  <span className="text-[14px] leading-5 text-white/82 transition-opacity group-hover:opacity-60">
                    {brand.address}
                  </span>
                </span>
              </a>
            </div>
          </div>

          <div className="rounded-[3px] bg-[#f7f6f3] p-6 text-foreground shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8">
            <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/38">Free consultation</div>
            <h3 className="editorial-serif mt-3 text-[clamp(1.5rem,2vw,1.95rem)] leading-[1.1] tracking-[-0.02em]">
              Request a callback.
            </h3>
            <WebsiteInquiryForm locale="en" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Booking;
