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
    points: ["Formation & governance", "Commercial agreements", "Strategic transactions"],
  },
  {
    title: "Commercial Litigation",
    description: "Clear, decisive representation when business disputes become high-stakes.",
    image: commercialLitigationImage,
    alt: "Commercial litigation counsel reviewing a case file",
    points: ["Business disputes", "Pre-litigation strategy", "High-stakes proceedings"],
  },
  {
    title: "Regulatory & Compliance",
    description: "Practical guidance through complex obligations, risk, and regulatory change.",
    image: regulatoryComplianceImage,
    alt: "Legal advisers discussing a regulatory matter",
    points: ["Regulatory strategy", "Risk & compliance", "Government-facing matters"],
  },
];

const FeatureCard = ({
  practice,
  index,
}: {
  practice: (typeof practices)[number];
  index: number;
}) => (
  <div className="grid h-full overflow-hidden rounded-[4px] bg-[#e8e4de] shadow-[0_24px_70px_rgba(29,24,19,0.14)] lg:grid-cols-[1.55fr_0.85fr]">
    <div className="relative min-h-[330px] overflow-hidden lg:min-h-0">
      <img src={practice.image} alt={practice.alt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[#17130f]/10" />
    </div>

    <div className="flex flex-col justify-between px-8 py-8 text-[#211c17] xl:px-10 xl:py-10">
      <div>
        <div className="mb-8 text-[12px] tracking-[0.1em] text-[#211c17]/45">0{index + 1}</div>
        <h3 className="editorial-serif max-w-[300px] text-[clamp(2.7rem,4vw,4.5rem)] leading-[0.9] tracking-[-0.025em]">
          {practice.title}
        </h3>
        <p className="mt-6 max-w-[310px] text-[15px] leading-6 text-[#211c17]/68">{practice.description}</p>
      </div>

      <div className="mt-8 border-t border-[#211c17]/14 pt-5">
        {practice.points.map((point) => (
          <div key={point} className="flex items-center justify-between border-b border-[#211c17]/10 py-2.5 text-[13px] text-[#211c17]/68 last:border-b-0">
            <span>{point}</span>
            <span className="text-[#211c17]/35">↗</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const OverviewCard = ({ practice }: { practice: (typeof practices)[number] }) => (
  <div className="group relative h-full overflow-hidden rounded-[3px] bg-[#181511]">
    <img
      src={practice.image}
      alt={practice.alt}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#15110d]/95 via-[#15110d]/18 to-transparent" />
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

  const secondY = useTransform(scrollYProgress, [0.12, 0.32], ["112%", "0%"]);
  const thirdY = useTransform(scrollYProgress, [0.34, 0.54], ["112%", "0%"]);

  const firstScale = useTransform(scrollYProgress, [0.12, 0.32, 0.34, 0.54], [1, 0.97, 0.97, 0.945]);
  const firstY = useTransform(scrollYProgress, [0.12, 0.32, 0.54], [0, -18, -34]);
  const secondScale = useTransform(scrollYProgress, [0.34, 0.54], [1, 0.97]);
  const secondLift = useTransform(scrollYProgress, [0.34, 0.54], [0, -18]);

  const featureOpacity = useTransform(scrollYProgress, [0.64, 0.76], [1, 0]);
  const featureScale = useTransform(scrollYProgress, [0.64, 0.76], [1, 0.965]);

  const overviewOpacity = useTransform(scrollYProgress, [0.72, 0.86], [0, 1]);
  const overviewY = useTransform(scrollYProgress, [0.72, 0.86], [30, 0]);

  return (
    <section id="practice" ref={ref} className="relative bg-background lg:h-[340svh]">
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

        <div className="grid gap-3">
          {practices.map((practice) => (
            <article key={practice.title} className="h-[430px]">
              <OverviewCard practice={practice} />
            </article>
          ))}
        </div>
      </div>

      <div className="sticky top-0 hidden h-[100svh] overflow-hidden lg:block">
        <motion.div
          className="absolute inset-0 flex items-center"
          style={shouldReduceMotion ? undefined : { opacity: featureOpacity, scale: featureScale }}
        >
          <div className="site-shell relative h-[min(66svh,650px)] min-h-[500px]">
            <motion.article
              className="absolute inset-0 will-change-transform"
              style={shouldReduceMotion ? undefined : { scale: firstScale, y: firstY, zIndex: 10 }}
            >
              <FeatureCard practice={practices[0]} index={0} />
            </motion.article>

            <motion.article
              className="absolute inset-0 will-change-transform"
              style={shouldReduceMotion ? undefined : { y: secondY, scale: secondScale, x: 0, zIndex: 20 }}
            >
              <motion.div style={shouldReduceMotion ? undefined : { y: secondLift }} className="h-full">
                <FeatureCard practice={practices[1]} index={1} />
              </motion.div>
            </motion.article>

            <motion.article
              className="absolute inset-0 will-change-transform"
              style={shouldReduceMotion ? undefined : { y: thirdY, zIndex: 30 }}
            >
              <FeatureCard practice={practices[2]} index={2} />
            </motion.article>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center"
          style={shouldReduceMotion ? undefined : { opacity: overviewOpacity, y: overviewY }}
        >
          <div className="site-shell w-full py-[clamp(3rem,6vh,5rem)]">
            <div className="mb-[clamp(2rem,4vh,3.5rem)] grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <span className="mb-5 block text-[13px] text-muted-foreground">Areas of Practice</span>
                <h2 className="editorial-serif max-w-[690px] text-[clamp(3rem,4.7vw,5rem)] leading-[0.93] tracking-[-0.02em]">
                  Counsel across<br />every stage of growth.
                </h2>
              </div>
              <p className="max-w-[410px] text-[15px] leading-6 text-muted-foreground lg:pb-1">
                Focused expertise across the matters that shape a growing business — from formation and transactions to disputes and ongoing counsel.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {practices.map((practice, index) => (
                <motion.article
                  key={practice.title}
                  className="h-[min(44svh,460px)] min-h-[360px]"
                  initial={false}
                  style={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: useTransform(overviewOpacity, [0, 1], [22 + index * 8, 0]),
                        }
                  }
                >
                  <OverviewCard practice={practice} />
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Locations;
