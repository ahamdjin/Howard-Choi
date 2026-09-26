import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import type { SiteLocale } from "@/data/injurySite";
import collisionImage from "@/assets/law-firm/collision-damage.jpg";
import medicalCareImage from "@/assets/law-firm/medical-care.jpg";
import familySupportImage from "@/assets/law-firm/family-support.jpg";

const practiceCopy = {
  en: [
    { slug: "car-accidents", title: "Car Accidents", description: "Claims involving injury, disputed fault, hit-and-run drivers, and insurance coverage after a crash.", alt: "Damaged car with a broken windshield after a collision", points: ["Rear-end & intersection crashes", "Hit-and-run & uninsured drivers", "Medical costs & lost income"] },
    { slug: "serious-injuries", title: "Serious Injuries", description: "Claims where treatment, future care, mobility, work, or daily life may be affected for months or years.", alt: "Hospital room prepared for medical care", points: ["Brain & head injuries", "Neck, spine & orthopedic trauma", "Future care & earning impact"] },
    { slug: "wrongful-death", title: "Wrongful Death", description: "Careful representation for families after a fatal accident, with attention to responsibility, evidence, insurance, and the losses left behind.", alt: "Hands held together in support", points: ["Fatal vehicle collisions", "Liability & insurance investigation", "Financial & family loss"] },
  ],
  es: [
    { slug: "car-accidents", title: "Accidentes de auto", description: "Reclamos por lesiones, responsabilidad disputada, atropello y fuga y cobertura de seguro después de un choque.", alt: "Auto dañado después de una colisión", points: ["Choques por alcance e intersecciones", "Atropello y fuga y conductores sin seguro", "Gastos médicos y pérdida de ingresos"] },
    { slug: "serious-injuries", title: "Lesiones graves", description: "Reclamos donde el tratamiento, la atención futura, la movilidad, el trabajo o la vida diaria pueden verse afectados durante meses o años.", alt: "Habitación de hospital preparada para atención médica", points: ["Lesiones cerebrales y de cabeza", "Trauma de cuello, columna y ortopédico", "Atención futura e impacto en ingresos"] },
    { slug: "wrongful-death", title: "Muerte injusta", description: "Representación cuidadosa para familias después de un accidente fatal, con atención a responsabilidad, evidencia, seguro y las pérdidas que quedan.", alt: "Manos unidas en señal de apoyo", points: ["Colisiones vehiculares fatales", "Investigación de responsabilidad y seguro", "Pérdidas económicas y familiares"] },
  ],
  ko: [
    { slug: "car-accidents", title: "자동차 사고", description: "충돌 후 부상, 과실 분쟁, 뺑소니, 무보험 운전자 및 보험 적용 문제를 다룹니다.", alt: "충돌 후 손상된 자동차", points: ["후방 추돌 및 교차로 사고", "뺑소니 및 무보험 운전자", "의료비 및 소득 손실"] },
    { slug: "serious-injuries", title: "중대한 상해", description: "치료, 향후 간병, 이동성, 업무 또는 일상생활에 장기간 영향을 주는 부상 사건을 다룹니다.", alt: "의료 치료를 위한 병실", points: ["뇌 및 두부 손상", "목·척추·정형외과 손상", "향후 치료 및 소득 영향"] },
    { slug: "wrongful-death", title: "부당 사망", description: "사망 사고 후 가족을 위해 책임, 증거, 보험 및 남겨진 손실을 신중하게 검토합니다.", alt: "서로 잡은 손", points: ["사망 교통사고", "책임 및 보험 조사", "경제적·가족 손실"] },
  ],
} as const;

const images = [collisionImage, medicalCareImage, familySupportImage];

type Practice = {
  slug: string;
  title: string;
  href: string;
  description: string;
  image: string;
  alt: string;
  points: readonly string[];
};
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
    <a href={practice.href} aria-label={practice.title} className="absolute inset-0 z-40" />
  </motion.div>
);

