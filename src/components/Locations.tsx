import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
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

type Practice = (typeof practices)[number];

type MorphCardProps = {
  practice: Practice;
  index: number;
  columns?: MotionValue<string>;
  detailOpacity?: MotionValue<number>;
  overlayOpacity?: MotionValue<number>;
};

const MorphCard = ({ practice, index, columns, detailOpacity, overlayOpacity }: MorphCardProps) => (
  <motion.div
    className="relative grid h-full overflow-hidden rounded-[4px] bg-[#e8e4de] shadow-[0_24px_70px_rgba(29,24,19,0.14)]"
    style={columns ? { gridTemplateColumns: columns } : undefined}
  >
    <div className="relative min-w-0 overflow-hidden">
      <img src={practice.image} alt={practice.alt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#15110d]/74 via-[#17130f]/7 to-transparent" />

      <motion.div
        className="absolute inset-x-0 bottom-0 z-10 p-6 text-[#f3eee5] md:p-7"
        style={overlayOpacity ? { opacity: overlayOpacity } : { opacity: 1 }}
      >
        <div className="mb-2 text-[10px] tracking-[0.12em] text-[#f3eee5]/55">0{index + 1}</div>
        <h3 className="editorial-serif text-[clamp(1.8rem,2.35vw,2.35rem)] leading-[0.96] tracking-[-0.018em]">
          {practice.title}
        </h3>
        <p className="mt-2 max-w-[310px] text-[13px] leading-5 text-[#f3eee5]/72">{practice.description}</p>
      </motion.div>
    </div>

    <motion.div
      className="min-w-0 overflow-hidden bg-[#e8e4de]"
      style={detailOpacity ? { opacity: detailOpacity } : undefined}
    >
      <div className="flex h-full min-w-[290px] flex-col justify-between px-8 py-8 text-[#211c17] xl:px-10 xl:py-10">
        <div>
          <div className="mb-8 text-[12px] tracking-[0.1em] text-[#211c17]/45">0{index + 1}</div>
          <h3 className="editorial-serif max-w-[300px] text-[clamp(2.7rem,4vw,4.5rem)] leading-[0.9] tracking-[-0.025em]">
            {practice.title}
          </h3>
          <p className="mt-6 max-w-[310px] text-[15px] leading-6 text-[#211c17]/68">{practice.description}</p>
        </div>

        <div className="mt-8 border-t border-[#211c17]/14 pt-5">
          {practice.points.map((point) => (
            <div
              key={point}
              className="flex items-center justify-between border-b border-[#211c17]/10 py-2.5 text-[13px] text-[#211c17]/68 last:border-b-0"
            >
              <span>{point}</span>
              <span className="text-[#211c17]/35">↗</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const MobileCard = ({ practice, index }: { practice: Practice; index: number }) => (
  <div className="relative h-full overflow-hidden rounded-[3px] bg-[#181511]">
    <img src={practice.image} alt={practice.alt} className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#15110d]/95 via-[#15110d]/18 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 p-6 text-[#f3eee5]">
      <div className="mb-2 text-[10px] tracking-[0.12em] text-[#f3eee5]/55">0{index + 1}</div>
      <h3 className="editorial-serif text-[2rem] leading-none">{practice.title}</h3>
      <p className="mt-2 max-w-[300px] text-[13px] leading-5 text-[#f3eee5]/72">{practice.description}</p>
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

  // Story phase: cards arrive one over another.
  const firstTop = useTransform(scrollYProgress, [0, 0.32, 0.54, 0.64, 0.9], ["17%", "14%", "12%", "17%", "43%"]);
  const secondTop = useTransform(scrollYProgress, [0, 0.12, 0.32, 0.54, 0.64, 0.9], ["112%", "112%", "17%", "14%", "17%", "43%"]);
  const thirdTop = useTransform(scrollYProgress, [0, 0.34, 0.54, 0.64, 0.9], ["112%", "112%", "17%", "17%", "43%"]);

  // Resolution phase: the very same cards become the final 3-column overview.
  const cardWidth = useTransform(scrollYProgress, [0.64, 0.9], ["100%", "32%"]);
  const cardHeight = useTransform(scrollYProgress, [0.64, 0.9], ["66%", "45%"]);
  const firstLeft = useTransform(scrollYProgress, [0.64, 0.9], ["0%", "0%"]);
  const secondLeft = useTransform(scrollYProgress, [0.64, 0.9], ["0%", "34%"]);
  const thirdLeft = useTransform(scrollYProgress, [0.64, 0.9], ["0%", "68%"]);

  // The feature content physically collapses into the compact card treatment.
  const columns = useTransform(scrollYProgress, [0.64, 0.86], ["1.55fr 0.85fr", "1fr 0fr"]);
  const detailOpacity = useTransform(scrollYProgress, [0.64, 0.79], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0.7, 0.88], [0, 1]);
  const cardShadow = useTransform(
    scrollYProgress,
    [0.64, 0.9],
    ["0 24px 70px rgba(29,24,19,0.14)", "0 0 0 rgba(29,24,19,0)"]
  );

  // Only after the cards have almost found their final positions does the summary arrive.
  const headerOpacity = useTransform(scrollYProgress, [0.82, 0.94], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0.82, 0.94], [18, 0]);

  const cardStyles = [
    { top: firstTop, left: firstLeft, zIndex: 10 },
    { top: secondTop, left: secondLeft, zIndex: 20 },
    { top: thirdTop, left: thirdLeft, zIndex: 30 },
  ];

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
          {practices.map((practice, index) => (
            <article key={practice.title} className="h-[430px]">
              <MobileCard practice={practice} index={index} />
            </article>
          ))}
        </div>
      </div>

      <div className="sticky top-0 hidden h-[100svh] overflow-hidden lg:block">
        <div className="site-shell relative h-full">
          <motion.div
            className="absolute left-0 right-0 top-[11%] z-40 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end"
            style={shouldReduceMotion ? { opacity: 1 } : { opacity: headerOpacity, y: headerY }}
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

          {practices.map((practice, index) => {
            const style = cardStyles[index];

            return (
              <motion.article
                key={practice.title}
                className="absolute will-change-[top,left,width,height]"
                style={
                  shouldReduceMotion
                    ? {
                        top: "43%",
                        left: `${index * 34}%`,
                        width: "32%",
                        height: "45%",
                        zIndex: index + 10,
                      }
                    : {
                        top: style.top,
                        left: style.left,
                        width: cardWidth,
                        height: cardHeight,
                        zIndex: style.zIndex,
                        boxShadow: cardShadow,
                      }
                }
              >
                <MorphCard
                  practice={practice}
                  index={index}
                  columns={shouldReduceMotion ? undefined : columns}
                  detailOpacity={shouldReduceMotion ? undefined : detailOpacity}
                  overlayOpacity={shouldReduceMotion ? undefined : overlayOpacity}
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Locations;
