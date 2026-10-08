import { responsiveImageProps } from "@/lib/responsive-images";
import { m as motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import collisionImage from "@/assets/law-firm/collision-damage.jpg";
import medicalCareImage from "@/assets/law-firm/medical-care.jpg";
import familySupportImage from "@/assets/law-firm/family-support.jpg";

const koSerif = { fontFamily: '"Noto Serif KR", serif' } as const;
const practices = [
  { title: "자동차 사고", description: "충돌 사고, 과실 분쟁 및 보험 문제 이후의 상해 청구를 명확하게 다룹니다.", href: "/ko/practice-areas/car-accidents", image: collisionImage, alt: "앞유리가 파손된 사고 차량", points: ["후방 추돌·교차로 사고", "뺑소니 사고", "무보험 운전자 사고"] },
  { title: "중대 상해", description: "부상이 업무, 이동, 일상생활을 크게 바꾼 사건에 집중합니다.", href: "/ko/practice-areas/serious-injuries", image: medicalCareImage, alt: "치료를 준비한 병실", points: ["뇌·두부 손상", "목·척추 부상", "정형외과적 외상"] },
  { title: "부당 사망", description: "예방 가능했던 사고로 가족을 잃은 유가족을 신중하게 지원합니다.", href: "/ko/practice-areas/wrongful-death", image: familySupportImage, alt: "서로 맞잡은 손", points: ["치명적 차량 사고", "책임 조사", "유가족 손실"] },
];

type Practice = (typeof practices)[number];
type MorphCardProps = { practice: Practice; index: number;  };

const MorphCard = ({ practice, index }: MorphCardProps) => (
  <motion.div className="relative grid grid-cols-[1fr_0fr] h-full overflow-hidden rounded-[4px] bg-[#e8e4de] ">
    <div className="relative min-w-0 overflow-hidden"><img {...responsiveImageProps(practice.image)} src={practice.image} alt={practice.alt} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#15110d]/74 via-[#17130f]/7 to-transparent" /><motion.div className="absolute inset-x-0 bottom-0 z-10 p-6 text-[#f3eee5] md:p-7" style={{ opacity: 1 }}><div className="mb-2 text-[10px] tracking-[0.12em] text-[#f3eee5]/55">0{index + 1}</div><h3 style={koSerif} className="text-[clamp(1.65rem,2.1vw,2.15rem)] font-medium leading-[1.18] tracking-[-0.04em]">{practice.title}</h3><p className="mt-2 max-w-[330px] text-[13px] leading-6 text-[#f3eee5]/72">{practice.description}</p></motion.div></div>
    <motion.div className="min-w-0 overflow-hidden bg-[#e8e4de]"><div className="flex h-full min-w-[300px] flex-col justify-between px-8 py-8 text-[#211c17] xl:px-10 xl:py-10"><div><div className="mb-8 text-[12px] tracking-[0.1em] text-[#211c17]/45">0{index + 1}</div><h3 style={koSerif} className="max-w-[330px] text-[clamp(2.3rem,3.4vw,3.8rem)] font-medium leading-[1.12] tracking-[-0.045em]">{practice.title}</h3><p className="mt-6 max-w-[330px] text-[14px] leading-7 text-[#211c17]/68">{practice.description}</p></div><div className="mt-8 border-t border-[#211c17]/14 pt-5">{practice.points.map((point) => <div key={point} className="flex items-center justify-between border-b border-[#211c17]/10 py-2.5 text-[13px] text-[#211c17]/68 last:border-b-0"><span>{point}</span><span className="text-[#211c17]/35">↗</span></div>)}</div></div></motion.div>
    <a href={practice.href} aria-label={`${practice.title} 업무 분야`} className="absolute inset-0 z-40" />
  </motion.div>
);

const MobileCard = ({ practice, index }: { practice: Practice; index: number }) => <div className="relative min-h-[calc(100svh-60px)] h-full overflow-hidden rounded-[3px] bg-[#181511]"><img {...responsiveImageProps(practice.image)} src={practice.image} alt={practice.alt} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#15110d]/95 via-[#15110d]/18 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-6 text-[#f3eee5]"><div className="mb-2 text-[10px] tracking-[0.12em] text-[#f3eee5]/55">0{index + 1}</div><h3 style={koSerif} className="text-[1.85rem] font-medium leading-[1.16] tracking-[-0.04em]">{practice.title}</h3><p className="mt-2 max-w-[320px] text-[13px] leading-6 text-[#f3eee5]/72">{practice.description}</p></div><a href={practice.href} aria-label={`${practice.title} 업무 분야`} className="absolute inset-0 z-40" /></div>;

const KoreanLocations = () => {
  const ref = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const firstY = useTransform(scrollYProgress, [0, 0.2], ["110%", "0%"]);
  const secondY = useTransform(scrollYProgress, [0.15, 0.4], ["110%", "0%"]);
  const thirdY = useTransform(scrollYProgress, [0.3, 0.6], ["110%", "0%"]);
  const cardY = [firstY, secondY, thirdY];

  return (
    <section id="practice" ref={ref} className="relative bg-background lg:h-[340svh]">
      <div className="site-shell py-20 md:py-24 lg:hidden"><div className="mb-12 grid gap-8"><div><span className="mb-5 block text-[13px] text-muted-foreground">업무 분야</span><h2 style={koSerif} className="max-w-[720px] text-[clamp(2.5rem,10vw,4rem)] font-medium leading-[1.18] tracking-[-0.045em]">사고 이후 필요한<br />상해 법률자문.</h2></div><p className="max-w-[440px] text-[15px] leading-7 text-muted-foreground">건강, 업무, 경제적 상황과 가족의 일상을 바꿀 수 있는 사고와 중대 상해 사건에 집중합니다. <a href="/ko/practice-areas" className="whitespace-nowrap font-medium text-foreground underline underline-offset-4">전체 업무 분야 보기 ↗</a></p></div><div className="mobile-practice-panels grid gap-3">{practices.map((practice, index) => <article key={practice.title} className="min-h-[calc(100svh-60px)]"><MobileCard practice={practice} index={index} /></article>)}</div></div>
      <div className="sticky top-0 hidden h-[100svh] overflow-hidden lg:block"><div className="site-shell relative h-full"><motion.div className="absolute left-0 right-0 top-[11%] z-40 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end" ><div><span className="mb-5 block text-[13px] text-muted-foreground">업무 분야</span><h2 style={koSerif} className="max-w-[760px] text-[clamp(2.45rem,3.9vw,4rem)] font-medium leading-[1.18] tracking-[-0.045em]">사고 이후 필요한<br />상해 법률자문.</h2></div><p className="max-w-[440px] text-[15px] leading-7 text-muted-foreground lg:pb-1">건강, 업무, 경제적 상황과 가족의 일상을 바꿀 수 있는 사고와 중대 상해 사건에 집중합니다. <a href="/ko/practice-areas" className="whitespace-nowrap font-medium text-foreground underline underline-offset-4">전체 업무 분야 보기 ↗</a></p></motion.div>{practices.map((practice, index) => {  return <motion.article key={practice.title} className="absolute will-change-transform" style={{ top: "43%", left: `${index * 34}%`, width: "32%", height: "45%", zIndex: index + 10, y: shouldReduceMotion ? 0 : cardY[index] }}><MorphCard practice={practice} index={index}  /></motion.article>; })}</div></div>
    </section>
  );
};

export default KoreanLocations;
