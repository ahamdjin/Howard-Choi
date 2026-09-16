import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ProcessAccordion from "@/components/ProcessAccordion";

const AUTO_ADVANCE_MS = 4800;
const steps = [
  { title: "Consult", body: "Start with what happened, where it happened, the injuries, current treatment, insurance information, and any immediate concerns such as missed work or a vehicle that cannot be used.", points: ["Understand the accident and injuries", "Flag deadlines and immediate priorities"], image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=88" },
  { title: "Investigate", body: "Preserve the record before it changes. Depending on the case, that can include scene photos, video, police or incident reports, witnesses, vehicle data, business records, and insurance information.", points: ["Preserve time-sensitive evidence", "Identify responsible parties and coverage"], image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=88" },
  { title: "Build", body: "Connect the liability evidence to the real impact of the injury: treatment, medical expenses, time away from work, future care, physical limitations, and changes to daily life.", points: ["Document treatment and recovery", "Measure economic and day-to-day loss"], image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1400&q=88" },
  { title: "Resolve", body: "Evaluate the evidence, insurance limits, disputed issues, and available paths toward resolution. Some claims settle through negotiation; others may require litigation to move forward.", points: ["Evaluate settlement and litigation options", "Keep the client informed before each decision"], image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=88" },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.18 });
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  useEffect(() => { if (!isInView || reducedMotion) return; const timer = window.setTimeout(() => setActive((current) => (current + 1) % steps.length), AUTO_ADVANCE_MS); return () => window.clearTimeout(timer); }, [active, isInView, reducedMotion]);

  return (
    <section id="approach" ref={ref} className="flex min-h-[100svh] items-center bg-background py-[clamp(3rem,6vh,5rem)]">
      <div className="site-shell w-full">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.72 }} className="max-w-[620px]"><span className="mb-5 block text-[15px] font-semibold leading-none text-foreground">How a personal injury claim develops</span><h2 className="editorial-serif text-[clamp(3.15rem,4.3vw,4.25rem)] leading-[0.96] tracking-[-0.025em]">A clear path forward.</h2><p className="mt-5 max-w-[520px] text-[clamp(1.08rem,1.5vw,1.32rem)] leading-[1.28] text-foreground/58">From the first conversation through evidence preservation, medical documentation, insurance analysis, negotiation, and—when necessary—litigation.</p></motion.div>
        <div className="mt-[clamp(2.8rem,6vh,4.8rem)] grid gap-5 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.05 }} className="relative min-h-[390px] overflow-hidden rounded-[4px] bg-neutral-200 lg:h-full lg:min-h-0">
            <AnimatePresence mode="wait" initial={false}><motion.img key={steps[active].image} src={steps[active].image} alt={`${steps[active].title} injury claim process`} initial={{ opacity: 0, scale: 1.018, filter: "blur(3px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0 }} transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 h-full w-full object-cover" /></AnimatePresence><div className="absolute inset-0 bg-black/[0.06]" />
          </motion.div>
          <ProcessAccordion steps={steps} active={active} onSelect={setActive} inView={isInView} duration={AUTO_ADVANCE_MS} />
        </div>
      </div>
    </section>
  );
};

export default Experience;
