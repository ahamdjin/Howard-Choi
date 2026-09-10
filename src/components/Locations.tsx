import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import commercialLitigationImage from "@/assets/law-firm/practice-commercial-litigation.webp";
import corporateLawImage from "@/assets/law-firm/practice-corporate-law.webp";
import regulatoryComplianceImage from "@/assets/law-firm/practice-regulatory-compliance.webp";

const practices = [
  { slug: "car-accidents", title: "Car Accidents", description: "Clear representation after collisions, disputed fault, and insurance issues.", image: corporateLawImage, alt: "Legal counsel reviewing an accident claim", points: ["Rear-end & intersection crashes", "Hit-and-run claims", "Uninsured motorists"] },
  { slug: "serious-injuries", title: "Serious Injuries", description: "Focused claims when an injury changes work, mobility, and everyday life.", image: commercialLitigationImage, alt: "Attorney reviewing a serious injury matter", points: ["Brain & head injuries", "Neck & spinal injuries", "Orthopedic trauma"] },
  { slug: "wrongful-death", title: "Wrongful Death", description: "Careful representation for families after a fatal preventable accident.", image: regulatoryComplianceImage, alt: "Legal advisers reviewing a wrongful death matter", points: ["Fatal collisions", "Liability investigation", "Family loss"] },
];

type Practice = (typeof practices)[number];
type MorphCardProps = { practice: Practice; index: number; columns?: MotionValue<string>; detailOpacity?: MotionValue<number>; overlayOpacity?: MotionValue<number> };

