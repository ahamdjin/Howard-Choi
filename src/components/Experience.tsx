import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const steps = [
  { title: "Consult", body: "We start by understanding the matter, the commercial context, and what a good outcome actually looks like." },
  { title: "Strategy", body: "You get a clear plan: priorities, risks, options, and the practical path forward." },
  { title: "Resolution", body: "We move the matter forward with focused execution and direct communication." },
  { title: "Ongoing Counsel", body: "When the relationship continues, you keep direct access without layers of hand-offs." },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [active, setActive] = useState(0);

  return (
    <section id="approach" ref={ref} className="bg-background pb-28 md:pb-36 lg:pb-44">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="mb-12 max-w-xl"
        >
          <span className="mb-4 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">How we work</span>
          <h2 className="editorial-serif mb-4 text-4xl leading-none md:text-5xl">A clear path forward.</h2>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">From the first conversation to resolution, the process stays clear, direct, and deliberate.</p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="min-h-[520px] overflow-hidden bg-neutral-200"
          >
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85"
              alt="Counsel in discussion"
              className="h-full w-full object-cover"
            />
          </motion.div>

          <div className="bg-[#e9e7e4]">
            {steps.map((step, index) => {
              const open = active === index;
              return (
                <div key={step.title} className="border-b border-black/10 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="editorial-serif text-2xl">{step.title}</span>
                    {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-sm leading-6 text-muted-foreground">{step.body}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
