import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import commercialLitigationImage from "@/assets/law-firm/practice-commercial-litigation.webp";
import corporateLawImage from "@/assets/law-firm/practice-corporate-law.webp";
import regulatoryComplianceImage from "@/assets/law-firm/practice-regulatory-compliance.webp";

const practices = [
  {
    title: "Corporate Law",
    description: "Day-to-day counsel, contracts, governance, and strategic support for growing companies.",
    image: corporateLawImage,
    alt: "Attorney reviewing a corporate agreement",
  },
  {
    title: "Commercial Litigation",
    description: "Clear, decisive representation when business disputes become high-stakes.",
    image: commercialLitigationImage,
    alt: "Commercial litigation counsel reviewing a case file",
  },
  {
    title: "Regulatory & Compliance",
    description: "Practical guidance through complex obligations, risk, and regulatory change.",
    image: regulatoryComplianceImage,
    alt: "Legal advisers discussing a regulatory matter",
  },
];

const Locations = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="practice" ref={ref} className="flex min-h-[100svh] items-center bg-background py-20 md:py-24 lg:py-28">
      <div className="site-shell w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="mb-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end"
        >
          <div>
            <span className="mb-5 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Areas of Practice</span>
            <h2 className="editorial-serif max-w-[690px] text-[clamp(3rem,4.7vw,5rem)] leading-[0.93]">
              Counsel across<br />every stage of growth.
            </h2>
          </div>
          <p className="max-w-[410px] text-[15px] leading-6 text-muted-foreground lg:pb-1">
            Focused expertise across the matters that shape a growing business — from formation and transactions to disputes and ongoing counsel.
          </p>
        </motion.div>

        <div className="grid gap-3 md:grid-cols-3">
          {practices.map((practice, index) => (
            <motion.article
              key={practice.title}
              initial={{ opacity: 0, y: 26 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.09 }}
              className="group relative min-h-[360px] overflow-hidden rounded-[2px] bg-neutral-900 md:min-h-[400px] lg:min-h-[430px]"
            >
              <img
                src={practice.image}
                alt={practice.alt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/5" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-7">
                <h3 className="editorial-serif mb-2 text-[2rem] leading-none">{practice.title}</h3>
                <p className="max-w-[300px] text-[13px] leading-5 text-white/72">{practice.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