const MorphCard = ({ practice, index, columns, detailOpacity, overlayOpacity }: MorphCardProps) => (
  <motion.div className="relative grid h-full overflow-hidden rounded-[4px] bg-[#e8e4de] shadow-[0_24px_70px_rgba(29,24,19,0.14)]" style={columns ? { gridTemplateColumns: columns } : undefined}>
    <div className="relative min-w-0 overflow-hidden">
      <img src={practice.image} alt={practice.alt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#15110d]/74 via-[#17130f]/7 to-transparent" />
      <motion.div className="absolute inset-x-0 bottom-0 z-10 p-6 text-[#f3eee5] md:p-7" style={overlayOpacity ? { opacity: overlayOpacity } : { opacity: 1 }}>
        <div className="mb-2 text-[10px] tracking-[0.12em] text-[#f3eee5]/55">0{index + 1}</div>
        <h3 className="editorial-serif text-[clamp(1.8rem,2.35vw,2.35rem)] leading-[0.96] tracking-[-0.018em]">{practice.title}</h3>
        <p className="mt-2 max-w-[310px] text-[13px] leading-5 text-[#f3eee5]/72">{practice.description}</p>
      </motion.div>
    </div>
    <motion.div className="min-w-0 overflow-hidden bg-[#e8e4de]" style={detailOpacity ? { opacity: detailOpacity } : undefined}>
      <div className="flex h-full min-w-[290px] flex-col justify-between px-8 py-8 text-[#211c17] xl:px-10 xl:py-10">
        <div><div className="mb-8 text-[12px] tracking-[0.1em] text-[#211c17]/45">0{index + 1}</div><h3 className="editorial-serif max-w-[300px] text-[clamp(2.7rem,4vw,4.5rem)] leading-[0.9] tracking-[-0.025em]">{practice.title}</h3><p className="mt-6 max-w-[310px] text-[15px] leading-6 text-[#211c17]/68">{practice.description}</p></div>
        <div className="mt-8 border-t border-[#211c17]/14 pt-5">{practice.points.map((point) => <div key={point} className="flex items-center justify-between border-b border-[#211c17]/10 py-2.5 text-[13px] text-[#211c17]/68 last:border-b-0"><span>{point}</span><span className="text-[#211c17]/35">↗</span></div>)}</div>
      </div>
    </motion.div>
  </motion.div>
);

const MobileCard = ({ practice, index }: { practice: Practice; index: number }) => (
  <Link to={`/practice-areas/${practice.slug}`} className="group relative block h-full overflow-hidden rounded-[3px] bg-[#181511]">
    <img src={practice.image} alt={practice.alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-active:scale-[1.015]" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#15110d]/95 via-[#15110d]/18 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 p-5 text-[#f3eee5] sm:p-6">
      <div className="mb-2 text-[10px] tracking-[0.12em] text-[#f3eee5]/55">0{index + 1}</div>
      <h3 className="editorial-serif text-[1.85rem] leading-none">{practice.title}</h3>
      <p className="mt-2 max-w-[300px] text-[12px] leading-5 text-[#f3eee5]/72 sm:text-[13px]">{practice.description}</p>
      <div className="mt-4 text-[10px] uppercase tracking-[0.12em] text-[#f3eee5]/50">View practice →</div>
    </div>
  </Link>
);

const Locations = () => {
  const ref = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const firstTop = useTransform(scrollYProgress, [0, 0.32, 0.54, 0.64, 0.9], ["17%", "14%", "12%", "17%", "43%"]);
  const secondTop = useTransform(scrollYProgress, [0, 0.12, 0.32, 0.54, 0.64, 0.9], ["112%", "112%", "17%", "14%", "17%", "43%"]);
  const thirdTop = useTransform(scrollYProgress, [0, 0.34, 0.54, 0.64, 0.9], ["112%", "112%", "17%", "17%", "43%"]);
  const cardWidth = useTransform(scrollYProgress, [0.64, 0.9], ["100%", "32%"]);
  const cardHeight = useTransform(scrollYProgress, [0.64, 0.9], ["66%", "45%"]);
  const firstLeft = useTransform(scrollYProgress, [0.64, 0.9], ["0%", "0%"]);
  const secondLeft = useTransform(scrollYProgress, [0.64, 0.9], ["0%", "34%"]);
  const thirdLeft = useTransform(scrollYProgress, [0.64, 0.9], ["0%", "68%"]);
  const columns = useTransform(scrollYProgress, [0.64, 0.86], ["1.55fr 0.85fr", "1fr 0fr"]);
  const detailOpacity = useTransform(scrollYProgress, [0.64, 0.79], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0.7, 0.88], [0, 1]);
  const cardShadow = useTransform(scrollYProgress, [0.64, 0.9], ["0 24px 70px rgba(29,24,19,0.14)", "0 0 0 rgba(29,24,19,0)"]);
  const headerOpacity = useTransform(scrollYProgress, [0.82, 0.94], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0.82, 0.94], [18, 0]);
  const cardStyles = [{ top: firstTop, left: firstLeft, zIndex: 10 }, { top: secondTop, left: secondLeft, zIndex: 20 }, { top: thirdTop, left: thirdLeft, zIndex: 30 }];

  return (
    <section id="practice" ref={ref} className="relative bg-background lg:h-[340svh]">
      <div className="site-shell py-16 sm:py-20 md:py-24 lg:hidden">
        <div className="mb-9 grid gap-5 sm:mb-12 sm:gap-8">
          <div><span className="mb-4 block text-[12px] text-muted-foreground sm:mb-5 sm:text-[13px]">Practice Areas</span><h2 className="editorial-serif max-w-[690px] text-[clamp(2.55rem,11vw,4.5rem)] leading-[0.95] tracking-[-0.02em]">Injury counsel for<br />what happens next.</h2></div>
          <p className="max-w-[430px] text-[14px] leading-6 text-muted-foreground sm:text-[15px]">Focused on the accidents and serious injuries that can change a person's health, work, finances, and family life.</p>
        </div>
        <div className="grid gap-2.5 sm:gap-3">{practices.map((practice, index) => <article key={practice.title} className="h-[355px] sm:h-[390px]"><MobileCard practice={practice} index={index} /></article>)}</div>
        <Link to="/practice-areas" className="mt-7 inline-flex border-b border-foreground/20 pb-1 text-[12px] text-foreground/62">View all practice areas →</Link>
      </div>

      <div className="sticky top-0 hidden h-[100svh] overflow-hidden lg:block">
        <div className="site-shell relative h-full">
          <motion.div className="absolute left-0 right-0 top-[11%] z-40 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end" style={shouldReduceMotion ? { opacity: 1 } : { opacity: headerOpacity, y: headerY }}>
            <div><span className="mb-5 block text-[13px] text-muted-foreground">Practice Areas</span><h2 className="editorial-serif max-w-[690px] text-[clamp(3rem,4.7vw,5rem)] leading-[0.93] tracking-[-0.02em]">Injury counsel for<br />what happens next.</h2></div>
            <p className="max-w-[430px] text-[15px] leading-6 text-muted-foreground lg:pb-1">Focused on the accidents and serious injuries that can change a person's health, work, finances, and family life.</p>
          </motion.div>
          {practices.map((practice, index) => {
            const style = cardStyles[index];
            return <motion.article key={practice.title} className="absolute will-change-[top,left,width,height]" style={shouldReduceMotion ? { top: "43%", left: `${index * 34}%`, width: "32%", height: "45%", zIndex: index + 10 } : { top: style.top, left: style.left, width: cardWidth, height: cardHeight, zIndex: style.zIndex, boxShadow: cardShadow }}><MorphCard practice={practice} index={index} columns={shouldReduceMotion ? undefined : columns} detailOpacity={shouldReduceMotion ? undefined : detailOpacity} overlayOpacity={shouldReduceMotion ? undefined : overlayOpacity} /></motion.article>;
          })}
        </div>
      </div>
    </section>
  );
};

export default Locations;
