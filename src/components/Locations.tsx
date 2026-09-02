import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
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

const PracticeCard = ({ practice }: { practice: (typeof practices)[number] }) => (
  <div className="group relative h-full overflow-hidden rounded-[3px] bg-[#181511]">
    <img
      src={practice.image}
      alt={practice.alt}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#15110d]/95 via-[#15110d]/20 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 p-6 text-[#f3eee5] md:p-7">
      <h3 className="editorial-serif mb-2 text-[clamp(1.85rem,2.4vw,2.35rem)] leading-none tracking-[-0.018em]">
        {practice.title}
      </h3>
      <p className="max-w-[300px] text-[13px] leading-5 text-[#f3eee5]/72">{practice.description}</p>
    </div>
  </div>
);

const Locations = () => {
  const ref = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const secondY = useTransform(scrollYProgress, [0.12, 0.34], ["112%", "0%"]);
  const thirdY = useTransform(scrollYProgress, [0.34, 0.58], ["112%", "0%"]);

  const firstLeft = useTransform(scrollYProgress, [0.69, 0.93], ["34%", "0%"]);
  const thirdLeft = useTransform(scrollYProgress, [0.69, 0.93], ["34%", "68%"]);

  const firstScale = useTransform(scrollYProgress, [0.12, 0.34, 0.69, 0.93], [1, 0.965, 0.965, 1]);
  const secondScale = useTransform(scrollYProgress, [0.34, 0.58, 0.69, 0.93], [1, 0.975, 0.975, 1]);

  const headerOpacity = useTransform(scrollYProgress, [0, 0.08, 0.93, 1], [0, 1, 1, 0.92]);
  const headerY = useTransform(scrollYProgress, [0, 0.08], [16, 0]);

  return (
    <section id="practice" ref={ref} className="relative bg-background lg:h-[290svh]">
      <div className="site-shell py-20 md:py-24 lg:hidden">
        <div className="mb-12 grid gap-8">
          <div>
            <span className="mb-5 block text-[13px] text-muted-foreground">Areas of Practice</span>
            <h2 className="editorial-serif max-w-[690px] text-[clamp(3rem,12vw,4.5rem)] leading-[0.93] tracking-[-0.02em]">
              Counsel across<br />every stage of growth.
            </h2>
          </div>
          <p className="max-w-[410px] text-[15px] leading-6 text-muted-foreground">
            Focused expertise across the matters that shape a growing business — from formation and transactions to disputes and ongoing counsel.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {practices.map((practice) => (
            <article key={practice.title} className="h-[430px]">
              <PracticeCard practice={practice} />
            </article>
          ))}
        </div>
      </div>

      <div className="sticky top-0 hidden h-[100svh] overflow-hidden lg:block">
        <div className="site-shell flex h-full flex-col justify-center py-[clamp(3rem,7vh,5.5rem)]">
          <motion.div
            style={shouldReduceMotion ? undefined : { opacity: headerOpacity, y: headerY }}
            className="mb-[clamp(2rem,4.5vh,3.7rem)] grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end"
          >
            <div>
              <span className="mb-5 block text-[13px] text-muted-foreground">Areas of Practice</span>
              <h2 className="editorial-serif max-w-[690px] text-[clamp(3rem,4.7vw,5rem)] leading-[0.93] tracking-[-0.02em]">
                Counsel across<br />every stage of growth.
              </h2>
            </div>
            <p className="max-w-[410px] text-[15px] leading-6 text-muted-foreground lg:pb-1">
              Focused expertise across the matters that shape a growing business — from formation and transactions to disputes and ongoing counsel.
            </p>
          </motion.div>

          <div className="relative h-[clamp(350px,50svh,520px)] w-full">
            <motion.article
              className="absolute inset-y-0 w-[32%] will-change-transform"
              style={
                shouldReduceMotion
                  ? { left: "0%" }
                  : { left: firstLeft, scale: firstScale, zIndex: 10 }
              }
            >
              <PracticeCard practice={practices[0]} />
            </motion.article>

            <motion.article
              className="absolute inset-y-0 left-[34%] w-[32%] will-change-transform"
              style={
                shouldReduceMotion
                  ? undefined
                  : { y: secondY, scale: secondScale, zIndex: 20 }
              }
            >
              <PracticeCard practice={practices[1]} />
            </motion.article>

            <motion.article
              className="absolute inset-y-0 w-[32%] will-change-transform"
              style={
                shouldReduceMotion
                  ? { left: "68%" }
                  : { left: thirdLeft, y: thirdY, zIndex: 30 }
              }
            >
              <PracticeCard practice={practices[2]} />
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;
