import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Check, Plus, X } from "lucide-react";

const AUTO_ADVANCE_MS = 4800;
const steps = [
  { title: "Consult", body: "A direct first conversation about the accident, the injuries, the available information, and what needs attention now.", points: ["Understand what happened", "Identify immediate priorities"], image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=88" },
  { title: "Investigate", body: "Preserve the evidence and identify the people, companies, records, and insurance that may matter to the claim.", points: ["Gather records and available evidence", "Clarify responsibility and coverage"], image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=88" },
  { title: "Build", body: "Document the medical, financial, and day-to-day impact so the claim reflects more than the first bill or repair estimate.", points: ["Track treatment and recovery", "Document work and life impact"], image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1400&q=88" },
  { title: "Resolve", body: "Move toward resolution with the evidence organized, the options understood, and the next decision made deliberately.", points: ["Evaluate available paths", "Keep the next step clear"], image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=88" },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.18 });
  const [active, setActive] = useState(0);
  useEffect(() => { if (!isInView) return; const timer = window.setTimeout(() => setActive((current) => (current + 1) % steps.length), AUTO_ADVANCE_MS); return () => window.clearTimeout(timer); }, [active, isInView]);
  const rowTemplate = steps.map((_, index) => (index === active ? "2.2fr" : "1fr")).join(" ");

  return (
    <section id="approach" ref={ref} className="bg-background py-16 md:py-20 lg:flex lg:min-h-[100svh] lg:items-center lg:py-[clamp(3rem,6vh,5rem)]">
      <div className="site-shell w-full">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.72 }} className="max-w-[620px]"><span className="mb-4 block text-[13px] font-semibold leading-none text-foreground md:mb-5 md:text-[15px]">How we work</span><h2 className="editorial-serif text-[clamp(2.6rem,11vw,4.25rem)] leading-[0.97] tracking-[-0.025em]">A clear path forward.</h2><p className="mt-4 max-w-[520px] text-[15px] leading-6 text-foreground/58 md:mt-5 md:text-[clamp(1.08rem,1.5vw,1.32rem)] md:leading-[1.28]">From the first conversation through investigation, documentation, and resolution.</p></motion.div>
        <div className="mt-10 grid gap-4 md:mt-12 lg:mt-[clamp(2.8rem,6vh,4.8rem)] lg:h-[min(59vh,600px)] lg:min-h-[500px] lg:grid-cols-2 lg:gap-5">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.05 }} className="relative min-h-[280px] overflow-hidden rounded-[4px] bg-neutral-200 sm:min-h-[340px] lg:h-full lg:min-h-0">
            <AnimatePresence mode="wait" initial={false}><motion.img key={steps[active].image} src={steps[active].image} alt={`${steps[active].title} injury claim process`} initial={{ opacity: 0, scale: 1.018, filter: "blur(3px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0 }} transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 h-full w-full object-cover" /></AnimatePresence><div className="absolute inset-0 bg-black/[0.06]" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 16, gridTemplateRows: rowTemplate }} transition={{ opacity: { duration: 0.8, delay: 0.09 }, x: { duration: 0.8, delay: 0.09 }, gridTemplateRows: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } }} className="grid h-[500px] min-h-0 gap-2.5 sm:h-[540px] lg:h-full lg:gap-3">
            {steps.map((step, index) => { const expanded = active === index; return <motion.article key={step.title} layout transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="relative min-h-0 overflow-hidden rounded-[4px] bg-[#e6e4e1]"><button type="button" onClick={() => setActive(index)} className="flex h-full w-full min-h-0 flex-col px-5 py-5 text-left sm:px-7 sm:py-6 md:px-8" aria-expanded={expanded}><div className="flex w-full items-start justify-between gap-6"><span className="editorial-serif text-[clamp(1.75rem,8vw,2.75rem)] leading-none tracking-[-0.02em]">{step.title}</span>{expanded ? <X className="mt-1 h-5 w-5 shrink-0 stroke-[1.65]" /> : <Plus className="mt-1 h-5 w-5 shrink-0 stroke-[1.65]" />}</div><AnimatePresence initial={false}>{expanded && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.3, delay: 0.05 }} className="mt-auto max-w-[470px] pt-4 sm:pt-5"><p className="text-[13px] leading-5 text-foreground/88 sm:text-[15px] sm:leading-6">{step.body}</p><div className="mt-3 space-y-2 sm:mt-4 sm:space-y-2.5">{step.points.map((point) => <div key={point} className="flex items-center gap-3 text-[12px] text-foreground/68 sm:text-[13px]"><Check className="h-4 w-4 shrink-0 stroke-[1.65]" /><span>{point}</span></div>)}</div></motion.div>}</AnimatePresence></button>{expanded && isInView && <motion.div key={`progress-${active}`} className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-foreground" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }} />}</motion.article>; })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
