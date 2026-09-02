import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  ["When should I involve a lawyer in a business matter?", "Usually earlier than people think. Early advice can simplify negotiations, reduce risk, and keep small issues from becoming expensive ones."],
  ["Will I work directly with my attorney?", "Yes. The model is built around direct access and clear responsibility for the matter."],
  ["How are conflicts and sensitive information handled?", "Every inquiry is reviewed for conflicts before substantive advice is given, and confidential information is handled with appropriate care."],
  ["What should I prepare before our first consultation?", "A short timeline, key documents, the parties involved, and the outcome you want are usually enough to start productively."],
  ["Do you handle matters outside the local area?", "Depending on the matter and jurisdiction, work can often be handled remotely or alongside local counsel."],
];

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" ref={ref} className="bg-background pb-28 md:pb-36 lg:pb-44">
      <div className="site-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-12 max-w-xl text-center"
        >
          <span className="mb-4 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Before we begin</span>
          <h2 className="editorial-serif text-4xl leading-none md:text-5xl">Answers before your first call.</h2>
        </motion.div>

        <div className="mx-auto max-w-3xl divide-y divide-black/10 border-y border-black/10">
          {faqs.map(([question, answer], index) => {
            const active = open === index;
            return (
              <div key={question}>
                <button
                  type="button"
                  onClick={() => setOpen(active ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left text-sm"
                >
                  <span>{question}</span>
                  {active ? <Minus className="h-4 w-4 shrink-0" /> : <Plus className="h-4 w-4 shrink-0" />}
                </button>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-sm leading-6 text-muted-foreground">{answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
