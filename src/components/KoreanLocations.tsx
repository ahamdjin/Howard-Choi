import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import commercialLitigationImage from "@/assets/law-firm/practice-commercial-litigation.webp";
import corporateLawImage from "@/assets/law-firm/practice-corporate-law.webp";
import regulatoryComplianceImage from "@/assets/law-firm/practice-regulatory-compliance.webp";

const koSerif = { fontFamily: '"Noto Serif KR", serif' } as const;

const practices = [
  {
    title: "기업 자문",
    description: "기업 설립, 계약, 거버넌스부터 중요한 거래와 성장 과정의 의사결정까지 실무 중심으로 자문합니다.",
    image: corporateLawImage,
    alt: "기업 계약서를 검토하는 변호사",
    points: ["설립 · 거버넌스", "상업 계약", "전략적 거래"],
  },
  {
    title: "상사 소송",
    description: "사업 분쟁의 이해관계가 커지는 순간, 협상부터 소송 전략까지 명확하고 단호하게 대응합니다.",
    image: commercialLitigationImage,
    alt: "사건 자료를 검토하는 상사 소송 변호사",
    points: ["사업 분쟁", "소송 전 전략", "고위험 분쟁 대응"],
  },
  {
    title: "규제 · 컴플라이언스",
    description: "복잡한 규제 의무, 사업 리스크, 규정 변화에 대응할 수 있도록 현실적인 방향을 제시합니다.",
    image: regulatoryComplianceImage,
    alt: "규제 문제를 논의하는 법률 자문팀",
    points: ["규제 전략", "리스크 · 컴플라이언스", "정부기관 대응"],
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
        <h3 style={koSerif} className="text-[clamp(1.65rem,2.1vw,2.15rem)] font-medium leading-[1.18] tracking-[-0.04em]">
          {practice.title}
        </h3>
        <p className="mt-2 max-w-[330px] text-[13px] leading-6 text-[#f3eee5]/72">{practice.description}</p>
      </motion.div>
    </div>

    <motion.div
      className="min-w-0 overflow-hidden bg-[#e8e4de]"
      style={detailOpacity ? { opacity: detailOpacity } : undefined}
    >
      <div className="flex h-full min-w-[300px] flex-col justify-between px-8 py-8 text-[#211c17] xl:px-10 xl:py-10">
        <div>
          <div className="mb-8 text-[12px] tracking-[0.1em] text-[#211c17]/45">0{index + 1}</div>
          <h3 style={koSerif} className="max-w-[330px] text-[clamp(2.3rem,3.4vw,3.8rem)] font-medium leading-[1.12] tracking-[-0.045em]">
            {practice.title}
          </h3>
          <p className="mt-6 max-w-[330px] text-[14px] leading-7 text-[#211c17]/68">{practice.description}</p>
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
      <h3 style={koSerif} className="text-[1.85rem] font-medium leading-[1.16] tracking-[-0.04em]">{practice.title}</h3>
      <p className="mt-2 max-w-[320px] text-[13px] leading-6 text-[#f3eee5]/72">{practice.description}</p>
    </div>
  </div>
);

const KoreanLocations = () => {
  const ref = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Mirror the English homepage story phase exactly: each card arrives over the previous card.
  const firstTop = useTransform(scrollYProgress, [0, 0.32, 0.54, 0.64, 0.9], ["17%", "14%", "12%", "17%", "43%"]);
  const secondTop = useTransform(scrollYProgress, [0, 0.12, 0.32, 0.54, 0.64, 0.9], ["112%", "112%", "17%", "14%", "17%", "43%"]);
  const thirdTop = useTransform(scrollYProgress, [0, 0.34, 0.54, 0.64, 0.9], ["112%", "112%", "17%", "17%", "43%"]);

  // The same cards then physically resolve into the final three-column overview.
  const cardWidth = useTransform(scrollYProgress, [0.64, 0.9], ["100%", "32%"]);
  const cardHeight = useTransform(scrollYProgress, [0.64, 0.9], ["66%", "45%"]);
  const firstLeft = useTransform(scrollYProgress, [0.64, 0.9], ["0%", "0%"]);
  const secondLeft = useTransform(scrollYProgress, [0.64, 0.9], ["0%", "34%"]);
  const thirdLeft = useTransform(scrollYProgress, [0.64, 0.9], ["0%", "68%"]);

  const columns = useTransform(scrollYProgress, [0.64, 0.86], ["1.55fr 0.85fr", "1fr 0fr"]);
  const detailOpacity = useTransform(scrollYProgress, [0.64, 0.79], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0.7, 0.88], [0, 1]);
  const cardShadow = useTransform(
    scrollYProgress,
    [0.64, 0.9],
    ["0 24px 70px rgba(29,24,19,0.14)", "0 0 0 rgba(29,24,19,0)"]
  );

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
            <span className="mb-5 block text-[13px] text-muted-foreground">업무 분야</span>
            <h2 style={koSerif} className="max-w-[720px] text-[clamp(2.5rem,10vw,4rem)] font-medium leading-[1.18] tracking-[-0.045em]">
              성장의 모든 단계에서<br />필요한 법률자문.
            </h2>
          </div>
          <p className="max-w-[440px] text-[15px] leading-7 text-muted-foreground">
            설립과 계약부터 분쟁, 규제 대응, 지속적인 법률자문까지 기업의 중요한 순간에 필요한 핵심 업무에 집중합니다.
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
              <span className="mb-5 block text-[13px] text-muted-foreground">업무 분야</span>
              <h2 style={koSerif} className="max-w-[760px] text-[clamp(2.45rem,3.9vw,4rem)] font-medium leading-[1.18] tracking-[-0.045em]">
                성장의 모든 단계에서<br />필요한 법률자문.
              </h2>
            </div>
            <p className="max-w-[440px] text-[15px] leading-7 text-muted-foreground lg:pb-1">
              설립과 계약부터 분쟁, 규제 대응, 지속적인 법률자문까지 기업의 중요한 순간에 필요한 핵심 업무에 집중합니다.
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

export default KoreanLocations;
