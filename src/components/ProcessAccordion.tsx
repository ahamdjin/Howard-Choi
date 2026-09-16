import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Plus, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

type Step = { title: string; body: string; points: string[] };

export default function ProcessAccordion({ steps, active, onSelect, inView, duration, korean = false }: {
  steps: Step[]; active: number; onSelect: (index: number) => void; inView: boolean; duration: number; korean?: boolean;
}) {
  const id = useId();
  const measureRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [sizes, setSizes] = useState({ header: 96, body: 320 });
  const titleClass = korean ? "text-[clamp(1.7rem,2.35vw,2.35rem)] font-medium leading-[1.2] tracking-[-0.04em]" : "editorial-serif text-[clamp(2rem,2.75vw,2.75rem)] leading-none tracking-[-0.02em]";
  const titleStyle = korean ? { fontFamily: '"Noto Serif KR", serif' } : undefined;

  useEffect(() => {
    const element = measureRef.current;
    if (!element) return;
    const measure = () => {
      const maximum = (selector: string) => Math.ceil(Math.max(...Array.from(element.querySelectorAll(selector), node => node.getBoundingClientRect().height)));
      const header = maximum("[data-measure-header]");
      const body = maximum("[data-measure-body]");
      setSizes(previous => previous.header === header && previous.body === body ? previous : { header, body });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [steps, korean]);

  const body = (step: Step) => <div className="px-7 pb-7 md:px-8"><p className={`${korean ? "text-[14px] leading-7" : "text-[15px] leading-6"} text-foreground/88`}>{step.body}</p><div className="mt-4 space-y-2.5">{step.points.map(point => <div key={point} className="flex items-start gap-3 text-[13px] leading-5 text-foreground/68"><Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 stroke-[1.65]" /><span>{point}</span></div>)}</div></div>;
  const totalHeight = sizes.header * steps.length + sizes.body + (steps.length - 1) * 12;

  return (
    <div className="relative min-w-0" style={{ overflowAnchor: "none" }}>
      {/* Measure every step at the actual column width, outside document flow. */}
      <div ref={measureRef} aria-hidden="true" className="pointer-events-none invisible absolute inset-x-0 top-0 -z-10">
        {steps.map(step => <div key={step.title}><div data-measure-header className="flex items-start justify-between gap-6 px-7 py-6 md:px-8"><span className={titleClass} style={titleStyle}>{step.title}</span><Plus className="h-5 w-5 shrink-0" /></div><div data-measure-body>{body(step)}</div></div>)}
      </div>
      <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 16, gridTemplateRows: steps.map((_, index) => `${sizes.header + (index === active ? sizes.body : 0)}px`).join(" ") }} transition={{ opacity: { duration: reduced ? 0 : 0.8, delay: 0.09 }, x: { duration: reduced ? 0 : 0.8, delay: 0.09 }, gridTemplateRows: { duration: reduced ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] } }} style={{ height: totalHeight }} className="grid gap-3">
        {steps.map((step, index) => {
          const expanded = active === index;
          return <article key={step.title} className="relative min-h-0 overflow-hidden rounded-[4px] bg-[#e6e4e1]">
            <button type="button" id={`${id}-button-${index}`} onClick={() => onSelect(index)} aria-expanded={expanded} aria-controls={`${id}-panel-${index}`} className="flex w-full items-start justify-between gap-6 px-7 py-6 text-left md:px-8" style={{ height: sizes.header }}><span className={titleClass} style={titleStyle}>{step.title}</span>{expanded ? <X aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 stroke-[1.65]" /> : <Plus aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 stroke-[1.65]" />}</button>
            <div id={`${id}-panel-${index}`} role="region" aria-labelledby={`${id}-button-${index}`} aria-hidden={!expanded} className="absolute inset-x-0" style={{ top: sizes.header }}>
              <AnimatePresence initial={false}>{expanded && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.05 }}>{body(step)}</motion.div>}</AnimatePresence>
            </div>
            {expanded && inView && !reduced && <motion.div key={`progress-${active}`} className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-foreground" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: duration / 1000, ease: "linear" }} />}
          </article>;
        })}
      </motion.div>
    </div>
  );
}