const MobileCard = ({ practice, index }: { practice: Practice; index: number }) => (
  <div className="relative min-h-[calc(100svh-60px)] h-full overflow-hidden rounded-[3px] bg-[#181511]"><img src={practice.image} alt={practice.alt} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#15110d]/95 via-[#15110d]/18 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-6 text-[#f3eee5]"><div className="mb-2 text-[10px] tracking-[0.12em] text-[#f3eee5]/55">0{index + 1}</div><h3 className="editorial-serif text-[2rem] leading-none">{practice.title}</h3><p className="mt-2 max-w-[300px] text-[13px] leading-5 text-[#f3eee5]/72">{practice.description}</p></div><a href={practice.href} aria-label={practice.title} className="absolute inset-0 z-40" /></div>
);

const Locations = ({ locale = "en" }: { locale?: SiteLocale }) => {
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
  const prefix = locale === "ko" ? "/ko" : locale === "es" ? "/es" : "";
  const raw = practiceCopy[locale];
  const practices: Practice[] = raw.map((item, index) => ({ ...item, href: `${prefix}/practice-areas/${item.slug}`, image: images[index] }));
  const label = locale === "ko" ? "업무 분야" : locale === "es" ? "Áreas de práctica" : "Practice Areas";
  const heading = locale === "ko" ? <>개인상해 사건에서<br />그 다음에 필요한 도움.</> : locale === "es" ? <>Ayuda por lesiones personales<br />para lo que viene después.</> : <>Personal injury help for<br />what happened next.</>;
  const body = locale === "ko"
    ? "일상적인 충돌부터 삶을 바꾸는 중상까지, 청구는 책임, 보험, 치료, 경제적 손실과 이를 연결하는 증거를 반영해야 합니다."
    : locale === "es"
      ? "Desde colisiones comunes hasta lesiones que cambian la vida, el reclamo debe reflejar la responsabilidad, el seguro disponible, el tratamiento médico, la pérdida económica y la evidencia que conecta todo."
      : "From everyday collisions to life-changing injuries, the claim should reflect responsibility, available insurance, medical treatment, financial loss, and the evidence that connects them.";
  const explore = locale === "ko" ? "모든 업무 분야 보기" : locale === "es" ? "Explorar todas las áreas de práctica" : "Explore all practice areas";

  return (
    <section id="practice" ref={ref} className="relative bg-background lg:h-[340svh]">
      <div className="site-shell py-20 md:py-24 lg:hidden">
        <div className="mb-12 grid gap-8"><div><span className="mb-5 block text-[13px] text-muted-foreground">{label}</span><h2 className="editorial-serif max-w-[690px] text-[clamp(3rem,12vw,4.5rem)] leading-[0.93] tracking-[-0.02em]">{heading}</h2></div><p className="max-w-[430px] text-[15px] leading-6 text-muted-foreground">{body} <a href={`${prefix}/practice-areas`} className="whitespace-nowrap font-medium text-foreground underline underline-offset-4">{explore} ↗</a></p></div>
        <div className="mobile-practice-panels grid gap-3">{practices.map((practice, index) => <article key={practice.title} className="min-h-[calc(100svh-60px)]"><MobileCard practice={practice} index={index} /></article>)}</div>
      </div>

      <div className="sticky top-0 hidden h-[100svh] overflow-hidden lg:block">
        <div className="site-shell relative h-full">
          <motion.div className="absolute left-0 right-0 top-[11%] z-40 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end" style={shouldReduceMotion ? { opacity: 1 } : { opacity: headerOpacity, y: headerY }}>
            <div><span className="mb-5 block text-[13px] text-muted-foreground">{label}</span><h2 className="editorial-serif max-w-[690px] text-[clamp(3rem,4.7vw,5rem)] leading-[0.93] tracking-[-0.02em]">{heading}</h2></div>
            <p className="max-w-[430px] text-[15px] leading-6 text-muted-foreground lg:pb-1">{body} <a href={`${prefix}/practice-areas`} className="whitespace-nowrap font-medium text-foreground underline underline-offset-4">{explore} ↗</a></p>
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
