import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ProcessAccordion from "@/components/ProcessAccordion";
import type { SiteLocale } from "@/data/injurySite";

const AUTO_ADVANCE_MS = 4800;

const stepCopy = {
  en: [
    { title: "Evidence", body: "We document what happened before it disappears: scene photos, the police or incident report, witnesses, vehicle damage, and any nearby camera footage.", points: ["Scene, report, and witness records", "Time-sensitive footage and vehicle data"] },
    { title: "Medical Treatment", body: "We build the treatment record, from the first visit through whatever specialist care follows. That record is what the insurer will argue with.", points: ["Records, imaging, and specialist care", "Ongoing and future treatment needs"] },
    { title: "Insurance", body: "We identify every policy that might apply: the at-fault driver's, a business or employer's, and your own uninsured-motorist coverage where it applies.", points: ["All potentially available policies", "Adjuster communication and policy limits"] },
    { title: "Financial Loss & Resolution", body: "We add up lost pay, future care, and lasting limitations, then negotiate, or file in court when the offer does not reflect the loss.", points: ["Wage loss, future care, and limitations", "Settlement or litigation"] },
  ],
  es: [
    { title: "Evidencia", body: "Documentamos lo ocurrido antes de que desaparezca: fotos del lugar, reporte policial o del incidente, testigos, daños del vehículo y cualquier video de cámaras cercanas.", points: ["Escena, reporte y registros de testigos", "Video y datos del vehículo que pueden desaparecer"] },
    { title: "Tratamiento médico", body: "Construimos el historial de tratamiento desde la primera visita hasta la atención de especialistas que siga. Ese registro será una parte central de cualquier discusión con la aseguradora.", points: ["Expedientes, imágenes y atención especializada", "Necesidades de tratamiento continuo y futuro"] },
    { title: "Seguro", body: "Identificamos cada póliza que podría aplicar: la del conductor responsable, la de un negocio o empleador y su propia cobertura de conductor sin seguro cuando corresponda.", points: ["Todas las pólizas potencialmente disponibles", "Comunicación con ajustadores y límites de póliza"] },
    { title: "Pérdida económica y resolución", body: "Sumamos salarios perdidos, atención futura y limitaciones duraderas, y luego negociamos o presentamos el caso en tribunal cuando la oferta no refleja la pérdida.", points: ["Pérdida salarial, atención futura y limitaciones", "Acuerdo o litigio"] },
  ],
  ko: [
    { title: "증거", body: "현장 사진, 경찰 또는 사고 보고서, 목격자, 차량 손상과 주변 카메라 영상처럼 사라질 수 있는 자료를 먼저 기록합니다.", points: ["현장·보고서·목격자 기록", "시간에 민감한 영상 및 차량 데이터"] },
    { title: "의료 치료", body: "첫 진료부터 전문 치료까지 의료 기록을 정리합니다. 보험사는 바로 그 기록을 검토하고 다툴 수 있습니다.", points: ["진료 기록·영상·전문의 치료", "지속적·향후 치료 필요"] },
    { title: "보험", body: "과실 운전자, 사업체나 고용주, 필요한 경우 본인의 무보험 운전자 담보까지 적용 가능한 모든 보험을 확인합니다.", points: ["잠재적으로 적용 가능한 보험", "보험사 소통 및 한도"] },
    { title: "경제적 손실 및 해결", body: "소득 손실, 향후 치료와 지속되는 제한을 정리한 뒤 협상하고, 제안이 손실을 반영하지 않으면 소송을 검토합니다.", points: ["소득 손실·향후 치료·제한", "합의 또는 소송"] },
  ],
} as const;

const images = [
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=88",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=88",
  "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1400&q=88",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=88",
];

const Experience = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.18 });
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const steps = stepCopy[locale].map((step, index) => ({ ...step, image: images[index] }));
  useEffect(() => { if (!isInView || reducedMotion) return; const timer = window.setTimeout(() => setActive((current) => (current + 1) % steps.length), AUTO_ADVANCE_MS); return () => window.clearTimeout(timer); }, [active, isInView, reducedMotion, steps.length]);

  const eyebrow = locale === "ko" ? "사고 변호사가 돕는 일" : locale === "es" ? "En qué ayuda un abogado de accidentes" : "What an accident lawyer helps with";
  const title = locale === "ko" ? "전화 후 진행되는 과정." : locale === "es" ? "Qué ocurre después de su llamada." : "What happens after you call.";
  const body = locale === "ko"
    ? "모든 상해 청구는 증거, 의료 치료, 보험, 그리고 최종 손실 평가라는 네 단계를 거칩니다."
    : locale === "es"
      ? "Cuatro etapas por las que pasa cada reclamo por lesiones: evidencia, tratamiento médico, seguro y lo que finalmente vale la pérdida."
      : "Four stages every injury claim moves through: evidence, medical treatment, insurance, and what the loss is finally worth.";

  return (
    <section id="approach" ref={ref} className="flex min-h-[100svh] items-center bg-background py-[clamp(3rem,6vh,5rem)]">
      <div className="site-shell w-full">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.72 }} className="max-w-[620px]">
          <span className="mb-5 block text-[15px] font-semibold leading-none text-foreground">{eyebrow}</span>
          <h2 className="editorial-serif text-[clamp(3.15rem,4.3vw,4.25rem)] leading-[0.96] tracking-[-0.025em]">{title}</h2>
          <p className="mt-5 max-w-[520px] text-[clamp(1.08rem,1.5vw,1.32rem)] leading-[1.28] text-foreground/58">{body}</p>
        </motion.div>
        <div className="mt-[clamp(2.8rem,6vh,4.8rem)] grid gap-5 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.05 }} className="relative min-h-[390px] overflow-hidden rounded-[4px] bg-neutral-200 lg:h-full lg:min-h-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img key={steps[active].image} src={steps[active].image} alt={locale === "es" ? `Etapa de ${steps[active].title} de un reclamo por lesiones` : locale === "ko" ? `상해 청구의 ${steps[active].title} 단계` : `${steps[active].title} stage of an injury claim`} initial={{ opacity: 0, scale: 1.018, filter: "blur(3px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0 }} transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 h-full w-full object-cover" />
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/[0.06]" />
          </motion.div>
          <ProcessAccordion steps={steps} active={active} onSelect={setActive} inView={isInView} duration={AUTO_ADVANCE_MS} />
        </div>
      </div>
    </section>
  );
};

export default Experience;
