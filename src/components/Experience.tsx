import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Check, Plus, X } from "lucide-react";

const AUTO_ADVANCE_MS = 4800;

const steps = [
  {
    title: "Consult",
    body: "A direct first conversation focused on the matter, the commercial context, and the result you need.",
    points: ["Clarify the immediate issue", "Identify priorities and constraints"],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=88",
  },
  {
    title: "Strategy",
    body: "A plan built around your matter, not a template.",
    points: ["Clear scope, approach, and timeline upfront", "Risks and options explained before action"],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=88",
  },
  {
    title: "Resolution",
    body: "Focused execution designed to move the matter toward the strongest practical outcome.",
    points: ["Decisive action with regular updates", "No ambiguity around the next step"],
    image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1400&q=88",
  },
  {
    title: "Ongoing Counsel",
    body: "Direct access continues when the business needs a trusted legal partner beyond one matter.",
    points: ["Responsive advice as issues arise", "Continuity without layers of hand-offs"],
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=88",
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.18 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % steps.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timer);
  }, [active, isInView]);

  return (
    <section
      id="approach"
      ref={ref}
      className="flex min-h-[100svh] items-center bg-background py-[clamp(3rem,6vh,5rem)]"
    >
      <div className="site-shell w-full">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.72 }}
          className="max-w-[620px]"
        >
          <span className="editorial-serif mb-5 block text-[15px] font-semibold leading-none text-foreground">
            How we work
          </span>
          <h2 className="editorial-serif text-[clamp(3.15rem,4.3vw,4.25rem)] leading-[0.96] tracking-[-0.02em]">
            A Clear path forward.
          </h2>
          <p className="editorial-serif mt-5 max-w-[500px] text-[clamp(1.15rem,1.6vw,1.42rem)] leading-[1.22] text-foreground/60">
            From first conversation to resolved matter<br className="hidden sm:block" /> and nothing left to guess at.
          </p>
        </motion.div>

        <div className="mt-[clamp(2.8rem,6vh,4.8rem)] grid gap-5 lg:h-[min(59vh,600px)] lg:min-h-[500px] lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="relative min-h-[390px] overflow-hidden rounded-[4px] bg-neutral-200 lg:h-full lg:min-h-0"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={steps[active].image}
                src={steps[active].image}
                alt={`${steps[active].title} legal process`}
                initial={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/[0.08]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.09 }}
            className="grid gap-3 lg:h-full"
            style={{
              gridTemplateRows: steps
                .map((_, index) => (index === active ? "2.2fr" : "1fr"))
                .join(" "),
            }}
          >
            {steps.map((step, index) => {
              const open = active === index;

              return (
                <motion.article
                  key={step.title}
                  layout
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative min-h-[94px] overflow-hidden rounded-[4px] bg-[#e6e4e1]"
                >
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    className="flex h-full w-full flex-col px-7 py-6 text-left md:px-8"
                    aria-expanded={open}
                  >
                    <div className="flex w-full items-start justify-between gap-6">
                      <span className="editorial-serif text-[clamp(2.2rem,3vw,3rem)] leading-none tracking-[-0.02em]">
                        {step.title}
                      </span>
                      {open ? (
                        <X className="mt-1 h-5 w-5 shrink-0 stroke-[1.7]" />
                      ) : (
                        <Plus className="mt-1 h-5 w-5 shrink-0 stroke-[1.7]" />
                      )}
                    </div>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.28, delay: 0.04 }}
                          className="mt-auto max-w-[470px] pt-5"
                        >
                          <p className="text-[15px] leading-6 text-foreground/90">{step.body}</p>
                          <div className="mt-4 space-y-2.5">
                            {step.points.map((point) => (
                              <div key={point} className="flex items-center gap-3 text-[13px] text-foreground/70">
                                <Check className="h-4 w-4 shrink-0 stroke-[1.7]" />
                                <span>{point}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>

                  {open && isInView && (
                    <motion.div
                      key={`progress-${active}`}
                      className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-foreground"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                    />
                  )}
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
