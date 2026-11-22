import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { m as motion } from "framer-motion";
import { Check, Plus, Minus } from "lucide-react";
import { useId } from "react";

type Step = { title: string; body: string; points: readonly string[] };

export default function ProcessAccordion({ steps, active, onSelect, running, onElapsed, korean = false }: {
  steps: readonly Step[]; active: number; onSelect: (index: number) => void; korean?: boolean; running?: boolean; onElapsed?: () => void;
}) {
  const id = useId();
  const titleClass = korean ? "text-[clamp(1.7rem,2.35vw,2.35rem)] font-medium leading-[1.2] tracking-[-0.04em]" : "editorial-serif text-[clamp(2rem,2.75vw,2.75rem)] leading-none tracking-[-0.02em]";
  const titleStyle = korean ? { fontFamily: '"Noto Serif KR", serif' } : undefined;

  const body = (step: Step) => <div className="px-7 pb-7 md:px-8"><p className={`${korean ? "text-[14px] leading-7" : "text-[15px] leading-6"} text-foreground/88`}>{step.body}</p><div className="mt-4 space-y-2.5">{step.points.map(point => <div key={point} className="flex items-start gap-3 text-[13px] leading-5 text-foreground/68"><Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 stroke-[1.65]" /><span>{point}</span></div>)}</div></div>;

  return <div className="grid min-w-0 content-start gap-3">
    {steps.map((step, index) => {
      const expanded = index === active;
      return <Card asChild key={step.title} className="relative overflow-hidden rounded-[4px] border-0 bg-[#e6e4e1] shadow-none"><article>
        <h3><Button variant="control" type="button" id={`${id}-button-${index}`} aria-expanded={expanded} aria-controls={`${id}-panel-${index}`} onClick={() => onSelect(index)} className="flex w-full items-start justify-between gap-6 px-7 py-6 text-left hover:bg-black/5 md:px-8">
          <span className={titleClass} style={titleStyle}>{step.title}</span>
          {expanded ? <Minus aria-hidden="true" size={20} /> : <Plus aria-hidden="true" size={20} />}
        </Button></h3>
        <div id={`${id}-panel-${index}`} role="region" aria-labelledby={`${id}-button-${index}`} hidden={!expanded}>{body(step)}</div>
        {expanded && running && (
          <motion.div aria-hidden="true" className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-foreground"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 4.8, ease: "linear" }}
            onAnimationComplete={onElapsed} />
        )}
      </article></Card>;
    })}
  </div>;
}
