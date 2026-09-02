import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";

const AUTO_ADVANCE_MS = 4600;

const steps = [
  {
    title: "Consult",
    body: "We start with the facts, the commercial context, and the outcome you actually need.",
    detail: "Clear scope, priorities, and immediate next steps from the first conversation.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=88",
  },
  {
    title: "Strategy",
    body: "A plan built around your matter, not a template.",
    detail: "Risks, options, leverage, and timing are made clear before execution begins.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=88",
  },
  {
    title: "Resolution",
    body: "Focused execution designed to move the matter toward the strongest practical outcome.",
    detail: "You always know what is happening, why it matters, and what comes next.",
    image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1400&q=88",
  },
  {
    title: "Ongoing Counsel",
    body: "Direct access continues when the business needs a trusted legal partner beyond one matter.",
    detail: "No layers of hand-offs. Advice stays close, responsive, and commercially grounded.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=88",
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % steps.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timer);
  }, [active, isInView]);

  return (
    <section id="approach" ref={ref} className="flex min-h-[100svh] items-center bg-background py-20 md:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1240px] px-6 md:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="mb-10 max-w-[650px]"
        >
          <span className="mb-4 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">How we work</span>
          <h2 className="editorial-serif text-[clamp(3rem,4.5vw,4.8rem)] leading-[0.94]">A clear path forward.</h2>
          <p className="mt-4 max-w-[470px] text-[15px] leading-6 text-muted-foreground">
            From first conversation to resolved matter, the process stays clear and nothing is left to guess at.
          </p>
        </motion.div>

        <div className="grid gap-3 lg:h-[570px] lg:grid-cols-[1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.06 }}
            className="relative min-h-[360px] overflow-hidden rounded-[2px] bg-neutral-200 lg:h-full lg:min-h-0"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={steps[active].image}
                src={steps[active].image}
                alt={`${steps[active].title} legal process`}
                initial={{ opacity: 0, scale: 1.025 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="grid gap-2 lg:h-full"
            animate={{
              gridTemplateRows: steps.map((_, index) => (index === active ? "2.05fr" : "1fr")).join(" "),
            }}
          >
            {steps.map((step, index) => {
              const open = active === index;

              return (
                <motion.article
                  key={step.title}
                  layout
                  className="relative overflow-hidden rounded-[2px] bg-[#e7e5e2]"
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    className="flex h-full min-h-[92px] w-full flex-col justify-between px-6 py-5 text-left md:px-7 md:py-6"
                    aria-expanded={open}
                  >
                    <div className="flex w-full items-start justify-between gap-6">
                      <span className="editorial-serif text-[2rem] leading-none md:text-[2.25rem]">{step.title}</span>
                      {open ? <Minus className="mt-1 h-5 w-5 shrink-0 stroke-[1.6]" /> : <Plus className="mt-1 h-5 w-5 shrink-0 stroke-[1.6]" />}
                    </div>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.28 }}
                          className="mt-5 max-w-[430px] pr-6"
                        >
                          <p className="text-[14px] leading-6 text-foreground/85">{step.body}</p>
                          <p className="mt-2 text-[13px] leading-5 text-muted-foreground">{step.detail}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>

                  {open && isInView && (
                    <motion.div
                      key={`progress-${active}`}
                      className="absolute bottom-0 left-0 h-[2px] origin-left bg-foreground"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                      style={{ width: "100%" }}
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
