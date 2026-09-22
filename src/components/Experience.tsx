import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ProcessAccordion from "@/components/ProcessAccordion";

const AUTO_ADVANCE_MS = 4800;
const steps = [
  { title: "Evidence", body: "We document what happened before it disappears: scene photos, the police or incident report, witnesses, vehicle damage, and any nearby camera footage.", points: ["Scene, report, and witness records", "Time-sensitive footage and vehicle data"], image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=88" },
  { title: "Medical Treatment", body: "We build the treatment record, from the first visit through whatever specialist care follows. That record is what the insurer will argue with.", points: ["Records, imaging, and specialist care", "Ongoing and future treatment needs"], image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=88" },
  { title: "Insurance", body: "We identify every policy that might apply: the at-fault driver's, a business or employer's, and your own uninsured-motorist coverage where it applies.", points: ["All potentially available policies", "Adjuster communication and policy limits"], image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1400&q=88" },
  { title: "Financial Loss & Resolution", body: "We add up lost pay, future care, and lasting limitations, then negotiate, or file in court when the offer does not reflect the loss.", points: ["Wage loss, future care, and limitations", "Settlement or litigation"], image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=88" },
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
        <motion.div initial={{ opacity: 0, y: 18 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.72 }} className="max-w-[620px]"><span className="mb-5 block text-[15px] font-semibold leading-none text-foreground">What an accident lawyer helps with</span><h2 className="editorial-serif text-[clamp(3.15rem,4.3vw,4.25rem)] leading-[0.96] tracking-[-0.025em]">What happens after you call.</h2><p className="mt-5 max-w-[520px] text-[clamp(1.08rem,1.5vw,1.32rem)] leading-[1.28] text-foreground/58">Four stages every injury claim moves through: evidence, medical treatment, insurance, and what the loss is finally worth.</p></motion.div>
        <div className="mt-[clamp(2.8rem,6vh,4.8rem)] grid gap-5 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.05 }} className="relative min-h-[390px] overflow-hidden rounded-[4px] bg-neutral-200 lg:h-full lg:min-h-0">
            <AnimatePresence mode="wait" initial={false}><motion.img key={steps[active].image} src={steps[active].image} alt={`${steps[active].title} stage of an injury claim`} initial={{ opacity: 0, scale: 1.018, filter: "blur(3px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0 }} transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 h-full w-full object-cover" /></AnimatePresence><div className="absolute inset-0 bg-black/[0.06]" />
          </motion.div>
          <ProcessAccordion steps={steps} active={active} onSelect={setActive} inView={isInView} duration={AUTO_ADVANCE_MS} />
        </div>
      </div>
    </section>
  );
};

export default Experience;
